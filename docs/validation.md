# Validación de la implementación Vue 3

## Contenido confirmado — 15 de noviembre de 2026

Las tres fichas de proyectos y las ocho de tecnologías están completas con los textos proporcionados por el titular, recogidos en `PORTFOLIO_CONTENT.md` porque el archivo no estaba en el workspace. Se mantienen los títulos y el diálogo nativo; se añaden párrafos separados, etiquetas de tecnologías y avisos de alcance antes de las funciones de Vende360 e Idemne. No hay enlaces inventados ni información empresarial privada.

- Build y prerender aprobados; ocho archivos de pruebas aprobados y42 casos individuales correctos, sin fallos. Las once fichas se renderizan en memoria y muestran todo su contenido, sin avisos genéricos en campos completos.
- Comprobaciones de Escape, retorno de foco, apertura/cierre, reinicio de scroll, enlaces, movimiento reducido, recursos y limpieza aprobadas. La modalidad y el foco nativos requieren navegador.
- Sintaxis de cinco archivos JS/MJS modificados aprobada. Sin linter configurado.216 casos E2E enumerados con `--reporter=list`; no ejecutados.
- Responsive revisado en reglas CSS y casos preparados. **Sin inspección visual nueva:** Chrome DevTools MCP no pudo conectar (`ECONNREFUSED 127.0.0.1:9222`). No se lanzó Chromium desde el sandbox ni se actualizaron snapshots automáticamente.

Fuente, alcance, cambios, verificaciones y pendientes en [content-validation.md](content-validation.md). Las secciones siguientes conservan el historial de tareas previas.

## Limpieza segura — 15 de noviembre de2026

- Inventario previo de1832 entradas en [cleanup-inventory.csv](cleanup-inventory.csv). Se retiraron1320 archivos obsoletos; cuatro documentos originales se archivaron conservando sus bytes. Los maestros únicos se dejaron para revisión manual.
- `npm test`:8 archivos aprobados. Ejecución detallada sin aislamiento:40 pruebas,0 fallos. Se conservaron todos los archivos de pruebas, las referencias visuales y la cobertura del controlador actual; se migraron las comprobaciones del crossfade retirado.
- `npm run build`: aprobado con prerender. `dist/` pasó de13.616.124 a6.801.090 bytes. HTML, JS y CSS compilados idénticos al build previo; recursos estáticos retenidos copiados sin cambios.
- Integridad:80/80 WebP escritorio1536×864 y80/80 móviles720×1280, índices000–079 completos;165 huellas SHA-256 verificadas, incluyendo manifiesto, estrella y proporción áurea. ImageMagick confirmó dimensiones y formato de los160 frames. Fallback y movimiento reducido siguen usando los mismos índices, sin depender de pósteres.
- Todos los13 archivos JS/Vue restantes pertenecen al grafo de imports de `src/main.js`; ambos CSS de entrada siguen incluidos. `node --check`:20 archivos JS/MJS aprobados. No hay linter configurado.
- `npm run test:e2e -- --list`:216 casos enumerados, sin lanzar Chromium. **No se ejecutó Playwright completo ni se realizó comprobación visual durante esta limpieza.** Chrome DevTools MCP devolvió `ECONNREFUSED 127.0.0.1:9222`; no se eludió la prohibición de lanzar Chromium dentro del sandbox.
- No fue posible inspeccionar el índice Git: `git status --short --ignored` devuelve `not a git repository`. No se inicializó Git, no se crearon commits ni se hizo push. El inventario conserva origen, clasificación y hashes de las eliminaciones verificadas.

Informe y límites en [cleanup.md](cleanup.md); datos cuantitativos en [cleanup-results.json](cleanup-results.json). Lo que sigue es historial de etapas anteriores, con sus rutas originales.


## Segunda fase cinematográfica — 13 de noviembre de 2026

GATE: DONE (Detente al terminar esta fase.)

La secuencia de80 índices funciona por scroll en un Canvas único; los dos SVG son parte del fondo fijo. No hay bloques nuevos de geometría en el contenido: `App.vue` es idéntico al estado anterior. El tema, los textos, las tarjetas, el stack, la navegación y los diálogos se conservan. Los originales de los recursos no se modificaron. No se ejecutó la auditoría final de Impeccable ni se crearon commits.

**Comprobaciones ejecutadas:**

- `npm test`:8 archivos aprobados,0 fallidos. Nuevos casos: interpolación reversible, límites y redondeo DOM, hitos reducidos, LRU, concurrencia, saltos sin cargar todos los intermedios, fallo de decode, cambio de variante, respuestas tardías, último frame válido, rAF agrupado, ausencia de reproducción autónoma y limpieza. Las comprobaciones de recursos comparan los160 frames, pósteres, SVG y manifiesto con el kit original.
- `npm run build`: aprobado, incluido prerender y control de scopes HTML/CSS. Sin nuevas dependencias. El HTML incluye fallback responsive y un Canvas; los SVG se montan al cargar el manifiesto.
- `copy-lint`:363 palabras,0 FAIL,0 WARN. `moments check`: `word-highlight` conservado,0 WebGL, sin incidencias.
- `npm run test:e2e -- --list --reporter=list`:208 casos enumerados en tres archivos y ocho resoluciones. Las pruebas preparadas ahora esperan el Canvas, los hitos reales, SVG, variante responsive, movimiento reducido y ausencia de exceso bajo el footer. Enumeración solamente; **la suite Playwright completa no se ejecutó**.
- Chrome DevTools MCP, en una pestaña aislada del navegador existente y sobre `http://127.0.0.1:5173/`: se instrumentó la llamada nativa `CanvasRenderingContext2D.drawImage`, además del índice solicitado. A1440×900 se comprobaron159 posiciones descendentes/ascendentes, con los80 índices realmente dibujados,0 índices ausentes,0 fallos, caché máxima12 y0 solicitudes al sistema anterior. No basta con observar sólo los cuatro hitos para demostrar este recorrido. Evidencia en [phase2-browser-validation.json](phase2-browser-validation.json).
- En ese recorrido controlado no se registraron errores JavaScript ni entradas de layout shift. No se presenta como medición de campo de Core Web Vitals ni como aprobación de toda la navegación.
- A390×844 se verificó0→27→52→79→52→27→0 con variante móvil y sin overflow horizontal. En movimiento reducido se verificaron27/52/79/52, sin animaciones decorativas activas. Se detectó y corrigió un caso real: los topes DOM fraccionarios quedaban unas décimas después de scrollY redondeado, haciendo que Stack conservara el hito anterior; ahora se toleran0.5px.
- Se inspeccionaron capturas de Proyectos en escritorio y móvil y de Stack en escritorio durante la integración. La estrella tiene cinco nodos exteriores y las letras quedan libres de sus conexiones mediante una máscara de la geometría. Las geometrías están dentro de `.portfolio-scene`, hay0 bloques `.cinematic-geometry` en el flujo y sólo un Canvas. La revisión visual final de todas las resoluciones queda para la tercera etapa.
- Footer: la causa era un padding inferior de52svh, unos423px en el viewport original. Ahora es48px en escritorio y32px en móvil, respetando el área segura. En1440×900, el documento termina unos47.94px después del crédito.

