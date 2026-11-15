# Pruebas visuales y funcionales

Esta suite se ejecuta desde una terminal normal, fuera del sandbox de Codex CLI. No cambia el diseño. Playwright está fijado en `package-lock.json`; usa el Chromium correspondiente a esa versión, aunque tengas otra instalación de Playwright disponible.

En la segunda fase, `scenes.spec.mjs` comprueba el Canvas con los hitos000/027/052/079 al bajar/subir, caché≤12, geometrías dentro del fondo, variantes por ancho/proporción, movimiento reducido y margen final del footer. Los snapshots anteriores necesitan revisión de diferencias; no se regeneraron automáticamente. La comprobación específica de los80 índices se registró mediante DevTools en `phase2-browser-validation.json`.

## Ejecutar

Desde la raíz del proyecto, con Node.js ≥22.12 y npm:

```sh
npm ci
npx playwright install chromium
npm run test:e2e -- --update-snapshots
```

La primera ejecución crea las referencias visuales. Revísalas en el reporte y en `tests/e2e/snapshots/` antes de adoptarlas: crearlas registra el estado actual, no demuestra que el diseño esté libre de defectos. Los fallos funcionales, de consola o de CLS siguen haciendo fallar la ejecución. Las próximas comparaciones se ejecutan con:

```sh
npm run test:e2e
```

Playwright ejecuta `npm run build` y sirve `dist/` mediante Vite Preview en `http://127.0.0.1:4175/portfolio/`. La suite usa esa subruta para comprobar el mismo montaje de producción que GitHub Pages; `npm run dev` conserva la raíz habitual. El puerto debe estar libre; se rechaza reutilizar un servidor que pueda contener una versión antigua. El servidor se cierra al terminar. No añadas flags para eludir el sandbox: abre la terminal externa para ejecutar la suite.

Si faltan bibliotecas del sistema para Chromium, instala sus dependencias desde esa misma terminal siguiendo el diagnóstico de Playwright (`npx playwright install-deps chromium`). No es necesario instalar navegadores durante cada ejecución; vuelve a instalar Chromium al actualizar la versión de Playwright.

## Cobertura

| Proyecto | Viewport | Entrada emulada |
| --- | --- | --- |
| desktop-wide | 1920×1080 | Ratón |
| desktop | 1440×900 | Ratón |
| desktop-compact | 1024×768 | Ratón |
| tablet | 820×1180 | Táctil |
| tablet-compact | 768×1024 | Táctil |
| mobile | 390×844 | Táctil |
| mobile-compact | 360×800 | Táctil |
| mobile-small | 320×740 | Táctil |

Todos usan Chromium, escala de píxel 1, tema oscuro y locale es-PE. Se usa un solo worker para reducir interferencias en las mediciones. Los dos casos de menú móvil se omiten en escritorio por no corresponder a ese diseño.

- Responsive: overflow horizontal, rectángulos del texto de los titulares, columnas, iconos cargados, cabecera y capturas del hero y de la página completa.
- Los tres proyectos: abrir con ratón/tacto, contenido, foco inicial, límites y scroll del diálogo; cerrar mediante botón, Escape o clic exterior y devolver el foco.
- Las ocho tecnologías: abrir la ficha correcta, comprobar descripción y experiencia disponible, capturar, cerrar y restaurar el foco.
- Teclado: primer Tab al salto de contenido, Enter y Space, indicador de foco, Tab/Shift+Tab dentro del diálogo y Escape. Clic en padding interior, bloqueo del scroll de fondo y reinicio de la ficha siguiente.
- Navegación: destinos de cabecera/menú y pie, botones principales, perfil, marca, vuelta al inicio y `aria-current`. El menú comprueba foco, cierre, retorno al botón y cambio a escritorio.
- Enlaces: destinos y protocolos, nueva pestaña segura de GitHub y LinkedIn pendiente. GitHub se intercepta con una respuesta local y el correo se intercepta antes de abrir el cliente: se comprueba la acción sin depender de servicios externos ni enviar mensajes.
- Movimiento reducido: preferencia desde la carga y cambio en vivo, ausencia de entrada del hero, transformaciones de hover y animaciones de diálogos; navegación y cierre continúan operativos.
- En todos los casos: errores de consola, excepciones JavaScript, peticiones fallidas y respuestas HTTP ≥400 hacen fallar la prueba. Las advertencias quedan registradas para revisión.
- Carga: `PerformanceObserver` desde antes de los scripts, rectángulos afectados, posiciones del hero y scroll. Dos escenarios sin interacción: normal y con 900 ms de retraso en cada JS/fuente; se observa hasta dos segundos después de cargar fuentes e hidratar. Se falla con CLS >0.1 o scroll involuntario >1 px. El CLS usa la mayor ventana de hasta cinco segundos con pausas inferiores a un segundo, excluyendo cambios tras interacción reciente.
- Fondo: recorrido por los hitos DOM en ambas direcciones, un Canvas sin recortes de personajes, SVG de cinco puntas y construcción áurea, caché limitada, selección responsive y presentación por hitos con movimiento reducido. CLS del recorrido≤0.01 y padding final≤48px.

