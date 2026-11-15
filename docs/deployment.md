# Publicación en GitHub Pages

Destino: **https://crudo27.github.io/portfolio/**. Repositorio: `Crudo27/portfolio`, rama `main`. La configuración está preparada localmente; no se ha creado ningún commit, hecho push, activado Pages ni ejecutado Actions durante esta tarea.

## Configuración y comprobaciones

Vite usa `/` en desarrollo y `/portfolio/` en modo producción. El prerender carga también el modo producción para que el HTML y la hidratación compartan las mismas rutas. `src/assetUrl.js` centraliza los recursos dinámicos mediante `import.meta.env.BASE_URL`: Canvas, manifiesto, SVG e iconos. Las rutas relativas internas del manifiesto (`frames/desktop`, `frames/mobile`, `overlays/...`) se conservan; no cambia ninguna de sus165 huellas aprobadas.

```sh
npm ci
npm test
npm run check:syntax
npm run build
npm run verify:dist
npm run preview
```

Abrir `http://localhost:4173/portfolio/` para comprobar la versión compilada. El servidor de desarrollo (`npm run dev`) sigue usando su raíz habitual.

`verify:dist` valida todos los recursos copiados de `public/`, las URL de HTML/CSS, fuentes, iconos, manifiesto,160 fotogramas, SVG, huellas y metadatos. Falla ante archivos ausentes o recursos que escapen de `/portfolio/`. Se probaron ambos fallos de forma controlada sobre `dist/` y se restauraron los archivos al terminar.

El test de despliegue comprueba el prerender de producción y genera los160 destinos reales mediante el controlador de caché, incluyendo los hitos que utiliza movimiento reducido. Las imágenes originales y la lógica de animación conservan su comportamiento; sólo cambian las URL necesarias para alojarlas bajo una subruta.

## Workflow

`.github/workflows/deploy.yml` escucha pushes a `main` y `workflow_dispatch`. Node.js24 LTS se fija mediante `.nvmrc`; las dependencias se instalan con `npm ci` y el lock existente. Build ejecuta sintaxis, pruebas, compilación y verificación de `dist/` antes de subir el artefacto. Deploy depende de build y sólo se ejecuta para `main`.

Los permisos globales están vacíos: build recibe únicamente `contents: read`; deploy recibe `pages: write` e `id-token: write`. Checkout no conserva credenciales. No se necesitan PAT ni secretos de empresa. El grupo de concurrencia `github-pages` evita despliegues simultáneos y no interrumpe uno en curso.

Acciones oficiales verificadas en sus releases y fijadas por SHA completo:

| Acción | Release |
| --- | --- |
| actions/checkout | v7.0.1 |
| actions/setup-node | v7.1.0 |
| actions/configure-pages | v6.0.0 |
| actions/upload-pages-artifact | v5.0.0 |
| actions/deploy-pages | v5.0.1 |

El YAML se analizó y se comprobaron eventos, permisos, dependencias, orden de comandos y referencias completas. `actionlint` no está instalado; no se presenta esa revisión como una ejecución de actionlint ni del runner de GitHub. La primera ejecución real confirmará los permisos y la configuración de Pages en la cuenta.

## Git: sincronización y commit manual

El repositorio ya existe y tiene tres commits remotos. `origin` local usa SSH (`git@github.com:Crudo27/portfolio.git`), que identifica el mismo repositorio que la URL HTTPS indicada. No se sobrescribió. En este entorno `.git` es de sólo lectura y las referencias locales siguen en el primer commit; la limpieza y el README anteriores ya están en GitHub. Esos cambios aparecen otra vez en `git status` por esa desincronización, no porque deban publicarse de nuevo.

Desde la raíz de esta copia, en una **terminal normal**, sincronizar únicamente los metadatos, conservando todos los archivos de trabajo:

```sh
git remote -v
git fetch origin
if git merge-base --is-ancestor HEAD origin/main; then
  git reset --mixed origin/main
else
  echo "La rama local tiene commits propios: revisar antes de continuar."
fi
git status --short
```

Continuar sólo si la comprobación de ancestro fue correcta. `reset --mixed` no borra archivos del directorio de trabajo; actualiza la referencia local y el índice. No usar `--hard`, `git clean` ni force-push. Si se prefiere HTTPS, después de comprobar que `origin` corresponde a este repositorio, cambiar sólo el transporte con `git remote set-url origin https://github.com/Crudo27/portfolio.git` y volver a ejecutar fetch.

Después de confirmar los derechos de las ilustraciones y revisar el diff:

```sh
git diff --check
git add .github/workflows/deploy.yml .gitignore .nvmrc vite.config.js index.html package.json
git add src/assetUrl.js src/App.vue src/components/PortfolioSceneBackground.vue src/components/SocialCards.vue src/composables/useScrollSequence.js
git add scripts/prerender.mjs scripts/check-syntax.mjs scripts/verify-dist.mjs
git add playwright.config.js tests/deployment.test.mjs tests/e2e/fixtures.mjs tests/e2e/portfolio.spec.mjs
git add public/share.png public/robots.txt public/sitemap.xml public/assets/licenses/third-party.txt
git add README.md DESIGN.md PARTE.md THIRD_PARTY_NOTICES.md docs/deployment.md docs/validation.md docs/e2e.md
git diff --cached --stat
git diff --cached --check
git commit -m "Prepare portfolio for GitHub Pages deployment"
git push origin main
```

No se incluyen `dist/`, dependencias instaladas, entornos privados, cachés, metadatos de agentes ni kits reemplazados. Los160 fotogramas finales, pruebas, snapshots, maestros únicos y licencias siguen en el repositorio y no deben borrarse.

## Habilitar Pages

1. Abrir [Settings → Pages](https://github.com/Crudo27/portfolio/settings/pages).
2. En **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Comprobar que Actions esté permitido para el repositorio. El entorno `github-pages` debe permitir desplegar desde `main`.
4. Subir el commit y abrir **Actions → Deploy portfolio to GitHub Pages**. Si ya se subió antes de habilitar Pages, ejecutarlo manualmente desde `main`.
5. Esperar a que build y deploy terminen correctamente y abrir la URL de producción. Si un paso falla, revisar su registro; no publicar manualmente una versión que haya fallado.

No crear una rama `gh-pages` ni subir `dist/`. No se ha comprobado que Pages esté activado: se deja esa acción al titular.

## SEO y privacidad

El HTML define título, descripción, idioma español, favicon bajo la base correcta, canonical y `og:url` definitivos. Open Graph/Twitter apuntan a una imagen PNG1200×630 exportada de la composición social existente y revisada localmente. La presentación del sitio no cambia. `sitemap.xml` contiene una única URL, sin rutas ficticias para las anclas.

Se distribuye `robots.txt` bajo `/portfolio/`; el archivo que gobierna el host completo tendría que estar en `https://crudo27.github.io/robots.txt`, fuera de este proyecto. No se afirma que el robots de la subruta controle el dominio. El HTML permite indexación con `index, follow`.

GitHub conserva su enlace confirmado. No se añadió LinkedIn ni se inventó un correo: el contacto ya autorizado permanece intacto. La revisión de secretos y los límites de publicación se documentan en `docs/validation.md`; permisos y licencias pendientes en `THIRD_PARTY_NOTICES.md`.

## Referencias oficiales

[Vite: GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub: workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Node.js: ramas LTS](https://nodejs.org/en/about/previous-releases). Los SHA y sus versiones se indican junto a cada acción en el workflow.
