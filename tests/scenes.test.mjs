import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { access, readFile, readdir } from 'node:fs/promises'
import test from 'node:test'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

test('los 160 frames, el manifiesto y los SVG conservan los bytes aprobados sin duplicar el kit', async () => {
  const base = 'public/portfolio-scroll'
  const fingerprints = JSON.parse(await readFile('tests/fixtures/scroll-assets.sha256.json', 'utf8'))
  const manifest = JSON.parse(await readFile(`${base}/scroll-manifest.json`, 'utf8'))
  assert.equal(manifest.frameCount, 80)
  assert.equal(manifest.frameName, '%03d.webp')
  assert.deepEqual(manifest.keyframes, { hero: 0, projects: 27, stack: 52, contact: 79 })
  assert.deepEqual(manifest.overlays, { projects: 'overlays/joestar-star.svg', stack: 'overlays/golden-ratio.svg' })
  const names = Array.from({ length: manifest.frameCount }, (_, index) => `${String(index).padStart(3, '0')}.webp`)
  const assets = ['scroll-manifest.json', ...await readdir(`${base}/overlays`).then((files) => files.map((file) => `overlays/${file}`))]
  for (const variant of ['desktop', 'mobile']) {
    const path = manifest[variant].path
    assert.equal(path, `frames/${variant}`)
    assert.deepEqual((await readdir(`${base}/${path}`)).sort(), names)
    assets.push(...names.map((name) => `${path}/${name}`))
  }
  assert.deepEqual(assets.sort(), Object.keys(fingerprints).sort(), 'La lista de integridad debe cubrir todos los recursos conservados')
  for (const asset of assets) {
    const actual = await readFile(`${base}/${asset}`)
    assert.ok(actual.length > 0, `${asset} no debe estar vacío`)
    assert.equal(createHash('sha256').update(actual).digest('hex'), fingerprints[asset], `${asset} debe conservar los bytes aprobados`)
    if (asset.endsWith('.webp')) {
      assert.equal(actual.toString('ascii', 0, 4), 'RIFF')
      assert.equal(actual.toString('ascii', 8, 12), 'WEBP')
      assert.equal(actual.readUInt32LE(4) + 8, actual.length)
    }
  }
})

test('la distribución contiene sólo la secuencia vigente y conserva las geometrías originales', async () => {
  await assert.rejects(access('public/portfolio-scenes'), { code: 'ENOENT' })
  await assert.rejects(access('public/portfolio-scroll/posters'), { code: 'ENOENT' })
  const star = await readFile('public/portfolio-scroll/overlays/joestar-star.svg', 'utf8')
  const golden = await readFile('public/portfolio-scroll/overlays/golden-ratio.svg', 'utf8')
  assert.match(star, /<svg\b/)
  assert.match(star, /<path\b/)
  assert.match(golden, /<svg\b/)
  assert.match(golden, /<rect\b/)
  assert.match(golden, /<path\b/)
})

test('la secuencia prerenderiza un único canvas con fallback responsive sin el sistema anterior', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  try {
    const { default: Background } = await server.ssrLoadModule('/src/components/PortfolioSceneBackground.vue')
    const initial = await renderToString(createSSRApp(Background))
    assert.match(initial, /data-frame="0"/)
    assert.match(initial, /aria-hidden="true" inert/)
    assert.equal((initial.match(/<picture\b/g) || []).length, 1)
    assert.equal((initial.match(/<img\b/g) || []).length, 1)
    assert.match(initial, /<source\b[^>]*srcset="\/portfolio-scroll\/frames\/mobile\/000.webp"[^>]*width="720"[^>]*height="1280"/)
    assert.match(initial, /<img\b[^>]*src="\/portfolio-scroll\/frames\/desktop\/000.webp"[^>]*width="1536"[^>]*height="864"/)
    assert.match(initial, /fetchpriority="high"/)
    assert.equal((initial.match(/<canvas\b/g) || []).length, 1)
    assert.match(initial, /data-ready="false"/)
    assert.match(initial, /max-aspect-ratio: 3\/4/)
    assert.doesNotMatch(initial, /<(?:button|a)\b|tabindex=|characters\/|scene-character|data-overlay=/)
    for (const [image] of initial.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image, /\balt(?:=""|(?=\s|>))/)
    }
    const { default: App } = await server.ssrLoadModule('/src/App.vue')
    const html = await renderToString(createSSRApp(App))
    assert.equal((html.match(/class="portfolio-scene"/g) || []).length, 1)
    assert.doesNotMatch(html, /\/portfolio-scenes\/|\/frames\/[^/]+\/(?!000\.webp)\d+\.webp|data-overlay=/)
    for (const id of ['proyectos', 'stack', 'contacto']) assert.ok(html.includes(`id="${id}"`))
    const head = await readFile('index.html', 'utf8')
    const preloads = [...head.matchAll(/<link\b(?:[^>"]|"[^"]*")*>/g)].map(([tag]) => tag).filter((tag) => tag.includes('rel="preload"') && tag.includes('as="image"'))
    assert.equal(preloads.length, 2)
    assert.match(preloads[0], /href="\/portfolio-scroll\/frames\/mobile\/000.webp" media="\(max-width: 720px\), \(max-aspect-ratio: 3\/4\)"/)
    assert.match(preloads[1], /href="\/portfolio-scroll\/frames\/desktop\/000.webp" media="\(width > 720px\) and \(aspect-ratio > 3\/4\)"/)
  } finally {
    await server.close()
  }
})
