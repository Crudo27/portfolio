# Portfolio de desarrollo de software

Portfolio de Gian Piero Rodríguez en Vue 3 y Vite, en español. La segunda iteración conserva la composición editorial y las fuentes locales Geist e Instrument Serif, con una paleta Dark Premium. Incluye presentación, tres proyectos explorables, perfil, stack interactivo, trayectoria y tarjetas de contacto.

## Ejecutar

Requiere Node.js 22.12 o posterior y npm.

```sh
npm ci
npm run dev
```

Vite muestra la dirección local en la terminal. La compilación de producción se genera en `dist/`:

```sh
npm run build
npm run preview
```

El build prerenderiza el contenido para mantener el portfolio legible, sus anclas y los enlaces de contacto disponibles sin JavaScript. Los diálogos de detalles requieren JavaScript y soporte nativo de `dialog.showModal()`. Las fuentes, los iconos y los módulos de movimiento se sirven desde el proyecto; no se necesitan claves ni servicios externos.

## Validación

```sh
npm test
```

Las pruebas comprueban contenido prerenderizado, anclas, controles de exploración, navegación compartida, recursos, configuración y contrastes de los tokens. Un host de Vue en memoria comprueba selección de detalles, protocolos de enlaces, clic exterior, Escape, teclado sin animación, interrupciones, movimiento reducido, fallback sin WAAPI, retorno de foco solicitado y limpieza. No sustituye las pruebas de modalidad, foco nativo y responsive en un navegador o un teléfono real.

La suite Playwright comprueba ocho resoluciones, proyectos, stack, navegación, foco, Escape, movimiento reducido, consola, recursos y estabilidad durante la carga. Ejecútala desde una **terminal normal, fuera del sandbox de Codex**:

```sh
npm ci
npx playwright install chromium
# Primera ejecución: genera las referencias visuales que debes revisar.
npm run test:e2e -- --update-snapshots
# Ejecuciones posteriores: compara con las referencias existentes.
npm run test:e2e
```

El comando compila y sirve la versión de producción automáticamente; no hace falta iniciar Vite. El reporte queda en `playwright-report/html/index.html`, el resumen JSON en `playwright-report/results.json` y las capturas/diagnósticos en `test-results/e2e/`. Para abrir el reporte: `npx playwright show-report playwright-report/html`. Instrucciones y límites en [docs/e2e.md](docs/e2e.md).

En entornos que impidan los subprocesos del runner de Node, se pueden ejecutar y ver los mismos casos sin aislamiento:

```sh
node --test --test-isolation=none --test-reporter=spec tests/*.test.mjs
```

## Editar contenido

- `src/App.vue`: composición de la página y textos de presentación, perfil y trayectoria.
- `src/data/portfolio.js`: identidad, proyectos, tecnologías, navegación y configuración `socialLinks` de contacto.
- `src/components/PortfolioSceneBackground.vue`: Canvas del fondo cinematográfico, fallback responsive y geometrías SVG.
- `src/composables/useScrollSequence.js`: progreso, carga, caché y ciclo de vida.
- `src/components/SceneOverlay.vue`: estrella y proporción áurea como capas del fondo.
- `public/portfolio-scroll/`: 80 WebP de escritorio, 80 móviles, manifiesto y geometrías SVG. El fallback responsive usa el fotograma000; el modo reducido usa los hitos000/027/052/079.
- `tests/fixtures/scroll-assets.sha256.json`: huellas de los recursos aprobados, para verificar su integridad sin duplicar el kit.
- `src/components/SiteHeader.vue`: cabecera y menú móvil con Composition API y `dialog` nativo.
- `src/components/ProjectCard.vue`: ficha seleccionable con las portadas conceptuales.
- `src/components/DetailDialog.vue`: contenido de detalles y enlaces de proyecto/tecnología.
- `src/composables/useDialogMotion.js`: controlador compartido del menú y detalles.
- `src/components/SocialCards.vue`: plataformas con enlaces sólo cuando están configurados.
- `src/components/SiteFooter.vue`: contacto y navegación del pie.
- `src/style.css`: sistema visual y adaptación a escritorio, tablet y móvil.
- `src/motion.css`: entrada CSS del hero y microinteracciones; amplía los tokens de Taste.
- `public/assets/icons/`: iconos originales y registro de procedencia y licencias.
- `public/assets/taste/`: módulos originales de la skill; mantenerlos sin modificaciones.
- `docs/visual-plan.md`: dirección artística, contenido confirmado y decisiones de alcance.
- `docs/validation.md`: resultados de comprobación y revisión pendiente en navegador.

