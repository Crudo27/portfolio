# Prompts para Codex CLI — Kit de noche a amanecer

Ejecutar **uno por uno**, con el proyecto Vue abierto. Confirma los nombres reales de las skills instaladas: `$design-taste-frontend`, `$emil-design-eng` y `$impeccable` si están disponibles.

## PROMPT 1 — Integración de los 80 frames

```text
$design-taste-frontend
$impeccable

Quiero incorporar el kit `portfolio_joestar_amanecer_80f/` en mi portfolio Vue 3 sin rediseñar la interfaz.

Antes de editar lee `DESIGN.md`, `portfolio_joestar_amanecer_80f/README_EMPIEZA_AQUI.md`, `portfolio_joestar_amanecer_80f/src-snippets/PortfolioScrollSequence.vue` y `public/portfolio-scroll/scroll-manifest.json`.

Verifica 80 imágenes WebP desktop, 80 mobile, pósteres, y los SVG joestar-star.svg y golden-ratio.svg. Si falta alguna, informa y detén la integración de la secuencia.

Usa un único componente Vue de fondo/canvas, adaptado al proyecto. Desactiva las capas antiguas que añaden PNG de Johnny o Gyro y las secuencias visuales antiguas: ambos personajes ya están dibujados en las imágenes completas. Mantén intactos el Hero, los contenidos, el stack, los proyectos, los modales, el contacto, el tema oscuro y la navegación.

Integra primero frame 000 como fondo decorativo responsive, sin interceptar clics (pointer-events:none y aria-hidden). Respeta la superposición visual: textos y botones siempre por encima, gradiente de contraste si hace falta. No hagas commits. Ejecuta build y pruebas disponibles. Detente al terminar esta fase.
```

## PROMPT 2 — Scroll-scrubbing con progresión nocturna

```text
$emil-design-eng
$impeccable

Ya está integrado el primer frame del kit. Implementa ahora scrubbing bidireccional con 80 frames: Hero 000, Proyectos 027, Stack 052, Contacto 079. El frame debe avanzar cuando el usuario baja y retroceder cuando sube, interpolando según los topes REALES de las secciones del DOM.

La noche progresa al amanecer. En el tramo final, Gyro ya está integrado en los frames junto a Johnny, a la IZQUIERDA. No insertes PNG de personajes sobre las escenas: son ilustraciones completas.

Usa `public/portfolio-scroll/scroll-manifest.json`; no inventes nombres de recursos. Proyectos muestra `overlays/joestar-star.svg` como nodos que trazan una estrella de cinco puntas. Stack usa `overlays/golden-ratio.svg` como espiral logarítmica y rectángulos áureos, reemplazando HUD circulares antiguos.

Rendimiento: rAF, scroll pasivo, caché LRU (12–14 imágenes), precarga de frames cercanos, conserva el último frame decodificado si uno no está listo. Carga solo variante desktop o mobile, limpia recursos en unmount, no fuerces 160 imágenes a la vez. Implementa prefers-reduced-motion con fotogramas fijos de sección.

Los recursos finales derivan de dos pinturas; existe una breve disolvencia y puede haber pequeños cambios de pose en los últimos frames. No añadas transformaciones de personajes ni recortes que puedan empeorar el resultado.

Verifica la navegación y el scroll hacia abajo y hacia arriba, ejecuta build y tests. Si DevTools MCP puede controlar Chromium, toma capturas del inicio y final. No hagas commits. Detente al terminar esta fase.
```

## PROMPT 3 — Auditoría y pulido final

```text
$impeccable

Realiza una revisión final con hasta tres subagentes si están disponibles: 1) continuidad visual/fondos y legibilidad; 2) rendimiento de la secuencia y memoria; 3) Vue, accesibilidad y regresiones. Empieza con análisis de solo lectura y consolida hallazgos antes de editar.

Inspecciona los frames 000, 027, 052 y 079, incluyendo la versión móvil. Asegura que el final muestre a Gyro sentado a la izquierda de Johnny viendo el amanecer. Las geometrías SVG deben aparecer solo en las secciones indicadas. Corrige problemas comprobables de integración sin rediseñar el portfolio ni añadir capas de personajes.

Ejecuta build, tests y comprobaciones que el entorno permita. Usa Chrome DevTools MCP si está disponible y documenta claramente lo que no se pudo probar. Actualiza `DESIGN.md` y `docs/validation.md` si corresponde. No crees commits automáticamente.
```