**Límites de los assets:** cada variante contiene80 nombres pero79 contenidos distintos:061/062 son idénticos. Los primeros fotogramas varían principalmente la iluminación de una misma pintura. El WebP070 de escritorio tiene un doble contorno visible de Johnny, incluido en la disolvencia pintada del kit. Se inspeccionaron079 desktop/mobile: Gyro está sentado a la izquierda de Johnny. No se han añadido recortes, desenfoques ni crossfades de CSS para simular otra continuidad. Los WebP027/052 no contienen los SVG grandes: éstos son archivos separados del kit y se muestran como capas del fondo.

**Validación pendiente:** Playwright completo y referencias visuales, teléfono físico, memoria/FPS bajo carga, revisión final de todos los encuadres y de la intensidad del fondo. El preview de producción no pudo abrir el puerto4175 por EPERM; las comprobaciones de navegador anteriores corresponden al servidor de desarrollo existente, mientras que el build se validó por separado. Algunas capturas posteriores quedaron esperando en MCP y se interrumpieron; no se les atribuye una revisión. No se lanzó Chromium desde el sandbox ni se pidieron permisos para eludirlo.

Tipo `service/other`, identidad Dark Premium y voz directa conservadas, sin datos supuestos ni nuevas fotografías. El azul y los dorados son específicos de la geometría solicitada; no cambian los tokens de interfaz. El gate se cierra por el límite de esta fase, sin atribuirle un `GATE: PASS` ni crear waivers. Las secciones siguientes son historial.


## Kit amanecer de 80 fotogramas — PROMPT 1, 13 de noviembre de 2026

GATE: DONE (Detente después de validar la primera integración.)

Primera fase cerrada tras validar recursos, pruebas y build. Este estado registra el límite solicitado; **no significa aprobación visual automática**. No se ejecutaron los PROMPT2/3 ni se crearon commits.

- Recursos:80 WebP de escritorio (`000`–`079`,1536×864),80 móviles (`000`–`079`,720×1280), cuatro pósteres, manifiesto y ambos SVG completos. Las pruebas comparan sus bytes con `portfolio_joestar_amanecer_80f/portfolio-scroll/`; ImageMagick confirmó formato y dimensiones de las164 imágenes.
- Único componente de fondo: `PortfolioSceneBackground.vue`, ahora con `<picture>` y frame `000` fijo. Móvil hasta720px, escritorio por encima; precargas excluyentes, prerender, dimensiones intrínsecas, `aria-hidden`, `inert`, `pointer-events:none` y velo80% del fondo oscuro. Se inspeccionaron los dos originales del frame `000`, sin atribuirles revisión del layout renderizado.
- El sistema anterior ya no se monta: sin PNG separados, estrellas, geometrías, cursor, parallax ni selección por scroll. Se conserva su código inactivo. Sólo cambió ese componente dentro de `src/`; los otros210 archivos registrados entre código y recursos originales mantienen sus hashes. Hero, contenido, tarjetas, stack, contactos, navegación, diálogos, tema y motion previo permanecen intactos.
- `npm test`:7 archivos aprobados,0 fallidos. Incluyen la integridad del kit, selección responsive en el HTML, ausencia de recursos antiguos en la aplicación y precargas correctas; permanecen las comprobaciones de navegación, contenido, diálogos y contraste.
- `npm run build`: aprobado, incluido el prerender y su control de coincidencia entre scopes HTML/CSS. Comprobación adicional de `dist/index.html`: `<picture>` disponible desde el HTML y ninguna referencia a `/portfolio-scenes/`.
- `copy-lint`:363 palabras,0 FAIL,0 WARN. `moments check`: `word-highlight` conservado,0 WebGL, sin incidencias. Sintaxis JavaScript comprobada en los tres archivos de pruebas modificados.
- `npm run test:e2e -- --list --reporter=list`:208 casos enumerados en tres archivos y ocho resoluciones, sin iniciar Chromium. Las pruebas de escenas se adaptaron al frame estático, ausencia de otras solicitudes, recorrido descendente/ascendente, umbral720/721px y movimiento reducido. **Sólo enumeradas, no ejecutadas.**

Se aplicaron Taste e Impeccable sobre la identidad existente, sin nuevo sorteo ni rediseño. Tipo `service/other`, dirección Dark Premium y composición editorial conservadas; ilustración suministrada por el titular, sin fotografías de sustitución ni recursos generados. Voz directa en primera persona, sin cambios de copy ni datos supuestos. Sin nuevos waivers ni FAIL de los checks ejecutados. El cargador de Impeccable no pudo instalar su motor fuera del workspace; se leyó el contexto local y las referencias de la skill.

**Pendiente:** consistency/layout/perf, capturas, encuadre, intensidad del velo, foco real, consola y CLS en navegador. `AGENTS.md` prohíbe lanzar Chromium dentro del sandbox; no se ejecutaron esos controles ni se pidió saltar la restricción. Para revisar esta fase desde una terminal externa: `npm run test:e2e -- scenes.spec.mjs`, seguido de la suite completa y revisión de diferencias visuales. El avance de los80 frames y los SVG requieren otra instrucción; no se han implementado.

Las secciones siguientes conservan el historial anterior y no describen el fondo actualmente montado.

## Contacto: aparición de Gyro — 12 de noviembre de 2026

**Implementación y pruebas sin navegador aprobadas; revisión renderizada pendiente.** Se aplicó `emil-design-eng` y se inspeccionaron los montajes Hero/Contacto y el PNG original de Gyro. Chromium sigue reservado para la terminal externa por indicación del titular.

