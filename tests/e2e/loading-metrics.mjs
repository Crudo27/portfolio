export function calculateCLS(entries) {
  let maximum = 0
  let session = 0
  let start
  let previous
  for (const entry of entries) {
    if (entry.hadRecentInput) continue
    if (start === undefined || entry.startTime - previous >= 1000 || entry.startTime - start >= 5000) {
      session = 0
      start = entry.startTime
    }
    session += entry.value
    maximum = Math.max(maximum, session)
    previous = entry.startTime
  }
  return maximum
}

// Se inyecta antes del primer script para observar también el prerender y la hidratación.
export function observeLoading() {
  const metrics = { supported: PerformanceObserver.supportedEntryTypes.includes('layout-shift'), shifts: [], positions: [] }
  window.__e2eLoading = metrics
  const sample = () => {
    const title = document.querySelector('h1')
    const rect = title?.getBoundingClientRect()
    metrics.positions.push({ time: performance.now(), scrollX, scrollY, titleTop: rect?.top, titleHeight: rect?.height })
  }
  const record = (entries) => {
    for (const entry of entries) metrics.shifts.push({
      value: entry.value, startTime: entry.startTime, hadRecentInput: entry.hadRecentInput,
      sources: (entry.sources || []).map((source) => ({
        node: source.node ? `${source.node.nodeName}#${source.node.id}.${source.node.className}` : null,
        previousRect: source.previousRect.toJSON(), currentRect: source.currentRect.toJSON(),
      })),
    })
  }
  let observer
  if (metrics.supported) {
    observer = new PerformanceObserver((list) => record(list.getEntries()))
    observer.observe({ type: 'layout-shift', buffered: true })
  }
  sample()
  window.addEventListener('scroll', sample, { passive: true })
  const timer = setInterval(sample, 100)
  window.__e2eStopLoading = () => {
    clearInterval(timer)
    window.removeEventListener('scroll', sample)
    if (observer) {
      record(observer.takeRecords())
      observer.disconnect()
    }
    sample()
    return metrics
  }
}
