# Sistema visual del portfolio

Segunda iteración, 12 de noviembre de 2026. Fuente de referencia para Taste, Impeccable y Emil’s. Documenta el código vigente; las recomendaciones y los límites de validación se distinguen de lo implementado.

Estado del fondo al13 de noviembre: sección13. Limpieza del repositorio al15 de noviembre: sección14. Contenido confirmado de las once fichas: sección15. Las secciones9–12 conservan el historial previo; la interfaz Dark Premium permanece y la secuencia cinematográfica funciona ahora mediante Canvas. Sus rutas antiguas son referencias históricas, retiradas de la distribución final.

El titular autorizó la evolución **Dark Premium**, su nombre, intereses y contactos. Esta dirección sustituye la paleta clara anterior; conserva composición, tipografías, secciones, portadas conceptuales y movimiento de presentación. Las restricciones vigentes de `PARTE.md` se mantienen. Los originales de `public/assets/taste/` permanecen intactos.

## 1. Identidad y principios

Portfolio personal en español de **Gian Piero Rodríguez**, estudiante de Ingeniería de Sistemas y desarrollador de software. Intereses confirmados: backend, arquitectura de software, algoritmos, inteligencia artificial y desarrollo de videojuegos.

La dirección sigue siendo editorial tecnológica: titulares amplios en Geist, alineación izquierda y espacio abierto. El énfasis usa ahora la misma sans serif, con variaciones de peso y espaciado para sostener una voz de ingeniería. Carbón azulado, grafito y azul profundo sostienen el contenido; el azul claro señala acciones y énfasis. Las superficies se distinguen por tono y bordes delicados, sin halos ni decoración luminosa.

- Hero de dos líneas: «Gian Piero / Rodríguez.», ambas en Geist Variable. La primera mantiene peso400; el apellido usa peso500, tracking−.055em y escala1.14 con acento azul.
- Seis bloques: hero, proyectos, perfil, stack, trayectoria y contacto/pie.
- Tres proyectos protagonistas: Second Brain, Vende360 e Idemne. Sus portadas geométricas son conceptos provisionales, no interfaces del producto.
- Stack con logotipo, nombre, categoría y separadores en dos columnas; se convierte en una columna bajo 390px.
- Contacto mediante tarjetas de GitHub, LinkedIn y correo. Sólo los destinos configurados son enlaces.
- Una acción principal: «Ver proyectos». Las nuevas acciones de exploración abren un único diálogo de detalles.
- Marca textual `portfolio.` conservada. No se ha creado un logotipo personal nuevo.

Configuración: `data-type="service"`, `page-type="service"`, `site-kind="other"`, `data-tone="dark"`, `data-radius="soft"`, `data-buttons="arrow"`. El tema oscuro es una petición explícita del titular; no deriva de cambiar la página a una landing de producto software.

## 2. Paleta vigente

Fuente: `:root` de `src/style.css`. Los alias `--bg`, `--surface`, `--ink`, `--muted`, `--accent` y `--action` de Taste consumen estos tokens.

| Token | Valor | Uso |
| --- | --- | --- |
| `--p-bg` | `#0b0f17` | Fondo principal, cabecera y menú móvil |
| `--p-surface` | `#111824` | Tarjetas sociales y diálogo |
| `--p-raised` | `#182131` | Feedback de superficies interactivas |
| `--p-ink` | `#eef2f8` | Texto principal |
| `--p-muted` | `#a3afc2` | Descripciones secundarias, categorías y campos pendientes |
| `--p-accent` / `--p-action` | `#91b4ff` | Énfasis editorial, acciones, indicadores y foco |
| `--p-accent-ink` / `--p-action-ink` | `#0b0f17` | Texto sobre acento/acción |
| `--p-action-hover` | `#a8c3ff` | Primario hover con puntero fino |
| `--p-action-active` | `#7c9fe8` | Primario pulsado, también con movimiento reducido |
| `--p-border` | `#273244` | Separadores, borde de cabecera y tarjetas |
| `--p-border-strong` | `#465772` | Borde del diálogo y hover de tarjetas |

`.ground-surface` usa `--p-surface` como fondo y `--p-bg` como superficie interna. Se conserva la familia inversa disponible en la base: fondo `#111824`, superficie `#182131`, tinta `#eef2f8`, secundario `#a3afc2`, acento/acción `#91b4ff` y su tinta `#0b0f17`. No hay selector de tema; `color-scheme: dark` es explícito.

| Superficie particular | Valores exactos |
| --- | --- |
| Second Brain | Fondo `#151e30`, texto `#dfe9ff`, geometría `#91b4ff` |
| Vende360 | Fondo `#162b50`, texto/geometría `#e6edff`; geometría con opacidad `.65` |
| Idemne | Fondo `#1d2421`, texto `#e8ece5`, geometría `#b5b9a8` |
| Etiquetas de portada | Opacidad `.85` sobre el color de su variante |
| Backdrop de detalles | `rgb(3 6 12 / .8)`; sin blur |
| Backdrop del menú | `--p-bg`, opaco |
| Selección | Fondo `--p-accent`, texto `--p-accent-ink` |
| Scrollbar | Pulgar `--p-border-strong`, pista `--p-bg` |

Los separadores propios antes dispersos en tres grises se centralizaron en `--p-border`. La base aún contiene `--line: color-mix(in oklab, var(--ink) 11%, transparent)` y `--line-strong` al 20%; el pie y algunos componentes base los consumen. No describir estas mezclas transparentes como un hexadecimal único.

Logotipos tecnológicos originales locales. El icono monocromo SQL y GitHub reciben `filter: invert(1)` para resultar visibles; no se redibujan las marcas. LinkedIn conserva su azul `#0A66C2`, sobre un respaldo blanco local de 2px de radio. Correo usa un sobre SVG de interfaz con trazo `#91b4ff`. Procedencia: `public/assets/icons/icons-credits.json` y `social-credits.json`.

## 3. Tipografía

- Interfaz, texto y titulares: `'Geist Variable', sans-serif`; fuente normal local variable `100–900`, uso principal `400/500`.
- `Geist Variable` es la familia de toda la interfaz, titulares y énfasis. `em` utiliza peso500 y conserva la inclinación semántica por defecto del navegador, sin cambiar de familia.
- `Instrument Serif` continúa cargada localmente en `src/main.js`, pero ya no tiene consumidores visibles en la página. Su licencia y los archivos de fuente se conservan en el proyecto.
- Importaciones de Fontsource en `src/main.js`; `font-display: swap`. No se agregaron fuentes ni peticiones tipográficas externas.

