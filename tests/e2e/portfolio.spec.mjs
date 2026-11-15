import { navigation, projects, socialLinks, technologies } from '../../src/data/portfolio.js'
import { test, expect, openPortfolio, capture, expectDialogFits } from './fixtures.mjs'

test.beforeEach(async ({ page }) => {
  await openPortfolio(page)
})

test('responsive: contenido, columnas y capturas @visual', async ({ page }, testInfo) => {
  const width = page.viewportSize().width
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('.project-card')).toHaveCount(projects.length)
  await expect(page.locator('.tool-button')).toHaveCount(technologies.length)
  await expect(page.locator('.social-card')).toHaveCount(socialLinks.length)
  const scene = page.locator('.portfolio-scene')
  await expect(scene).toHaveAttribute('data-frame', '0')
  await expect(scene).toHaveAttribute('data-ready', 'true')
  await expect(scene).toHaveAttribute('aria-hidden', 'true')
  await expect(scene).toHaveAttribute('inert', '')
  await expect(scene).toHaveCSS('pointer-events', 'none')
  await expect(scene).toHaveCSS('position', 'fixed')
  const artwork = scene.locator('img')
  await expect(artwork).toHaveAttribute('src', '/portfolio-scroll/frames/desktop/000.webp')
  const variant = width <= 720 || width / page.viewportSize().height <= .75 ? 'mobile' : 'desktop'
  await expect.poll(() => artwork.evaluate((image) => new URL(image.currentSrc).pathname)).toBe(`/portfolio-scroll/frames/${variant}/000.webp`)
  await expect(scene.locator('canvas')).toBeVisible()
  await expect(artwork).toHaveCSS('opacity', '1')
  await expect(scene.locator('[data-character]')).toHaveCount(0)

  const geometry = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth
    const selectors = '.wrap, h1, h2, h3, .project-card, .tool-button, .social-card'
    const overflow = [...document.querySelectorAll(selectors)].flatMap((element) => {
      if (!element.getClientRects().length) return []
      const rects = [element.getBoundingClientRect()]
      if (/^H[123]$/.test(element.tagName)) {
        const range = document.createRange()
        range.selectNodeContents(element)
        rects.push(...range.getClientRects())
      }
      return rects.some((rect) => rect.left < -1 || rect.right > viewport + 1)
        ? [{ tag: element.tagName, text: element.textContent.trim(), class: element.className }]
        : []
    })
    return {
      viewport, documentWidth: document.documentElement.scrollWidth, overflow,
      projectColumns: getComputedStyle(document.querySelector('.project-grid')).gridTemplateColumns.split(' ').length,
      toolColumns: getComputedStyle(document.querySelector('.tools-grid')).gridTemplateColumns.split(' ').length,
      brokenImages: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src),
    }
  })
  await testInfo.attach('responsive-geometry.json', { body: JSON.stringify(geometry, null, 2), contentType: 'application/json' })
  expect.soft(geometry.documentWidth, 'Overflow horizontal').toBeLessThanOrEqual(geometry.viewport + 1)
  expect.soft(geometry.overflow, 'Contenido recortado horizontalmente').toEqual([])
  expect.soft(geometry.brokenImages, 'Iconos sin cargar').toEqual([])
  expect.soft(geometry.projectColumns).toBe(width < 640 ? 1 : 3)
  expect.soft(geometry.toolColumns).toBe(width < 390 ? 1 : 2)
  if (width >= 1024) {
    await expect(page.getByRole('navigation', { name: 'Navegación principal', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menú de navegación' })).toBeHidden()
  } else {
    await expect(page.getByRole('navigation', { name: 'Navegación principal', exact: true })).toBeHidden()
    await expect(page.getByRole('button', { name: 'Abrir menú de navegación' })).toBeVisible()
  }
  await capture(page, testInfo, 'portfolio-completo.png', { fullPage: true, compare: true })
  await capture(page, testInfo, 'hero.png', { compare: true })
})

for (const [index, project] of projects.entries()) {
  test(`proyecto: abrir y cerrar ${project.name}${index === 0 ? ' @visual' : ''}`, async ({ page, hasTouch }, testInfo) => {
    const trigger = page.getByRole('button', { name: `Explorar ${project.name}`, exact: true })
    if (hasTouch) await trigger.tap()
    else await trigger.click()
    const dialog = page.getByRole('dialog', { name: project.name, exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(project.name)
    await expect(dialog.getByRole('button', { name: 'Cerrar detalles' })).toBeFocused()
    for (const name of ['Problema que busca resolver', 'Objetivos', 'Funcionalidades', 'Tecnologías utilizadas', 'Aspectos técnicos', 'Estado de desarrollo']) {
      await expect(dialog.getByRole('heading', { name, exact: true })).toBeAttached()
    }
    for (const paragraph of project.description.split('\n\n')) await expect(dialog).toContainText(paragraph)
    await expect(dialog).toContainText(project.repositoryNote)
    if (project.featuresNote) await expect(dialog).toContainText(project.featuresNote)
    await expect(dialog.locator('.detail-dialog__tags li')).toHaveCount(project.technologies.length)
    await expect(dialog.locator('.detail-dialog__pending')).toHaveCount(0)
    await expectDialogFits(page, dialog)
    await capture(page, testInfo, `proyecto-${project.cover}.png`, { compare: index === 0 })
    await dialog.evaluate((element) => { element.scrollTop = element.scrollHeight })
    expect(await dialog.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await capture(page, testInfo, `proyecto-${project.cover}-final.png`)
    if (index === 0) await dialog.getByRole('button', { name: 'Cerrar detalles' }).click()
    else if (index === 1) await page.keyboard.press('Escape')
    else await page.mouse.click(4, page.viewportSize().height / 2)
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  })
}

for (const tool of technologies) {
  test(`stack: explorar ${tool.name}${tool.name === 'Vue' ? ' @visual' : ''}`, async ({ page, hasTouch }, testInfo) => {
    const trigger = page.getByRole('button', { name: `Explorar ${tool.name}`, exact: true })
    if (hasTouch) await trigger.tap()
    else await trigger.click()
    const dialog = page.getByRole('dialog', { name: tool.name, exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(tool.description)
    for (const name of ['Para qué la utilizo', 'Experiencia práctica', 'Proyectos en los que la he utilizado', 'Aspectos que me interesan']) {
      await expect(dialog.getByRole('heading', { name, exact: true })).toBeAttached()
    }
    if (tool.usage) await expect(dialog).toContainText(tool.usage)
    for (const paragraph of tool.experience.split('\n\n')) await expect(dialog).toContainText(paragraph)
    for (const name of tool.projects) await expect(dialog).toContainText(name)
    for (const interest of tool.interests) await expect(dialog).toContainText(interest)
    await expect(dialog.locator('.detail-dialog__pending')).toHaveCount(0)
    await expectDialogFits(page, dialog)
    await capture(page, testInfo, `stack-${tool.icon}.png`, { compare: tool.name === 'Vue' })
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}

test('teclado: salto al contenido, Enter, Space, foco modal y Escape', async ({ page }, testInfo) => {
  const skip = page.getByRole('link', { name: 'Saltar al contenido' })
  await page.keyboard.press('Tab')
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page.locator('#top')).toBeFocused()

  for (const [name, key] of [['Second Brain', 'Enter'], ['Vue', 'Space']]) {
    const trigger = page.getByRole('button', { name: `Explorar ${name}`, exact: true })
    await trigger.focus()
    await expect(trigger).toHaveCSS('outline-style', 'solid')
    await capture(page, testInfo, `foco-${key}.png`)
    await page.keyboard.press(key)
    const dialog = page.getByRole('dialog', { name, exact: true })
    const close = dialog.getByRole('button', { name: 'Cerrar detalles' })
    await expect(close).toBeFocused()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    for (const direction of ['Tab', 'Shift+Tab', 'Tab']) {
      await page.keyboard.press(direction)
      expect(await dialog.evaluate((element) => element.contains(document.activeElement)
        || (!document.hasFocus() && [document.body, document.documentElement].includes(document.activeElement))), `Foco en ${name} o en la interfaz del navegador tras ${direction}`).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  }
})

test('diálogo: padding interior, bloqueo de scroll y reinicio al cambiar ficha', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Explorar Second Brain', exact: true })
  await trigger.click()
  const dialog = page.locator('#detail-dialog')
  await expect(dialog).toBeVisible()
  await dialog.click({ position: { x: 4, y: 4 } })
  await expect(dialog).toBeVisible()
  const scroll = await page.evaluate(() => window.scrollY)
  await page.mouse.move(2, 100)
  await page.mouse.wheel(0, 600)
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scroll)
  await dialog.evaluate((element) => { element.scrollTop = element.scrollHeight })
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(scroll)
  await page.getByRole('button', { name: 'Explorar Vue', exact: true }).click()
  await expect(dialog).toHaveAccessibleName('Vue')
  await expect.poll(() => dialog.evaluate((element) => element.scrollTop)).toBe(0)
  await page.keyboard.press('Escape')
})

test('navegación: desplazamiento suave con anclas nativas', async ({ page }, testInfo) => {
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')
  await page.evaluate(() => {
    document.querySelector('.hero .btn').addEventListener('click', () => {
      window.__navigationSamples = new Promise((resolve) => {
        const samples = []
        const started = performance.now()
        const sample = () => {
          samples.push(scrollY)
          if (performance.now() - started < 1300) requestAnimationFrame(sample)
          else resolve(samples)
        }
        requestAnimationFrame(sample)
      })
    }, { once: true })
  })
  await page.locator('.hero').getByRole('link', { name: 'Ver proyectos' }).click()
  const samples = await page.evaluate(() => window.__navigationSamples)
  expect(samples.some((position) => position > 0 && position < samples.at(-1) - 2)).toBe(true)
  await expect(page).toHaveURL(/#proyectos$/)
  await expect(page.locator('#projects-title')).toBeInViewport()
  await testInfo.attach('smooth-scroll.json', { body: JSON.stringify(samples), contentType: 'application/json' })
})

test('navegación: cabecera, anclas e indicador de destino', async ({ page }) => {
  const compact = page.viewportSize().width < 1024
  for (const item of [...navigation, { href: '#contacto', label: 'Contacto' }]) {
    if (compact) await page.getByRole('button', { name: 'Abrir menú de navegación' }).click()
    const scope = compact ? page.locator('#mobile-menu') : page.locator('header')
    const link = scope.getByRole('link', { name: item.label, exact: true, includeHidden: compact })
    await link.click()
    await expect(page).toHaveURL(new RegExp(`${item.href}$`))
    const target = page.locator(item.href)
    await expect(target.getByRole('heading', { level: 2 }).first()).toBeInViewport()
    await expect(link).toHaveAttribute('aria-current', 'location')
    if (compact) {
      await expect(page.locator('#mobile-menu')).toBeHidden()
      await expect(target).toBeFocused()
    }
  }
})

test('navegación: botones principales, perfil, pie y vuelta al inicio', async ({ page }) => {
  await page.locator('header').getByRole('link', { name: 'Contacto', exact: true }).click()
  await expect(page).toHaveURL(/#contacto$/)
  await page.locator('.hero').getByRole('link', { name: 'Ver proyectos' }).click()
  await expect(page).toHaveURL(/#proyectos$/)
  await page.locator('header').getByRole('link', { name: 'Portfolio, inicio' }).click()
  await expect(page).toHaveURL(/#top$/)
  await page.getByRole('link', { name: 'Conoce mi perfil' }).click()
  await expect(page).toHaveURL(/#sobre-mi$/)
  const footer = page.locator('footer')
  for (const item of navigation) {
    await footer.getByRole('navigation', { name: 'Navegación del pie' }).getByRole('link', { name: item.label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${item.href}$`))
    await expect(page.locator(item.href)).toBeInViewport()
  }
  await footer.getByRole('link', { name: 'Ver proyectos' }).click()
  await expect(page).toHaveURL(/#proyectos$/)
  await footer.getByRole('link', { name: 'Volver al inicio' }).click()
  await expect(page).toHaveURL(/#top$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
  await footer.getByRole('link', { name: 'portfolio', exact: true }).click()
  await expect(page).toHaveURL(/#top$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
})

test('enlaces: destinos válidos, GitHub, correo y LinkedIn pendiente', async ({ page, context }) => {
  const links = await page.locator('a[href]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')))
  for (const href of links) {
    expect(href, 'Sin enlaces vacíos').not.toBe('#')
    if (href.startsWith('#')) await expect(page.locator(href)).toHaveCount(1)
    else expect(['https:', 'http:', 'mailto:']).toContain(new URL(href).protocol)
  }
  const github = page.getByRole('link', { name: /^GitHub/ })
  await expect(github).toHaveAttribute('href', 'https://github.com/Crudo27')
  await expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(github).toHaveAttribute('target', '_blank')
  await context.route('https://github.com/Crudo27', (route) => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Destino GitHub de prueba</title>' }))
  const popupPromise = page.waitForEvent('popup')
  await github.click()
  const popup = await popupPromise
  await expect(popup).toHaveURL('https://github.com/Crudo27')
  expect(await popup.evaluate(() => window.opener)).toBeNull()
  await popup.close()

  const email = page.getByRole('link', { name: /^Correo electrónico/ })
  await expect(email).toHaveAttribute('href', 'mailto:gp100805@gmail.com')
  await email.evaluate((element) => element.addEventListener('click', (event) => {
    event.preventDefault()
    window.__e2eMailto = element.href
  }, { once: true }))
  await email.click()
  expect(await page.evaluate(() => window.__e2eMailto)).toBe('mailto:gp100805@gmail.com')
  await expect(page.getByRole('link', { name: /LinkedIn/ })).toHaveCount(0)
  await expect(page.locator('.social-card--pending')).toContainText('Enlace pendiente')
})

test('menú móvil: captura, foco, Escape, cierre y cambio a escritorio @visual', async ({ page }, testInfo) => {
  test.skip(page.viewportSize().width >= 1024, 'El menú modal sólo aparece por debajo de 1024 px.')
  const trigger = page.locator('button[aria-controls="mobile-menu"]')
  const menu = page.locator('#mobile-menu')
  await trigger.click()
  await expect(menu).toBeVisible()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  const close = menu.getByRole('button', { name: 'Cerrar menú', exact: true })
  await expect(close).toBeFocused()
  await expectDialogFits(page, menu)
  await capture(page, testInfo, 'menu-movil.png', { compare: true })
  await page.keyboard.press('Shift+Tab')
  const browserUIFocused = await menu.evaluate(() => !document.hasFocus() && [document.body, document.documentElement].includes(document.activeElement))
  if (!browserUIFocused) await expect(menu.getByRole('link', { name: 'Contacto', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await close.click()
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.setViewportSize({ width: 1024, height: 768 })
  await expect(menu).toBeHidden()
  await expect(page.getByRole('navigation', { name: 'Navegación principal', exact: true })).toBeVisible()
})

test.describe('movimiento reducido desde la carga', () => {
  test.use({ reducedMotion: 'reduce' })

  test('sin desplazamientos animados y con diálogos operativos @visual', async ({ page }, testInfo) => {
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
    await expect(page.locator('.hero h1')).toHaveCSS('animation-name', 'none')
    await expect(page.locator('.hero h1')).toHaveCSS('transform', 'none')
    await expect(page.locator('.portfolio-scene canvas')).toBeVisible()
    await expect(page.locator('.portfolio-scene')).toHaveAttribute('data-frame', '0')
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
    await capture(page, testInfo, 'movimiento-reducido.png', { fullPage: true, compare: true })
    const trigger = page.getByRole('button', { name: 'Explorar Second Brain', exact: true })
    await trigger.hover()
    await expect(page.locator('.project-card').first()).toHaveCSS('transform', 'none')
    await expect(page.locator('.cover-art').first()).toHaveCSS('transform', 'none')
    await trigger.click()
    const dialog = page.locator('#detail-dialog')
    await expect(dialog).toBeVisible()
    expect(await dialog.evaluate((element) => element.getAnimations().length)).toBe(0)
    await dialog.getByRole('button', { name: 'Cerrar detalles' }).click()
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
    if (page.viewportSize().width < 1024) {
      const menuTrigger = page.getByRole('button', { name: 'Abrir menú de navegación' })
      await menuTrigger.click()
      await expect(page.locator('#mobile-menu')).toBeVisible()
      expect(await page.locator('#mobile-menu').evaluate((element) => element.getAnimations().length)).toBe(0)
      await page.keyboard.press('Escape')
      await expect(menuTrigger).toBeFocused()
    }
  })
})

test('movimiento reducido: cambiar la preferencia con un diálogo abierto', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Explorar Vue', exact: true })
  await trigger.click()
  const dialog = page.locator('#detail-dialog')
  await expect(dialog).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => dialog.evaluate((element) => element.getAnimations().length)).toBe(0)
  await expect(page.locator('.hero h1')).toHaveCSS('animation-name', 'none')
  await expect(dialog.getByRole('button', { name: 'Cerrar detalles' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})