- `PortfolioSceneBackground.vue` añade a Gyro como capa absoluta a la izquierda de Johnny, con base común, altura104%, solapamiento8px y proporciones originales. Montarlo no desplaza a Johnny. La envoltura común mantiene el movimiento ambiental previo; la pareja se reduce a.6 en móvil sin cambiar el flujo de la página.
- `useSceneNarrative.js` comparte `onImageLoad` y la decodificación de los recursos. `companionVisible` exige PNG listo, paisaje Contacto y sección real `#contacto`. Se precarga cerca del cierre usando el observer existente; Hero no incluye el PNG de Gyro en el HTML inicial. Se conserva montado para invertir el fundido sin reiniciar la imagen.
- Entrada600ms con180ms de retraso y desplazamiento8px; salida350ms sin retraso. Bajo1024px se omite el desplazamiento; con movimiento reducido o teclado el estado cambia inmediatamente. La orientación corregida de Johnny se mantiene.
- `SceneCharacter.vue` conserva el PNG y sus dimensiones; la altura relativa de Gyro se aplica sólo en su envoltura para evitar escalarlo dos veces. Los12 archivos del kit siguen siendo idénticos a los originales. No se alteraron contenido, enlaces, tipografía, paleta ni animaciones anteriores.
- `npm run build`: aprobado, incluido el control de scopes entre HTML y CSS. `npm test`: aprobado. Runner detallado sin aislamiento:39 casos aprobados, incluyendo PNG fallido/lento/tardío, reentrada y ocultación fuera de Contacto incluso cuando el fondo anterior aún permanece durante otra carga.
- La suite Playwright descubre156 casos. Prepara capturas de la pareja y del modo reducido, comprueba proximidad, altura relativa, base compartida y encuadre, además de clics sobre enlaces, consola y CLS. Incluye salir antes de terminar el PNG y volver después. **Estos casos de navegador no se ejecutaron aquí.**

La composición final y sus parámetros están en la sección11 de `DESIGN.md`. Para obtener evidencias actuales: `npm run test:e2e -- scenes.spec.mjs` desde la terminal externa; reporte en `playwright-report/html/index.html` y capturas en `test-results/e2e/`. Pendientes reales: encuadre final, halos del recorte sobre el terreno, fluidez, consola y CLS en escritorio/móvil. Las referencias de las etapas anteriores no equivalen a capturas de esta versión.

## Narrativa ambiental — 12 de noviembre de 2026

**Build y pruebas sin navegador aprobados. Chromium no se ejecutó en esta sesión.** Se cargó `emil-design-eng` y se consultó `animation-performance`. La dirección estática anterior evoluciona a cuatro paisajes, conservando los originales y la orientación corregida de Johnny.

- Crossfades de900ms, espera a la decodificación, precarga por proximidad y base Hero opaca. El controlador usa los seis destinos reales; Perfil/Trayectoria conservan el paisaje anterior sin geometría. Los SVG originales muestran trazado y nodos progresivos sólo en Proyectos/Stack.
- Deriva de estrellas de3px/36s, pose completa de1px, parallax CSS de±5px y cursor hasta±3px, limitados a escritorio compatible. Móvil sin esos desplazamientos, preferencia reducida inmediata y pausa al ocultar la pestaña/abrir diálogos. Se verificó la cancelación de frames, observers, escuchas y respuestas posteriores al desmontaje en un host Vue de memoria.
- `npm test`: aprobado. Ejecución detallada sin aislamiento:38 casos aprobados. Incluyen recorrido de ida/vuelta, geometría restringida, cargas lentas/dañadas/tardías, fallback sin IntersectionObserver, teclado, visibilidad y limpieza. Estas pruebas no miden renderizado ni fluidez.
- `npm run build`: aprobado. Se corrigió un fallo real de integración: los IDs scoped del CSS de producción no coincidían con los del prerender. Se fijó `componentIdGenerator:'filepath'`; el prerender ahora falla si falta alguno de sus scopes en el CSS. La comprobación del artefacto confirma coincidencia de los scopes de las escenas y Johnny.
- Los12 recursos de `public/portfolio-scenes/` siguen coincidiendo byte a byte con el kit. La carga HTML inicial contiene Hero/Johnny; los otros fondos, SVG geométricos y Gyro no se solicitan desde ese HTML. No se añadieron dependencias ni se modificaron los datos personales.
- `npm run test:e2e -- --list --reporter=list`:150 casos en tres archivos. La nueva suite `scenes.spec.mjs` prepara capturas de las seis secciones al bajar/subir, espera de recurso lento sin fondo vacío, trazos/nodos, clics, movimiento reducido y CLS durante cambios. No se ejecutó el navegador ni se crearon evidencias nuevas atribuidas a esta sesión.

**Informe externo anterior:** se leyó `playwright-report/results.json`, con inicio UTC `2026-11-13T02:25:24.020Z`:110 aprobados,2 omitidos y20 fallidos. Corresponde a la versión previa, no a esta implementación. Se identificó en él el estilo scoped ausente, corregido en el build actual. También se corrigió el selector de navegación móvil para que pueda comprobar `aria-current` cuando el menú ya está cerrado. Sus fallos previos de foco nativo y de ciclo Tab del menú siguen pendientes de reproducción externa; no se alteró el comportamiento de los diálogos para ocultarlos.

**Pendiente real:** ejecutar `npm run test:e2e -- scenes.spec.mjs` en la terminal externa y revisar las capturas, continuidad del crossfade, legibilidad, encuadre móvil, CLS y fluidez en hardware real. Después ejecutar la suite completa y revisar sus diferencias visuales antes de actualizar referencias. Resultados y comandos en [e2e.md](e2e.md); parámetros y límites en la sección10 de `DESIGN.md`. Gyro continúa preparado para su próxima etapa, sin aparición automática. No hay aprobación visual ni `GATE: PASS` nuevo.

## Escenas ilustradas: integración estática — 12 de noviembre de 2026

**Build y comprobaciones sin navegador correctos; revisión visual pendiente.** Se cargó la skill local `design-taste-frontend`, se leyeron `DESIGN.md`, el README, la actualización geométrica, el manifiesto y los prompts del kit. Se inspeccionaron las cuatro imágenes de fondo, ambos personajes y los montajes de referencia. No se abrió Chromium, de acuerdo con la restricción del titular.