| Elemento | Tamaño | Línea / tracking / peso |
| --- | --- | --- |
| Cuerpo | `16px` | `1.55` / normal / `400` |
| Hero h1 | `clamp(36px, 10.8vw, 156px)` | `.99` / `-.04em` / `400` |
| Hero h1 apellido | `1.14em` | Heredada / `-.055em` / `500`, Geist Variable |
| Sección h2 | `clamp(30px, 3.65vw, 54px)` | `1.12` / `-.035em` / `400` |
| Proyecto h3 | `24px` | `1.25` / `-.025em` / `400` |
| Perfil principal | `clamp(36px, 4.5vw, 66px)` | `1.15` / `-.04em` / `400` |
| Display stack/trayectoria | `clamp(40px, 4.6vw, 68px)` | `1.05` / `-.04em` / `400` |
| Contacto h2 | `clamp(64px, 7.3vw, 108px)` | `.98` / `-.04em` / `400` |
| Descripción hero | `18px` | `1.6` / normal / `400` |
| Nota perfil e introducciones | `18px` | `1.7` / normal / `400` |
| Tecnología | `20px` | `1.55` / `-.025em` / `400` |
| Botón primario | `16px` | `1` / normal / `500` |
| Navegación cabecera | `14px` | `1.55` / normal / `500` |
| Menú móvil | `32px` | `1.55` / `-.035em` / `400` |
| Marca | `26px` | `1` en cabecera / `-.04em` / `500` |
| Categorías, estados y créditos | `13px` | Generalmente `1.55` / normal / `400` |
| Tarjeta social: nombre / descripción / acción | `18 / 14 / 13px` | Descripción `1.5` |
| Diálogo h2 | `clamp(32px, 4vw, 48px)` | `1.12` / `-.035em` / `400` |
| Diálogo h3 / texto | `18 / 16px` | h3 `1.25`, texto `1.7`; h3 `500` |

Portadas: título `clamp(36px, 3.6vw, 56px)`, línea `.95`, tracking `-.04em`; Idemne conserva su tamaño `clamp(48px, 4.2vw, 64px)`, ahora en Geist, peso500 y tracking `-.035em`. El Hero móvil conserva su h1 fluido `clamp(34px, 10.9vw, 68px)`; al apellido se aplica la misma proporción1.14 y peso500 para mantener su jerarquía. Headings con `text-wrap: balance`, párrafos con `text-wrap: pretty`; `overflow-wrap: anywhere` protege párrafos y listas. El h1 no usa separación silábica.

## 4. Composición, espaciado y responsive

