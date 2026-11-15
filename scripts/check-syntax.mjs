import { readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]))).flat()
}
const scripts = ['vite.config.js', 'playwright.config.js', ...(await Promise.all(['src', 'scripts', 'tests'].map(files))).flat()]
  .filter((file) => /\.(js|mjs)$/.test(file))
for (const file of scripts) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}
console.log(`Sintaxis verificada: ${scripts.length} archivos JS/MJS. Los SFC se comprueban durante el build.`)
