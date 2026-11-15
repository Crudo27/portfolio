# Instalación paso a paso

> Instrucciones históricas del ZIP original. El portfolio ya está integrado y la limpieza retiró la copia de distribución de esta carpeta. Usar `npm ci`, `npm run dev`, `npm test` y `npm run build` desde la raíz según `../README.md`. No volver a ejecutar los pasos de copia siguientes sobre el proyecto actual.

1. Descarga el ZIP y cópialo a `~/Downloads` (o ajusta la ruta a tu carpeta real de Descargas).
2. Desde la carpeta raíz del portfolio Vue ejecuta:

```bash
unzip -o ~/Downloads/Portfolio_Joestar_Amanecer_80_Frames.zip -d .
mkdir -p public/portfolio-scroll
cp -a portfolio_joestar_amanecer_80f/portfolio-scroll/. public/portfolio-scroll/
```

3. Comprueba que existen `public/portfolio-scroll/frames/desktop/079.webp` y `public/portfolio-scroll/frames/mobile/079.webp`.
4. Inicia el servidor `npm run dev` y verifica que `/portfolio-scroll/frames/desktop/079.webp` cargue.
5. Inicia Codex CLI desde la raíz del proyecto y pega los prompts del archivo `CODEX_PROMPTS.md`, uno por vez.

Si ya instalaste el kit anterior, sobrescribe **solo** `public/portfolio-scroll` con este kit. Codex debe desactivar overlays antiguos de Johnny/Gyro, no la estrella ni la espiral nuevas.
