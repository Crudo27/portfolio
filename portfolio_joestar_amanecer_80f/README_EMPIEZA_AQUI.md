# Kit completo — De la noche al amanecer (80 fotogramas)

> Estado del repositorio tras la limpieza del15 de noviembre de2026: esta carpeta conserva la documentación original y los tres maestros de `sources/`. La distribución única está en `../public/portfolio-scroll/`. Se retiraron la copia `portfolio-scroll/`, `preview/` y `src-snippets/` al completar la integración. Las secciones siguientes describen el ZIP original; no repetir la instalación ni buscar aquí la demo eliminada. Para trabajar con el portfolio, seguir `../README.md`.

## Qué contiene

- 80 WebP **de escritorio** (`portfolio-scroll/frames/desktop/000.webp` … `079.webp`) a 1536×864.
- 80 WebP **móviles** (`portfolio-scroll/frames/mobile/000.webp` … `079.webp`) a 720×1280.
- 4 pósteres de carga/fallback y manifest JSON.
- SVG independientes: estrella Joestar y espiral áurea con construcciones geométricas.
- Recursos de referencia, previsualización interactiva y MP4.
- Componente Vue de referencia y prompts detallados para Codex CLI.

## Narrativa

- 000 — Hero: Johnny solo, noche profunda.
- 027 — Proyectos: brillo tenue de la noche y estrella Joestar mediante SVG.
- 052 — Stack: comienza a aclarar; espiral áurea mediante SVG.
- 062–079 — Contacto: transición pictórica al amanecer, con Gyro sentado **a la izquierda de Johnny** en la misma formación rocosa.

**Importante sobre la animación:** los frames son ilustraciones completas aplanadas; no se dibujan personajes como PNG por encima de los fondos. Los primeros fotogramas derivan del kit anterior y el tramo final utiliza una disolvencia pictórica hacia las nuevas ilustraciones aprobadas. No son 80 dibujos distintos realizados manualmente. Como las pinturas maestras no son perfectamente idénticas, puede percibirse un breve cambio de pose durante esa disolvencia. Preferimos advertirlo en lugar de prometer continuidad pixel-perfect inexistente.

## Instalación

En la raíz del proyecto Vue donde está `package.json`:

```bash
unzip -o ~/Downloads/Portfolio_Joestar_Amanecer_80_Frames.zip -d .
mkdir -p public/portfolio-scroll
cp -a portfolio_joestar_amanecer_80f/portfolio-scroll/. public/portfolio-scroll/
```

No vuelvas a utilizar recortes antiguos (`johnny-back.png` / `gyro-back.png`) sobre estos fondos. La ilustración incluye ambos personajes dentro de los fotogramas.

## Vista previa

```bash
python3 -m http.server 7777 --directory portfolio_joestar_amanecer_80f
```

Abre `http://localhost:7777/preview/index.html` y mueve el slider o desplázate por la página.

## Guía

Lee `CODEX_PROMPTS.md` e integra en tres fases. Para la escena final que aprobaste consulta `sources/contact-master-approved-desktop.png` y `sources/contact-master-approved-mobile.png`.
