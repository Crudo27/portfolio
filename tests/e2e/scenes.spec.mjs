import { test, expect, openPortfolio, capture } from './fixtures.mjs'
import { observeLoading, calculateCLS } from './loading-metrics.mjs'

async function scrollToSection(page, selector) {
  await page.evaluate((target) => {
    const element = document.querySelector(target)
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
  }, selector)
}

const route = [['.hero', 0], ['#proyectos', 27], ['#stack', 52], ['#contacto', 79]]
test('Canvas: correspondencia DOM en ambas direcciones, caché, SVG y clics @visual', async ({ page }, testInfo) => {
  await page.addInitScript(observeLoading)
  await openPortfolio(page)
  await page.evaluate(() => { window.__e2eLoading.shifts.length = 0 })
  const scene = page.locator('.portfolio-scene')
  await expect(scene).toHaveCount(1)
  await expect(scene.locator('canvas')).toHaveCount(1)
  for (const [selector, frame] of [...route, ...route.slice(0, -1).reverse()]) {
    await scrollToSection(page, selector)
    await expect(scene).toHaveAttribute('data-frame', String(frame))
    await expect(scene).toHaveCSS('pointer-events', 'none')
    expect(Number(await scene.getAttribute('data-cache-size'))).toBeLessThanOrEqual(12)
    await expect(scene.locator('[data-character]')).toHaveCount(0)
    if (selector === '#proyectos' || selector === '#stack') {
      const kind = selector === '#proyectos' ? 'projects' : 'stack'
      const drawing = page.locator(`[data-overlay="${kind}"]`)
      await expect(drawing).toHaveAttribute('data-ready', 'true')
      await expect(drawing).toHaveClass(/is-active/)
      await expect.poll(() => drawing.locator('.scene-trace').evaluateAll((paths) => paths.every((path) => parseFloat(getComputedStyle(path).strokeDashoffset) === 0))).toBe(true)
      if (kind === 'projects') {
        await expect(drawing.locator('.scene-node')).toHaveCount(15)
        await expect(drawing.locator('.scene-outline')).toHaveAttribute('stroke', '#55B5FF')
      } else {
        await expect(drawing.locator('rect.scene-construction')).toHaveCount(10)
        await expect(drawing.locator('.scene-spiral')).toHaveCount(1)
        expect(await drawing.locator('stop').evaluateAll((stops) => stops.map((stop) => stop.getAttribute('stop-color')))).toEqual(['#92722A', '#D4AF37', '#F4D77A'])
        const width = page.viewportSize().width
        if (width <= 639) {
          const visible = await drawing.evaluate((element) => {
            const spiral = element.querySelector('.scene-spiral'), mask = element.querySelector('.scene-clearance')
            const length = spiral.getTotalLength()
            return Array.from({ length: 300 }, (_, i) => spiral.getPointAtLength(length * i / 299)).filter((point) => !mask.isPointInFill(point)).length / 300
          })
          expect(visible, 'La máscara debe dejar reconocible la espiral en teléfonos').toBeGreaterThanOrEqual(.6)
        }
      }
      await expect(drawing).toHaveCSS('pointer-events', 'none')
    }
    if (selector === '#contacto') await page.getByRole('link', { name: /^GitHub/ }).click({ trial: true })
    await capture(page, testInfo, `canvas-${frame}.png`)
  }
  const metrics = await page.evaluate(() => window.__e2eStopLoading())
  const cls = calculateCLS(metrics.shifts)
  expect.soft(cls).toBeLessThanOrEqual(.01)
  await testInfo.attach('sequence-cls.json', { body: JSON.stringify({ cls, shifts: metrics.shifts }, null, 2), contentType: 'application/json' })
  await page.getByRole('button', { name: 'Explorar Second Brain', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Second Brain', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#detail-dialog')).toBeHidden()
})