- Los 12 recursos de `public/portfolio-scenes/` coinciden byte a byte con el kit. Los cuatro WEBP son1920×1080 y ambos PNG tienen canal alfa; no se modificó ningún recurso.
- Configuración de cuatro escenas asociadas a `.hero`, `#proyectos`, `#stack` y `#contacto`, con estrella y geometría áurea asignadas correctamente. Las cuatro configuraciones se prerenderizan en las pruebas; sólo Hero se monta en la aplicación actual.
- `PortfolioSceneBackground.vue` separa paisaje, estrellas, geometría opcional, personajes y contraste; `SceneCharacter.vue` conserva los recortes originales. Fondo fijo decorativo, sin foco ni puntero, y Johnny anclado a la derecha. Gyro está preparado a su izquierda para Contacto, sin aparición ni descarga anticipada.
- Los textos, fuentes, paleta, tarjetas, datos personales, navegación, diálogos y movimiento previo se conservan. Proyectos/Stack/Contacto siguen con superficies opacas mientras no se activen sus escenas.
- `npm run build`: correcto, con prerenderizado. `npm test`: correcto tras adaptar una aserción a la serialización HTML válida de Vue (`alt` vacío puede escribirse sin comillas).
- Contraste teórico: el velo80% sobre `--p-bg` mantiene aproximadamente4.76:1 para `--p-muted` incluso sobre blanco en la zona protegida. No es una medición de legibilidad en pantalla.
- `copy-lint.mjs dist/index.html --kind service`:363 palabras,0 FAIL,0 WARN. `moments.mjs check dist/index.html --page service`: word-highlight conservado, cero WebGL, sin incidencias.
- La suite Playwright sigue descubriendo132 casos e incorpora comprobaciones de las capas y la posición de Johnny. No se ejecutaron E2E ni se generaron nuevas capturas dentro del sandbox.

**Gate visual no ejecutado:** las comprobaciones de consistency/layout/perf de la skill inician Chromium y el titular pidió no hacerlo dentro del sandbox. Se preparó el objetivo `dist/index.html --root dist` sin ejecutar esos controles; no se atribuye un `GATE: PASS` ni se añaden waivers. La suite externa y sus comandos permanecen en [e2e.md](e2e.md).

**Pendiente:** render real en escritorio/tablet/móvil, detalle de bordes/halos de los PNG, composición con el glifo decorativo del Hero, encuadre y legibilidad del conjunto, foco/interacciones en navegador y CLS real. Tras revisar esas capturas, conectar las escenas mediante scroll y completar la aparición de Gyro con alternativa para movimiento reducido.

## Preparación de Playwright — 12 de noviembre de 2026

**Suite preparada; Chromium no se ejecutó dentro de Codex.** El titular confirmó que Playwright y Chromium funcionan fuera del sandbox y generan `portfolio-test.png`; esa captura no fue analizada en esta sesión. Los bloqueos descritos más abajo corresponden a intentos anteriores dentro del entorno restringido.

- Añadidos `@playwright/test` 1.65.0, `playwright.config.js` y `npm run test:e2e`. La versión de producción se compila y sirve automáticamente durante la ejecución externa.
- `npm run test:e2e -- --list --reporter=list`: descubre 132 casos en dos archivos para seis resoluciones; dos casos de menú se omitirán en escritorio. Este comando sólo enumera, sin arrancar Chromium ni el servidor.
- Cobertura preparada: proyectos, stack, anclas y enlaces, teclado/foco/Escape, menú responsive, movimiento reducido, consola/red, capturas comparables y CLS/scroll con carga normal y recursos retrasados.
- `npm test`: correcto, incluidos dos casos nuevos del cálculo de CLS. `npm run build`: correcto, con prerenderizado. Comprobación de sintaxis JavaScript correcta.
- Las dependencias existentes conservaron sus versiones y entradas en el lockfile. Componentes, datos, estilos y recursos originales conservan su contenido.
- No existen todavía capturas, referencias ni resultados E2E de esta suite. Se generarán al ejecutar los comandos externos de [e2e.md](e2e.md); crear las referencias iniciales requiere su revisión visual posterior.

## Segunda iteración Dark Premium — 12 de noviembre de 2026

**Implementación compilada y pruebas aprobadas. Validación visual en navegador todavía bloqueada.** Esta sección describe la versión vigente; las secciones posteriores conservan el historial anterior y sus datos provisionales.

### Cambios integrados

- Paleta carbón/grafito/azul profundo con acciones de azul claro; se conservan Geist, Instrument Serif, composición, secciones y portadas geométricas. Bordes propios centralizados, `color-scheme: dark`, favicon, metadatos e imagen social adaptados.
- Hero con Gian Piero Rodríguez, desarrollador de software y estudiante de Ingeniería de Sistemas; intereses confirmados en backend, arquitectura, algoritmos, IA y videojuegos.
- Tres fichas de proyectos y ocho filas de tecnologías seleccionables mediante botones nativos. El stack conserva dos columnas, logos, categorías y separadores; bajo 390px pasa a una.
- Un diálogo reutilizado para proyectos/tecnologías: descripción, campos técnicos y pendientes explícitos; enlaces configurables. No se inventaron alcance, estado, tecnologías por proyecto ni experiencia. El uso de Vue en este portfolio sí se documenta como hecho verificable del código.
- Tarjetas GitHub, LinkedIn y correo con datos centralizados en `src/data/portfolio.js`. GitHub `https://github.com/Crudo27` y correo `mailto:gp100805@gmail.com` confirmados; LinkedIn informativo pendiente. Logos originales locales con procedencia registrada, sin emojis.
- Controlador de diálogo extraído del menú existente a `useDialogMotion.js`, compartido con los detalles. Mantiene WAAPI 200/120ms, interrupciones, teclado inmediato, Escape, movimiento reducido y limpieza. Los detalles reinician scroll, devuelven el foco al disparador y no se cierran al pulsar padding/borde interior.
- Hover de proyectos/redes enlazadas con lift de 2px, tecnología con feedback tonal y foco inmediato. Hero y word-highlight conservados. Sin dependencias, loops, parallax ni efectos de fondo nuevos.

Archivos de aplicación modificados: `src/App.vue`, `src/components/ProjectCard.vue`, `SiteHeader.vue`, `SiteFooter.vue`, `src/data/portfolio.js`, `src/style.css`, `src/motion.css`, `index.html`, `public/favicon.svg` y `public/share.svg`. Nuevos: `DetailDialog.vue`, `SocialCards.vue`, `src/composables/useDialogMotion.js`, tres iconos sociales y `social-credits.json`. Pruebas: `tests/portfolio.test.mjs` actualizado, `content.test.mjs`, `dialog.test.mjs` y `theme.test.mjs` nuevos. Documentación: `DESIGN.md`, `README.md`, `docs/visual-plan.md` y este registro.