Las capturas desactivan animaciones solamente al tomar la imagen. Las interacciones y la medición de carga conservan el movimiento configurado. Las comparaciones toleran hasta 100 píxeles distintos; se deben ejecutar en el mismo SO, versión de navegador y entorno gráfico que las referencias. El umbral de CLS detecta problemas de carga en esta ventana controlada; no representa una medición de campo de toda la visita.

Para ejecutar sólo la segunda fase del fondo, usa `npm run test:e2e -- scenes.spec.mjs`. Revisa la estrella y la espiral como capas fijas del cielo y los hitos al bajar/subir. Los snapshots de la página y de los diálogos necesitan revisión de diferencias. La enumeración completa descubre208 casos en tres archivos y ocho resoluciones; enumerar no ejecuta Chromium.

## Resultados

| Ruta | Contenido |
| --- | --- |
| `playwright-report/html/index.html` | Reporte navegable, pasos, errores y adjuntos |
| `playwright-report/results.json` | Resultados estructurados para análisis posterior |
| `test-results/e2e/` | Capturas de cada estado y del final de cada prueba; trazas y vídeos de fallos |
| `tests/e2e/snapshots/` | Referencias PNG por resolución para comparación futura |

Los adjuntos `browser-diagnostics.json`, `responsive-geometry.json` y `loading-metrics.json` están disponibles desde cada caso del reporte HTML. Las comparaciones fallidas incluyen imagen esperada, actual y diferencia. Las trazas permiten inspeccionar el DOM, las acciones, la consola y la red.

```sh
npx playwright show-report playwright-report/html
```

Para una traza concreta, usa `npx playwright show-trace RUTA/trace.zip` con la ruta real bajo `test-results/e2e/`.

Los reportes y artefactos se regeneran en cada ejecución y están excluidos del repositorio. Copia `playwright-report/` y `test-results/e2e/` antes de repetir si quieres conservar una ejecución para análisis. Conserva las referencias revisadas de `tests/e2e/snapshots/` en el control de versiones.

## Revisar cambios visuales

```sh
# Limitar la ejecución a una resolución.
npm run test:e2e -- --project=mobile
# Ver el navegador mientras se ejecutan las pruebas.
npm run test:e2e -- --project=desktop --headed
# Regenerar sólo las referencias de los casos etiquetados como visuales.
npm run test:e2e -- --grep @visual --update-snapshots
# Enumerar las pruebas sin lanzar servidor ni navegador.
npm run test:e2e -- --list --reporter=list
```

Todos los casos que comparan referencias llevan `@visual`, incluidos Second Brain y Vue. No actualices referencias únicamente para hacer desaparecer un fallo: primero revisa el diff y determina si el cambio es intencional.

La matriz emula tamaños e interacciones en Chromium. No verifica Safari/Firefox, un teléfono físico, lector de pantalla ni la disponibilidad real de GitHub o del cliente de correo. La preparación de la suite dentro de Codex no implica que se haya ejecutado Chromium: la ejecución real queda pendiente de la terminal externa.

Referencias: [configuración de Playwright](https://playwright.dev/docs/test-configuration), [comparaciones visuales](https://playwright.dev/docs/test-snapshots), [reportes](https://playwright.dev/docs/test-reporters) y [definición y umbral de CLS](https://web.dev/articles/cls).
