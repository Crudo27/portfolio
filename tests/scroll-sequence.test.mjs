import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { createRenderer, h, ref } from 'vue'
import { createFrameCache, frameAtScroll, sequenceSettings, useScrollSequence } from '../src/composables/useScrollSequence.js'

const manifest = JSON.parse(await readFile('public/portfolio-scroll/scroll-manifest.json', 'utf8'))
const anchors = [{ top: 0, frame: 0 }, { top: 1000, frame: 27 }, { top: 3000, frame: 52 }, { top: 5000, frame: 79 }]
const tick = () => new Promise((resolve) => setImmediate(resolve))
function images() {
  const requests = []
  class FakeImage {
    naturalWidth = 1536
    naturalHeight = 864
    constructor() { requests.push(this) }
    decode() { return Promise.resolve() }
    load() { this.onload?.() }
  }
  async function finish() {
    while (requests.some((image) => image.onload)) {
      for (const image of [...requests]) image.load()
      await tick()
    }
  }
  return { FakeImage, requests, finish }
}

test('los topes DOM se interpolan en ambos sentidos y movimiento reducido sólo elige hitos', () => {
  for (const [y, frame] of [[0, 0], [500, 14], [1000, 27], [2000, 40], [3000, 52], [4000, 66], [5000, 79], [9000, 79], [3000, 52], [1000, 27], [-10, 0]]) {
    assert.equal(frameAtScroll(anchors, y), frame)
  }
  assert.equal(frameAtScroll(anchors, 2999, true), 27)
  assert.equal(frameAtScroll(anchors, 3000, true), 52)
  assert.equal(frameAtScroll([{ top: 0, frame: 0 }, { top: 1000.4, frame: 27 }], 1000, true), 27)
  assert.equal(frameAtScroll([], 20), 0)
})

test('la caché prioriza el destino, limita memoria y cargas, y descarta colas antiguas', async () => {
  const { FakeImage, requests, finish } = images()
  let updates = 0
  const cache = createFrameCache(manifest, () => updates++, FakeImage)
  cache.request(0, 'desktop')
  assert.equal(requests.length, 3)
  await finish()
  assert.equal(requests.length, 4)
  assert.ok(cache.get(0))
  cache.request(27, 'desktop')
  cache.request(79, 'desktop')
  await finish()
  assert.ok(cache.get(79))
  assert.ok(!requests.some((image) => /\/(?:04\d|05\d)\.webp$/.test(image.src)), 'Un salto no recorre todos los frames intermedios')
  for (let frame = 0; frame < 80; frame += 8) {
    cache.request(frame, 'desktop')
    assert.ok(cache.loading <= sequenceSettings.concurrentLoads)
    await finish()
    assert.ok(cache.size <= sequenceSettings.cacheLimit)
  }
  const recent = cache.get(72)
  cache.request(79, 'desktop', true)
  requests.at(-1).decode = () => Promise.reject(new Error('Imagen dañada'))
  await finish()
  assert.equal(cache.get(79), undefined)
  assert.equal(cache.get(72), recent)
  assert.ok(updates > 0)
  cache.dispose()
  assert.equal(cache.size, 0)
  cache.request(0, 'desktop')
  assert.equal(cache.loading, 0)
})

test('la variante anterior y una decodificación tardía no contaminan la caché nueva ni el desmontaje', async () => {
  const { FakeImage, requests, finish } = images()
  let updates = 0
  const cache = createFrameCache(manifest, () => updates++, FakeImage)
  cache.request(27, 'desktop')
  cache.request(52, 'mobile', true)
  await finish()
  assert.equal(cache.size, 1)
  assert.ok(cache.get(52).src.includes('/mobile/052.webp'))
  const before = updates
  cache.request(79, 'mobile', true)
  let resolve
  requests.at(-1).decode = () => new Promise((done) => { resolve = done })
  requests.at(-1).load()
  cache.dispose()
  resolve()
  await tick()
  assert.equal(cache.size, 0)
  assert.equal(updates, before)
})

test('cambiar de variante cancela las tres cargas antiguas e inicia móvil sin esperarlas', async () => {
  const { FakeImage, requests, finish } = images()
  const cache = createFrameCache(manifest, () => {}, FakeImage)
  cache.request(27, 'desktop')
  const old = [...requests]
  cache.request(52, 'mobile', true)
  assert.equal(requests.length, 4)
  assert.equal(cache.loading, 1)
  assert.ok(old.every((image) => image.src === '' && image.onload === null && image.onerror === null))
  assert.match(requests.at(-1).src, /\/mobile\/052.webp$/)
  await finish()
  assert.ok(cache.get(52))
  cache.dispose()
})

test('una decodificación A→B→A tardía no borra la nueva petición con la misma clave', async () => {
  const { FakeImage, requests, finish } = images()
  const cache = createFrameCache(manifest, () => {}, FakeImage)
  cache.request(27, 'desktop', true)
  let resolveOld
  requests[0].decode = () => new Promise((resolve) => { resolveOld = resolve })
  requests[0].load()
  cache.request(52, 'mobile', true)
  cache.request(27, 'desktop', true)
  const current = requests.at(-1)
  resolveOld()
  await tick()
  assert.equal(cache.loading, 1)
  assert.equal(requests.length, 3, 'La respuesta vieja no debe duplicar la carga actual')
  await finish()
  assert.equal(cache.get(27), current)
  cache.dispose()
})

test('un error de red se reintenta al regresar o recuperar conexión, sin bucle en reposo', async () => {
  const { FakeImage, requests, finish } = images()
  const cache = createFrameCache(manifest, () => {}, FakeImage)
  cache.request(79, 'desktop', true)
  requests[0].onerror()
  await tick()
  cache.request(79, 'desktop', true)
  assert.equal(requests.length, 1)
  cache.request(0, 'desktop', true)
  await finish()
  cache.request(79, 'desktop', true)
  await finish()
  assert.match(cache.get(79).src, /079.webp$/)
  cache.request(52, 'desktop', true)
  requests.at(-1).onerror()
  await tick()
  const before = requests.length
  cache.retryFailed()
  assert.equal(requests.length, before + 1)
  await finish()
  assert.ok(cache.get(52))
  cache.dispose()
})

test('un manifiesto parcial conserva el fallback y no se publica para renderizar SVG', async () => {
  const original = { window: globalThis.window, document: globalThis.document, fetch: globalThis.fetch }
  const renderer = createRenderer({ createElement: () => ({}), insert() {}, remove() {}, patchProp() {}, parentNode: () => null, nextSibling: () => null })
  try {
    globalThis.window = {}
    globalThis.document = {}
    for (const overlays of [undefined, {}, { projects: '../otro.svg', stack: 'overlays/golden-ratio.svg' }]) {
      globalThis.fetch = async () => ({ ok: true, json: async () => ({ ...manifest, overlays }) })
      let state, published = false
      const app = renderer.createApp({ setup() {
        state = useScrollSequence(ref({}), ref({ getContext: () => ({}) }), () => { published = true })
        return () => h('div')
      } })
      try {
        app.mount({})
        await tick()
        assert.equal(state.error.value, 'manifest')
        assert.equal(state.ready.value, false)
        assert.equal(published, false)
      } finally { app.unmount() }
    }
  } finally {
    for (const [key, value] of Object.entries(original)) { if (value === undefined) delete globalThis[key]; else globalThis[key] = value }
  }
})