Los tres proyectos y las ocho tecnologías tienen sus fichas completas con el contenido confirmado en [PORTFOLIO_CONTENT.md](PORTFOLIO_CONTENT.md). Los datos que consume la aplicación están en `src/data/portfolio.js`; si se revisa el texto, mantener ambos archivos coherentes.

Los proyectos tienen `summary` y `statusLabel` para las tarjetas; `description`, `problem`, `goals`, `features`, `technologies`, `technicalHighlights`, `status` y `repositoryNote` para el diálogo; y `links` (objetos `{ label, href }`) para destinos confirmados. `featuresNote` aclara las integraciones parciales de Vende360 y las mecánicas diseñadas de Idemne antes de sus listas. Las tecnologías tienen descripción, `usage`, `experience`, `projects` e `interests`. Los párrafos de texto se separan con una línea en blanco; `technicalHighlights` contiene párrafos. El diálogo mantiene scroll interno y muestra las tecnologías de proyectos como etiquetas. Los campos realmente vacíos conservan su indicación pendiente.

Second Brain es un prototipo profesional en evolución; Vende360 recoge la participación durante prácticas profesionales; Idemne sigue en diseño y preproducción. Los repositorios y demostraciones no proporcionados no se convierten en enlaces: se explica su disponibilidad real. Las portadas siguen siendo conceptos gráficos, no capturas de los productos. Validación y límites en [docs/validation.md](docs/validation.md).

GitHub (`https://github.com/Crudo27`) y correo (`mailto:gp100805@gmail.com`) están confirmados. Para activar LinkedIn, asignar su URL real a `href` en `socialLinks`; con `null` permanece una tarjeta informativa. No es necesario cambiar componentes. Los enlaces web anuncian la nueva pestaña; el correo abre el cliente del visitante, sin simular un envío en la página.

Al recibir esos datos, sustituir los avisos correspondientes y añadir únicamente enlaces verificados. No atribuir tecnologías, resultados ni experiencia a partir del nombre de un proyecto. La navegación móvil conserva enlaces visibles hasta que Vue y `showModal()` estén disponibles; las secciones pueden crecer al ampliar el texto.

Esta fase no incluye backend, formulario, filtros, router, CMS, analítica ni descarga de CV. La imagen social SVG es provisional; al publicar debe sustituirse por una captura PNG/JPEG y configurarse el dominio canónico.

La segunda fase de `portfolio_joestar_amanecer_80f` dibuja los80 frames completos en un único Canvas, ligado al scroll en ambas direcciones: Hero000, Proyectos027, Stack052 y Contacto079. Los topes se miden en las secciones reales. Los SVG son capas del fondo fijo, sin bloques añadidos al contenido ni personajes separados. Caché LRU de12 imágenes, tres cargas simultáneas y vecinos próximos; la imagen anterior permanece mientras llega la siguiente. Movimiento reducido muestra sólo los hitos estáticos. La variante móvil se usa hasta720px o en retrato≤3/4.

El controlador y sus límites están en `src/composables/useScrollSequence.js`; tamaño, opacidad y posición de las geometrías se ajustan en `SceneOverlay.vue`. Parámetros y fórmula de velocidad en la sección13 de `DESIGN.md`. Los originales permanecen intactos:061/062 se repiten y el tramo final contiene una disolvencia pintada con doble contorno visible. El margen inferior del footer se corrigió a48px/32px. Véase `docs/validation.md` para las comprobaciones reales y los límites de la revisión.

## Repositorio y recursos conservados

La limpieza del15 de noviembre retiró las distribuciones duplicadas, escenas anteriores, ejemplos de integración y resultados generados. El registro vigente y las verificaciones están consolidados en [docs/validation.md](docs/validation.md); los informes temporales y las instrucciones de integración ya sustituidas se retiraron del repositorio.

`public/portfolio-scroll/` es la única distribución cinematográfica utilizada por la aplicación. Los tres maestros artísticos únicos se conservan en `portfolio_joestar_amanecer_80f/sources/` para futuras revisiones de la ilustración. No son recursos de producción ni deben montarse como personajes separados.

No versionar `node_modules/`, `dist/`, los informes de Playwright ni los metadatos locales de agentes y Graphify. Las capturas de referencia de `tests/e2e/snapshots/` sí se conservan y forman parte de las pruebas. Los comandos de instalación, build y despliegue permanecen iguales.
