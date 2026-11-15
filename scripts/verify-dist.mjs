import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve, relative } from 'node:path'

const root = resolve('dist')
const base = '/portfolio/'
const origin = 'https://crudo27.github.io'
const html = await readFile(`${root}/index.html`, 'utf8')

async function localResource(value, owner = 'index.html') {
  if (!value || value.startsWith('#') || /^(data:|mailto:|tel:)/i.test(value)) return
  const url = new URL(value, `${origin}${base}${owner}`)
  if (url.origin !== origin) return
  assert.ok(url.pathname.startsWith(base), `Ruta fuera de ${base}: ${url.pathname}`)
  const file = resolve(root, decodeURIComponent(url.pathname.slice(base.length)) || 'index.html')
  assert.ok(file.startsWith(`${root}/`), `Ruta fuera de dist: ${url.pathname}`)
  assert.ok((await stat(file)).isFile(), `Recurso inexistente: ${url.pathname}`)
}

for (const [, value] of html.matchAll(/\b(?:src|href|srcset)="([^"]+)"/g)) {
  for (const source of value.split(',')) await localResource(source.trim().split(/\s+/)[0])
}
assert.doesNotMatch(html, /%BASE_URL%|\/src\/main\.js/)
assert.match(html, /<html\b[^>]*lang="es"/)
assert.match(html, /rel="canonical" href="https:\/\/crudo27\.github\.io\/portfolio\/"/)
assert.match(html, /property="og:image" content="https:\/\/crudo27\.github\.io\/portfolio\/share\.png"/)
assert.match(html, /href="https:\/\/github\.com\/Crudo27"/)
assert.equal((html.match(/<canvas\b/g) || []).length, 1)

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]))).flat()
}

for (const file of await files('public')) {
  const path = relative('public', file)
  assert.deepEqual(await readFile(`${root}/${path}`), await readFile(file), `Copia alterada: ${path}`)
}
for (const file of await files(root)) {
  if (!file.endsWith('.css')) continue
  const css = await readFile(file, 'utf8')
  for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/g)) {
    await localResource(match[1] ?? match[2] ?? match[3], relative(root, file))
  }
}

const manifest = JSON.parse(await readFile(`${root}/portfolio-scroll/scroll-manifest.json`, 'utf8'))
assert.equal(manifest.frameCount, 80)
assert.equal(manifest.frameName, '%03d.webp')
assert.deepEqual(manifest.keyframes, { hero: 0, projects: 27, stack: 52, contact: 79 })
const names = Array.from({ length: 80 }, (_, i) => `${String(i).padStart(3, '0')}.webp`)
for (const variant of ['desktop', 'mobile']) {
  assert.equal(manifest[variant].path, `frames/${variant}`)
  assert.deepEqual((await readdir(`${root}/portfolio-scroll/${manifest[variant].path}`)).sort(), names)
  for (const name of names) await localResource(`${base}portfolio-scroll/${manifest[variant].path}/${name}`)
}
assert.deepEqual(manifest.overlays, { projects: 'overlays/joestar-star.svg', stack: 'overlays/golden-ratio.svg' })
for (const path of Object.values(manifest.overlays)) await localResource(`${base}portfolio-scroll/${path}`)
const hashes = JSON.parse(await readFile('tests/fixtures/scroll-assets.sha256.json', 'utf8'))
for (const [path, hash] of Object.entries(hashes)) {
  assert.equal(createHash('sha256').update(await readFile(`${root}/portfolio-scroll/${path}`)).digest('hex'), hash, path)
}
for (const path of ['favicon.svg', 'share.png', 'robots.txt', 'sitemap.xml']) await localResource(`${base}${path}`)
const preview = await readFile(`${root}/share.png`)
assert.equal(preview.readUInt32BE(16), 1200)
assert.equal(preview.readUInt32BE(20), 630)
assert.match(await readFile(`${root}/sitemap.xml`, 'utf8'), /https:\/\/crudo27\.github\.io\/portfolio\//)
console.log('dist verificado: subruta /portfolio/, HTML/CSS, fuentes, iconos, 160 frames, SVG, hashes y SEO.')