### Revisión y defectos corregidos

La revisión independiente fue estática; no inspeccionó capturas ni un navegador.

1. El icono SQL externo tenía `stroke=currentColor`, que no hereda la tinta del documento al usarse como imagen. Recibe inversión monocroma en CSS para el fondo oscuro.
2. Los futuros enlaces de repositorio/demo combinaban fondo primario con texto del mismo acento. Se presentan ahora como enlaces textuales contrastados, con aviso de nueva pestaña.
3. El cierre por clic exterior distingue coordenadas fuera del diálogo de su padding/borde interior; una prueba reproduce ambos casos.
4. Se corrigió la cascada de las transiciones sociales para que el cambio de superficie no sobrescriba la transición del lift.

### Validaciones realmente ejecutadas

| Comando o revisión | Resultado |
| --- | --- |
| `npm run build` | Correcto: Vite 8.3.2 y prerenderizado de Vue, sin avisos de compilación |
| `npm test` | Correcto: los cuatro archivos de prueba pasan; el runner aislado los reporta como cuatro unidades |
| `node --test --test-isolation=none --test-reporter=spec tests/*.test.mjs` | **25 resultados aprobados, cero fallos, cero omitidos**; incluye contenedores de subpruebas |
| `copy-lint.mjs dist/index.html --kind service` directo | 363 palabras; 0 FAIL, 0 WARN |
| `moments.mjs check dist/index.html --page service` | Un word-highlight, 0 contextos WebGL, sin avisos |
| Contraste sRGB de tokens en pruebas | Lectura/acciones≥4.5:1 y foco≥3:1 sobre las tres superficies |
| Comparación de originales Taste con la skill | 11 archivos, todos idénticos |
| Dependencias/lock | Sin dependencias nuevas; `package-lock.json` conserva SHA256 `473eb21475f14ff1d2bc5a1a6933c76d8945db2f21b0f48da194d782dc5cdde1` |
| Diff de componentes, CSS y configuración | Revisado; sin commits automáticos |

Bundle final: aplicación JS 89.66 kB (33.99 kB gzip) y CSS 25.11 kB (5.85 kB gzip). Son tamaños de archivos, no una medición de Core Web Vitals. Las fuentes y vendor locales no están incluidos en esos dos números.

Las pruebas ejecutan Vue real y lógica de selección/controlador sobre un host en memoria: no equivalen a verificar foco nativo, hit-testing, renderizado, Tab o consola de un navegador. Incluyen estructura de los 11 controles explorables, referencias ARIA y anclas, datos pendientes, enlaces sociales, protocolos de detalle, Escape sin propagación al vendor, apertura/cierre, inversión, fallback WAAPI, media query dinámica, limpieza y solicitud de restauración de foco.

### Navegador y gate

Se volvió a solicitar `chromium.launch({ headless: true, timeout: 5000 })` con Playwright 1.62.1 disponible en `/tmp/portfolio-browser-validation`. Falló porque no existe `/tmp/portfolio-browser-cache/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`. La descarga ya había fallado por DNS `ENOTFOUND cdn.playwright.dev`; no se instaló una dependencia de producción ni se repitió la descarga fallida. No hay herramienta de navegador interactivo disponible.

El gate de Taste se intentó una vez en esta iteración, después del primer build, y no se repitió tras ERROR:

`GATE: ERROR (copy-lint.mjs could not run (exit 0: spawnSync /home/gp/.nvm/versions/node/v24.21.0/bin/node EPERM); consistency.mjs gave no report (exit 2); check.mjs could not run (exit 2))`

La ejecución directa de copy-lint sí pasó; el gate no pudo lanzar todos sus procesos. No hay aprobación visual automática ni waivers. El cargador de Impeccable había fallado en la sesión; se aplicaron sus referencias locales mediante lectura directa, sin atribuirle una ejecución del motor.

**Dispositivos y resoluciones realmente renderizados: ninguno.** No se generaron capturas. Escritorio 1440×900 y 1024×768, tablet 820×1180 y 768×1024, móvil 390×844 y 320px y teléfonos físicos siguen pendientes. También faltan zoom al 200%, Tab/Shift+Tab, foco modal nativo/restauración, Escape real, clic en la cabecera extendida de cada ficha, teclado móvil, touch, consola, CLS durante hidratación/carga de fuentes y fluidez de las animaciones.

### Pendientes y preparación para publicar

El artefacto `dist/` compila y puede servirse estáticamente. No se puede dar aprobación final visual o de interacción real sin un navegador. Antes de publicar: ejecutar la matriz anterior y completar los datos que el titular quiera presentar. Permanecen pendientes LinkedIn, detalles/estado/enlaces de los tres proyectos, experiencia por tecnología salvo Vue en este portfolio, institución/fechas y experiencia laboral si corresponde. La imagen social SVG sigue siendo provisional; falta dominio canónico y una imagen PNG/JPEG adecuada para compartir.

No se reconstruyó el portfolio, no se modificó el vendor ni se hicieron commits. Las inconsistencias heredadas de radios, mínimos de altura y separación del pie continúan documentadas en `DESIGN.md`; no se atribuye a una revisión estática la validación de su comportamiento renderizado.

## Validación visual y funcional pendiente — intento del 12 de noviembre de 2026

**Estado: BLOQUEADA por el entorno. No se abrió el portfolio en un navegador.** Esta ejecución no completa la validación visual ni permite confirmar la preparación definitiva para producción. El build y las pruebas de Node sí se ejecutaron de nuevo y pasaron.

### Preparación y herramientas comprobadas

Se leyeron `DESIGN.md`, `docs/audit.md` y este historial. `PARTE.md` sigue sin existir. Entorno de ejecución: Node.js `v24.21.0` y npm `12.2.2`.