Escala base de Taste: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`. La implementación propia utiliza mayoritariamente esos valores. Separación típica: 24px título/introducción, 48px antes de un grid, 96px entre grandes columnas y 32px entre grupos móviles.

Contenedor: `--container: 1312px`; `.wrap` tiene `width: min(calc(100% - 2 * var(--edge)), var(--container))` y márgenes automáticos. `--edge: max(var(--gut), env(safe-area-inset-left), env(safe-area-inset-right))` mantiene bordes simétricos. El enlace de salto comparte esa alineación mediante `max(var(--edge), calc((100% - var(--container)) / 2))`.

| Ancho | Margen `--gut` | Cabecera |
| --- | --- | --- |
| ≥1101px | `64px` | `88px + inset superior` |
| 1024–1100px | `48px` | `88px + inset superior` |
| 640–1023px | `48px` | `80px + inset superior` |
| ≤639px | `24px` | `72px + inset superior` |

| Bloque | Escritorio | Adaptaciones existentes |
| --- | --- | --- |
| Introducción hero | `4fr 5fr 2fr`, gap48 | ≤1100: `4fr 6fr 1fr`/32; ≤1023: dos columnas sin glifo; ≤639: una/24 |
| Proyectos | Tres columnas, gap24 | ≤1023: tres/gap16; ≤639: una/gap48 |
| Perfil inferior | Dos columnas, gap96 | ≤1100: gap48; ≤639: una/gap32 |
| Stack | Dos columnas, gap96 | ≤1100: gap48; ≤1023: una; su introducción conserva dos columnas hasta móvil |
| Tecnologías | Dos columnas, gap32 | ≤639: gap24; ≤389: una columna |
| Trayectoria | Dos columnas, gap96 | ≤1100: gap48; ≤1023: `4fr 6fr`/32; ≤639: una/gap48 |
| Contacto | Dos columnas, gap96 | ≤1100: gap48; ≤1023: una, detalles max620; ≤639: gap32 |
| Tarjetas sociales | Tres filas, gap12 | Padding24 horizontal, pasa a16 en móvil |

La estructura conserva `height: auto`. Mínimos propios: hero `max(740px,100svh)`, secciones `max(760px,100svh)`, contacto `max(800px,100svh)`; móvil `100svh`. No son alturas máximas: el contenido puede crecer. Padding de sección: `max(120px,calc(var(--nav) + 24px)) 0 72px`; móvil `max(96px,calc(var(--nav) + 24px)) 0 48px`. Hero: arriba `max(160px,calc(var(--nav) + 48px))`, abajo32; móvil arriba144, abajo24. A ≥1600 se amplía arriba a180 y el margen de introducción a64. La condición alto≤740/ancho≥640 usa h1 `min(9vw,112px)` y padding arriba `max(120px,calc(var(--nav) + 32px))`.

A ≤1023 los proyectos h3 son20px y las portadas genéricas32px. A ≤639 el h1 es `clamp(34px,10.9vw,68px)`/`1.05`, h2 32, lead16/1.7, proyecto h3 24, portada48, perfil `clamp(32px,8.5vw,44px)`/1.22, tecnología18 y contacto `clamp(56px,16vw,80px)`. Los estilos más específicos de Idemne prevalecen frente al tamaño genérico de portada.

Las portadas mantienen altura `clamp(320px,28vw,410px)`; tablet360; móvil `aspect-ratio:1/1.05` con altura automática. Geometría82% de ancho/52% de alto, base42/derecha8%; tablet90%/derecha5%; móvil48% de alto. Vende360 e Idemne usan base38px.

## 5. Componentes e interacciones

### Botones y enlaces

Primario mínimo48px, padding horizontal24, gap24, radio4px. Tinta oscura sobre azul claro; hover/active usan tokens explícitos para conservar contraste. Foco global2px azul, separado5px, sin transición. Botones iconográficos48×48, transparentes, sin pseudoflecha. `ArrowIcon.vue` conserva dos paths, trazo1.5 y tamaño24; ciertas acciones usan20/18/16 según su contexto.

Enlaces de navegación y `.link-label` dibujan subrayado al hover y muestran el estado completo al foco. `aria-current="location"` refleja el fragmento elegido; no hay scroll-spy. Tacto recibe feedback active, sin depender de hover. No hay estados loading/submit/disabled porque no existen esas acciones.

### Proyectos y stack

`ProjectCard.vue` mantiene `article` y h3. La portada es un botón nativo con nombre «Explorar [proyecto]», `aria-haspopup="dialog"`, `aria-controls="detail-dialog"` y descripción accesible de su carácter conceptual. Su pseudoelemento extiende el área de selección por la ficha; no hay controles anidados. La cabecera muestra el estado confirmado: «Prototipo funcional», «Prácticas profesionales» o «Diseño y preproducción». La frase proporcionada aparece debajo de la portada, con margen16px, texto secundario y línea1.6. «Ficha en preparación» queda sólo como fallback para futuras fichas sin estado.

Las tecnologías conservan `li.tool-row` y separador. Cada fila contiene un botón de altura mínima104px, icono36, nombre/categoría y flecha16. Tablet/móvil mínimo96; móvil icono28. Las filas heredan gaps24/16/12 según ancho. Hover cambia fondo y nombre; foco y active funcionan sin ratón.

### Detalles

Un solo `DetailDialog.vue` presenta proyecto o tecnología seleccionados. Proyecto: descripción, problema, objetivos, funcionalidades, tecnologías, aspectos técnicos, estado y enlaces. Tecnología: descripción general, uso, experiencia práctica, proyectos e intereses. Las once fichas contienen información confirmada por el titular; los campos realmente vacíos conservan «Por confirmar». Las asociaciones de experiencia proceden de `PORTFOLIO_CONTENT.md`, sin deducir otras por los nombres de proyectos.

Diálogo nativo `showModal()`, etiquetado por h2, autofocus en cerrar, Escape inmediato y retorno explícito al disparador conectado con `preventScroll`. El clic exterior cierra; padding/borde interior no. La modalidad mantiene el foco dentro mediante el navegador; `body:has(dialog[open])` bloquea el scroll de fondo, y `scrollbar-gutter: stable` reserva su espacio. Abrir otra ficha reinicia el desplazamiento.

Ancho `min(760px,calc(100% - 2 * var(--edge)))`, padding32, radio16, borde fuerte1px. Alto máximo `calc(100svh - 64px - inset superior - inset inferior)` con scroll vertical. Móvil: ancho `calc(100% - 32px)`, padding24, radio12, alto máximo descontando32px e insets. No hay altura animada ni dependencias de overlays.

Los enlaces de detalle son textuales, azul claro, subrayados y con mínimo48px. Sólo protocolos http/https/mailto válidos se presentan; enlaces web abren pestaña con `noopener noreferrer` y aviso accesible.

### Cabecera y redes

Menú móvil de pantalla completa conservado: enlaces visibles como alternativa antes de hidratar, botón sólo al detectar `showModal`, protección de Escape ante el controlador antiguo de Taste. Al navegar se cierra y enfoca el destino; al pasar a escritorio también se cierra. Limpia sus escuchas de fragmento, media queries y movimiento.

`SocialCards.vue` presenta tres filas sobre superficie, borde1px/radio12, mínimo104px, padding20×24 y gap16. Logo28; nombre18, descripción14, acción13. GitHub y correo son enlaces configurados en `src/data/portfolio.js`; LinkedIn es un artículo informativo con «Enlace pendiente», sin tabulación ni destino ficticio. El aviso de nueva pestaña es accesible. No hay formulario ni promesa de envío dentro de la página.

## 6. Motion vigente

| Token | Valor | Aplicación |
| --- | --- | --- |
| `--m-ease` / `--ease` | `cubic-bezier(.2,.8,.2,1)` | Interacciones y diálogos |
| `--m-ease-enter` | `cubic-bezier(.22,1,.36,1)` | Entrada del hero |
| `--m-in` / `--m-out` | `150ms / 120ms` | Hover/retorno |
| `--m-press` | `120ms` | Pulsación |
| `--m-panel` / `--m-close` | `200ms / 120ms` | Apertura/cierre de menú y detalles |
| `--m-slide` | `240ms` | Geometrías de portadas |
| `--m-hero` / `--m-content` | `700ms / 520ms` | Hero |
| `--m-stagger` | `60ms` | Grupos hero; máximo180ms de retraso |

El hero conserva su entrada única: título visible desde opacidad.8 y desplazamiento12px; otros grupos8px, sin ocultar su texto. Interacción disponible desde el inicio. No hay observers de aparición ni reinicios al volver a una sección.

`useDialogMotion.js` comparte el comportamiento de menú y detalles. WAAPI anima únicamente opacity y translateY8px; si se interrumpe, parte del estilo calculado actual. Salida más rápida que entrada; mantiene modalidad hasta acabar. Teclado, Escape y navegación no esperan animación. Sin WAAPI, con fallo de animación o `data-motion="off"`, el cambio es inmediato. Antes de desmontar se cancelan animaciones, cierran diálogos y eliminan escuchas.

Con puntero fino, proyectos y tarjetas sociales enlazadas se elevan2px; al pulsar se asientan. La geometría de portada conserva zoom1.02. Las tecnologías cambian superficie y color; no se desplazan. Flechas: cuerpo scaleX1.14 y cabeza translateX2px. Foco presenta estado completo e inmóvil. No se aplica hover de acción a LinkedIn pendiente.

`prefers-reduced-motion` elimina desplazamientos, entrada hero y lift; conserva feedback tonal. El controlador escucha cambios en vivo y cancela la animación vigente. El CSS original de Taste fuerza duraciones `.001ms!important`; la capa propia conserva esas salvaguardas. No se incorporó una librería de animación.

`word-highlight` sigue siendo el único momento de scroll, en el perfil: mezcla OKLab de tinta50%/fondo hasta la tinta final; strong usa acento. Duración original160ms ease, con IntersectionObserver, listeners pasivos y rAF del vendor. Reversible al subir. En movimiento reducido muestra texto completo; la reactivación dinámica completa del momento sigue siendo una limitación del vendor, que no se alteró.

## 7. Accesibilidad y validación

Ratios sRGB calculados, no mediciones de pantalla:

| Combinación | Contraste |
| --- | --- |
| Tinta sobre fondo / superficie / raised | `17.07 / 15.84 / 14.37:1` |
| Secundario sobre fondo / superficie / raised | `8.65 / 8.02 / 7.28:1` |
| Acento sobre fondo / superficie / raised | `9.29 / 8.62 / 7.82:1` |
| Tinta de acción sobre normal / hover / active | `9.29 / 10.88 / 7.29:1` |
| Reposo del word-highlight sobre superficie | Aproximadamente `4.23:1`; texto mínimo32px, umbral grande3:1 |

`tests/theme.test.mjs` verifica lectura≥4.5:1, acciones≥4.5:1 y foco≥3:1 a partir de los tokens reales. Las líneas sutiles separan contenido; el estado de foco usa el acento contrastado.

Se conserva idioma es, un h1, h2 por sección, salto al contenido primero, destinos de anclas con tabindex−1, iconos decorativos con alt vacío y nombres de controles explícitos. Las portadas conceptuales tienen descripción accesible. No hay porcentajes, puntuaciones, tabindex positivo ni datos de empleo inventados.

**Verificado:** compilación/prerender, estructura y eventos Vue en host de memoria, navegación compartida, datos, recursos, protocolos de enlaces, interrupciones, movimiento reducido y limpieza del controlador. Resultados actuales en `docs/validation.md`.

**No verificado en navegador en esta sesión:** overflow a320/390, zoom200%, Tab/Shift+Tab y foco nativo, lector de pantalla, render de hover/motion, consola, CLS, fuentes lentas y teléfonos físicos. Playwright ya es una dependencia de desarrollo del proyecto y dispone de una suite para terminal externa, documentada en `docs/e2e.md`. El titular confirmó el funcionamiento de Chromium fuera del sandbox; no se ejecuta dentro por su indicación. Los errores del gate por EPERM corresponden a intentos anteriores. No hay aprobación visual automática de las escenas nuevas.

## 8. Restricciones y pendientes

Conservar Dark Premium, Geist/Instrument Serif, composición de secciones, alineación simétrica, stack de filas en dos columnas, ocho logos, tres proyectos, hero de nombre personal y los dos momentos de presentación existentes. Mantener el vendor intacto y el scroll nativo. Completar configuración sólo con hechos y destinos confirmados.

Evitar neón/cyberpunk, violeta, gradientes decorativos, glassmorphism, WebGL/shaders, cursores especiales, tilt, seguimiento del puntero, botones magnéticos, parallax, scroll-jacking, loops, carruseles automáticos, revelados repetidos y porcentajes de dominio. No presentar portadas como interfaces reales ni inferir tecnologías por nombres de proyectos.

Las fichas de los tres proyectos y las ocho tecnologías ya tienen contenido confirmado. Permanecen pendientes LinkedIn, institución, fechas, empleadores no proporcionados, dominio canónico y enlace público de Vende360. Second Brain es privado e Idemne todavía no tiene demo jugable; son estados confirmados, no enlaces pendientes que deban inventarse. Las portadas conceptuales y la imagen social SVG siguen siendo provisionales: una publicación completa requiere material real y PNG/JPEG con URLs absolutas del dominio confirmado.

Inconsistencias heredadas conservadas: primarios radio4 frente a escala base8/12/20; alturas mínimas de secciones que pierden por especificidad ante Taste (`100lvh` móvil y `100svh` tablet); gap heredado del pie acumulado con margin64 de `.closing__links`; curva160ms ease del momento frente a `--m-ease`. El posible salto del hero al mejorar la cabecera móvil continúa sin medición CLS. Documentarlas no equivale a validar defectos ni a exigir conservarlos si una comprobación demuestra un problema.

Recomendación futura, sin implementar: revisar el conjunto renderizado en los tamaños y estados pendientes antes de añadir más efectos; ajustar únicamente defectos confirmados. No considerar el build una prueba de fluidez ni las pruebas en memoria una validación de modalidad real.

## 9. Escenas ilustradas — primera integración estática

Esta sección conserva las decisiones de la base inicial. La selección por scroll y el movimiento vigentes se describen en la sección10.

Petición explícita del titular: incorporar el kit Johnny/Gyro manteniendo la interfaz existente. Se conserva la clasificación `service/other`, la paleta de `:root`, las fuentes, textos, portadas, enlaces, navegación y diálogos. La ilustración nocturna 2D y sus tonos índigo/lavanda originales son una excepción autorizada a las restricciones genéricas de fondos de Taste; esos tonos no se convierten en colores de la interfaz. No se ha vuelto a sortear la dirección artística ni se han generado ilustraciones.

Los 12 archivos existentes de `public/portfolio-scenes/` coinciden byte a byte con sus originales del kit. Los fondos son WEBP de 1920×1080; Johnny es PNG RGBA de 347×385 y Gyro de 362×411. Las referencias y montajes del kit son materiales de inspección, no recursos de producción. Los alias `orbit-nodes.svg` y `technical-grid.svg` se conservan intactos, sin utilizarlos en el mapeo.

| Escena | Destino real | Fondo | Personajes, de izquierda a derecha | Geometría |
| --- | --- | --- | --- | --- |
| Hero | `.hero` dentro de `#top` | `/portfolio-scenes/backgrounds/01-hero.webp` | Johnny | Ninguna |
| Proyectos | `#proyectos` | `/portfolio-scenes/backgrounds/02-projects.webp` | Johnny | `/portfolio-scenes/overlays/joestar-star.svg` |
| Stack | `#stack` | `/portfolio-scenes/backgrounds/03-stack.webp` | Johnny | `/portfolio-scenes/overlays/golden-ratio.svg` |
| Contacto | `#contacto` | `/portfolio-scenes/backgrounds/04-contact.webp` | Gyro, Johnny | Ninguna |

