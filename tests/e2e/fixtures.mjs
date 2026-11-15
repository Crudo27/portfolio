import { test as base, expect } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const diagnostics = { console: [], pageErrors: [], failedRequests: [], httpErrors: [] }
    page.on('console', (message) => diagnostics.console.push({
      type: message.type(), text: message.text(), location: message.location(),
    }))
    page.on('pageerror', (error) => diagnostics.pageErrors.push(error.stack || error.message))
    page.on('requestfailed', (request) => diagnostics.failedRequests.push({
      url: request.url(), error: request.failure()?.errorText,
    }))
    page.on('response', (response) => {
      if (response.status() >= 400) diagnostics.httpErrors.push({ url: response.url(), status: response.status() })
    })

    try {
      await use(page)
    } finally {
      await testInfo.attach('browser-diagnostics.json', {
        body: JSON.stringify(diagnostics, null, 2), contentType: 'application/json',
      })
      expect.soft(diagnostics.console.filter(({ type }) => type === 'error'), 'Errores de consola').toEqual([])
      expect.soft(diagnostics.pageErrors, 'Excepciones JavaScript').toEqual([])
      const unexpectedFailures = diagnostics.failedRequests.filter(({ url, error }) =>
        !(error === 'net::ERR_ABORTED' && /\/portfolio-scroll\/frames\/(desktop|mobile)\/\d{3}\.webp$/.test(url)))
      expect.soft(unexpectedFailures, 'Recursos que no llegaron a cargar; se conservan los abortos de variante en el diagnóstico').toEqual([])
      expect.soft(diagnostics.httpErrors, 'Respuestas HTTP con error').toEqual([])
    }
  },
})

export { expect }

export async function openPortfolio(page) {
  const response = await page.goto('/')
  expect(response.ok()).toBe(true)
  await expect(page.locator('header.nav')).toHaveClass(/nav--enhanced/)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => [...document.images].every((image) => image.complete))
  await expect(page.locator('.portfolio-scene')).toHaveAttribute('data-ready', 'true')
}

export async function capture(page, testInfo, name, { fullPage = false, compare = false } = {}) {
  const path = testInfo.outputPath(name)
  await page.screenshot({ path, fullPage, animations: 'disabled' })
  await testInfo.attach(name, { path, contentType: 'image/png' })
  if (compare) await expect.soft(page).toHaveScreenshot(name, { fullPage })
}

export async function expectDialogFits(page, dialog) {
  await dialog.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished.catch(() => {}))))
  const bounds = await dialog.boundingBox()
  expect(bounds).not.toBeNull()
  const { width, height } = page.viewportSize()
  expect.soft(bounds.x).toBeGreaterThanOrEqual(0)
  expect.soft(bounds.y).toBeGreaterThanOrEqual(0)
  expect.soft(bounds.x + bounds.width).toBeLessThanOrEqual(width + 1)
  expect.soft(bounds.y + bounds.height).toBeLessThanOrEqual(height + 1)
  expect.soft(await dialog.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
}