| Comprobación | Resultado real |
| --- | --- |
| Paquetes de navegador del proyecto | No había `playwright`, `playwright-core`, `@playwright/test`, `puppeteer` ni `puppeteer-core`. Tampoco estaba instalado Playwright para Python |
| Chromium/Chrome local | No encontrado en PATH, rutas habituales de sistema, cachés Playwright/Puppeteer, cachés revisadas y ubicaciones habituales de contenedor/Flatpak |
| Instalación inicial por npm | Falló con `getaddrinfo ENOTFOUND registry.npmjs.org` |
| Alternativa offline | Se encontraron `playwright` y `playwright-core` `1.62.1` en la caché existente. Se copiaron cuatro entradas a una caché temporal y se instalaron los dos paquetes de forma offline en `/tmp/portfolio-browser-validation` |
| Disponibilidad de Playwright | `node /tmp/portfolio-browser-validation/node_modules/playwright/cli.js --version` devolvió `Version 1.62.1` |
| Instalación de Chromium | Se intentó el mínimo headless con caché en `/tmp/portfolio-browser-cache`. La descarga falló con `getaddrinfo ENOTFOUND cdn.playwright.dev` |
| Compatibilidad de sistema | La CLI avisó que el SO no estaba soportado oficialmente y seleccionó el fallback `ubuntu24.04-x64`. No se llegó a comprobar su ejecución |
| Lanzamiento real solicitado a Playwright | `chromium.launch({ headless: true, timeout: 5000 })` falló: `Executable doesn't exist at /tmp/portfolio-browser-cache/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell` |
| Subproceso de diagnóstico | `spawnSync(process.execPath, ['-e', 'process.exit(0)'])` devolvió un error `EPERM`. Esto es una comprobación del entorno, no una prueba de la aplicación |
| Servidor local | Un intento de `listen(0, '127.0.0.1')` falló con `listen EPERM: operation not permitted 127.0.0.1` |

La instalación mínima intentada fue:

```sh
PLAYWRIGHT_BROWSERS_PATH=/tmp/portfolio-browser-cache \
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=10000 \
node /tmp/portfolio-browser-validation/node_modules/playwright/cli.js \
install chromium --only-shell --no-progress
```

La CLI intentó obtener Chrome Headless Shell `151.0.7922.34`, revisión Playwright `v1234`. Sus reintentos automáticos terminaron en error de DNS; no quedó un Chromium utilizable. Instalar el paquete npm de Playwright no equivale a tener un navegador disponible.

No se añadieron dependencias al proyecto: `package.json` y `package-lock.json` conservan su contenido original. La comprobación final detectó que npm había normalizado el lockfile añadiendo metadatos opcionales de otras plataformas, sin cambiar versiones ni el manifiesto raíz; se restauró la instantánea cuyo SHA-256 coincidía con el registrado al inicio. Herramientas, caché y logs de los intentos están exclusivamente bajo `/tmp/portfolio-browser-validation`, `/tmp/portfolio-browser-npm-cache` y `/tmp/portfolio-browser-cache`; son recursos temporales y pueden desaparecer al terminar el entorno.

### Dispositivos, resoluciones y evidencias

**Dispositivos físicos verificados: ninguno. Viewports abiertos en navegador: ninguno. Capturas obtenidas: ninguna.** No hay capturas simuladas ni resultados E2E presentados como ejecutados.

La matriz que sigue estaba prevista, pero **no se ejecutó**:

| Contexto previsto | Viewport previsto | Resultado de esta ejecución |
| --- | --- | --- |
| Escritorio | 1440×900 | No verificado: Chromium no inició |
| Escritorio compacto | 1024×768 | No verificado |
| Tablet vertical | 820×1180 | No verificado |
| Tablet vertical | 768×1024 | No verificado |
| Móvil | 390×844 | No verificado |
| Móvil estrecho | 320×640 | No verificado |

Siguen pendientes las capturas de hero, proyectos, perfil, stack, trayectoria y contacto, además del menú móvil abierto. No se comprobó por renderizado la alineación con `DESIGN.md`, la ausencia de overflow, texto cortado o solapes. Tampoco se ejecutaron pruebas de orientación horizontal o zoom al 200%.

### Interacciones y rendimiento: qué se pudo comprobar

| Área | Resultado |
| --- | --- |
| Anclas, ids, datos y recursos locales | Comprobados por la suite existente de Node/SSR |
| Teclado, Escape y cierre del menú | Handler de cabecera y lógica de Vue comprobados por la suite existente; **sin** eventos DOM, Tab/Shift+Tab ni foco nativo de navegador |
| Movimiento reducido | Lógica de cancelación/fallback comprobada en memoria por la suite; **sin** emulación de media query en Chromium ni observación visual |
| Animaciones y estados alternativos | Pruebas de lógica WAAPI simulada aprobadas; fluidez y respuesta visual no verificadas |
| Navegación y enlace de salto en navegador | No ejecutados |
| Errores de consola de navegador, red y recursos fallidos | No observados porque no hubo una página abierta; no se afirma que estén ausentes |
| CLS e hidratación móvil | Sin medición. Sigue pendiente el riesgo estructural documentado en `audit.md`: no se asigna CLS 0 ni otro valor |
| FPS, INP, LCP y costes de animación | No medidos |

Se midieron únicamente **tamaños de archivos del build**, sin navegación ni transferencia de red:

| Artefacto actual | Bytes sin comprimir | Gzip calculado localmente |
| --- | --- | --- |
| JavaScript de aplicación `index-CPMwDrKj.js` | 81 828 | 31 150 |
| CSS de aplicación `index-RRWtRf6K.css` | 20 952 | 5 113 |
| Base Taste `system.css` | 102 946 | 27 790 |
| Capa Taste `motion.css` | 25 717 | 6 754 |
| Base Taste `system.js` | 35 746 | 12 385 |

Los archivos de fuentes emitidos suman `117 812 bytes` en disco. Eso **no** prueba que un navegador descargue todos los subconjuntos: interviene `unicode-range`. Los tamaños gzip locales no prueban que el hosting sirva esa compresión.

`system.css` es el mayor archivo CSS individual medido, pero sin cobertura CSS o perfil de navegador no se identificó qué parte supone un coste innecesario para esta página. No se recortaron archivos vendor protegidos ni se modificaron animaciones sobre una estimación de rendimiento.

### Build, pruebas, correcciones y estado final

Se ejecutaron nuevamente:

- `npm run build`: correcto; Vite compiló y el script prerenderizó el portfolio. No hubo errores ni avisos de compilación en la salida.
- `npm test`: correcto. Este entorno muestra el resumen del archivo de pruebas.
- `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs`: **15 resultados correctos**, 0 fallos, 0 omitidos. No hubo avisos de Vue en esa ejecución.

