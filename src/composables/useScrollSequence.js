import { onBeforeUnmount, onMounted, ref } from 'vue'
import { assetUrl } from '../assetUrl.js'

export const sequenceSettings = {
  cacheLimit: 12,
  prefetchRadius: 3,
  concurrentLoads: 3,
  maxDpr: 1.5,
  mobileQuery: '(max-width: 720px), (max-aspect-ratio: 3/4)',
}
export const sequenceSections = [
  { key: 'hero', selector: '.hero' },
  { key: 'projects', selector: '#proyectos' },
  { key: 'stack', selector: '#stack' },
  { key: 'contact', selector: '#contacto' },
]

export function frameAtScroll(anchors, y, reduced = false) {
  if (!anchors.length) return 0
  // El navegador redondea scrollY, mientras que los topes DOM pueden tener fracciones.
  const position = reduced ? y + .5 : y
  let previous = anchors[0]
  for (const next of anchors.slice(1)) {
    if (position < next.top) {
      if (reduced || y <= previous.top) return previous.frame
      return Math.round(previous.frame + (next.frame - previous.frame) * (y - previous.top) / Math.max(1, next.top - previous.top))
    }
    previous = next
  }
  return previous.frame
}

// La cola se sustituye en cada petición: un salto no descarga todo el camino intermedio.
export function createFrameCache(manifest, onReady, ImageClass = Image) {
  const decoded = new Map(), pending = new Map(), failed = new Set()
  let variant = '', generation = 0, wanted = [], disposed = false
  const keyFor = (index) => `${variant}:${index}`
  function get(index) {
    const key = keyFor(index), image = decoded.get(key)
    if (image) { decoded.delete(key); decoded.set(key, image) }
    return image
  }
  function cancelPending() {
    for (const image of pending.values()) { image.onload = image.onerror = null; image.src = '' }
    pending.clear()
  }
  function pump() {
    if (disposed) return
    for (const index of wanted) {
      const key = keyFor(index)
      if (pending.size >= sequenceSettings.concurrentLoads) break
      if (decoded.has(key) || pending.has(key) || failed.has(key)) continue
      const image = new ImageClass(), token = generation
      pending.set(key, image)
      image.decoding = 'async'
      const finish = async (loaded) => {
        image.onload = image.onerror = null
        try {
          if (!loaded) throw new Error('Fotograma no disponible')
          if (disposed || token !== generation) return
          await image.decode?.()
          if (disposed || token !== generation) return
          decoded.set(key, image)
          while (decoded.size > sequenceSettings.cacheLimit) decoded.delete(decoded.keys().next().value)
          if (index === wanted[0]) onReady()
        } catch {
          if (!disposed && token === generation) failed.add(key)
        } finally {
          if (pending.get(key) === image) pending.delete(key)
          pump()
        }
      }
      image.onload = () => finish(true)
      image.onerror = () => finish(false)
      image.src = assetUrl(`portfolio-scroll/${manifest[variant].path}/${manifest.frameName.replace('%03d', String(index).padStart(3, '0'))}`)
    }
  }
  return {
    get,
    request(index, nextVariant, reduced = false, direction = 1) {
      if (disposed) return
      if (variant !== nextVariant) {
        variant = nextVariant; generation++; decoded.clear(); failed.clear(); cancelPending()
      }
      if (index !== wanted[0]) failed.delete(keyFor(index))
      wanted = [index]
      if (!reduced) {
        for (let distance = 1; distance <= sequenceSettings.prefetchRadius; distance++) {
          for (const delta of [distance * direction, -distance * direction]) {
            const neighbor = index + delta
            if (neighbor >= 0 && neighbor < manifest.frameCount) wanted.push(neighbor)
          }
        }
      }
      pump()
    },
    get size() { return decoded.size },
    get loading() { return pending.size },
    retryFailed() { if (!disposed) { failed.clear(); pump() } },
    dispose() {
      disposed = true; generation++; wanted = []; decoded.clear(); failed.clear()
      cancelPending()
    },
  }
}