`src/data/scenes.js` centraliza ese mapeo y los tamaños de personajes. `PortfolioSceneBackground.vue` recibe una escena y separa paisaje, estrellas estáticas, geometría opcional, personajes y contraste. `SceneCharacter.vue` muestra cada PNG original sin recolorearlo ni simular articulaciones; sólo Johnny se refleja horizontalmente mediante CSS para orientar su postura hacia la izquierda. La estrella de cinco puntas y la espiral con rectángulos se toman de los SVG actualizados, sin reconstruirlos con CSS.

**Estado visible actual:** sólo Hero está activo. El fondo fijo se prerenderiza desde el inicio, con Johnny a la derecha y sin Gyro. Proyectos, Stack y Contacto están preparados en la configuración y pueden renderizarse con el mismo componente; aún no se seleccionan mediante scroll. Las superficies opacas de esas secciones conservan la lectura actual. Perfil y trayectoria mantienen sus superficies existentes.

**Capas y composición:** `#app` aísla su contexto de apilamiento; la escena fija usa `z-index:-1`, `pointer-events:none`, `aria-hidden` e `inert`. El contenido permanece encima y los diálogos siguen en la capa modal nativa. Johnny se presenta de espaldas, orientado hacia la izquierda mediante `transform:scaleX(-1)` en su imagen individual: el recorte sin corregir orientaba la postura hacia el borde derecho. Esta regla compartida se aplica también en Contacto y con movimiento reducido, sin invertir el fondo ni el grupo. El grupo está anclado por la base, a la derecha, con altura `min(38svh,385px)`. Al renderizar Contacto, el orden flex coloca a Gyro inmediatamente a su izquierda, con la misma base y una altura relativa del104%; Gyro conserva su orientación original. No se modifican la escala general, el anclaje ni el espacio negativo izquierdo.

**Lectura y responsive:** se reutiliza `contrast-gradient.svg`; un velo adicional deriva exclusivamente de `--p-bg`, sin cambiar tokens. Su opacidad mínima es80% en el85% izquierdo y en la franja inferior de escritorio. Bajo1024px el velo80% cubre todo el fondo, la figura se reduce a `min(28svh,240px)`; bajo640px pasa a `min(24svh,190px)`, margen derecho16px y opacidad.8. El texto secundario tendría un contraste calculado aproximado de4.76:1 incluso sobre blanco bajo ese velo. Es una salvaguarda matemática de la zona protegida, no una medición de pantalla: composición y bordes de los PNG requieren capturas reales.

**Carga y movimiento:** sólo se precarga `01-hero.webp`, con prioridad alta. No se montan las otras escenas ni se descarga Gyro en la aplicación inicial; las imágenes tienen dimensiones intrínsecas y capas fuera del flujo. No hay listeners nuevos, observers, rAF, filtros, librerías, crossfades, parallax ni animación de Gyro. La escena ya es estática con movimiento reducido; el movimiento previo del portfolio sigue intacto. Las capas independientes permiten añadir después transformaciones y opacidad sin mover texto o tarjetas.

**Validación:** pruebas de prerenderizado de las cuatro configuraciones, recursos originales, orden de personajes, dimensiones y decoración inaccesible al foco; contraste teórico del velo y pruebas existentes. La suite E2E incorpora comprobaciones del anclaje derecho de Johnny, tamaño visible y capas decorativas, para ejecutarlas fuera del sandbox. El gate visual y la revisión de encuadres continúan pendientes, sin atribuirles una ejecución.

**Siguiente etapa:** revisar capturas de esta base estática; después conectar las escenas con los destinos reales, diferir los recursos secundarios, introducir crossfades y parallax ambiental discreto sólo en las capas decorativas, con cancelación/limpieza y alternativa sin movimiento. La aparición de Gyro se implementará al completar Contacto. Estas futuras excepciones no autorizan parallax de texto ni cambios de tipografía, contenido o paleta.

