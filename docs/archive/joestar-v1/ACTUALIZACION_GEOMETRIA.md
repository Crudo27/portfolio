# Actualización mínima — Estrella Joestar y proporción áurea

**Sin rediseño.** Este paquete conserva intactos byte a byte `backgrounds/*.webp`, `characters/*.png` y `references/*.png` del primer ZIP.

## Qué cambió

- `overlays/joestar-star.svg` (nuevo): estrella regular de cinco puntas formada por nodos y conexiones para **Proyectos**.
- `overlays/golden-ratio.svg` (nuevo): rectángulo áureo exacto, cuadrados recursivos y su aproximación de espiral con arcos para **Stack**.
- `overlays/orbit-nodes.svg` y `overlays/technical-grid.svg`: contenido sustituido respectivamente por los dos SVG anteriores, por compatibilidad.
- `preview/index.html`: el overlay de estrella se activa en Proyectos y el overlay áureo en Stack.
- `asset-manifest.json`, `README.md` y prompts actualizados.

## Dónde ponerlos

Si **ya integraste el primer kit**, copia únicamente los cuatro archivos SVG de arriba a `public/portfolio-scenes/overlays/` y cambia el mapeo de overlays por secciones. La actualización NO requiere volver a copiar fondos ni personajes.

Si **todavía no integraste el kit**, copia `backgrounds/`, `characters/` y `overlays/` completos en `public/portfolio-scenes/`. Las carpetas `preview/` y `references/` son materiales auxiliares.

## Cómo se verán

- Hero y Contacto: mismos recursos originales, sin geometría nueva.
- Proyectos: estrella de cinco puntas visible sobre el cielo, sin desplazar a Johnny.
- Stack: geometría áurea en el cielo con líneas azules y acentos cálidos muy tenues.

> Los patrones finos que ya estaban impresos dentro de algunos WEBP siguen presentes; no se retocan los fondos para cumplir el requisito de conservar exactamente las imágenes iniciales.
