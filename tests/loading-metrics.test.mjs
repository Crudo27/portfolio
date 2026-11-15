import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateCLS } from './e2e/loading-metrics.mjs'

test('CLS suma la mayor ventana de cambios e ignora las interacciones recientes', () => {
  assert.equal(calculateCLS([]), 0)
  assert.equal(calculateCLS([
    { startTime: 100, value: 0.125, hadRecentInput: false },
    { startTime: 500, value: 0.125, hadRecentInput: false },
    { startTime: 600, value: 1, hadRecentInput: true },
    { startTime: 2000, value: 0.125, hadRecentInput: false },
  ]), 0.25)
})

test('CLS abre otra ventana tras un segundo de pausa o cinco segundos acumulados', () => {
  assert.equal(calculateCLS([
    { startTime: 100, value: 0.125 },
    { startTime: 1100, value: 0.125 },
  ]), 0.125)
  assert.equal(calculateCLS(Array.from({ length: 8 }, (_, index) => ({
    startTime: 100 + index * 900, value: 0.125,
  }))), 0.75)
  assert.equal(calculateCLS([
    ...Array.from({ length: 6 }, (_, index) => ({ startTime: 100 + index * 900, value: 0.125 })),
    { startTime: 5100, value: 1 },
  ]), 1)
})