**Defectos corregidos en esta etapa: ninguno.** No hubo una nueva observación de navegador que justificara cambiar la implementación. Los cuatro arreglos de la auditoría anterior se conservan. No se alteraron arquitectura, identidad, contenido o motion, ni se realizaron commits.

**Único documento actualizado en el proyecto:** `docs/validation.md`. Se regeneró `dist/` al ejecutar el build, sin cambiar las fuentes ni las dependencias.

**Preparación para producción:** la compilación y las pruebas disponibles están aprobadas, pero **no se puede confirmar la preparación técnica definitiva para producción** mientras falten comprobación funcional en navegador, evidencia visual y medición del riesgo de hidratación/CLS. También permanecen los datos reales de contacto, material de proyectos y metadatos de publicación señalados en la auditoría anterior.

**Siguiente paso exacto:** retomar en un entorno con acceso a la descarga de Chromium y permisos para iniciar el navegador y servir el portfolio; ejecutar la matriz anterior sobre `dist/`, capturar secciones/menú, comprobar navegación y foco con teclado, emular movimiento reducido, retrasar el JavaScript para observar la hidratación móvil y medir CLS, y revisar consola/recursos. Aplicar después únicamente los defectos reproducidos y repetir build y pruebas.

## Auditoría paralela con Impeccable

Tres subagentes independientes auditaron diseño/UX, rendimiento/accesibilidad y arquitectura Vue, sin editar. Los tres informes se recibieron antes de corregir; los mismos agentes reauditaron los cambios después. El informe consolidado está en [audit.md](audit.md).

- Se corrigieron contraste del primario active con movimiento reducido (3.70:1 → 8.00:1 calculado), Escape que alcanzaba un handler heredado de blur, limpieza tardía del diálogo al desmontar y referencia desalineada del enlace de salto.
- Se conservaron identidad, contenido personal, animaciones, dependencias y vendor originales. La limpieza ocurre antes de desmontar y no añade escuchas globales.
- Baseline de 14 resultados correctos; las regresiones añadidas fallaron antes del arreglo; 15 resultados correctos después. Escape se comprueba compilando el tag real de header; el cierre se comprueba mediante el host de Vue en memoria.
- Build y prerenderizado correctos. Copy-lint: 296 palabras, 0 FAIL y 0 WARN. Moments: un word-highlight, 0 WebGL, sin avisos. Reauditoría de los tres agentes favorable para los cuatro defectos corregidos.
- El intento actual de layout terminó con `no Chrome found (set CHROME_PATH)`. No se comprobaron renderizado, consola de navegador, foco nativo, dispositivos táctiles, zoom ni CWV.
- Sigue pendiente observar el cambio estructural de cabecera/hero al hidratar en móvil y medir su CLS. Los datos de contacto y las fichas reales de proyectos siguen pendientes del titular. Se puede compilar una preview, pero no se declara una validación definitiva de publicación.

## Etapa de motion con Emil's

Implementación y comprobaciones del 12 de noviembre de 2026. Los resultados de la implementación inicial se conservan en los apartados posteriores como historial; el `GATE: ERROR` inicial corresponde a aquella ejecución y no se ha repetido.

- Hero: entrada CSS del titular de 700 ms, grupos de 520 ms con pasos de 60 ms, sin texto oculto por defecto ni reescritura del DOM. Se deja de cargar el módulo JavaScript de motion de Taste y su marca de espera del hero.
- Menú: WAAPI nativo, 200 ms de apertura y 120 ms de cierre, inversión desde el estado calculado visible. Teclado, Escape, anclas y paso a escritorio no esperan la animación. Activar movimiento reducido cancela la transición y estabiliza el estado. Hay fallback sin WAAPI o si falla la animación.
- Feedback: variante de botón de icono, supresión del pseudoglifo duplicado, flecha con cuerpo y cabeza separados, subrayados comunes y estado del fragmento seleccionado. El hover de portadas sólo acerca la geometría un 2%; no eleva la ficha ni le asigna una acción inexistente.
- Se conserva el único momento de scroll del perfil. Sin nuevas dependencias, observers de aparición, parallax, loops ni cambios de paleta, tipografía, contenido o retículas.
- `npm run build`: compilación y prerenderizado correctos, sin avisos de compilación. Bundle de aplicación: 81.82 kB JS y 20.74 kB CSS sin gzip; estos pesos no son una medición de fluidez ni de Core Web Vitals.
- `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs`: 14 resultados correctos. Las pruebas cubren estructura y contenido, teclado inmediato, apertura duplicada, inversión de salida, navegación durante una transición, cambio de movimiento reducido, ausencia o fallo de WAAPI, cierre nativo simulado, paso a escritorio, fragmento y cancelación/limpieza al desmontar. No hubo avisos de Vue ni rechazos de promesas sin gestionar en esta ejecución.
- Se analizó `src/motion.css` con PostCSS: dos keyframes, ambos limitados a `transform` y `opacity`, sin `transition: all`.
- `copy-lint` sobre producción: 296 palabras, 0 FAIL y 0 WARN. `moments check`: un `word-highlight`, 0 contextos WebGL, sin avisos.
- El intento actual de revisión de layout en 1440×900, 1024×768, 820×1180, 768×1024 y 390×844 terminó con `no Chrome found (set CHROME_PATH)`. No hay capturas ni comprobación visual nueva, tampoco una validación de consola en navegador, FPS, CLS o interacciones táctiles reales.

**Pendiente de comprobación manual:** revisar la secuencia al cargar y con fuentes lentas; inspeccionar el menú a 2–5× de duración, invertirlo a mitad de salida y pulsar Escape; comprobar Tab/Shift+Tab, el foco al navegar y su restauración; cambiar movimiento reducido con el menú abierto; revisar hover y pulsación en escritorio, 320/390 px y un teléfono físico. No se afirma que esas verificaciones hayan pasado.

**Inconsistencias previas conservadas:** radios, grises de borde, `--container` heredado frente al ancho propio, mínimos de altura por especificidad y separación acumulada del footer. Se registran en `DESIGN.md`; no se corrigieron como parte de motion.

## Historial de la implementación inicial

GATE: ERROR (copy-lint.mjs could not run (exit 0: spawnSync /home/gp/.nvm/versions/node/v24.21.0/bin/node EPERM); consistency.mjs gave no report (exit 2); check.mjs could not run (exit 2))

