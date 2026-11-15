# Limpieza segura del portfolio

15 de noviembre de2026. Alcance: retirar materiales reemplazados y duplicados, manteniendo la implementación actual. Sin rediseño, cambios de datos personales, dependencias nuevas, commits ni push.

## Inventario previo y criterio

[cleanup-inventory.csv](cleanup-inventory.csv) contiene1832 entradas con ruta, bytes, función, uso, categoría, acción y motivo; los archivos retirados incluyen SHA-256. Se escribió antes de retirar archivos. Los grupos de dependencias y metadatos locales se inventariaron conjuntamente; no se inspeccionó ni modificó su contenido como código de aplicación.

| Categoría | Criterio y decisión |
| --- | --- |
|1. Producción | Todos los componentes alcanzables desde `src/main.js`, estilos, fuentes, iconos, manifiesto,160 frames y los dos SVG actuales. Conservar. |
|2. Desarrollo/mantenimiento | Pruebas, snapshots, configuraciones, licencias, documentación, referencias fuente de los SVG y dependencias instaladas. Conservar. `dist/` se regenera y no se versiona. |
|3. Obsoletos confirmados | Copias idénticas, escenas reemplazadas, controlador sin montar, ejemplos, demos y resultados regenerables. Retirar después de migrar las comprobaciones históricas. |
|4. Revisión manual | Tres maestros artísticos únicos del último kit. Conservar; no se deduce que sobren por carecer de imports. |

Git devuelve `not a git repository` en este entorno. No se pudo identificar el estado rastreado/ignorado mediante Git ni se inicializó un repositorio nuevo. El origen de las eliminaciones se verificó mediante contenido, rutas y consumidores: ambos ZIP coincidían en todas sus entradas con los kits instalados (27/27 y193/193), las dos carpetas del primer kit eran idénticas y los169 recursos de distribución del último kit coincidían con `public/portfolio-scroll/`. No se retiraron archivos de origen desconocido ni de otros proyectos.

Graphify contenía un mapa de herramientas locales sin nodos de `src/`, `scripts/` o `tests/`; no se utilizó para decidir eliminaciones de la aplicación. Las decisiones proceden del grafo de imports actual, búsquedas de consumidores, pruebas y rutas dinámicas.

## Archivos y carpetas retirados

La lista individual completa está en el CSV, filtrando `action=eliminar`.

| Ruta o grupo | Archivos | Bytes retirados | Motivo |
| --- | ---: | ---: | --- |
| `portfolio_completo/` |27 |13.324.396 | Copia exacta del primer kit. |
| `portfolio_completo.zip` |1 |12.386.943 | Archivo ya descomprimido y reemplazado. |
| `kit_joestar_completo_nuevo(2).zip` |1 |12.266.840 | Distribución instalada; maestros únicos conservados. |
| Recursos de `portfolio_johnny_gyro_kit/` |23 |13.306.382 | PNG separados, fondos, SVG antiguos, referencias y demo sustituidos. Sus cuatro documentos útiles se archivaron. |
| `public/portfolio-scenes/` |15 |6.610.060 | No tenía consumidores en la página; Vite seguía copiándolo al build. |
| Distribución, `preview/` y `src-snippets/` de `portfolio_joestar_amanecer_80f/` |187 |7.338.628 | Copia duplicada de169 recursos y18 archivos de demo/ejemplo. |
| `public/portfolio-scroll/posters/` |4 |204.974 | No utilizados por el fallback ni por movimiento reducido. |
| `src/composables/useSceneNarrative.js`, `src/data/scenes.js` |2 |7.691 | Sistema anterior sólo consumido por pruebas históricas. |
| `docs/audit-phase3/` |27 |2.579.962 | Capturas temporales; no eran snapshots de pruebas ni tenían enlaces entrantes. |
| `playwright-report/` |345 |100.633.639 | Informes HTML/JSON y trazas regenerables. |
| `test-results/` |688 |176.994.556 | Diagnósticos de ejecuciones anteriores. |
| **Total** |**1320** |**345.654.071** | **329,64 MiB de archivos obsoletos.** |

Además, el build regenerado ocupa6.801.090 bytes frente a13.616.124:6.815.034 bytes menos (6,50 MiB). El ahorro bruto conjunto es336,14 MiB; el inventario, las nuevas huellas y la documentación ocupan aproximadamente0,5 MiB. El balance neto exacto de bytes lógicos queda en [cleanup-results.json](cleanup-results.json); no se presenta como medición de bloques libres del disco ni de tamaño del historial Git.

No existían `portfolio_scroll_cinematico/` ni `portfolio_cinematico_definitivo/`.

## Conservados y decisiones dudosas

