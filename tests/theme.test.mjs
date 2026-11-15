import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

function luminance(hex) {
  const [r, g, b] = hex.slice(1).match(/../g).map((channel) => {
    const value = parseInt(channel, 16) / 255
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4
  })
  return .2126 * r + .7152 * g + .0722 * b
}

function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + .05) / (values[1] + .05)
}

test('la paleta oscura mantiene contraste AA para lectura, acciones y foco', async () => {
  const css = await readFile('src/style.css', 'utf8')
  const tokens = Object.fromEntries([...css.matchAll(/--(p-[\w-]+):\s*(#[\da-f]{6})\b/gi)].map(([, name, value]) => [name, value]))
  for (const surface of ['p-bg', 'p-surface', 'p-raised']) {
    for (const text of ['p-ink', 'p-muted', 'p-accent']) {
      assert.ok(contrast(tokens[text], tokens[surface]) >= 4.5, `${text} debe ser legible sobre ${surface}`)
    }
    assert.ok(contrast(tokens['p-action'], tokens[surface]) >= 3, `El foco debe distinguirse de ${surface}`)
  }
  for (const action of ['p-action', 'p-action-hover', 'p-action-active']) {
    assert.ok(contrast(tokens['p-action-ink'], tokens[action]) >= 4.5, `El texto debe ser legible en ${action}`)
  }
})

test('el velo base protege el texto secundario en la zona izquierda y móvil incluso sobre blanco', async () => {
  const css = await readFile('src/style.css', 'utf8')
  const scene = await readFile('src/components/PortfolioSceneBackground.vue', 'utf8')
  const background = css.match(/--p-bg:\s*(#[\da-f]{6})/i)[1]
  const text = css.match(/--p-muted:\s*(#[\da-f]{6})/i)[1]
  const opacity = Number(scene.match(/--scene-text-scrim:\s*([\d.]+)%/)[1]) / 100
  assert.match(scene, /var\(--scene-text-scrim\), transparent\) 0 25%/)
  const composite = '#' + background.slice(1).match(/../g).map((channel) => Math.round(parseInt(channel, 16) * opacity + 255 * (1 - opacity)).toString(16).padStart(2, '0')).join('')
  assert.ok(contrast(text, composite) >= 4.5, 'La zona protegida del texto debe mantener AA con el peor fondo posible')
})
