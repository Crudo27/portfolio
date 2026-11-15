<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({ src: { type: String, required: true }, kind: { type: String, required: true } })
const root = ref(null), host = ref(null), ready = ref(false), failed = ref(false), presence = ref(0), paused = ref(false)
const controller = new AbortController()
let raf = 0, disposed = false, observer, clearance
const clamp = (value) => Math.max(0, Math.min(1, value))
function protectText() {
  const svg = host.value.querySelector('svg')
  const matrix = svg?.getScreenCTM()?.inverse()
  if (!matrix || !clearance) return
  const bounds = svg.getBoundingClientRect(), holes = []
  for (const element of document.querySelectorAll('main h2, main h3, main p, .project-status, .tool-copy, footer h2, footer p, .btn')) {
    const box = element.getBoundingClientRect()
    if (box.right < bounds.left || box.left > bounds.right || box.bottom < bounds.top || box.top > bounds.bottom) continue
    const range = document.createRange()
    range.selectNodeContents(element)
    for (const rect of range.getClientRects()) {
      const x = (rect.left - 4) * matrix.a + matrix.e, y = (rect.top - 3) * matrix.d + matrix.f
      const width = (rect.width + 8) * matrix.a, height = (rect.height + 6) * matrix.d
      holes.push(`M${x},${y}h${width}v${height}h${-width}Z`)
    }
  }
  const path = holes.join('')
  if (clearance.getAttribute('d') !== path) clearance.setAttribute('d', path)
}
function update() {
  raf = 0
  const section = document.querySelector(props.kind === 'projects' ? '#proyectos' : '#stack')
  if (!section) return
  const rect = section.getBoundingClientRect()
  presence.value = clamp((window.innerHeight * .65 - rect.top) / (window.innerHeight * .3)) * clamp(rect.bottom / (window.innerHeight * .35))
  if (presence.value > 0 && ready.value) protectText()
}
function schedule() { if (!disposed && !raf) raf = window.requestAnimationFrame(update) }
function visibility() { paused.value = document.hidden; if (!paused.value) schedule() }

