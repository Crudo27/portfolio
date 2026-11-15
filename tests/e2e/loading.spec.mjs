import { setTimeout } from 'node:timers/promises'
import { test, expect, openPortfolio, capture } from './fixtures.mjs'
import { calculateCLS, observeLoading } from './loading-metrics.mjs'

for (const delayed of [false, true]) {
  const scenario = delayed ? 'recursos-lentos' : 'normal'
  test(`carga ${scenario}: CLS y desplazamiento sin interacción`, async ({ page }, testInfo) => {
    await page.addInitScript(observeLoading)
    if (delayed) {
      await page.route(/\.(?:js|woff2)(?:\?.*)?$/, async (route) => {
        await setTimeout(900)
        await route.continue()
      })
    }
    await openPortfolio(page)
    // Ventana de observación tras cargar fuentes e hidratar, sin ratón ni teclado.
    await page.waitForTimeout(2000)
    const metrics = await page.evaluate(() => window.__e2eStopLoading())
    const result = {
      scenario, viewport: page.viewportSize(), resourceDelayMs: delayed ? 900 : 0,
      cls: calculateCLS(metrics.shifts), clsLimit: 0.1, ...metrics,
    }
    await testInfo.attach('loading-metrics.json', { body: JSON.stringify(result, null, 2), contentType: 'application/json' })
    await capture(page, testInfo, `carga-${scenario}.png`)
    expect.soft(result.supported, 'Layout Instability API disponible en Chromium').toBe(true)
    expect.soft(result.cls, 'CLS de carga: revisar las fuentes y rectángulos en loading-metrics.json').toBeLessThanOrEqual(0.1)
    expect.soft(result.positions.filter(({ scrollX, scrollY }) => Math.abs(scrollX) > 1 || Math.abs(scrollY) > 1), 'Scroll inesperado durante la carga').toEqual([])
  })
}
