import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { createRenderer, h, ref } from 'vue'
import { frameAtScroll, useScrollSequence } from '../src/composables/useScrollSequence.js'

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


test('los 80 índices completos son alcanzables al bajar y al subir entre secciones desiguales', () => {
  const offsets = Array.from({ length: 80 }, (_, frame) => {
    const next = anchors.find((anchor) => anchor.frame >= frame)
    const previous = anchors[Math.max(0, anchors.indexOf(next) - 1)]
    return next.frame === previous.frame ? previous.top : previous.top + (next.top - previous.top) * (frame - previous.frame) / (next.frame - previous.frame)
  })
  assert.deepEqual(offsets.map((y) => frameAtScroll(anchors, y)), Array.from({ length: 80 }, (_, i) => i))
  assert.deepEqual([...offsets].reverse().map((y) => frameAtScroll(anchors, y)), Array.from({ length: 80 }, (_, i) => 79 - i))
  assert.ok(offsets.every((y) => [0, 27, 52, 79].includes(frameAtScroll(anchors, y, true))))
})

function eventTarget() {
  const listeners = new Map()
  return {
    listeners,
    addEventListener(type, fn, options) { if (!listeners.has(type)) listeners.set(type, new Map()); listeners.get(type).set(fn, options) },
    removeEventListener(type, fn) { listeners.get(type)?.delete(fn) },
    emit(type) { for (const fn of listeners.get(type)?.keys() || []) fn() },
    count() { return [...listeners.values()].reduce((n, items) => n + items.size, 0) },
  }
}

test('el controlador Canvas agrupa scroll, conserva el último frame, responde a media queries y limpia recursos', async () => {
  const originals = { window: globalThis.window, document: globalThis.document, fetch: globalThis.fetch }
  const viewport = eventTarget(), motion = { ...eventTarget(), matches: false }, mobile = { ...eventTarget(), matches: false }
  const document = { ...eventTarget(), hidden: false, body: {}, documentElement: { dataset: {}, scrollHeight: 7000 }, fonts: { ready: Promise.resolve() } }
  const { FakeImage, requests, finish } = images()
  const frames = new Map(), observers = [], draws = []
  let nextFrame = 0, state, app
  Object.assign(viewport, {
    scrollY: 0, innerHeight: 900, devicePixelRatio: 2, Image: FakeImage,
    matchMedia: (query) => query.includes('reduced-motion') ? motion : mobile,
    requestAnimationFrame(fn) { const id = ++nextFrame; frames.set(id, fn); return id },
    cancelAnimationFrame(id) { frames.delete(id) },
    ResizeObserver: class { constructor(fn) { this.callback = fn; observers.push(this) } observe() {} disconnect() { this.disconnected = true } },
  })
  const selectors = ['.hero', '#proyectos', '#stack', '#contacto']
  document.querySelector = (selector) => ({ getBoundingClientRect: () => ({ top: anchors[selectors.indexOf(selector)].top - viewport.scrollY }) })
  const root = { clientWidth: 1440, clientHeight: 900, dataset: {} }
  const canvas = { width: 0, height: 0, getContext: () => ({ drawImage: (...args) => draws.push(args) }) }
  const flush = () => { for (const [id, fn] of [...frames]) { frames.delete(id); fn() } }
  Object.assign(globalThis, { window: viewport, document, fetch: async () => ({ ok: true, json: async () => manifest }) })
  try {
    const renderer = createRenderer({ createElement: () => ({}), insert() {}, remove() {}, patchProp() {}, parentNode: () => null, nextSibling: () => null })
    app = renderer.createApp({ setup() { state = useScrollSequence(ref(root), ref(canvas), () => {}); return () => h('div') } })
    app.mount({})
    await tick(); flush(); await finish(); flush()
    assert.equal(state.ready.value, true)
    assert.equal(canvas.width, 2160, 'DPR limitado a 1.5')
    assert.equal(viewport.listeners.get('scroll').values().next().value.passive, true)
    const previousDraws = draws.length
    viewport.scrollY = 1000
    for (let i = 0; i < 30; i++) viewport.emit('scroll')
    assert.equal(frames.size, 1)
    flush()
    assert.equal(state.targetFrame.value, 27)
    assert.equal(state.frame.value, 0)
    assert.equal(draws.length, previousDraws, 'No se borra el Canvas si el destino aún no está listo')
    await finish(); flush()
    assert.equal(state.frame.value, 27)
    assert.equal(frames.size, 0, 'Sin scroll no hay bucle de reproducción')
    motion.matches = true; viewport.scrollY = 2999; motion.emit('change'); flush()
    assert.equal(state.targetFrame.value, 27)
    viewport.scrollY = 3000; viewport.emit('scroll'); flush(); await finish(); flush()
    assert.equal(state.frame.value, 52)
    mobile.matches = true; root.clientWidth = 390; root.clientHeight = 844; mobile.emit('change'); flush(); await finish(); flush()
    assert.equal(state.variant.value, 'mobile')
    assert.ok(draws.at(-1)[0].src.includes('/mobile/'))
    viewport.scrollY = 0; viewport.emit('scroll'); flush(); await finish(); flush()
    assert.equal(state.frame.value, 0)
    viewport.emit('resize')
    app.unmount(); app = null
    assert.equal(frames.size, 0)
    assert.equal(viewport.count() + document.count() + motion.count() + mobile.count(), 0)
    assert.ok(observers.every((observer) => observer.disconnected))
    assert.ok(requests.every((image) => image.onload === null && image.onerror === null))
  } finally {
    app?.unmount()
    for (const [key, value] of Object.entries(originals)) { if (value === undefined) delete globalThis[key]; else globalThis[key] = value }
  }
})

