# Parte de trabajo

## Zona protegida (NO TOCAR)
- Mantener intactos los archivos originales de `public/assets/taste/` y sus módulos de movimiento.
- No alterar la arquitectura Vue 3/Vite, navegación por anclas ni diálogos nativos salvo corrección expresamente solicitada.
- Conservar la identidad Dark Premium, la paleta y el comportamiento actual de las animaciones.
- No inventar datos de proyectos, experiencia ni enlaces personales. GitHub y correo están confirmados; LinkedIn y fichas de proyectos siguen pendientes.
- Actualización autorizada: las once fichas están confirmadas en `PORTFOLIO_CONTENT.md`; la mención anterior a fichas pendientes es histórica. Mantener la confidencialidad empresarial y no inventar enlaces públicos.

## Avances completados
- Preparado GitHub Pages para `https://crudo27.github.io/portfolio/`: Vite usa base de producción `/portfolio/` y desarrollo `/`; prerender alineado. Rutas de Canvas, manifiesto, SVG, fallback e iconos resueltas con BASE_URL, sin rediseño ni cambios de animación.
- Workflow de push a main/manual con Node24 LTS, npm ci, sintaxis, pruebas, build, verificación de artefactos y acciones oficiales fijadas por SHA. Permisos separados y concurrencia; no se activó Pages ni se ejecutó Actions.
- SEO: canonical/OG/Twitter, PNG social1200×630 revisado, favicon, sitemap y robots del proyecto. Avisos de terceros distribuidos; recursos cinematográficos originales intactos.
- Build y43 pruebas aprobados (42 anteriores y una de despliegue),24 JS/MJS con sintaxis correcta; dist verifica160 frames,165 huellas, SVG, fuentes/iconos y rutas. Dos fallos simulados (frame ausente/ruta sin base) rechazados y restaurados. YAML y condiciones del workflow comprobados.
- Búsqueda de secretos en archivos actuales, primer commit local y siete variantes adicionales de los tres commits remotos: sin credenciales detectadas. Sin .env/metadatos de agentes versionados. No se crearon commits, se hizo push ni se cambiaron remotes en esta tarea.

## Archivos tocados
- `.github/workflows/deploy.yml`, `.nvmrc`, `.gitignore`, `vite.config.js`, `package.json`, `scripts/prerender.mjs`, nuevos `scripts/check-syntax.mjs` y `scripts/verify-dist.mjs`.
- Nuevo `src/assetUrl.js`; ajustes de URL en `src/App.vue`, `src/components/SocialCards.vue`, `PortfolioSceneBackground.vue` y `src/composables/useScrollSequence.js`.
- `index.html`, `public/share.png`, `public/robots.txt`, `public/sitemap.xml`, `public/assets/licenses/third-party.txt`; sin modificar los WebP/SVG existentes.
- Nuevo `tests/deployment.test.mjs`; `playwright.config.js`, `tests/e2e/fixtures.mjs` y `tests/e2e/portfolio.spec.mjs` adaptados a la subruta.
- `README.md`, `DESIGN.md`, `PARTE.md`, `THIRD_PARTY_NOTICES.md`, `docs/deployment.md`, `docs/validation.md`, `docs/e2e.md`. `dist/` regenerado, excluido de Git.

## Bloqueos / Deuda técnica
- Derechos de redistribución del kit y personajes Joestar no aportados explícitamente: confirmar antes de publicación definitiva. Fuentes OFL, Vue/Taste MIT y logos/iconos CC0/ISC identificados; no se inventa una licencia global del repositorio.
- npm audit no pudo consultar avisos por DNS bloqueado a registry.npmjs.org; no se afirma ausencia de vulnerabilidades. Ejecutarlo desde terminal con red.
- Preview bloqueado por EPERM en127.0.0.1:4175 y Chrome MCP sin conexión. Sin navegación HTTP/visual ni Playwright completo; verificaciones de subruta hechas sobre artefactos y SSR. Actionlint/gitleaks no instalados; validación YAML y búsqueda de patrones realizadas con límites documentados.
- `.git` sólo lectura: local efde045 frente a main remoto47ebda9; origin SSH equivale a Crudo27/portfolio por HTTPS. No se alteró Git. Sincronización manual conservando archivos documentada, evitando duplicar la limpieza ya publicada.
- LinkedIn y enlace público de Vende360 pendientes. Persisten061/062 idénticos y doble contorno original en070; no se tocaron los assets.

## Siguiente paso
- Confirmar derechos de imágenes; desde terminal normal sincronizar metadatos con main remoto, ejecutar npm audit y preview/Playwright bajo `/portfolio/`. Revisar diff, realizar commit/push manual siguiendo `docs/deployment.md`, habilitar Pages con origen GitHub Actions y comprobar la primera ejecución y la URL publicada.
