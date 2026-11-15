# Auditoría paralela del portfolio

Fecha: 12 de noviembre de 2026. Alcance: implementación Vue 3 actual, identidad de `DESIGN.md` y motion de Emil's. Superficie Experience; no se aprobó un rediseño.

## Procedimiento y límites

Se crearon **exactamente tres subagentes independientes**, ejecutados en paralelo y sin permiso para editar. El agente principal recibió los tres informes antes de modificar archivos, consolidó duplicados y aplicó las correcciones. Después, los mismos tres agentes revisaron los cambios en lectura.

Se aplicaron las referencias de Impeccable `critique`, `audit`, `polish`, `harden` y `optimize` según el ámbito. El launcher no estuvo disponible por restricciones del motor; se utilizó su procedimiento alternativo de lectura directa. No se ejecutó el detector de Impeccable ni se obtuvo una certificación visual. No existía `PARTE.md`.

La auditoría combina lectura de código, comprobaciones deterministas en memoria, cálculos de contraste, compilación y pruebas. No hay medición de Lighthouse, CWV, FPS o lector de pantalla, ni prueba de dispositivos físicos. No se emite una declaración de conformidad WCAG global a partir de estas comprobaciones.

## Resumen de los tres subagentes

| Auditor | Resultado inicial | Reauditoría |
| --- | --- | --- |
| 1. Diseño y UX | Identidad coherente, jerarquía y contenido provisional bien diferenciados. Detectó cambio de geometría al hidratar en móvil, borde desalineado del enlace de salto y bloqueos de contenido para publicar. No justificó reconstruir componentes ni uniformar por gusto los radios y bordes. | Confirmó la equivalencia del ancho antes/después y la nueva alineación del enlace de salto en nueve anchos, con y sin inset lateral de 96px: 18 escenarios matemáticos. La geometría de hidratación sigue pendiente de observación. |
| 2. Rendimiento y accesibilidad | Confirmó contraste insuficiente en active con movimiento reducido y Escape que retiraba el foco por un handler heredado. Coincidió en el riesgo de hidratación. No encontró una dependencia innecesaria ni animaciones nuevas que alteraran layout por frame. | Confirmó contraste nuevo de 7.9959:1, prioridad de cascada, Escape sin preventDefault y limpieza previa al desmontaje. No detectó regresiones nuevas por código. |
| 3. Arquitectura y Vue | Componentes, datos compartidos y configuración coherentes. Reprodujo que onUnmounted ya no disponía del ref para cerrar explícitamente el diálogo y señaló el límite del host simulado de pruebas. No encontró problemas críticos o altos de arquitectura. | Reprodujo un close, una cancelación y cero escuchas restantes con onBeforeUnmount. Revisó el handler de Escape compilado y la nueva aserción de desmontaje. |

La valoración heurística del auditor UX fue provisional y estática. No se convierte en una puntuación global de accesibilidad, rendimiento o calidad renderizada.

## Consolidación y severidad

Antes de corregir se confirmaron **cuatro defectos de código**: uno alto, uno medio y dos bajos. Se corrigieron los cuatro. No hubo hallazgos críticos confirmados. El cambio de geometría móvil se conserva como riesgo medio; faltan además datos del titular para publicar un portfolio definitivo.

| ID | Severidad | Hallazgo y evidencia | Archivos afectados | Estado |
| --- | --- | --- | --- | --- |
| A1 | Alto | Active con movimiento reducido usaba azul al 74% mezclado con blanco: contraste 3.6987:1 para texto blanco de 16px, inferior a 4.5:1. | `src/motion.css`; origen heredado en `public/assets/taste/motion/motion.css:317` | Corregido mediante override propio |
| A2 | Medio | `system.js:103–106` ejecutaba blur al pulsar Escape en la cabecera sin menú abierto. La protección estaba sólo en el diálogo. | `src/components/SiteHeader.vue` | Corregido en el límite de eventos de header |
| A3 | Bajo | `onUnmounted` ejecutaba la limpieza después de que Vue anulase el ref del diálogo; no llegaba a close. El navegador también limpia diálogos retirados: no se afirmó que el documento quedase bloqueado. | `src/components/SiteHeader.vue`, `tests/portfolio.test.mjs` | Corregido con onBeforeUnmount y aserción de cierre |
| A4 | Bajo | El máximo propio de 1312px y el token heredado de 1280px daban referencias distintas al contenido y al enlace de salto. | `src/style.css` | Corregido con un token común y borde basado en --edge |
| P1 | Medio, riesgo de rendimiento | La cabecera SSR es estática y muestra enlaces; al activar menuReady se vuelve fija y cambia el padding del hero. La diferencia estructural es real; no se midió cuánto contenido se desplaza ni CLS. | `src/components/SiteHeader.vue`, `src/style.css` | Pendiente de navegador; se conserva la alternativa funcional sin JS |
| P2 | Alto para publicación; contenido | El cierre de contacto carece de correo o perfiles operativos. Los avisos son honestos y no constituyen un error de implementación. | `src/components/SiteFooter.vue` | Requiere datos reales del titular |
| P3 | Medio para publicación; contenido | Second Brain, Vende360 e Idemne no tienen aún descripción, alcance, stack por proyecto, capturas o destinos confirmados. | `src/App.vue`, `src/components/ProjectCard.vue`, `src/data/portfolio.js` | Requiere material real del titular |

Se eliminaron las recomendaciones duplicadas sobre hidratación y se unieron la cobertura insuficiente del desmontaje y su defecto de ciclo de vida. No se convirtió una preferencia estética en una corrección.

