import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { personalProfile, projects, socialLinks, technologies } from '../src/data/portfolio.js'

test('los datos distinguen información confirmada de información pendiente', () => {
  assert.equal(personalProfile.name, 'Gian Piero Rodríguez')
  assert.equal(personalProfile.interests.length, 5)
  assert.deepEqual(projects.map(({ name }) => name), ['Second Brain', 'Vende360', 'Idemne'])
  for (const project of projects) {
    for (const key of ['status', 'description', 'problem']) assert.ok(project[key] === null || typeof project[key] === 'string', `${project.name}.${key}: texto confirmado o null`)
    for (const key of ['goals', 'features', 'technologies', 'technicalHighlights', 'links']) assert.ok(Array.isArray(project[key]))
  }
  for (const technology of technologies) {
    assert.ok(technology.description)
    for (const key of ['usage', 'experience']) assert.ok(technology[key] === null || typeof technology[key] === 'string')
    assert.ok(Array.isArray(technology.projects))
    assert.ok(Array.isArray(technology.interests))
  }
  assert.deepEqual(technologies.find(({ name }) => name === 'Vue').projects, ['Second Brain y Vende360.'])
  assert.deepEqual(socialLinks.filter(({ href }) => href).map(({ href }) => href), [
    'https://github.com/Crudo27',
    'mailto:gp100805@gmail.com',
  ])
  assert.equal(socialLinks.find(({ name }) => name === 'LinkedIn').href, null)
})

test('las once fichas contienen información proporcionada y conservan los límites de cada proyecto', async () => {
  const source = await readFile('PORTFOLIO_CONTENT.md', 'utf8')
  const contains = (text) => {
    assert.equal(typeof text, 'string')
    assert.ok(text.trim())
    assert.ok(source.includes(text), `El contenido debe proceder del titular: ${text}`)
  }
  assert.equal(projects.length + technologies.length, 11)
  for (const project of projects) {
    for (const key of ['summary', 'description', 'problem', 'status', 'repositoryNote']) contains(project[key])
    for (const key of ['goals', 'features', 'technologies', 'technicalHighlights']) {
      assert.ok(project[key].length > 0, `${project.name}.${key} no debe quedar vacío`)
      project[key].forEach(contains)
    }
    if (project.featuresNote) contains(project.featuresNote)
    assert.deepEqual(project.links, [], 'No se inventan repositorios ni demos públicas')
  }
  for (const technology of technologies) {
    for (const key of ['description', 'usage', 'experience']) contains(technology[key])
    for (const key of ['projects', 'interests']) {
      assert.ok(technology[key].length > 0)
      technology[key].forEach(contains)
    }
  }
  const [brain, vende, idemne] = projects
  assert.match(brain.status, /Prototipo funcional en evolución continua/)
  assert.match(brain.repositoryNote, /no se encuentran disponibles públicamente/)
  assert.match(vende.description, /participé durante mis prácticas profesionales/)
  assert.match(vende.featuresNote, /integración parcial/)
  assert.match(idemne.status, /Diseño y preproducción/)
  assert.match(idemne.featuresNote, /no deben interpretarse como sistemas ya implementados/)
  assert.match(idemne.repositoryNote, /todavía no disponible/)
})

test('las tarjetas sociales enlazan únicamente destinos configurados y tienen recursos locales acreditados', async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  try {
    const { default: SocialCards } = await server.ssrLoadModule('/src/components/SocialCards.vue')
    const html = await renderToString(createSSRApp(SocialCards))
    assert.equal((html.match(/<a\b/g) || []).length, 2)
    assert.match(html, /href="https:\/\/github\.com\/Crudo27" target="_blank" rel="noopener noreferrer"/)
    assert.match(html, /Se abre en una nueva pestaña\./)
    assert.match(html, /<a[^>]+href="mailto:gp100805@gmail\.com"/)
    assert.doesNotMatch(html, /<a[^>]+href="mailto:[^"]+"[^>]+target=/)
    assert.match(html, /<article class="social-card social-card--pending">[\s\S]*?LinkedIn[\s\S]*?Enlace pendiente[\s\S]*?<\/article>/)
    assert.doesNotMatch(html, /<article[^>]+(?:href|tabindex|aria-disabled)=/)
    const credits = JSON.parse(await readFile('public/assets/icons/social-credits.json', 'utf8'))
    for (const name of ['github', 'linkedin', 'email']) {
      const asset = await readFile(`public/assets/icons/${name}.svg`, 'utf8')
      assert.match(asset, /^<svg\b/)
      assert.ok(credits.some(({ file }) => file === `${name}.svg`), `Falta el crédito de ${name}`)
    }
  } finally {
    await server.close()
  }
})
