# Contenido de las once fichas

15 de noviembre de 2026. Impeccable aplicado como refinamiento de contenido y legibilidad sobre el diseño existente. Sin reconstrucción, nuevas dependencias ni commits.

## Fuente y alcance

`PORTFOLIO_CONTENT.md` no existía en el workspace. Se buscó por nombre y variantes y, para continuar con información ya autorizada, se creó con los textos completos que el titular había compartido en la conversación. Se leyó completamente y se trasladó a `src/data/portfolio.js`. La aplicación no incorpora un parser Markdown ni un generador nuevo en producción; ambos archivos se mantienen como fuente editorial y datos de presentación respectivamente.

Las once fichas tienen descripción, todos sus apartados y contenido específico. Las pruebas comparan los textos de los datos con la fuente editorial y renderizan la plantilla de cada ficha para comprobar que no se pierde información.

| Ficha | Contenido confirmado y límites |
| --- | --- |
| Second Brain | Prototipo empresarial funcional en evolución; código y datos internos privados. |
| Vende360 | Participación en prácticas profesionales; algunas funciones son interfaces o integraciones parciales. Enlace público pendiente. |
| Idemne | Diseño y preproducción; mecánicas planificadas, implementación en Godot como siguiente etapa y sin demo jugable. |
| C++ | Algoritmos, estructuras de datos, memoria y programación orientada a objetos en contextos académicos. |
| Java | Aplicaciones académicas con MVC, Swing, SQLite y organización modular. |
| Python | Scripts, SQLite, herramientas y actividades académicas y de enseñanza. |
| TypeScript | Second Brain, contratos de datos, DTO, validación y backend con NestJS. |
| Vue | Interfaces, componentes, formularios, APIs y responsive en Second Brain y Vende360. |
| Nuxt | Vistas, navegación, integración, configuración y despliegue en Second Brain y Vende360. |
| NestJS | Módulos, controladores, servicios, MariaDB, pruebas y seguridad en Second Brain. |
| SQL | MariaDB, SQLite, consultas, relaciones e integración con servicios backend. |

No se añadieron porcentajes de conocimiento, fechas, empresas, enlaces, credenciales ni datos de infraestructura. LinkedIn conserva `href: null`; los enlaces de proyecto permanecen vacíos. La nota de disponibilidad de cada proyecto reemplaza el aviso genérico de repositorio/demo, manteniendo el pendiente real de Vende360.

## Presentación y comportamiento

| Antes | Después | Motivo |
| --- | --- | --- |
| Datos vacíos y avisos genéricos | Contenido confirmado en tres proyectos y ocho tecnologías | Describir el trabajo real sin inferencias. |
| «Ficha en preparación» en las tarjetas | Estado confirmado y frase proporcionada bajo la portada | Identificar cada proyecto y su situación. |
| Texto ampliado en un solo párrafo | Párrafos separados y listas con espacio entre elementos | Facilitar la lectura del contenido extenso. |
| Tecnologías como lista genérica | Etiquetas con ajuste de línea y semántica de lista | Hacerlas fáciles de localizar. |
| Disponibilidad de repositorios sin documentar | Explicaciones específicas sin enlaces ficticios | Respetar confidencialidad y estados reales. |

Se conservan los seis títulos de apartados de proyectos y los cuatro de tecnologías, el h2 con el nombre de la ficha, la portada conceptual y el diálogo nativo compartido. Los avisos de Vende360 e Idemne aparecen **antes** de las funcionalidades. Los aspectos técnicos son párrafos; objetivos y funciones siguen siendo listas.

La frase de Trayectoria que presentaba los tres como proyectos ya desarrollados se ajustó para distinguir Second Brain, las prácticas de Vende360 y la preproducción de Idemne. No se completaron las fechas ni la formación institucional pendientes.

Los estilos conservan Dark Premium, Geist, los tamaños existentes y los tokens de superficie, borde y tinta. El modal mantiene `overflow-y: auto`, `overscroll-behavior: contain`, alto máximo basado en `svh` y áreas seguras, y ajuste móvil bajo640px. Las etiquetas usan `flex-wrap` y anchura máxima100%; los párrafos y listas conservan el ajuste de palabras. No hay altura fija ni animación nueva. El scroll se reinicia al cambiar de ficha.

`useDialogMotion.js`, el Canvas, los SVG, todos los frames y el resto de módulos de animación se conservaron sin cambios. Escape y el retorno de foco se revisaron mediante sus pruebas existentes y un recorrido de las once fichas en host Vue; eso no sustituye el comportamiento nativo de un navegador real.

## Verificaciones ejecutadas

- `npm run build`: aprobado, incluido prerender y control de scopes CSS/HTML. JS115,51 kB y CSS29,34 kB antes de gzip; incremento asociado al contenido real, sin dependencias nuevas.
- `npm test`: ocho archivos aprobados. Runner detallado sin aislamiento: **42 pruebas, 0 fallos**.
- Regresión nueva: las once fichas se abren en host Vue, renderizan cada párrafo, lista, aviso y nota de disponibilidad, mantienen los títulos y devuelven el foco solicitado al cerrar. No aparecen avisos genéricos en apartados completos.
- Escape, clic exterior, padding interior, reinicio de scroll, enlaces válidos, movimiento reducido, interrupción de animaciones y desmontaje: pruebas aprobadas.
- Recursos: la suite verifica165 huellas, incluidos160 frames, manifiesto y SVG. Comparación adicional con hashes previos: todos los recursos públicos y controladores de animación permanecen idénticos.
- Sintaxis: cinco archivos JS/MJS modificados aprobados con `node --check`. No hay linter configurado.
- `npm run test:e2e -- --list --reporter=list`:216 casos enumerados. Se actualizaron los casos de cada ficha para comprobar textos, etiquetas, ausencia de avisos vacíos y scroll interno de los proyectos.

## Verificaciones pendientes y límites

Chrome DevTools MCP devolvió `ECONNREFUSED 127.0.0.1:9222`. **No se ejecutó una revisión visual responsive ni la suite Playwright completa en esta tarea.** No se lanzó Chromium dentro del sandbox, conforme a AGENTS.md.

La revisión responsive disponible fue de código y reglas CSS. Quedan por comprobar en el navegador los ocho tamaños de la suite, zoom200%, longitud real de las tarjetas y etiquetas, scroll táctil, Tab/Shift+Tab, Escape y retorno de foco nativos. Las capturas de referencia anteriores se conservan; sus diferencias por el nuevo contenido deben revisarse desde una terminal externa, no aprobarse automáticamente.

Git tampoco expone un repositorio válido en este entorno. Se revisaron cambios mediante hashes y parches acotados; no se hicieron commits ni push. Los defectos pintados del tramo final de la secuencia cinematográfica y los enlaces personales no proporcionados siguen pendientes de decisiones del titular.

## Archivos modificados

`PORTFOLIO_CONTENT.md` (nuevo); `src/data/portfolio.js`; `src/components/ProjectCard.vue`; `src/components/DetailDialog.vue`; `src/style.css`; `src/App.vue` (un párrafo); `tests/content.test.mjs`; `tests/dialog.test.mjs`; `tests/portfolio.test.mjs`; `tests/e2e/portfolio.spec.mjs`; `README.md`; `DESIGN.md`; `PARTE.md`; `docs/validation.md`; este informe. `dist/` se regeneró y permanece ignorado.