## Correcciones integradas

### Contraste sin retirar el feedback

Bajo `prefers-reduced-motion: reduce`, el primario pulsado usa ahora `color-mix(in oklab, var(--action) 86%, var(--ink))`. Se conservan colores existentes y feedback tonal; no se añade desplazamiento.

La nueva regla y la regla vendor tienen especificidad `(0,3,1)`. El CSS compilado propio se carga después y prevalece.

| Estado | Mezcla | Luminancia calculada | Contraste con blanco |
| --- | --- | --- | --- |
| Anterior | Azul 74% + blanco 26% | `0.23388037358541677` | `3.6987410814579103:1` |
| Corregido | Azul 86% + tinta 14% | `0.0813170317553716` | `7.995916340509647:1` |

Cálculo sRGB → RGB lineal → OKLab, mezcla, conversión inversa y luminancia relativa. El nuevo color es aproximadamente sRGB `(25.37499, 68.00504, 191.53929)`; `1.05 / (0.0813170317553716 + 0.05)` produce el ratio indicado. Es una comprobación de ese estado, no una auditoría renderizada completa.

### Escape, modalidad y limpieza

`@keydown.esc.stop` está en el header completo. Escape no alcanza el controlador antiguo de Taste que quita el foco. No se añade `preventDefault` al keydown; el `@cancel.prevent="closeMenu()"` local sigue cerrando el diálogo.

La limpieza pasa a `onBeforeUnmount` para cerrar mientras el ref existe. Se mantienen la cancelación de WAAPI, el control de identidad frente a promesas antiguas y la eliminación de las tres escuchas propias. No se agrega otra escucha global.

### Alineación y mantenimiento

`--container: 1312px` centraliza el máximo ya utilizado. `.wrap` lo consume, y el enlace de salto usa `max(var(--edge), calc((100% - var(--container)) / 2))`. La fórmula mantiene los márgenes de 64/48/24px y la protección simétrica por insets.

No se modificaron paleta base, fuentes, contenido personal, retículas, radios, separadores, secuencia del hero, velocidades del menú ni geometrías de proyectos. No se editaron vendor, dependencias o configuración de compilación. No se realizaron commits.

## Optimizaciones y decisiones descartadas

- Cierre explícito y liberación de recursos antes de retirar el diálogo.
- Un único límite de eventos de Escape en lugar de handlers duplicados.
- Un token de contenedor compartido en lugar de dos referencias de ancho incompatibles.
- Se conservan transform/opacity, ausencia de renders por frame y ausencia de will-change permanente.
- No se recortó CSS vendor ni se sustituyeron fuentes/dependencias sin una medición que justificase el riesgo.
- Los subconjuntos de fuentes emitidos no prueban que todos se descarguen: el navegador decide mediante unicode-range.
- No se intentó ocultar contenido, agregar temporizadores o introducir otro menú para resolver un CLS aún sin observar.

No se afirma una mejora de CWV o FPS: esas métricas no pudieron medirse.

## Validación ejecutada

- Baseline antes de editar: 14 resultados correctos con `node --test --test-isolation=none --test-reporter=spec tests/portfolio.test.mjs`.
- Las nuevas comprobaciones de Escape y cierre al desmontar fallaron contra la implementación anterior; pasaron después de las correcciones.
- Tras las correcciones: 15 resultados correctos, incluyendo navegación, anclas, contenido, recursos, teclado inmediato, inversión/cancelación de WAAPI, movimiento reducido dinámico, fallback sin WAAPI, cierre y limpieza.
- El test nuevo compila el tag header real y comprueba que Escape detiene propagación sin impedir la acción predeterminada, mientras Tab permanece libre. No ejecuta propagación DOM ni restauración de foco nativas.
- `npm run build`: compilación Vite y prerenderizado correctos, sin errores ni avisos de compilación.
- `copy-lint` de producción: 296 palabras, 0 FAIL, 0 WARN.
- `moments check`: un word-highlight, 0 contextos WebGL, sin avisos.
- Los tres subagentes repitieron la revisión de los puntos corregidos, sin modificar archivos.
- Se revisó el diff contra una instantánea previa en memoria y copias de comparación bajo `/tmp/portfolio-audit-before/`. El directorio .git de este entorno no contiene un repositorio utilizable.

El intento de comprobar layout en 1440×900, 1024×768, 820×1180, 768×1024 y 390×844 terminó con `no Chrome found (set CHROME_PATH)`. No hubo capturas nuevas. Los resultados de Node no equivalen a revisar consola, foco nativo, touch, zoom o motion en navegador.

## Estado final y siguiente paso

**La base técnica puede compilarse y previsualizarse; todavía no se considera un portfolio definitivo validado para publicación.** Los cuatro defectos confirmados están corregidos y las animaciones de Emil's permanecen. No se detectaron regresiones nuevas en las comprobaciones disponibles.

Antes de publicar: comprobar la hidratación móvil con carga lenta y medir CLS; recorrer Tab/Shift+Tab, Escape, enlaces, Atrás/Adelante y menú en navegadores reales; verificar movimiento reducido, hover y tacto, 320px y zoom al 200%; revisar consola y recursos; incorporar contacto y material de proyectos confirmados, dominio canónico e imagen social definitiva.

El contenido pendiente no autoriza a inventar información personal ni enlaces. Las diferencias de radios y grises documentadas se conservan hasta que una prueba demuestre un perjuicio real.
