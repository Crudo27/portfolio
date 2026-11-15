import { readFile, readdir, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const content = await renderToString(createSSRApp(App))
  const html = await readFile('dist/index.html', 'utf8')
  if (!html.includes('<div id="app"></div>')) throw new Error('No se encontró el contenedor para prerenderizar.')
  const cssFiles = (await readdir('dist/assets')).filter((file) => file.endsWith('.css'))
  const css = (await Promise.all(cssFiles.map((file) => readFile(`dist/assets/${file}`, 'utf8')))).join('\n')
  for (const scope of new Set(content.match(/data-v-[a-f\d]+/g))) {
    if (!css.includes(`[${scope}]`)) throw new Error(`El CSS de producción no coincide con el prerender: ${scope}`)
  }
  await writeFile('dist/index.html', html.replace('<div id="app"></div>', () => `<div id="app">${content}</div>`))
  console.log('Portfolio prerenderizado: contenido y anclas disponibles sin JavaScript.')
} finally {
  await server.close()
}
