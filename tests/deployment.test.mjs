import assert from 'node:assert/strict'
import test from 'node:test'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createServer } from 'vite'
import { readFile } from 'node:fs/promises'

test('producción mantiene /portfolio/ en el prerender y los 160 destinos dinámicos del Canvas', async () => {
  const server = await createServer({ mode: 'production', server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  try {
    assert.equal(server.config.base, '/portfolio/')
    const { default: App } = await server.ssrLoadModule('/src/App.vue')
    const html = await renderToString(createSSRApp(App))
    assert.match(html, /src="\/portfolio\/portfolio-scroll\/frames\/desktop\/000.webp"/)
    assert.match(html, /srcset="\/portfolio\/portfolio-scroll\/frames\/mobile\/000.webp"/)
    assert.match(html, /src="\/portfolio\/assets\/icons\/vue.svg"/)
    assert.doesNotMatch(html, /(?:src|srcset)="\/(?:assets|portfolio-scroll)\//)
    const { createFrameCache } = await server.ssrLoadModule('/src/composables/useScrollSequence.js')
    const manifest = JSON.parse(await readFile('public/portfolio-scroll/scroll-manifest.json', 'utf8'))
    for (const variant of ['desktop', 'mobile']) for (let frame = 0; frame < 80; frame++) {
      const images = []
      class Image { constructor() { images.push(this) } }
      const cache = createFrameCache(manifest, () => {}, Image)
      cache.request(frame, variant, true)
      assert.equal(images.length, 1)
      assert.equal(images[0].src, `/portfolio/portfolio-scroll/frames/${variant}/${String(frame).padStart(3, '0')}.webp`)
      cache.dispose()
    }
  } finally { await server.close() }
})