## 10. Narrativa ambiental y transiciones

Implementación solicitada con `emil-design-eng`, sin dependencias nuevas. Se mantienen fuentes, paleta, contenido, tarjetas, navegación, diálogos y las animaciones anteriores. Los recursos del kit siguen intactos.

**Selección y continuidad:** `useSceneNarrative.js` observa las seis secciones reales con una banda central calculada en píxeles. Al cruzar el55% del viewport selecciona Hero → Proyectos → Stack → Contacto en ambas direcciones. `#sobre-mi` conserva visible el paisaje de Proyectos y `#trayectoria` el de Stack, ambos con fondo transparente: se retiró `ground-surface` para evitar bandas opacas que cortaban la continuidad. El velo común conserva el contraste del texto y el resaltado por scroll de Sobre mí. Los overlays se desactivan en ambas secciones. Las cuatro escenas no se asignan a IDs inventados del kit.

Sólo Hero se monta en el HTML inicial. Un segundo observer solicita fondos y geometría cuando su sección se encuentra a una pantalla de distancia. La selección visible espera al evento load y a `decode()`; una carga fallida conserva el paisaje anterior y una respuesta tardía no puede reemplazar una selección más reciente. Los recursos ya cargados se conservan para volver hacia arriba. El Hero permanece como base opaca bajo las capas que cruzan su opacidad; nunca se retira para mostrar un fondo pendiente. Se utiliza `@starting-style` para las capas que entren desde caché sin un frame previo. Las transiciones CSS se pueden invertir sin reiniciar la opacidad.

**Geometría original:** `SceneOverlay.vue` obtiene exclusivamente `joestar-star.svg` y `golden-ratio.svg`, comprueba la respuesta/XML y monta el SVG en el DOM para animar sus elementos. No altera los archivos ni reconstruye las figuras. La estrella conserva sus diez vértices, cinco puntas y nodos; se revela su contorno con `pathLength=1`, mientras los nodos aumentan su opacidad con pasos de80ms. La proporción áurea revela sus diez rectángulos y después la espiral original. `stroke-dashoffset` es la única animación que requiere repintar trazos, limitada a estas figuras pequeñas y al cambio de sección; no se utiliza como movimiento continuo. No se añade ningún HUD circular. Los círculos tenues ya incluidos en los archivos originales se conservan.

Cada overlay se activa sólo en su sección real, se atenúa al abandonarla y puede volver a trazarse al regresar. Una envoltura mínima de900px mantiene las proporciones y permite encuadrar la geometría derecha en pantallas estrechas, sin deformarla. Si falla la preparación del SVG se intenta mostrar el recurso original como imagen estática. Todas sus capas heredan decoración sin foco ni puntero.

**Ambiente:** sólo en escritorio con hover y puntero fino, las estrellas derivan3px durante36s por trayecto, y la pose completa de Johnny se desplaza1px en25.2s. Un plano independiente responde al cursor hasta±3px en X y±1.8px en Y, con una transición amortiguada de900ms; no se mueve texto ni ninguna tarjeta. Sólo los eventos de cursor programan un rAF, con un máximo de uno pendiente. El parallax del paisaje usa `animation-timeline:scroll(root block)` para recorrer±5px durante el documento, sin un bucle JavaScript de scroll. Donde esa API no exista, el paisaje conserva el crossfade y queda inmóvil. El cambio gradual de luminosidad proviene de las ilustraciones y de la opacidad de las estrellas, sin filtros nuevos ni colores de interfaz adicionales.

**Johnny y Contacto:** se conserva `scaleX(-1)` en la imagen individual, independiente de todos los desplazamientos del padre. Su base y anclaje derecho permanecen; Proyectos reduce el grupo a.9 y opacidad.28, Stack a.86 y.2, con un máximo de4px de ajuste vertical. Contacto recupera su escala y opacidad.7. El velo80% protege el contenido. La sección11 completa este sistema con la aparición de Gyro en Contacto.

**Móvil, teclado y accesibilidad:** por debajo de1024px no hay cursor, parallax, respiración ni deriva; desaparece el ajuste vertical por sección y el velo cubre todo el fondo. La pareja de Contacto recibe el ajuste de escala descrito en la sección11. `prefers-reduced-motion` elimina las nuevas transiciones y muestra inmediatamente el trazado completo de la geometría activa; el cambio en vivo también cancela el frame y la respuesta del cursor. Las acciones de teclado cambian las escenas sin demora ni trazado animado; rueda/cursor/tacto reactivan las transiciones. La pestaña oculta pausa los ciclos ambientales; los diálogos abiertos también pausan estrellas y pose. El ajuste `data-motion="off"` mantiene una presentación inmóvil. No se simulan pelo o ropa articulados.

**Ciclo de vida:** desmontar desconecta ambos observers, elimina escuchas de media queries, visibilidad, resize, historial, teclado y puntero, cancela frames y aborta las solicitudes de los SVG. Las respuestas de decodificación posteriores al desmontaje se ignoran. No se modifican variables heredadas en cada frame. En ausencia de IntersectionObserver se usa una escucha pasiva de scroll agrupada mediante rAF; es un fallback, no el camino habitual.

**Parámetros editables**, centralizados en `src/data/scenes.js`, objeto `sceneMotion`:

| Parámetro | Valor | Ajuste |
| --- | --- | --- |
| `fadeMs` |900 | Duración del crossfade; más alto, cambio más lento |
| `traceMs` |1500 | Duración del trazado geométrico |
| `nodeStaggerMs` |80 | Separación entre iluminación de nodos |
| `driftSeconds` |36 | Tiempo de deriva; más alto, movimiento más lento |
| `driftPx` |3 | Amplitud del movimiento de estrellas;0 lo neutraliza |
| `parallaxPx` |5 | Desplazamiento máximo del paisaje por scroll |
| `pointerPx` |3 | Respuesta máxima al cursor en X; Y usa el60% |
| `starsOpacity` |.1 | Intensidad base de estrellas |
| `geometryOpacity` |.5 | Intensidad máxima del overlay, antes del velo |

Los cambios de parámetros requieren reconstruir. Para conservar cobertura sin bordes, mantener `pointerPx + driftPx ≤8` y `pointerPx + parallaxPx ≤14`, o aumentar el overscan de los planos. Las opacidades y escalas de Johnny por sección están junto a sus selectores en `PortfolioSceneBackground.vue`.

**Corrección de integración:** los estilos scoped del build y del prerender tenían IDs distintos. `vite.config.js` ahora fija `componentIdGenerator:'filepath'`, y el prerender comprueba que cada scope del HTML exista en el CSS generado. Esa incoherencia explicaba el estilo de fondo ausente en el reporte externo previo; el build actual valida su coincidencia sin necesitar Chromium.

**Validación y límites:** pruebas de lógica para recorrido, inversiones, espera de imágenes, respuestas tardías, cursor agrupado, movimiento reducido, visibilidad, teclado y limpieza; prerender y contraste existentes. La suite externa añade recorrido en ambos sentidos, geometría final, capturas por sección, carga lenta, clics y CLS de las transiciones. No se ha ejecutado Chromium ni se ha medido fluidez real en esta sesión. Referencias técnicas: [scroll timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline), [márgenes de IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) y [pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength).