Revisión del 12 de noviembre de 2026. El gate no pudo completar sus subprocesos por las restricciones del entorno. No se repitió después de su resultado ERROR. Por separado, `consistency.mjs` tampoco pudo abrir un puerto local entre 5200 y 5299, y `perf.mjs` falló al intentar abrir los puertos 5740–5749. `layout/check.mjs` terminó con `no Chrome found (set CHROME_PATH)`. No se realizaron capturas, comprobación visual responsive, pruebas de interacción en navegador ni medición de rendimiento. Esta entrega no cuenta con aprobación visual automática; no se han creado waivers.

El cargador `impeccable context --target src/App.vue` no pudo instalar su motor en `/home/gp/.impeccable/` por falta de permisos. Se siguió el procedimiento alternativo de lectura directa de `DESIGN.md`, del plan visual, de la implementación y de las referencias de la skill. No existe `PARTE.md` ni `PRODUCT.md`; no se inventaron reglas protegidas ni información personal.

## Cambios realizados

- `App.vue` conserva la composición y las seis secciones. `SiteHeader.vue` concentra el ciclo de vida y el estado del menú; `ProjectCard.vue` reutiliza las portadas originales; `SiteFooter.vue` concentra el cierre y el contacto. `ArrowIcon.vue` se reutiliza sin cambios.
- `src/data/portfolio.js` centraliza navegación, proyectos y tecnologías. Cabecera, menú móvil y pie comparten sus destinos; el contador de proyectos deriva de los datos.
- El menú evita aperturas duplicadas, entrega el foco a la sección elegida, cierra al pasar a escritorio y limpia sus escuchas al desmontarse. Los destinos de las anclas admiten foco programático sin entrar en el orden de Tab.
- Hasta que Vue y `showModal()` estén disponibles, la cabecera conserva los enlaces visibles en móvil y tablet. El botón se incorpora únicamente cuando puede funcionar. El diálogo cerrado permanece oculto explícitamente.
- Las alturas mínimas conservan la composición editorial y permiten que el contenido crezca. Se contemplan áreas seguras, pies con enlaces que pueden envolver y una columna de tecnologías bajo 390 px. El menú permite scroll en pantallas bajas. Se unifica el color secundario en su token.
- No se añadieron dependencias ni animaciones. Se conserva la entrada y el `word-highlight` existentes. No se alteraron los datos personales ni las portadas gráficas.

## Comprobaciones ejecutadas

- `npm run build`: correcto; compilación Vite y prerenderizado del contenido real de Vue en `dist/index.html`.
- `npm test`: correcto. También se ejecutó `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs`: 7 resultados correctos, correspondientes a la integración y sus seis subcasos, sin errores ni avisos de Vue.
- Las pruebas comprueban ids únicos, destinos existentes que reciben el foco, enlace de salto, un solo h1, etiquetas ARIA con referencias válidas, navegación compartida, proyectos y tecnologías confirmados, avisos provisionales y archivos de iconos.
- El host de Vue en memoria ejecuta el `setup` real de `SiteHeader.vue` con un diálogo simulado: apertura sin duplicados, cierre al navegar, petición de foco al destino, cierre por cambio a escritorio y limpieza de escuchas. No comprueba renderizado del menú, Tab, Escape ni restauración nativa del foco.
- `copy-lint.mjs dist/index.html --kind service`, ejecutado directamente: 296 palabras, 0 FAIL y 0 WARN. La ejecución directa sí funcionó; el gate no pudo lanzar su propia copia del proceso.
- `moments.mjs check dist/index.html --page service`: correcto; un momento `word-highlight`, cero contextos WebGL, sin avisos abiertos.
- Recursos originales: ocho iconos locales y su registro de procedencia. Fuentes locales con sus licencias. Se compararon los 11 archivos de `public/assets/taste/` con los originales de la skill: todos idénticos.

## Dirección registrada

Tipo service, portfolio de un desarrollador. Paleta white-link-blue: blanco para dar protagonismo al texto y cobalto para las acciones. Hero statement, nav-centre, footer-columns, cierre close-type, ritmo surface-pairs, botones arrow. Sin fondos de efectos, shaders, escenas, loops ni fotografías. Un momento tipográfico word-highlight en Sobre mí.

El dealer propuso Red Hat Display / Red Hat Text. Al no estar disponibles sin red se emplearon Geist Variable e Instrument Serif, presentes en la caché local y servidas desde el proyecto. Se descartó el primer hero film por falta de vídeo/fotografía. El mark initial pasó a wordmark porque no se facilitó el nombre. La escala del hero se amplió para el portfolio y las secciones móviles crecen con su contenido. No se han creado waivers para esconder problemas del checker; los controles en navegador quedan sin ejecutar.

Voz: primera persona, directa, con los nombres y términos técnicos del brief. No se conservaron WARN de copy-lint. No hay hechos, marcas personales, testimonios, fechas, precios, empleadores ni cifras de resultados asumidos. No se creó un nombre de marca y no fue necesaria una búsqueda de nombres.

## Contenido pendiente

Nombre personal, institución y fechas, experiencia laboral si corresponde, correo y perfiles, dominio canónico. De cada proyecto faltan descripción, alcance, participación, stack confirmado, enlaces y capturas reales. Las tres portadas son conceptos gráficos originales y están identificadas como provisionales; no se han usado capturas de otros productos ni retratos o fotografías de stock.

No existe formulario ni dirección `.example`, y no se simula un envío. Los canales de contacto muestran su estado pendiente. La imagen social SVG es una propuesta provisional; para publicar falta una captura PNG/JPEG y la URL canónica.

## Siguiente comprobación

Ejecutar `npm run dev` en un entorno que permita abrir puertos. Revisar 1440×900, 1024×768, 820×1180, 768×1024, 390×844 y 320 px: primer viewport, altura de contenido, portadas, menú abierto/cerrado, Tab y Shift+Tab, Escape, restauración de foco, navegación por anclas y enlaces al usar Atrás/Adelante. Revisar también orientación horizontal, zoom al 200%, JavaScript desactivado, movimiento reducido y un teléfono real. Ejecutar después layout, consistency y perf con Chrome disponible. No se han verificado esos resultados.

Antes de publicar, incorporar los datos y destinos reales indicados arriba. La siguiente etapa con Emil puede afinar las interacciones existentes una vez revisadas estas comprobaciones; no se han introducido efectos nuevos en esta implementación.