- **Secuencia:**80 frames de escritorio1536×864 y80 móviles720×1280, todos los nombres000–079; manifiesto sin cambios. Se mantienen061 y062 aunque sus contenidos se repitan porque ambos índices son parte del recorrido.
- **Geometrías:** `public/portfolio-scroll/overlays/joestar-star.svg` y `golden-ratio.svg`, además de sus dos archivos `-source.svg` como referencia de procedencia. No se sustituyen por los SVG antiguos ni por imágenes rasterizadas.
- **Responsive y accesibilidad:** `<picture>` del000, selección de variante, Canvas y hitos reducidos000/027/052/079. Ninguno de ellos consulta los pósteres retirados.
- **Aplicación:** ocho componentes Vue activos, dos composables actuales, datos profesionales, dos hojas de estilo, importaciones tipográficas y paquetes npm. Todo el código restante es alcanzable desde la entrada; no se recortó CSS vendor protegido ni reglas responsive por búsquedas superficiales.
- **Pruebas:** ocho archivos unitarios, suite Playwright completa y34 capturas de referencia. Los informes generados se eliminaron, las referencias para comparaciones futuras se conservaron.
- **Documentación:** DESIGN, PARTE, README, documentos de validación, auditoría y plan visual, evidencia JSON de la segunda fase y los originales de instrucciones. Los cuatro documentos del primer kit pasan a `docs/archive/joestar-v1/` sin cambios de bytes; se añadió una nota para identificarlos como históricos.
- **Maestros únicos, categoría4:** `portfolio_joestar_amanecer_80f/sources/hero-original.png`, `contact-master-approved-desktop.png` y `contact-master-approved-mobile.png`. No se eliminaron; pueden servir para edición artística futura y no se despliegan con Vite.
- **Entorno local:** `.agents/`, `.aws/`, `.codex/`, `.git/`, `.taste-skill/`, `graphify-out/` y dependencias instaladas se conservaron. No se borró contenido de origen no verificable. Los metadatos de agentes/Graphify se excluyen de publicación.

## Cambios auxiliares

- `.gitignore`: añade exclusiones de raíz para `.agents/`, `.aws/`, `.codex/`, `graphify-out/`, `.cleanup-staging/` y `docs/audit-phase3/`. Ya excluía `node_modules/`, `dist/`, `.taste-skill/`, variables de entorno, logs e informes de Playwright. Las capturas bajo `tests/e2e/snapshots/` siguen incluidas.
- `tests/scenes.test.mjs`: sustituye la dependencia de las carpetas completas de los kits por165 huellas SHA-256 fijas de recursos aprobados; comprueba nombres, manifiesto, SVG, RIFF/WebP, prerender y ausencia de la distribución antigua.
- `tests/scene-motion.test.mjs`: prueba la secuencia actual0–79–0 con distancias desiguales y aloja la regresión existente del ciclo de vida del Canvas. Los casos del crossfade/cursor retirados dejan de exigir conservar código muerto.
- `tests/scroll-sequence.test.mjs`: conserva las pruebas actuales de caché, reintentos y manifiesto; el caso del controlador se trasladó sin cambios de lógica al archivo de movimiento. No se borró ningún archivo de pruebas ni snapshot.
- `README.md`, `DESIGN.md`, `PARTE.md`, `docs/validation.md` y los avisos de instalación del kit reflejan las rutas finales. `tests/fixtures/scroll-assets.sha256.json` se conserva en Git como referencia de integridad; no regenerar sus valores automáticamente al ejecutar pruebas.

## Validación y estado final

| Comprobación | Resultado |
| --- | --- |
| Build antes y después | Aprobados, incluidos prerender y coincidencia de scopes HTML/CSS. |
| `npm test` |8 archivos aprobados. |
| Runner sin aislamiento |40 pruebas aprobadas,0 fallos. |
| Sintaxis |20 archivos JS/MJS aprobados con `node --check`. No hay linter configurado. |
| Frames y SVG |160 nombres completos, formatos/dimensiones comprobados por ImageMagick y165 huellas SHA-256 correctas. |
| Imports y recursos |13 archivos JS/Vue alcanzables desde `main.js`, dos CSS incluidos; todos los recursos públicos retenidos se copian idénticos a `dist/`. |
| Comparación de producción | HTML, JS y CSS idénticos al build previo. Componentes, estilos, controlador actual, datos personales, fuentes y vendor retenidos sin cambios. |
| Playwright |216 casos enumerados; ejecución completa pendiente fuera del sandbox. |
| Chrome DevTools MCP |No pudo conectar: `ECONNREFUSED 127.0.0.1:9222`. Sin comprobación visual nueva. |
| Revisión de cambios |Comparación con hashes y copias previas, ya que Git no está disponible; eliminaciones limitadas al inventario revisado. |

Los candidatos se apartaron primero dentro de la raíz y se conservaron hasta superar build, pruebas e integridad, permitiendo restaurarlos ante un fallo. Tras validar, se eliminó únicamente esa lista verificada; la carpeta temporal de restauración no forma parte del resultado final.

El repositorio está más limpio y el build conserva exactamente su código y presentación previos. Antes de publicar, comprobar el estado real de Git desde una terminal con acceso al repositorio y ejecutar/revisar Playwright. Permanecen los límites de los assets (doble contorno en070 y cambio de pose en la disolvencia), las referencias visuales antiguas que requieren revisión y los datos de proyectos/LinkedIn pendientes. Esta limpieza no certifica la auditoría visual integral ni corrige esos contenidos.