## 11. Contacto: Johnny y Gyro

Se completa la narrativa con los PNG originales, tomando `preview/hero-composite.jpg` y `preview/contact-composite.jpg` como referencias de compañía, escala y apoyo. Johnny permanece a la derecha y conserva su orientación hacia la izquierda. Gyro usa su orientación original de espaldas, a su izquierda. No se redibujan, recolorean, recortan ni deforman los personajes; no se añaden filtros para alterar sus bordes. Sus márgenes transparentes se han inspeccionado; cualquier halo visible debe comprobarse en las capturas reales.

**Composición:** Gyro ocupa una capa absoluta independiente en `PortfolioSceneBackground.vue`, con `right:calc(100% - 8px)`, `bottom:0`, altura104% respecto de Johnny y proporción362/411. Johnny mantiene su proporción347/385. El pequeño solapamiento acerca las siluetas; ambos comparten la base del contenedor de pose y el mismo movimiento ambiental de1px. La anchura de Johnny sigue siendo la referencia del grupo, por lo que montar Gyro no lo empuja ni altera su anclaje. `SceneCharacter.vue` conserva las dimensiones originales y deja el104% en la envoltura de Gyro, evitando aplicar esa escala dos veces.

La pareja mantiene el velo, luz y opacidad comunes de Contacto. El contenido, los enlaces sociales y sus superficies permanecen encima; las capas siguen siendo `aria-hidden`, `inert` y ajenas al puntero. Todos los elementos decorativos están fuera del flujo, con dimensiones intrínsecas: su montaje no añade espacio a la página.

**Carga y control:** el mismo observer de proximidad de las escenas monta el PNG de Gyro al acercarse a Contacto. No se incluye en el HTML inicial del Hero ni se añade otra escucha de scroll. `onImageLoad` comparte la espera de `decode()` para fondos y personaje, comprueba el desmontaje y registra qué recursos están listos. `companionVisible` sólo es verdadero cuando el paisaje activo es `contact`, la sección real seleccionada es `#contacto` y el PNG de Gyro está decodificado. Una respuesta tardía al abandonar Contacto no puede hacerlo aparecer fuera de su sección.

**Aparición:** Gyro parte de opacidad0 y translateY8px; entra hacia opacidad1/transformnone en600ms, con la misma curva `--m-ease` y un retraso del20% del crossfade (180ms con900ms). El paisaje inicia primero el cambio y Johnny conserva su presencia. Al subir, Gyro se retira en350ms sin retraso. Se conserva montado después de la primera precarga, oculto fuera de Contacto, para invertir las transiciones desde el estado visual actual sin parpadeos ni nuevas descargas. No se usa `display:none` durante la salida.

**Responsive:** bajo1024px Gyro sólo cambia opacidad, sin desplazamiento vertical. Bajo640px una envoltura independiente reduce la pareja a escala.6 con origen inferior derecho, conservando las proporciones y la base. El ajuste se realiza con transform, sin cambiar tamaños de layout. Al salir de Contacto espera los350ms de retirada de Gyro antes de recuperar la escala individual de Johnny; una inversión retoma la transición actual. El Hero conserva el tamaño anterior de Johnny. El velo móvil80% y las superficies de las tarjetas mantienen legibles los enlaces.

**Movimiento reducido y teclado:** las reglas comunes eliminan duración y retraso de la aparición/salida; Gyro muestra el estado final sin translateY. La escala móvil de encuadre se conserva como composición estática. Con la pestaña oculta o un diálogo abierto, el ambiente del conjunto mantiene la pausa existente. No hay nuevas articulaciones de ropa o cabello.

**Ajustes:** `sceneMotion.companionMs` controla los600ms de entrada y `sceneMotion.companionLiftPx` los8px verticales. La salida usa `--scene-companion-exit:350ms`, declarado en `PortfolioSceneBackground.vue`. El encuadre, altura104%, solapamiento8px y escala móvil.6 están junto a sus selectores; no se cambian los PNG para ajustarlos.

**Validación:** pruebas de carga fallida/lenta/tardía, aparición exclusiva en Contacto y reentrada con el PNG en caché. Las pruebas de recursos siguen exigiendo igualdad con el kit. Playwright prepara comprobaciones de alineación, proximidad, proporciones, encuadre móvil, enlaces accesibles al puntero, consola y CLS, junto con capturas de la pareja y del modo reducido. Build y pruebas de Node se ejecutan dentro de Codex; la inspección renderizada de bordes, consola y CLS permanece pendiente de la terminal externa autorizada.

## 12. Kit amanecer de 80 fotogramas — PROMPT 1

Integración estática solicitada el13 de noviembre de2026. Se conserva la interfaz Dark Premium, el contenido, las fuentes, los proyectos, el stack, el contacto, las anclas, los diálogos y el movimiento de presentación. No se crean ilustraciones ni se modifica ningún recurso original.

`PortfolioSceneBackground.vue` es el único fondo montado. Presenta el frame `000` mediante `<picture>`: variante móvil720×1280 hasta720px y escritorio1536×864 por encima. Las rutas proceden del manifiesto verificado: `/portfolio-scroll/frames/mobile/000.webp` y `/portfolio-scroll/frames/desktop/000.webp`. El navegador selecciona la variante sin JavaScript; las precargas de `index.html` son mutuamente excluyentes. No se anticipan los159 recursos restantes ni se usa canvas para esta imagen fija.

La ilustración completa incluye a Johnny, sin recortes ni transformaciones de personajes. El fondo fijo mantiene `z-index:-1` dentro de `#app` aislado, `pointer-events:none`, `aria-hidden` e `inert`; la imagen usa `object-fit:cover` y anclaje central inferior. Un velo uniforme80% de `--p-bg` protege toda la superficie de texto y conserva el contraste teórico comprobado. Si la imagen no carga, queda el fondo oscuro. El encuadre y la intensidad del velo necesitan revisión renderizada externa.

El componente ya no monta `useSceneNarrative`, estrellas, overlays ni cambios de escena. Los módulos y recursos anteriores se conservan sin ejecutarse. La estrella Joestar y la espiral áurea nuevas están verificadas, pero no se muestran todavía. No hay listeners, rAF, precarga de otros fotogramas, crossfades, cursor ni parallax en este fondo; permanece estático también con movimiento reducido. La progresión nocturna, Gyro en Contacto y el scroll-scrubbing corresponden al PROMPT2, que no se ha ejecutado.

Validación de esta fase: integridad de los160 WebP, cuatro pósteres, manifiesto y SVG respecto al kit; dimensiones comprobadas con ImageMagick; prerenderizado responsive y ausencia del sistema anterior en el HTML. Resultados y límites en `docs/validation.md`. La suite E2E se adapta al frame fijo, selección de variante y navegación en ambas direcciones; su ejecución en Chromium queda para una terminal externa según `AGENTS.md`.


## 13. Scroll cinematográfico — segunda fase

