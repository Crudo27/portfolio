import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useDialogMotion(dialog) {
  const isOpen = ref(false)
  const ready = ref(false)
  let reducedMotion
  let animation
  let closing = false

  function stopAnimation() {
    animation?.cancel()
    animation = null
  }

  function finishClose() {
    stopAnimation()
    closing = false
    if (dialog.value?.open) dialog.value.close()
    isOpen.value = false
  }

  function animate(entering) {
    const element = dialog.value
    const style = window.getComputedStyle(element)
    const start = animation
      ? { opacity: style.opacity, transform: style.transform }
      : { opacity: entering ? 0 : 1, transform: entering ? 'translateY(8px)' : 'none' }
    const duration = parseFloat(style.getPropertyValue(entering ? '--m-panel' : '--m-close'))
    stopAnimation()
    closing = !entering
    if (!(duration > 0)) {
      if (!entering) finishClose()
      return
    }
    try {
      const running = element.animate([
        start,
        { opacity: entering ? 1 : 0, transform: entering ? 'none' : 'translateY(8px)' },
      ], { duration, easing: style.getPropertyValue('--m-ease').trim(), fill: 'both' })
      animation = running
      const settle = () => {
        if (animation !== running) return
        if (closing) finishClose()
        else stopAnimation()
      }
      running.finished.then(settle, settle)
    } catch {
      if (!entering) finishClose()
    }
  }

  function canAnimate(event) {
    return event?.detail > 0 && !reducedMotion?.matches && document.documentElement.dataset.motion !== 'off' && typeof dialog.value.animate === 'function'
  }

  function open(event) {
    if (!ready.value || (dialog.value.open && !closing)) return
    if (!dialog.value.open) dialog.value.showModal()
    isOpen.value = true
    if (canAnimate(event)) animate(true)
    else {
      stopAnimation()
      closing = false
    }
  }

  function close(event) {
    if (!dialog.value?.open) return
    if (canAnimate(event)) {
      if (!closing) animate(false)
    } else finishClose()
  }

  function onClosed() {
    if (!dialog.value?.open) finishClose()
  }

  function onReducedMotion(event) {
    if (!event.matches) return
    if (closing) finishClose()
    else stopAnimation()
  }

  onMounted(() => {
    ready.value = typeof dialog.value?.showModal === 'function'
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.addEventListener('change', onReducedMotion)
  })

  onBeforeUnmount(() => {
    reducedMotion?.removeEventListener('change', onReducedMotion)
    finishClose()
  })

  return { isOpen, ready, open, close, onClosed }
}
