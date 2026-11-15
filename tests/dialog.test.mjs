import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { createServer } from 'vite'
import { compile, createRenderer, createSSRApp, getCurrentInstance, h, nextTick, ssrContextKey } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { projects, technologies } from '../src/data/portfolio.js'

test('el diálogo de detalles conserva selección, cierre, enlaces seguros y limpieza', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
  const originalWindow = globalThis.window
  const originalDocument = globalThis.document
  const listeners = new Set()
  const animations = []
  let focusReturns = 0
  const opener = { isConnected: true, focus: (options) => { assert.equal(options.preventScroll, true); focusReturns++ } }
  const reduced = {
    matches: false,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  }
  const dialog = {
    open: false,
    scrollTop: 100,
    showModal() { this.open = true },
    close() { this.open = false },
    getBoundingClientRect: () => ({ left: 100, top: 100, right: 500, bottom: 700 }),
    animate(keyframes, options) {
      let resolve, reject
      const finished = new Promise((yes, no) => { resolve = yes; reject = no })
      const animation = {
        keyframes, options, finished, cancelled: false,
        finish: () => resolve(),
        cancel() { this.cancelled = true; reject(new Error('Cancelada')) },
      }
      animations.push(animation)
      return animation
    },
  }
  globalThis.window = {
    matchMedia: () => reduced,
    getComputedStyle: () => ({
      opacity: '.5', transform: 'matrix(1, 0, 0, 1, 0, 4)',
      getPropertyValue: (name) => ({ '--m-panel': '200ms', '--m-close': '120ms', '--m-ease': 'cubic-bezier(.2, .8, .2, 1)' })[name],
    }),
  }
  globalThis.document = { activeElement: opener, documentElement: { dataset: {} } }
  let app
  try {
    const { default: DetailDialog } = await server.ssrLoadModule('/src/components/DetailDialog.vue')
    // Host en memoria: comprueba lógica Vue, no modalidad ni foco nativo del navegador.
    const renderer = createRenderer({
      createElement: () => dialog,
      insert() {}, remove() {}, patchProp() {},
      parentNode: () => null, nextSibling: () => null,
    })
    app = renderer.createApp({
      ...DetailDialog,
      render() {
        const instance = getCurrentInstance()
        return h('dialog', { ref: (element) => { instance.setupState.dialog = element } })
      },
    })
    app.provide(ssrContextKey, {})
    app.mount({})
    await nextTick()
    const state = app._instance.setupState
    const api = app._instance.exposed

    await t.test('cada apertura selecciona el contenido actual y reinicia el desplazamiento', async () => {
      await api.open({ kind: 'project', name: 'Second Brain' }, { detail: 1, currentTarget: opener })
      assert.equal(dialog.open, true)
      assert.equal(dialog.scrollTop, 0)
      assert.equal(state.selected.name, 'Second Brain')
      assert.deepEqual(state.sections.map(({ title }) => title), [
        'Problema que busca resolver', 'Objetivos', 'Funcionalidades', 'Tecnologías utilizadas', 'Aspectos técnicos', 'Estado de desarrollo',
      ])
      assert.ok(state.sections.every((section) => !section.text && !section.items?.length), 'Los datos pendientes no deben inventarse')
      assert.equal(animations.at(-1).options.duration, 200)
      state.close()
      state.onClose()
      assert.equal(dialog.open, false)
      assert.equal(focusReturns, 1)

      await api.open({ kind: 'technology', name: 'Vue', usage: 'Uso confirmado', projects: ['Proyecto confirmado'], interests: ['Composición'] }, { detail: 0, currentTarget: opener })
      assert.equal(state.selected.name, 'Vue')
      assert.equal(state.sections[0].text, 'Uso confirmado')
      assert.deepEqual(state.sections[2].items, ['Proyecto confirmado'])
      assert.deepEqual(state.sections[3].items, ['Composición'])
      assert.equal(animations.length, 1, 'El teclado no debe iniciar una animación')
    })

    await t.test('las once fichas renderizan todos sus apartados y devuelven el foco al cerrar', async () => {
      const source = await readFile('src/components/DetailDialog.vue', 'utf8')
      const render = compile(source.match(/<template>([\s\S]*?)<\/template>\s*$/)[1])
      const { default: ArrowIcon } = await server.ssrLoadModule('/src/components/ArrowIcon.vue')
      for (const entry of [...projects.map((project) => ({ ...project, kind: 'project' })), ...technologies.map((tool) => ({ ...tool, kind: 'technology' }))]) {
        await api.open(entry, { detail: 0, currentTarget: opener })
        const html = await renderToString(createSSRApp({ components: { ArrowIcon }, render: () => render(state, []) }))
        assert.doesNotMatch(html, /Descripción ampliada por confirmar|>Por confirmar\.<|Repositorio y demostración por confirmar/)
        for (const paragraph of entry.description.split('\n\n')) assert.ok(html.includes(paragraph), entry.name)
        for (const section of state.sections) {
          assert.ok(html.includes(section.title))
          const text = section.text?.split('\n\n') || section.items || section.paragraphs
          assert.ok(text?.length, `${entry.name}: ${section.title} completo`)
          for (const item of text) assert.ok(html.includes(item), `${entry.name}: ${item}`)
          if (section.note) assert.ok(html.indexOf(section.note) < html.indexOf(section.items[0]), 'El alcance planificado/parcial se explica antes de las funciones')
        }
        if (entry.kind === 'project') {
          assert.ok(html.includes(entry.repositoryNote))
          assert.match(html, /class="detail-dialog__tags" role="list"/)
        }
        const before = focusReturns
        state.close()
        state.onClose()
        assert.equal(dialog.open, false)
        assert.equal(focusReturns, before + 1)
      }
    })

    await t.test('los enlaces incompletos o con protocolos ejecutables no se muestran', async () => {
      await api.open({ kind: 'project', name: 'Vende360', links: [
        { label: 'Repositorio', href: 'https://github.com/ejemplo/proyecto' },
        { label: 'Inseguro', href: 'javascript:alert(1)' },
        { label: 'Pendiente', href: '' },
        { label: 'Inválido', href: 'no-es-una-url' },
      ] })
      assert.deepEqual(state.links.map(({ label }) => label), ['Repositorio'])
      assert.equal(state.links[0].external, true)
      state.close()
      state.onClose()
    })

    await t.test('pulsar dentro del padding mantiene el diálogo y pulsar fuera lo cierra', async () => {
      await api.open({ kind: 'project', name: 'Idemne' }, { detail: 0, currentTarget: opener })
      state.onBackdropClick({ detail: 1, clientX: 110, clientY: 110 })
      assert.equal(dialog.open, true, 'El padding pertenece al diálogo')
      state.onBackdropClick({ detail: 1, clientX: 100, clientY: 100 })
      assert.equal(dialog.open, true, 'El borde también pertenece al diálogo')
      state.onBackdropClick({ detail: 1, clientX: 99, clientY: 110 })
      assert.equal(animations.at(-1).options.duration, 120)
      animations.at(-1).finish()
      await Promise.resolve()
      assert.equal(dialog.open, false)
      state.onClose()
    })

    await t.test('Escape se detiene sin impedir la cancelación nativa y otras teclas conservan su recorrido', async () => {
      const source = await readFile('src/components/DetailDialog.vue', 'utf8')
      const opening = source.match(/<dialog\b[^>]*>/)[0]
      const vnode = compile(opening + '</dialog>')({ close() {}, onClose() {}, onBackdropClick() {}, dialog }, [])
      let prevented = false
      let stopped = false
      vnode.props.onKeydown({ key: 'Escape', stopPropagation() { stopped = true }, preventDefault() { prevented = true } })
      assert.equal(stopped, true)
      assert.equal(prevented, false)
      stopped = false
      vnode.props.onKeydown({ key: 'Tab', stopPropagation() { stopped = true } })
      assert.equal(stopped, false)
      let cancelled = false
      const cancelNode = compile(opening + '</dialog>')({ close() { cancelled = true }, onClose() {}, onBackdropClick() {}, dialog }, [])
      cancelNode.props.onCancel({ preventDefault() {} })
      assert.equal(cancelled, true)
    })

    await t.test('el cambio a movimiento reducido interrumpe la salida y no intenta enfocar un disparador eliminado', async () => {
      await api.open({ kind: 'technology', name: 'SQL' }, { detail: 1, currentTarget: opener })
      state.close({ detail: 1 })
      const exit = animations.at(-1)
      assert.equal(exit.options.duration, 120)
      reduced.matches = true
      for (const listener of listeners) listener({ matches: true })
      assert.equal(exit.cancelled, true)
      assert.equal(dialog.open, false)
      opener.isConnected = false
      const before = focusReturns
      state.onClose()
      assert.equal(focusReturns, before)
      reduced.matches = false
    })

    await api.open({ kind: 'project', name: 'Idemne' }, { detail: 1 })
    app.unmount()
    app = null
    assert.equal(dialog.open, false)
    assert.equal(animations.at(-1).cancelled, true)
    assert.equal(listeners.size, 0)
    await api.open({ kind: 'project', name: 'Después de desmontar' })
    assert.equal(dialog.open, false, 'Una apertura pendiente no debe actuar sobre una referencia desmontada')
  } finally {
    app?.unmount()
    await server.close()
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
    if (originalDocument === undefined) delete globalThis.document
    else globalThis.document = originalDocument
  }
})