export function useScrollSequence(root, canvas, emit) {
  const frame = ref(0), targetFrame = ref(0), ready = ref(false), reduced = ref(false), variant = ref('desktop')
  const error = ref('')
  let manifest, context, cache, observer, motionQuery, mobileQuery
  let raf = 0, disposed = false, measure = true, previousY = 0, lastDrawable, anchors = []
  const cleanups = [], controller = new AbortController()
  function schedule() {
    if (disposed || raf || !manifest || document.hidden) return
    raf = window.requestAnimationFrame(render)
  }
  function invalidate() { measure = true; schedule() }
  function render() {
    raf = 0
    if (disposed) return
    reduced.value = motionQuery.matches || document.documentElement.dataset.motion === 'off'
    variant.value = mobileQuery.matches ? 'mobile' : 'desktop'
    const y = window.scrollY
    if (measure) {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      anchors = sequenceSections.map(({ key, selector }) => {
        const element = document.querySelector(selector)
        return element ? { frame: manifest.keyframes[key], top: Math.min(maxScroll, element.getBoundingClientRect().top + y) } : null
      }).filter(Boolean)
      measure = false
    }
    targetFrame.value = frameAtScroll(anchors, y, reduced.value)
    cache.request(targetFrame.value, variant.value, reduced.value, y < previousY ? -1 : 1)
    previousY = y
    const drawable = cache.get(targetFrame.value)
    const image = drawable || lastDrawable
    const el = canvas.value
    const dpr = Math.min(sequenceSettings.maxDpr, window.devicePixelRatio || 1)
    const width = Math.max(1, Math.round(root.value.clientWidth * dpr))
    const height = Math.max(1, Math.round(root.value.clientHeight * dpr))
    const resized = el.width !== width || el.height !== height
    if (image && (resized || drawable && (frame.value !== targetFrame.value || lastDrawable !== image))) {
      if (resized) { el.width = width; el.height = height }
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const w = image.naturalWidth * scale, h = image.naturalHeight * scale
      context.drawImage(image, (width - w) / 2, height - h, w, h)
      lastDrawable = image
      if (drawable) frame.value = targetFrame.value
      ready.value = true
    }
    root.value.dataset.cacheSize = String(cache.size)
    root.value.dataset.loading = String(cache.loading)
  }
  function listen(target, event, handler, options) {
    target.addEventListener(event, handler, options)
    cleanups.push(() => target.removeEventListener(event, handler, options))
  }
  onMounted(async () => {
    context = canvas.value.getContext('2d', { alpha: false })
    if (!context) { error.value = 'canvas'; return }
    try {
      const response = await fetch(assetUrl('portfolio-scroll/scroll-manifest.json'), { signal: controller.signal })
      if (!response.ok) throw new Error('Manifiesto no disponible')
      manifest = await response.json()
      if (manifest.frameCount !== 80 || manifest.frameName !== '%03d.webp'
        || manifest.desktop.path !== 'frames/desktop' || manifest.mobile.path !== 'frames/mobile'
        || manifest.overlays?.projects !== 'overlays/joestar-star.svg' || manifest.overlays?.stack !== 'overlays/golden-ratio.svg'
        || sequenceSections.some(({ key }) => !Number.isInteger(manifest.keyframes[key]) || manifest.keyframes[key] < 0 || manifest.keyframes[key] >= manifest.frameCount)) throw new Error('Manifiesto inválido')
      if (disposed) return
      emit('manifest', manifest)
      motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      mobileQuery = window.matchMedia(sequenceSettings.mobileQuery)
      cache = createFrameCache(manifest, schedule, window.Image)
      listen(window, 'scroll', schedule, { passive: true })
      listen(window, 'resize', invalidate, { passive: true })
      listen(window, 'pageshow', invalidate)
      listen(window, 'hashchange', schedule)
      listen(window, 'online', () => { cache.retryFailed(); schedule() })
      listen(motionQuery, 'change', schedule)
      listen(mobileQuery, 'change', invalidate)
      listen(document, 'visibilitychange', () => {
        if (document.hidden) { window.cancelAnimationFrame(raf); raf = 0 }
        else invalidate()
      })
      if (window.ResizeObserver) {
        observer = new window.ResizeObserver(invalidate)
        observer.observe(document.body)
        sequenceSections.forEach(({ selector }) => { const el = document.querySelector(selector); if (el) observer.observe(el) })
      }
      document.fonts?.ready.then(() => { if (!disposed) invalidate() })
      schedule()
    } catch {
      if (!disposed) error.value = 'manifest'
    }
  })
  onBeforeUnmount(() => {
    disposed = true; controller.abort(); observer?.disconnect()
    cleanups.forEach((cleanup) => cleanup())
    if (raf) window.cancelAnimationFrame(raf)
    cache?.dispose(); lastDrawable = null
  })
  return { frame, targetFrame, ready, reduced, variant, error }
}
