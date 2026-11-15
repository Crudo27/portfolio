# Portfolio — Kit de Johnny + Gyro (Vue 3)

Kit visual para integrar una narrativa de scroll en un portfolio **Dark Premium** sin reemplazar su estructura ni sus interacciones.

## Cómo previsualizar

1. Mantén esta estructura de carpetas y abre `preview/index.html` con un navegador.
2. Desplázate por las cuatro secciones: Hero → Proyectos → Stack → Contacto.
3. La vista previa es una **demostración visual**, no tu portfolio real. Las integraciones definitivas deben hacerse en el repositorio Vue mediante los prompts de `CODEX_PROMPTS.md`.

## Archivos

- `backgrounds/01-hero.webp`: noche estrellada, fondo base del Hero.
- `backgrounds/02-projects.webp`: cielo con conexiones estelares para Proyectos.
- `backgrounds/03-stack.webp`: cielo con geometría técnica para Stack.
- `backgrounds/04-contact.webp`: horizonte despejado para cierre.
- `characters/johnny-back.png`: personaje de espaldas, recorte PNG con transparencia derivado de ilustración.
- `characters/gyro-back.png`: Gyro de espaldas, PNG transparente.
- `overlays/stars.svg`: estrellas ligeras para movimiento muy lento.
- `overlays/joestar-star.svg`: constelación de cinco puntas con nodos para **Proyectos**.
- `overlays/golden-ratio.svg`: espiral en cuadrados áureos y rectángulo con razón φ para **Stack**.
- `overlays/orbit-nodes.svg` y `overlays/technical-grid.svg`: alias compatibles de los dos anteriores; ya no contienen la antigua geometría.
- `overlays/contrast-gradient.svg`: velo de contraste para la zona del texto.
- `preview/index.html`: demostración de transiciones por scroll.
- `preview/hero-composite.jpg` y `preview/contact-composite.jpg`: montajes de referencia de personajes sobre los fondos.
- `references/*.png`: escenas cinematográficas, alternativas y hojas de dirección visual. Son **referencias artísticas**, no capas SVG/PNG independientes.
- `CODEX_PROMPTS.md`: prompts secuenciales completos.
- `asset-manifest.json`: inventario técnico de los recursos.

## Dirección visual

- Johnny sentado en el **lado derecho**, visto **de espaldas y levemente hacia la izquierda**, contemplando la distancia.
- Durante Hero/Proyectos/Stack, cambian el cielo y los pequeños detalles, mientras el personaje mantiene una presencia contenida.
- En Contacto, Gyro se incorpora junto a Johnny, también de espaldas y mirando al horizonte.
- Fondo casi negro, azul medianoche, gris pizarra, azul acero; acentos lavanda muy sutiles.
- La zona izquierda queda disponible para el contenido y se puede oscurecer con un velo.
- Evitar que el fondo cubra botones, tarjetas o texto.

## Integración en Vue

Copiar al proyecto conservando carpetas bajo `public/portfolio-scenes/`. Los prompts asumen rutas como `/portfolio-scenes/backgrounds/01-hero.webp`.

**Transiciones recomendadas:** un fondo fijo en capas con crossfade por IntersectionObserver o posición de scroll, y dos imágenes PNG absolutas con `pointer-events: none`. Gyro hace aparición con opacidad + desplazamiento corto al entrar a Contacto. Movimiento de estrellas y horizontes muy suave; no animar `background-position` con gran intensidad ni filtros pesados.

**Responsive:** en móvil colocar personajes en zona baja, reducir escala/opacidad si el texto invade esa región y no tapar CTA. Para movimiento reducido, paisajes estáticos y cambios de escena sin desplazamientos ambientales.

**Accesibilidad:** figuras puramente decorativas, `aria-hidden="true"` y `alt=""`; no interceptar foco ni puntero. Precargar solo Hero; diferir las demás escenas si conviene.

## Limitaciones honestas

Las ilustraciones de fondo son imágenes planas. Las capas SVG y recortes de personajes son recursos separados. **El cabello y la ropa no están riggeados ni divididos en huesos o piezas animables**. Puedes lograr respiración/viento mínimo mediante transformaciones del sprite completo, pero animar mechones por separado exigiría crear capas adicionales y revisar los recortes. Los recortes PNG se extrajeron automáticamente de una lámina generada y pueden tener pequeños halos en bordes; revísalos en el navegador antes de publicar.

**Copyright:** Johnny Joestar y Gyro Zeppeli son personajes de *JoJo's Bizarre Adventure / Steel Ball Run*. Las ilustraciones son fan art; su uso público está sujeto a derechos de sus titulares. Valora ese aspecto antes de publicar un portfolio profesional.

## Actualización v1.1 — Únicamente geometría (estrella Joestar + proporción áurea)

Los **cuatro fondos WEBP, ambos PNG y todas las referencias** son exactamente los mismos del primer ZIP. No se han cambiado colores, estilo de ilustración, personajes, cielos ni encuadres.

- En **Proyectos** coloca `overlays/joestar-star.svg`: 5 puntas con nodos de luz, 10 vértices en silueta de estrella y guías muy suaves. Evita volver a poner el viejo `orbit-nodes.svg` como HUD de Stack.
- En **Stack** coloca `overlays/golden-ratio.svg`: rectángulo con proporción φ exacta (1.618…), cuadrados áureos y espiral dibujada con arcos de un cuarto de círculo. Sustituye el anterior HUD circular o rejilla añadidos por código.
- Se conservan los nombres antiguos `orbit-nodes.svg` y `technical-grid.svg` como **alias de contenido**, para evitar romper importaciones del primer kit; pero debes cambiar a qué **sección** se aplica cada SVG si ya lo tenías implementado.
- Los fondos originales tienen patrones muy tenues ya impresos dentro de la imagen. Los SVG nuevos se superponen sin editar esas imágenes, garantizando que el arte original permanezca intacto.
- Consulta `ACTUALIZACION_GEOMETRIA.md` y `CODEX_PROMPTS.md` para el prompt incremental.
