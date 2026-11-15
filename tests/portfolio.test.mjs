import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'
import { createServer } from 'vite'
import { compile, createRenderer, createSSRApp, getCurrentInstance, h, nextTick, ssrContextKey } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { navigation, projects, socialLinks, technologies } from '../src/data/portfolio.js'

test('el portfolio conserva el contenido y la navegación accesible al prerenderizar', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.vue')
    const html = await renderToString(createSSRApp(App))
    const idList = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
    const ids = new Set(idList)

    await t.test('las anclas tienen destinos únicos que pueden recibir el foco', () => {
      assert.equal(ids.size, idList.length, 'Los ids deben ser únicos')
      for (const [, target] of html.matchAll(/\bhref="#([^"]*)"/g)) {
        assert.ok(target && ids.has(target), `El enlace #${target} debe tener un destino real`)
      }
      for (const id of ['top', 'proyectos', 'sobre-mi', 'stack', 'trayectoria', 'contacto']) {
        assert.match(html, new RegExp(`<[^>]+id="${id}"[^>]+tabindex="-1"`), `#${id} debe recibir el foco`)
      }
      assert.equal((html.match(/<h1\b/g) || []).length, 1)
      assert.match(html, /<header[^>]*>\s*<div[^>]*>\s*<a class="skip-link" href="#top"/)
      for (const [, references] of html.matchAll(/\baria-labelledby="([^"]+)"/g)) {
        for (const id of references.split(' ')) assert.ok(ids.has(id), `Falta la etiqueta ${id}`)
      }
    })

    await t.test('cabecera, menú móvil y pie comparten todos los destinos', () => {
      for (const label of ['Navegación principal', 'Navegación móvil', 'Navegación del pie']) {
        const nav = html.match(new RegExp(`<nav[^>]+aria-label="${label}"[^>]*>([\\s\\S]*?)</nav>`))?.[1]
        assert.ok(nav, `Falta ${label}`)
        for (const { href } of navigation) assert.ok(nav.includes(`href="${href}"`))
      }
      assert.match(html, /<dialog[^>]+id="mobile-menu"[^>]+aria-labelledby="menu-title"/)
      assert.doesNotMatch(html, /<dialog[^>]+\bopen(?:\s|=|>)/)
      assert.doesNotMatch(html, /<button[^>]+class="[^"]*menu-button/, 'Sin hidratación no debe haber un botón de menú inoperante')
    })

    await t.test('se conservan los proyectos y las tecnologías confirmadas', () => {
      for (const name of ['Second Brain', 'Vende360', 'Idemne', 'C++', 'Java', 'Python', 'TypeScript', 'Vue', 'Nuxt', 'NestJS', 'SQL']) {
        assert.ok(html.includes(name), `Falta el dato confirmado ${name}`)
      }
      assert.equal((html.match(/class="project-card"/g) || []).length, projects.length)
      assert.doesNotMatch(html, /Ficha en preparación/)
      for (const { summary, statusLabel } of projects) {
        assert.ok(html.includes(summary))
        assert.ok(html.includes(statusLabel))
      }
      assert.equal((html.match(/class="tool-row"/g) || []).length, technologies.length)
      assert.ok(html.includes(`Una selección de ${projects.length} proyectos`))
      for (const { name } of projects) assert.ok(html.includes(`Portada conceptual provisional de ${name};`))
    })

    await t.test('los datos pendientes se identifican y no simulan acciones', () => {
      assert.equal((html.match(/class="project-status"/g) || []).length, 3)
      assert.ok(html.includes('Enlace pendiente'))
      assert.ok(html.includes('Este espacio se completará con experiencia confirmada.'))
      const configured = new Set(socialLinks.map(({ href }) => href).filter(Boolean))
      for (const [, href] of html.matchAll(/href="((?:https?:|mailto:)[^"]*)"/g)) assert.ok(configured.has(href), `Destino sin configurar: ${href}`)
      assert.doesNotMatch(html, /href="#"/)
      assert.doesNotMatch(html, /<form\b/)
    })

    await t.test('los proyectos y tecnologías ofrecen controles nativos con destino de diálogo', () => {
      assert.match(html, /<h1 id="hero-title">Gian Piero<br><em>Rodríguez\.<\/em><\/h1>/)
      for (const { name } of [...projects, ...technologies]) {
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        assert.match(html, new RegExp(`<button[^>]+type="button"[^>]+aria-haspopup="dialog"[^>]+aria-controls="detail-dialog"[^>]+aria-label="Explorar ${escaped}"`))
      }
      assert.match(html, /<dialog[^>]+id="detail-dialog"[^>]+aria-labelledby="detail-title"/)
      assert.match(html, /<p class="sr-only about-statement-readable">Estudio Ingeniería de Sistemas y me especializo en desarrollo de software\.<\/p>/)
      assert.match(html, /<p class="mo-wh__text about-statement" aria-hidden="true">/)
    })

    await t.test('todos los iconos utilizados existen localmente', async () => {
      for (const [, asset] of html.matchAll(/\bsrc="(\/assets\/[^"?]+)"/g)) await access(`public${asset}`)
    })

    await t.test('Escape no alcanza el controlador heredado y conserva su acción predeterminada', async () => {
      const source = await readFile('src/components/SiteHeader.vue', 'utf8')
      const opening = source.match(/<header\b[^>]*>/)[0]
      const header = compile(opening + '</header>')({ menuReady: true }, [])
      let prevented = false
      let stopped = false
      const event = {
        key: 'Escape',
        stopPropagation() { stopped = true },
        preventDefault() { prevented = true },
      }
      assert.equal(typeof header.props.onKeydown, 'function')
      header.props.onKeydown(event)
      assert.equal(stopped, true, 'Escape no debe alcanzar el controlador heredado que quita el foco')
      assert.equal(prevented, false, 'No se debe impedir la cancelación nativa del diálogo')
      stopped = false
      header.props.onKeydown({ ...event, key: 'Tab' })
      assert.equal(stopped, false, 'Las demás teclas mantienen su comportamiento')
    })

    await t.test('el menú conserva el estado y el foco durante las transiciones', async (t) => {
      const { default: SiteHeader } = await server.ssrLoadModule('/src/components/SiteHeader.vue')
      const originalWindow = globalThis.window
      const originalDocument = globalThis.document
      const desktopListeners = new Set()
      const reducedListeners = new Set()
      const hashListeners = new Set()
      const desktop = {
        addEventListener: (_, listener) => desktopListeners.add(listener),
        removeEventListener: (_, listener) => desktopListeners.delete(listener),
      }
      const reduced = {
        matches: false,
        addEventListener: (_, listener) => reducedListeners.add(listener),
        removeEventListener: (_, listener) => reducedListeners.delete(listener),
      }
      const animations = []
      let focused = false
      let modalOpens = 0
      let failAnimation = false
      const dialog = {
        open: false,
        showModal() { this.open = true; modalOpens++ },
        close() { this.open = false },
        animate(keyframes, options) {
          if (failAnimation) throw new Error('Animación no disponible')
          let resolve, reject
          const finished = new Promise((yes, no) => { resolve = yes; reject = no })
          const animation = {
            keyframes, options, finished, cancelled: false,
            finish: () => resolve(),
            cancel() { this.cancelled = true; reject(new Error('Animación cancelada')) },
          }
          animations.push(animation)
          return animation
        },
      }
      globalThis.window = {
        location: { hash: '' },
        matchMedia: (query) => query.includes('reduced-motion') ? reduced : desktop,
        addEventListener: (_, listener) => hashListeners.add(listener),
        removeEventListener: (_, listener) => hashListeners.delete(listener),
        getComputedStyle: () => ({
          opacity: '.5', transform: 'matrix(1, 0, 0, 1, 0, 4)',
          getPropertyValue: (name) => ({
            '--m-panel': '200ms', '--m-close': '120ms', '--m-ease': 'cubic-bezier(.2, .8, .2, 1)',
          })[name] || '',
        }),
      }
      globalThis.document = {
        documentElement: { dataset: {} },
        querySelector: (selector) => {
          assert.equal(selector, '#proyectos')
          return { focus: (options) => { assert.equal(options.preventScroll, true); focused = true } }
        },
      }

      // El host en memoria prueba Vue y promesas WAAPI; no sustituye el foco nativo ni el renderizado.
      const renderer = createRenderer({
        createElement: () => dialog,
        insert() {},
        remove() {},
        patchProp() {},
        parentNode: () => null,
        nextSibling: () => null,
      })
      const app = renderer.createApp({
        ...SiteHeader,
        render() {
          const instance = getCurrentInstance()
          return h('dialog', { ref: (element) => { instance.setupState.menu = element } })
        },
      })
      app.provide(ssrContextKey, {})
      try {
        app.mount({})
        await nextTick()
        const state = app._instance.setupState
        const pointer = { detail: 1 }
        const keyboard = { detail: 0 }
        assert.equal(state.menuReady, true)

        await t.test('el teclado abre y cierra al instante, sin aperturas duplicadas', () => {
          state.openMenu(keyboard)
          state.openMenu(keyboard)
          assert.equal(modalOpens, 1)
          assert.equal(state.menuOpen, true)
          assert.equal(animations.length, 0)
          state.closeMenu(keyboard)
          assert.equal(dialog.open, false)
          assert.equal(state.menuOpen, false)
        })

        await t.test('el puntero puede invertir una salida desde el estado visible actual', async () => {
          state.openMenu(pointer)
          assert.equal(animations.at(-1).options.duration, 200)
          assert.equal(animations.at(-1).options.easing, 'cubic-bezier(.2, .8, .2, 1)')
          state.closeMenu(pointer)
          const exit = animations.at(-1)
          assert.equal(exit.options.duration, 120)
          assert.equal(exit.keyframes[0].opacity, '.5')
          assert.equal(exit.keyframes[0].transform, 'matrix(1, 0, 0, 1, 0, 4)')
          assert.equal(dialog.open, true, 'El diálogo mantiene su modalidad hasta terminar la salida')
          state.openMenu(pointer)
          assert.equal(exit.cancelled, true)
          exit.finish()
          animations.at(-1).finish()
          await Promise.resolve()
          assert.equal(dialog.open, true, 'Una salida cancelada no debe cerrar el menú reabierto')
          assert.equal(state.menuOpen, true)
          state.closeMenu(pointer)
          animations.at(-1).finish()
          await Promise.resolve()
          assert.equal(dialog.open, false)
          assert.equal(state.menuOpen, false)
        })

        await t.test('navegar durante la salida cancela la espera y entrega el foco', async () => {
          state.openMenu(pointer)
          state.closeMenu(pointer)
          const exit = animations.at(-1)
          state.navigate({ currentTarget: { hash: '#proyectos' } })
          assert.equal(exit.cancelled, true)
          assert.equal(dialog.open, false)
          assert.equal(state.menuOpen, false)
          assert.equal(focused, true)
          exit.finish()
          await Promise.resolve()
          assert.equal(dialog.open, false)
        })

        await t.test('la preferencia de movimiento reducido se aplica incluso durante una transición', () => {
          state.openMenu(pointer)
          const entry = animations.at(-1)
          reduced.matches = true
          for (const listener of reducedListeners) listener({ matches: true })
          assert.equal(entry.cancelled, true)
          assert.equal(dialog.open, true)
          const count = animations.length
          state.closeMenu(pointer)
          assert.equal(dialog.open, false)
          state.openMenu(pointer)
          assert.equal(animations.length, count)
          reduced.matches = false
          state.closeMenu(pointer)
          const exit = animations.at(-1)
          reduced.matches = true
          for (const listener of reducedListeners) listener({ matches: true })
          assert.equal(exit.cancelled, true)
          assert.equal(dialog.open, false)
          reduced.matches = false
        })

        await t.test('sin WAAPI, con motion desactivado o con un fallo de animación el menú sigue funcionando', () => {
          const animate = dialog.animate
          dialog.animate = undefined
          state.openMenu(pointer)
          state.closeMenu(pointer)
          assert.equal(dialog.open, false)
          dialog.animate = animate
          document.documentElement.dataset.motion = 'off'
          const count = animations.length
          state.openMenu(pointer)
          state.closeMenu(pointer)
          assert.equal(animations.length, count)
          delete document.documentElement.dataset.motion
          failAnimation = true
          state.openMenu(pointer)
          assert.equal(dialog.open, true)
          state.closeMenu(pointer)
          assert.equal(dialog.open, false)
          assert.equal(state.menuOpen, false)
          failAnimation = false
        })

        await t.test('el cierre nativo y el cambio a escritorio cancelan animaciones pendientes', () => {
          state.openMenu(pointer)
          const entry = animations.at(-1)
          dialog.close()
          state.onMenuClosed()
          assert.equal(entry.cancelled, true)
          assert.equal(state.menuOpen, false)
          state.openMenu(keyboard)
          state.onMenuClosed()
          assert.equal(dialog.open, true, 'Un evento close anterior no debe cerrar un diálogo ya reabierto')
          state.closeMenu(pointer)
          const exit = animations.at(-1)
          for (const listener of desktopListeners) listener({ matches: true })
          assert.equal(exit.cancelled, true)
          assert.equal(dialog.open, false)
        })

        await t.test('el indicador sigue el fragmento y permite volver a un estado sin sección elegida', () => {
          window.location.hash = '#contacto'
          for (const listener of hashListeners) listener()
          assert.equal(state.activeHash, '#contacto')
          window.location.hash = ''
          for (const listener of hashListeners) listener()
          assert.equal(state.activeHash, '')
        })

        state.openMenu(pointer)
      } finally {
        app.unmount()
        if (originalWindow === undefined) delete globalThis.window
        else globalThis.window = originalWindow
        if (originalDocument === undefined) delete globalThis.document
        else globalThis.document = originalDocument
        assert.equal(desktopListeners.size + reducedListeners.size + hashListeners.size, 0)
        assert.equal(animations.at(-1).cancelled, true, 'Desmontar debe cancelar la animación activa')
        assert.equal(dialog.open, false, 'Desmontar debe cerrar el diálogo antes de perder su referencia')
      }
    })
  } finally {
    await server.close()
  }
})