onMounted(async () => {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  document.addEventListener('visibilitychange', visibility)
  if (window.ResizeObserver) { observer = new window.ResizeObserver(schedule); observer.observe(document.body) }
  visibility()
  try {
    const response = await fetch(props.src, { signal: controller.signal })
    if (!response.ok) throw new Error(`SVG ${response.status}`)
    const document = new DOMParser().parseFromString(await response.text(), 'image/svg+xml')
    const svg = document.documentElement
    if (document.querySelector('parsererror, script, foreignObject') || svg.localName !== 'svg') throw new Error('SVG inválido')
    for (const element of svg.querySelectorAll('*')) {
      if ([...element.attributes].some(({ name, value }) => /^on/i.test(name) || /href$/i.test(name) && !value.startsWith('#'))) throw new Error('SVG externo no permitido')
    }
    if (disposed) return
    svg.removeAttribute('role'); svg.removeAttribute('aria-label')
    svg.setAttribute('aria-hidden', 'true')
    const artwork = svg.querySelector('g[transform]')
    artwork?.removeAttribute('transform')
    const star = props.kind === 'projects'
    svg.setAttribute('viewBox', star ? '970 95 440 410' : '835 95 715 470')
    if (star) {
      artwork.querySelector('g[stroke="#719bcf"]')?.remove()
      const paths = artwork.querySelectorAll(':scope > path')
      paths.forEach((path, index) => {
        path.classList.add(index === 0 ? 'scene-outline' : 'scene-connections', 'scene-trace')
        path.setAttribute('pathLength', '1')
        path.setAttribute('stroke', '#55B5FF'); path.setAttribute('stroke-opacity', index ? '.7' : '1')
        path.setAttribute('stroke-width', index ? '1.8' : '3')
        path.style.setProperty('--delay', index ? '180ms' : '0ms')
      })
      artwork.querySelectorAll('g[fill="#9fc9ff"] circle').forEach((node, index) => {
        node.classList.add('scene-node')
        node.setAttribute('fill', '#BDEAFF')
        node.style.setProperty('--node-opacity', node.getAttribute('opacity') || '1')
        node.style.setProperty('--delay', `${(index < 10 ? Math.floor(index / 2) : index - 5) * 150}ms`)
      })
    } else {
      svg.querySelectorAll('linearGradient stop').forEach((stop, index) => stop.setAttribute('stop-color', ['#92722A', '#D4AF37', '#F4D77A'][index]))
      svg.querySelectorAll('rect').forEach((rect, index) => {
        rect.classList.add('scene-trace', 'scene-construction')
        rect.setAttribute('pathLength', '1'); rect.setAttribute('stroke', '#D4AF37'); rect.setAttribute('stroke-opacity', '.75')
        rect.style.setProperty('--delay', `${index * 65}ms`)
      })
      artwork.querySelectorAll('g[stroke]').forEach((group) => {
        group.setAttribute('stroke', '#92722A')
        if (group.querySelector('rect')) group.setAttribute('stroke-opacity', '.85')
      })
      const spiral = artwork.querySelector(':scope > path')
      spiral.classList.add('scene-trace', 'scene-spiral')
      spiral.setAttribute('pathLength', '1'); spiral.setAttribute('stroke-opacity', '1')
      spiral.style.setProperty('--delay', '1100ms')
      artwork.querySelectorAll('circle').forEach((node, index) => {
        node.classList.add('scene-node'); node.setAttribute('fill', '#F4D77A'); node.setAttribute('r', '3.5')
        node.style.setProperty('--delay', `${700 + index * 80}ms`)
      })
      artwork.querySelector('text')?.setAttribute('fill', '#F4D77A')
    }
    const ns = 'http://www.w3.org/2000/svg'
    const mask = document.createElementNS(ns, 'mask')
    mask.id = `scene-clear-${props.kind}`
    mask.setAttribute('maskUnits', 'userSpaceOnUse')
    const [x, y, width, height] = svg.getAttribute('viewBox').split(' ')
    for (const [name, value] of Object.entries({ x, y, width, height })) mask.setAttribute(name, value)
    const ground = document.createElementNS(ns, 'rect')
    for (const [name, value] of Object.entries({ x, y, width, height, fill: 'white' })) ground.setAttribute(name, value)
    clearance = document.createElementNS(ns, 'path')
    clearance.classList.add('scene-clearance'); clearance.setAttribute('fill', 'black')
    mask.append(ground, clearance)
    const definitions = document.createElementNS(ns, 'defs')
    definitions.appendChild(mask); svg.appendChild(definitions)
    artwork.setAttribute('mask', `url(#${mask.id})`)
    host.value.appendChild(svg)
    svg.getBoundingClientRect()
    ready.value = true
    schedule()
  } catch {
    if (!disposed) failed.value = true
  }
})
onBeforeUnmount(() => {
  disposed = true; controller.abort(); observer?.disconnect()
  window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule)
  document.removeEventListener('visibilitychange', visibility)
  if (raf) window.cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="scene-overlay" :class="{ 'is-active': presence > 0 && ready }" :style="{ opacity: presence }" :data-overlay="kind" :data-ready="ready" :data-paused="paused" :data-source="src" aria-hidden="true" inert>
    <div ref="host" class="scene-overlay__drawing"></div>
    <img v-if="failed" :src="src" width="1600" height="900" alt="" />
  </div>
</template>

<style scoped>
.scene-overlay { --geometry-opacity: 1; --trace-ms: 1200ms; position: absolute; inset: 0; pointer-events: none; }
.scene-overlay__drawing { position: absolute; left: 42%; top: var(--nav); width: clamp(260px, 24vw, 420px); height: min(26svh, 260px); opacity: var(--geometry-opacity); }
.scene-overlay[data-overlay="stack"] .scene-overlay__drawing { left: 28%; top: calc(var(--nav) + 100px); width: clamp(320px, 32vw, 600px); height: min(23svh, 240px); }
@media (max-width: 1023px) {
  .scene-overlay__drawing, .scene-overlay[data-overlay="stack"] .scene-overlay__drawing { left: auto; right: var(--edge); top: calc(var(--nav) + 16px); width: min(60vw, 360px); height: min(27svh, 260px); }
}
@media (max-width: 639px) {
  .scene-overlay[data-overlay="stack"] .scene-overlay__drawing { left: var(--edge); right: auto; top: calc(var(--nav) + 37svh); }
}
@media (max-width: 359px) {
  .scene-overlay[data-overlay="stack"] .scene-overlay__drawing { top: calc(var(--nav) + 48svh); }
}
.scene-overlay :deep(svg), .scene-overlay > img { width: 100%; height: 100%; object-fit: contain; }
.scene-overlay :deep(.scene-trace) { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 250ms var(--m-ease); }
.scene-overlay.is-active :deep(.scene-trace) { stroke-dashoffset: 0; transition-duration: var(--trace-ms); transition-delay: var(--delay); }
.scene-overlay.is-active :deep(.scene-construction) { transition-duration: 450ms; }
.scene-overlay :deep(.scene-node) { opacity: 0; transition: opacity 250ms var(--m-ease); }
.scene-overlay.is-active :deep(.scene-node) { opacity: var(--node-opacity, 1); transition-delay: var(--delay); }
.scene-overlay[data-overlay="projects"] :deep(svg) { filter: drop-shadow(0 0 5px rgb(64 164 255 / .25)); }
.scene-overlay[data-overlay="stack"] :deep(svg) { filter: drop-shadow(0 0 4px rgb(212 175 55 / .3)); }
.scene-overlay.is-active :deep(.scene-outline), .scene-overlay.is-active :deep(.scene-spiral) { animation: geometry-glow 4s cubic-bezier(.45, 0, .55, 1) 2200ms 1; }
@keyframes geometry-glow { 0%, 100% { opacity: 1; } 50% { opacity: .94; } }
.scene-overlay[data-paused="true"] :deep(*), :global(body:has(dialog[open])) .scene-overlay :deep(*) { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .scene-overlay :deep(*) { transition: none !important; animation: none !important; }
  .scene-overlay :deep(.scene-trace) { stroke-dashoffset: 0; }
  .scene-overlay :deep(.scene-node) { opacity: var(--node-opacity, 1); }
}
:global(html[data-motion="off"]) .scene-overlay :deep(*) { transition: none !important; animation: none !important; stroke-dashoffset: 0; }
</style>
