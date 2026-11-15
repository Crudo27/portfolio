# Repository Guidelines

## Project Structure & Module Organization

The application is a Vue 3 portfolio built with Vite. Production components and styles live in `src/`, tests in `tests/`, static resources in `public/assets/`, and supporting documentation in `docs/`. `public/` follows Vite's static-file convention. Treat `.agents/`, `.aws/`, `.codex/`, `.git/`, and `graphify-out/` as environment metadata, not application modules.

When adding the initial implementation, organize production code under `src/`, tests under `tests/`, static resources under `assets/`, and supporting documentation under `docs/`, unless the selected framework requires another layout. Create directories only when they contain relevant files.

## Build, Test, and Development Commands

Use Node.js 22.12 or newer and npm. Install with `npm ci`, develop with `npm run dev`, build and prerender into `dist/` with `npm run build`, preview with `npm run preview`, and test with `npm test`. See README.md for details.

Playwright tests live in `tests/e2e/`. From a normal terminal outside the Codex sandbox, install Chromium with `npx playwright install chromium`, create the initial visual references with `npm run test:e2e -- --update-snapshots`, and subsequently run `npm run test:e2e`. This command builds and serves production automatically. Do not launch Chromium inside the sandbox. See `docs/e2e.md` for reports, artifacts, and visual reference review.

Useful inspection commands from the repository root:

- `ls -la`: inspect the workspace, including hidden entries.
- `rg --files`: list visible project files as they are added.

When introducing a toolchain, document its installation, development, build, and test commands here and in the project README.

## Coding Style & Naming Conventions

Use Vue single-file components, JavaScript ES modules, and CSS. `.editorconfig` defines two-space indentation and UTF-8. No formatter or linter is configured. Use descriptive names and keep changes focused; avoid unrelated formatting edits. Preserve the visual direction in DESIGN.md and keep original vendor files in `public/assets/taste/` unchanged.

## Testing Guidelines

Run `npm test` for Node's built-in test runner, which discovers `tests/*.test.mjs`. The current integration check server-renders the Vue portfolio, validates navigation and assets, and checks content integrity. No coverage threshold is configured. Add meaningful regression checks for behavior changes and inspect responsive layout and keyboard interactions in a real browser.

## Commit & Pull Request Guidelines

Git history is unavailable in this workspace, so existing commit conventions cannot be verified. Until a convention is established, use concise, imperative subjects such as `Add initial project structure`.

Pull requests should explain the purpose, summarize changes, and report validation performed or why checks could not run. Link relevant issues and include screenshots for visual changes.

## Security & Configuration

Never commit credentials, tokens, or local environment settings. Provide placeholder configuration examples when needed. Avoid modifying environment metadata as part of application changes.

## Comando personalizado: /parte
Cuando escriba `/parte` o pida actualizar el parte de trabajo:
- Crea o actualiza el archivo `PARTE.md` en la raíz del proyecto.
- Mantén siempre una sección fija de **Zona protegida (NO TOCAR)** sin borrar las reglas previas a menos que yo lo indique.
- Estructura el contenido en 5 secciones breves:
  1. **Zona protegida (NO TOCAR):** Archivos, módulos, funciones o decisiones de arquitectura intocables.
  2. **Avances completados:** Qué se resolvió o implementó hoy.
  3. **Archivos tocados:** Lista de rutas modificadas o creadas.
  4. **Bloqueos / Deuda técnica:** Errores pendientes o decisiones por tomar.
  5. **Siguiente paso:** La tarea exacta con la que retomar en la próxima sesión.

## Regla de lectura inicial
Antes de proponer o ejecutar cualquier cambio en el código, lee `PARTE.md` y respeta estrictamente todo lo listado en **Zona protegida (NO TOCAR)**.
