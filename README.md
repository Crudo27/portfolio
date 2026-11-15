# Gian Piero Rodríguez — Portfolio

Portfolio personal de un estudiante de Ingeniería de Sistemas y desarrollador de software, construido con Vue 3 y Vite. Presenta mis proyectos, intereses y experiencia con distintas tecnologías mediante una interfaz en español con identidad Dark Premium.

## Características

- Fondo cinematográfico que evoluciona de la noche al amanecer, con 80 fotogramas completos para escritorio y 80 para móvil, controlados por el desplazamiento.
- Estrella Joestar y geometría áurea integradas como SVG en el fondo.
- Fichas interactivas para tres proyectos y ocho tecnologías.
- Diseño responsive, navegación por teclado y soporte para movimiento reducido.
- Diálogos nativos con desplazamiento interno y retorno de foco.
- Contenido principal prerenderizado y recursos servidos localmente.

## Proyectos destacados

| Proyecto | Descripción | Estado |
| --- | --- | --- |
| **Second Brain** | Asistente empresarial con IA para consultar información, visualizar documentos y generar cotizaciones. | Prototipo funcional en evolución. Código y datos internos privados. |
| **Vende360** | Marketplace de vehículos en cuyo desarrollo frontend e integración participé durante mis prácticas profesionales. | Módulos funcionales e integraciones parciales. |
| **Idemne** | Proyecto personal de roguelike 2D centrado en identidad, decisiones y progresión. | Diseño y preproducción; las mecánicas están planificadas y todavía no hay demo jugable. |

Las portadas de las fichas son composiciones conceptuales, no capturas de las interfaces de los proyectos.

## Tecnologías del portfolio

Vue 3 · JavaScript · CSS · Vite · Canvas 2D · SVG · Playwright

El stack presentado en las fichas incluye C++, Java, Python, TypeScript, Vue, Nuxt, NestJS y SQL, con información sobre su uso en mis proyectos y formación.

## Desarrollo local

Requiere **Node.js 22.12 o posterior** y npm.

```sh
npm ci
npm run dev
```

## Compilación de producción

```sh
npm run build
npm run preview
```

La compilación se genera en `dist/` e incluye el prerenderizado del contenido principal. Las fichas interactivas requieren JavaScript y un navegador con soporte para diálogos nativos.

## Pruebas

```sh
npm test
```

Para ejecutar las pruebas de navegador:

```sh
npx playwright install chromium
npm run test:e2e
```

La suite Playwright compila y sirve la aplicación automáticamente. Comprueba navegación, diálogos, responsive, movimiento reducido y recursos. Las instrucciones de revisión visual y los reportes están documentados en [docs/e2e.md](docs/e2e.md).

## Estructura

- `src/`: componentes Vue, datos, estilos y controladores de interacción.
- `public/`: fuentes, iconos, SVG y fotogramas de la secuencia cinematográfica.
- `tests/`: pruebas automatizadas y referencias visuales.
- `scripts/`: prerenderizado de producción.
- `docs/`: documentación técnica y resultados de validación.

El sistema visual se describe en [DESIGN.md](DESIGN.md). Las comprobaciones realizadas y sus límites se recogen en [docs/validation.md](docs/validation.md).

## Contacto

[GitHub](https://github.com/Crudo27) · [Correo electrónico](mailto:gp100805@gmail.com)