test('Canvas: variante responsive, sin reproducción autónoma ni hueco bajo el footer', async ({ page }) => {
  await openPortfolio(page)
  const scene = page.locator('.portfolio-scene')
  for (const [width, height, variant] of [[1440, 900, 'desktop'], [820, 1180, 'mobile'], [390, 844, 'mobile']]) {
    await page.setViewportSize({ width, height })
    await scrollToSection(page, '#stack')
    await expect(scene).toHaveAttribute('data-variant', variant)
    await expect(scene).toHaveAttribute('data-frame', '52')
    await page.waitForTimeout(200)
    await expect(scene).toHaveAttribute('data-frame', '52')
    await scrollToSection(page, '#contacto')
    await expect(scene).toHaveAttribute('data-frame', '79')
    const trailing = await page.evaluate(() => {
      const footer = document.querySelector('footer')
      const credit = document.querySelector('.icon-credit')
      return {
        gap: document.documentElement.scrollHeight - (credit.getBoundingClientRect().bottom + scrollY),
        padding: parseFloat(getComputedStyle(footer).paddingBottom),
      }
    })
    expect(trailing.padding).toBeLessThanOrEqual(48)
    expect(trailing.gap).toBeLessThanOrEqual(49)
  }
})

test.describe('secuencia con movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' })
  test('hitos estáticos, SVG completos y cambio en vivo', async ({ page }, testInfo) => {
    const requests = []
    page.on('request', (request) => { if (request.url().includes('/frames/')) requests.push(request.url()) })
    await openPortfolio(page)
    const scene = page.locator('.portfolio-scene')
    for (const [selector, frame] of route) {
      await scrollToSection(page, selector)
      await expect(scene).toHaveAttribute('data-frame', String(frame))
      await expect(scene).toHaveAttribute('data-reduced', 'true')
    }
    expect(requests.every((url) => /\/(000|027|052|079)\.webp$/.test(url))).toBe(true)
    expect(await page.locator('.scene-overlay').evaluateAll((elements) => elements.every((element) => element.getAnimations({ subtree: true }).length === 0))).toBe(true)
    await capture(page, testInfo, 'amanecer-sin-movimiento.png')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(scene).toHaveAttribute('data-reduced', 'false')
  })
})

test('Stack: categorías legibles sobre los píxeles reales del Canvas y su velo', async ({ page }) => {
  await openPortfolio(page)
  const top = await page.locator('#stack').evaluate((el) => el.getBoundingClientRect().top + scrollY)
  for (const offset of [0, 120, 480]) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top + offset)
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    await expect.poll(() => page.locator('.portfolio-scene').evaluate((el) => el.dataset.frame === el.dataset.targetFrame)).toBe(true)
    const ratios = await page.evaluate(() => {
      const scene = document.querySelector('.portfolio-scene'), canvas = scene.querySelector('canvas'), ctx = canvas.getContext('2d')
      const scale = canvas.width / scene.clientWidth, style = getComputedStyle(scene)
      const base = style.getPropertyValue('--p-bg').trim().slice(1).match(/../g).map((channel) => parseInt(channel, 16))
      const left = parseFloat(style.getPropertyValue('--scene-text-scrim')) / 100
      const right = parseFloat(style.getPropertyValue('--scene-right-scrim')) / 100
      const lum = (rgb) => rgb.map((v) => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0)
      return [...document.querySelectorAll('.tool-category')].flatMap((text) => {
        const box = text.getBoundingClientRect()
        const x0 = Math.max(0, Math.floor(box.left * scale)), y0 = Math.max(0, Math.floor(box.top * scale))
        const x1 = Math.min(canvas.width, Math.ceil(box.right * scale)), y1 = Math.min(canvas.height, Math.ceil(box.bottom * scale))
        if (x1 <= x0 || y1 <= y0) return []
        const foreground = getComputedStyle(text).color.match(/[\d.]+/g).slice(0, 3).map(Number)
        const pixels = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data
        let minimum = Infinity
        for (let y = 0; y < y1 - y0; y++) for (let x = 0; x < x1 - x0; x++) {
          const pixel = (y * (x1 - x0) + x) * 4, fraction = (x + x0) / scale / scene.clientWidth
          const alpha = innerWidth <= 1023 ? left : fraction <= .25 ? left : fraction <= .6
            ? left + (fraction - .25) / .35 * (.55 - left) : .55 + (fraction - .6) / .4 * (right - .55)
          const background = [0, 1, 2].map((i) => pixels[pixel + i] * (1 - alpha) + base[i] * alpha)
          const a = lum(foreground), b = lum(background)
          minimum = Math.min(minimum, (Math.max(a, b) + .05) / (Math.min(a, b) + .05))
        }
        return [{ tool: text.closest('button').querySelector('.tool-name').textContent, minimum }]
      })
    })
    for (const { tool, minimum } of ratios) expect(minimum, `${tool}, desplazamiento ${offset}px`).toBeGreaterThanOrEqual(4.5)
  }
})
