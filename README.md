# Gian Piero Rodríguez — Portfolio

Portfolio personal de un estudiante de Ingeniería de Sistemas y desarrollador de software, construido con Vue 3 y Vite. Presenta mis proyectos, intereses y experiencia con distintas tecnologías mediante una interfaz en español con identidad Dark Premium.

URL de producción prevista: **https://crudo27.github.io/portfolio/**

## Características

- Fondo cinematográfico que evoluciona de la noche al amanecer, con 80 fotogramas completos para escritorio y 80 para móvil, controlados por el desplazamiento.
- Renderizado Canvas con caché LRU de12 imágenes y precarga de fotogramas cercanos; la última imagen válida permanece mientras llega la siguiente.
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

Recomendado **Node.js24 LTS** (mínimo22.12) y npm. La versión de CI está indicada en `.nvmrc`.

```sh
npm ci
npm run dev
```

## Compilación de producción

```sh
npm run build
npm run preview
```

La compilación se genera en `dist/`, utiliza la base `/portfolio/` e incluye el prerenderizado del contenido principal. El servidor de desarrollo sigue funcionando en `/`. La vista previa de producción se abre en `http://localhost:4173/portfolio/` con el puerto predeterminado de Vite. Las fichas interactivas requieren JavaScript y un navegador con soporte para diálogos nativos.

## Pruebas

```sh
npm test
```

Comprobaciones de sintaxis y del sitio compilado:

```sh
npm run check:syntax
npm run build
npm run verify:dist
```

`verify:dist` comprueba las rutas bajo `/portfolio/`, los160 fotogramas, sus huellas de integridad, SVG, fuentes, iconos y metadatos. Un recurso ausente o una ruta incorrecta hace fallar la comprobación.

Para ejecutar las pruebas de navegador:

```sh
npx playwright install chromium
npm run test:e2e
```

La suite Playwright compila y sirve la aplicación automáticamente. Comprueba navegación, diálogos, responsive, movimiento reducido y recursos. Las instrucciones de revisión visual y los reportes están documentados en [docs/e2e.md](docs/e2e.md).

## Despliegue en GitHub Pages

El workflow [deploy.yml](.github/workflows/deploy.yml) se ejecuta con cada push a `main` y permite ejecución manual. Usa Node.js24 LTS, instala con `npm ci`, comprueba sintaxis, ejecuta pruebas, compila y verifica los recursos antes de subir el artefacto. Sólo un build correcto pasa al despliegue; los permisos de publicación se limitan a ese job.

En **Settings → Pages → Build and deployment**, seleccionar **GitHub Actions** como origen. Después de subir el workflow, revisar su ejecución en **Actions**. No se necesita una rama `gh-pages`, un token personal ni versionar `dist/`.

El sitio se publicará en **https://crudo27.github.io/portfolio/**. Las instrucciones de preparación de Git, las comprobaciones ejecutadas y los límites están en [docs/deployment.md](docs/deployment.md).

## Licencias y recursos

La procedencia de fuentes, iconos, dependencias y módulos está en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Las ilustraciones Joestar suministradas no incluyen una licencia de redistribución explícita: sus permisos deben confirmarse antes de la publicación definitiva. No se les atribuye una licencia del código ni de los iconos.

## Estructura

- `src/`: componentes Vue, datos, estilos y controladores de interacción.
- `public/`: fuentes, iconos, SVG y fotogramas de la secuencia cinematográfica.
- `tests/`: pruebas automatizadas y referencias visuales.
- `scripts/`: prerenderizado de producción.
- `docs/`: documentación técnica y resultados de validación.

El sistema visual se describe en [DESIGN.md](DESIGN.md). Las comprobaciones realizadas y sus límites se recogen en [docs/validation.md](docs/validation.md).

## Contacto

[GitHub](https://github.com/Crudo27) · [Correo electrónico](mailto:gp100805@gmail.com)