Se implementa la segunda fase solicitada, sin auditoría final de Impeccable ni commits. El fondo contiene una única secuencia Canvas y los dos SVG originales del kit. **Las geometrías pertenecen al fondo fijo, no al flujo del contenido.** `App.vue` conserva exactamente su composición anterior: no hay bloques, filas ni espacios nuevos para alojarlas. Textos, proyectos, stack, contactos, navegación y diálogos permanecen intactos.

### Progreso y velocidad

`src/composables/useScrollSequence.js` exporta `sequenceSections`: `.hero`, `#proyectos`, `#stack`, `#contacto`. Sus hitos proceden de `public/portfolio-scroll/scroll-manifest.json`:0,27,52,79. Cada tope se mide como `getBoundingClientRect().top + scrollY`, limitado al máximo scroll alcanzable. `ResizeObserver`, resize, fuentes y pageshow actualizan esas medidas; no se asignan porcentajes inventados del documento.

Entre dos topes, el índice es `round(frameInicial + (frameFinal - frameInicial) * (scrollY - topeInicial) / (topeFinal - topeInicial))`. Perfil y Trayectoria forman parte de esas distancias, sin un hito nuevo. La fórmula funciona al bajar y subir. No hay temporizador de reproducción ni interpolación temporal que persiga al usuario: sólo se dibuja por scroll, resize o llegada del fotograma solicitado.

La velocidad es `(frameFinal - frameInicial) / distanciaDOM` en frames por píxel. Para ralentizar un tramo se amplía su distancia real de contenido; para acelerarlo se reduce. `sequenceSections` permite cambiar los selectores de transición y el cálculo de `top` determina su punto de activación. No editar los recursos originales ni añadir un espaciador bajo el footer para variar la duración. Los fotogramas de los hitos se leen del manifiesto, sin copias de sus números en el controlador.

### Canvas, caché y carga

El componente existente `PortfolioSceneBackground.vue` monta el controlador. Su `<picture>` del frame000 permanece como fallback prerenderizado y sin JavaScript. Se oculta de forma inmediata al primer dibujo válido; no hay crossfade entre pinturas ni una capa nueva de personajes. Canvas2D opaco dibuja una ilustración completa con cover, centro horizontal y apoyo inferior. DPR máximo1.5. Si el destino no está decodificado, el Canvas conserva los píxeles anteriores; al redimensionar, puede reutilizar la última imagen válida.

`createFrameCache` mantiene un LRU de12 imágenes decodificadas y un máximo de3 cargas simultáneas. Cada petición sustituye la cola por el destino y sus tres vecinos por sentido, priorizando la dirección del scroll. Un salto de sección no recorre ni descarga todos los índices intermedios. La última imagen dibujada puede conservar una referencia adicional fuera del LRU para mantener el fondo; no se pretende controlar la caché HTTP interna del navegador. No se cargan160 imágenes a la vez.

`sequenceSettings` permite ajustar `cacheLimit`, `prefetchRadius`, `concurrentLoads` y `maxDpr`. La variante móvil se selecciona hasta720px o en retrato con proporción≤3/4; el resto usa escritorio. Las precargas y `<picture>` comparten esa regla. Cambiar de variante vacía el LRU e invalida respuestas antiguas mediante una generación; conserva los píxeles mientras llega la nueva imagen. Una imagen fallida deja visible la última válida. Desmontar cancela rAF, listeners, observers y fetch del manifiesto, detiene imágenes pendientes y libera referencias. No hay dependencias nuevas.

Con `prefers-reduced-motion`, se elige el último hito alcanzado: imágenes fijas0/27/52/79, sin vecinos ni scrubbing entre ellas. Una tolerancia de0.5px resuelve el redondeo de scrollY frente a topes DOM fraccionarios. El cambio de preferencia se atiende en vivo. La pestaña oculta no programa dibujos. Todas las capas están bajo el contenido, son `aria-hidden`, `inert` y no reciben puntero ni foco.

### Estrella y proporción áurea en el fondo

`SceneOverlay.vue` carga los SVG indicados por el manifiesto dentro de `PortfolioSceneBackground.vue`. Normaliza sólo el encuadre de la copia en memoria; los archivos originales no se modifican. Los WebP027 y052 inspeccionados muestran paisaje/Johnny; la estrella y la construcción áurea son recursos SVG separados según el README del kit.

Estrella: contorno original de cinco puntas, conexiones y cinco nodos exteriores con sus halos, más los nodos interiores. Azul principal `#55B5FF`, nodos `#BDEAFF`. La línea se traza y los nodos se iluminan a intervalos de150ms. Se atenúan los elementos guía que tenían aspecto de HUD. La construcción áurea conserva sus diez rectángulos y el camino de arcos original: `#92722A`, `#D4AF37`, `#F4D77A`. Los rectángulos se trazan primero, con escalonado de65ms y450ms de duración; la espiral empieza a1100ms y se revela en1200ms. Los puntos de intersección y los resplandores son discretos. Cada geometría tiene un único pulso de opacidad del6% durante4s y después mantiene brillo estable; no queda un loop ambiental perpetuo.

La opacidad de presencia usa la posición real de Proyectos o Stack: aumenta entre el65% y el35% del viewport al entrar el tope, y disminuye cuando el final se acerca al35% superior. Al regresar puede volver a trazarse. El SVG queda en la franja del cielo, por encima del velo de contraste y detrás de la interfaz. Una máscara de la copia SVG reserva las cajas de las líneas de texto visibles, con4px horizontales y3px verticales de margen, para que las conexiones no crucen letras ni controles. Sólo la geometría se enmascara; las ilustraciones y las figuras permanecen intactas.

| Ajuste | Estrella | Proporción áurea |
| --- | --- | --- |
| Selector en `SceneOverlay.vue` | `.scene-overlay__drawing` | `[data-overlay="stack"] .scene-overlay__drawing` |
| Posición escritorio | left42%, top `var(--nav)` | left28%, top `calc(var(--nav) + 100px)` |
| Tamaño escritorio | width `clamp(260px,24vw,420px)`, height `min(26svh,260px)` | width `clamp(320px,32vw,600px)`, height `min(23svh,240px)` |
| Hasta1023px | right `var(--edge)`, top `calc(var(--nav) + 16px)`, width `min(60vw,360px)`, height `min(27svh,260px)` | Misma adaptación |
| Opacidad máxima | `--geometry-opacity`, por defecto1 | Puede sobrescribirse en el selector de Stack |
| Entrada/salida | Factores `.65`, `.3`, `.35` en `update()` | Mismos factores, medidos sobre Stack |

Modificar left/right/top cambia la posición; width/height cambian la escala manteniendo la relación del SVG; `--geometry-opacity` regula su presencia máxima además del fade por sección. Las reglas responsive prevalecen hasta1023px. Movimiento reducido elimina trazos, escalonado y pulso: las geometrías se muestran completas. Ocultar la pestaña o abrir un diálogo pausa el pulso. No se usa el fondo para añadir nuevos espacios a la página.

### Footer y límites comprobados

El espacio extra bajo el último crédito procedía de `padding-bottom:max(52svh, env(safe-area-inset-bottom))` en escritorio y móvil. Se sustituye por48px y32px respectivamente, conservando el área segura. DevTools midió aproximadamente47.94px tras el crédito en1440×900. Se preservan los mínimos de altura del contacto y la navegación.

Los80 nombres de cada variante existen y coinciden con el kit; hay79 archivos diferentes por variante porque061 y062 son idénticos. En el WebP070 de escritorio se observa doble contorno de Johnny ya pintado en la disolvencia entre composiciones. Los primeros frames cambian principalmente iluminación, sin animación independiente de ropa o pose; el final cambia de pintura. El Canvas reproduce esos píxeles y no puede convertirlos en80 poses distintas. No se añadieron desenfoques, mezclas ni recortes para ocultarlo. En079 original, Gyro está sentado a la izquierda de Johnny en escritorio y móvil.

Build y pruebas de Node aprobados. DevTools registró los80 índices de fotograma en llamadas reales a `drawImage`,159 posiciones de ida/vuelta, caché≤12, sin fallos, recursos antiguos, errores o layout shifts registrados en ese recorrido controlado de escritorio. Se comprobaron los cuatro hitos en ambos sentidos en390×844, sin overflow, y la preferencia reducida. Capturas de Proyectos escritorio/móvil y Stack escritorio inspeccionadas. Esto no equivale a ejecutar toda la suite Playwright ni medir rendimiento en un teléfono físico. Evidencia y pendientes en `docs/validation.md` y `docs/phase2-browser-validation.json`.


## 14. Limpieza del repositorio — 15 de noviembre de2026

Esta intervención conserva la presentación y el comportamiento vigentes. Los ocho componentes Vue, el controlador Canvas, los estilos, el contenido personal, las fuentes y los recursos cinematográficos retenidos mantienen sus bytes anteriores a la limpieza. El HTML prerenderizado y los paquetes JavaScript/CSS de producción también coinciden byte a byte con el build previo. No se rediseñó ni se retocaron ilustraciones.

La única distribución activa es `public/portfolio-scroll/`:80 WebP de escritorio,80 móviles, manifiesto y geometrías SVG. Las rutas de los160 índices siguen construyéndose desde `frames/desktop`, `frames/mobile` y `%03d.webp`. Se conservan ambos SVG finales y sus dos fuentes de referencia. El fallback responsive usa000 y el movimiento reducido selecciona000/027/052/079; los cuatro pósteres alternativos no tenían consumidores y se retiraron.

Se retiraron `public/portfolio-scenes/`, el controlador y los datos de crossfade sin montar, las distribuciones duplicadas y las demos. Las secciones9–12 describen etapas históricas; sus rutas y parámetros antiguos ya no forman parte del código. Los tres maestros únicos permanecen en `portfolio_joestar_amanecer_80f/sources/`; no borrar esos maestros por no tener imports. Los documentos de integración anteriores se retiraron al consolidar la documentación vigente.

Las pruebas de movimiento cubren ahora el controlador vigente y el recorrido completo0–79–0, en lugar del sistema retirado. La integridad de165 archivos está fijada en `tests/fixtures/scroll-assets.sha256.json`, obtenida después de comprobar la igualdad con el kit instalado. Cambiar esas huellas requiere aprobar expresamente nuevos recursos; no se regeneran como parte del test. Las repeticiones061/062 y el doble contorno del070 siguen siendo límites de los originales.

Resultados consolidados en `docs/validation.md`; los inventarios e informes puntuales se retiraron de GitHub tras conectar el repositorio. Esta limpieza no equivale a cerrar la auditoría visual pendiente: Chrome DevTools MCP no pudo conectarse a Chrome y la suite Playwright completa requiere una terminal externa.


## 15. Contenido confirmado de las once fichas — 15 de noviembre de 2026

`PORTFOLIO_CONTENT.md` no existía al comenzar esta tarea. Se creó con los textos completos proporcionados previamente por el titular y se leyó antes de completar `src/data/portfolio.js`. Las tres fichas de proyectos y las ocho de tecnologías conservan todos los apartados, títulos e interacciones existentes. La nota de proyectos de Trayectoria se corrigió para no presentar Idemne como un videojuego ya desarrollado.

Se respetan los límites de cada proyecto: Second Brain es un prototipo empresarial funcional en evolución, sin código ni datos internos públicos; Vende360 es una participación durante prácticas con integraciones parciales; Idemne está en diseño y preproducción, con mecánicas planificadas y sin demostración jugable. Los avisos de alcance aparecen antes de las funciones. No se añadieron fechas, empleadores, porcentajes de dominio, direcciones ni datos de infraestructura privada.

Las descripciones, problemas, experiencia y estados se muestran en párrafos separados por líneas en blanco. Aspectos técnicos usa párrafos; objetivos y funcionalidades mantienen listas. Separación entre párrafos16px y elementos de listas8px, conservando cuerpo16px/1.7 y encabezados18px/500. Las tecnologías de proyectos se presentan como una lista semántica de etiquetas con ajuste de línea, gap8px, padding4×10px, radio4px y los tokens existentes de borde/superficie. No hay controles nuevos ni cambios de tipografía, tema o animación.

El diálogo conserva ancho y alto máximo responsive, scroll interno, reserva del scrollbar, bloqueo del scroll de fondo, cierre con Escape, retorno de foco y reinicio al cambiar de ficha. Los estados pendientes sólo se muestran cuando falta información real; LinkedIn y el enlace público de Vende360 conservan su condición. Recursos cinematográficos, SVG, Canvas y controladores de movimiento permanecen intactos.

Build y42 pruebas aprobados, con comprobación del renderizado completo de las once fichas en memoria y origen del contenido. Se actualizaron las pruebas de navegador para textos extensos, alcance, etiquetas y scroll; no se ejecutaron porque Chrome DevTools MCP no pudo conectar y AGENTS.md reserva Chromium para una terminal externa. El responsive se revisó en código; la inspección visual, el foco/modalidad nativos y las referencias visuales actuales quedan pendientes. Detalles consolidados en `docs/validation.md`.


## 16. Preparación para GitHub Pages — 15 de noviembre de 2026

La producción usa `https://crudo27.github.io/portfolio/`; Vite mantiene `/` en desarrollo y `/portfolio/` en producción. El prerender comparte el modo producción. Los cambios de componentes se limitan a resolver recursos mediante `src/assetUrl.js` y `import.meta.env.BASE_URL`: iconos, fallback responsive, manifiesto, frames y SVG. No cambian estilos, datos profesionales, temporización, caché, figuras ni originales cinematográficos. Los manifiestos conservan sus rutas relativas y sus huellas.

Título y descripción se conservan; canonical, Open Graph/Twitter, favicon y sitemap usan la URL confirmada. La imagen social PNG1200×630 es una exportación de la composición SVG ya existente, sin alterar las ilustraciones. Los avisos de terceros se distribuyen junto al sitio. No se asigna licencia nueva a personajes, imágenes ni código propio; los permisos del kit deben confirmarse antes de la publicación definitiva.

El workflow oficial compila, prueba y verifica el artefacto antes de desplegar. Build y43 pruebas correctos; URLs del prerender y los160 destinos del controlador comprobados con la base de producción. La validación visual de la aplicación bajo la subruta sigue pendiente porque no hay navegador conectado y el preview no puede abrir puerto en el sandbox. Preparar el despliegue no equivale a haber publicado el sitio. No se hicieron commits, push ni cambios de configuración en GitHub en esta tarea. Instrucciones en `docs/deployment.md`.
