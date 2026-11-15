# Procedencia y licencias

Este registro distingue el código del portfolio de los recursos de terceros. La visibilidad pública del repositorio no concede por sí misma una licencia global; no se ha asignado una licencia nueva al código propio ni a las ilustraciones.

| Recurso | Procedencia y licencia identificada |
| --- | --- |
| Vue 3 y herramientas Vue | MIT; aviso del runtime distribuido en `public/assets/licenses/third-party.txt`. |
| Vite y plugin Vue | MIT; herramientas de compilación, con licencias en los paquetes npm. |
| Playwright | Apache-2.0; herramienta de pruebas. |
| Geist e Instrument Serif | SIL OFL 1.1; textos completos en `public/assets/fonts/`. |
| Módulos Taste | MIT, Leonxlnx/taste-skill; aviso completo incluido en `public/assets/licenses/third-party.txt`. Sus archivos originales permanecen intactos. |
| Logos de tecnologías y redes | CC0-1.0 según gilbarbara/logos; procedencia en `public/assets/icons/icons-credits.json` y `social-credits.json`. Las marcas siguen perteneciendo a sus titulares. |
| Icono de base de datos | ISC, Lucide; aviso completo distribuido con el sitio. |
| Icono de correo y composiciones de las tarjetas | Recursos de interfaz propios del proyecto; no se atribuye una licencia de los logos a estos elementos. |
| Fotogramas, maestros y geometrías del kit Joestar | Suministrados por el titular. No se aportó una licencia explícita de redistribución. Los personajes pertenecen a una obra de terceros; su uso como fan art no demuestra autorización de publicación. |
| Imagen social PNG | Exportación de `public/share.svg`, sin utilizar ni modificar las ilustraciones cinematográficas. |

**Pendiente antes de la publicación definitiva:** confirmar los permisos aplicables a las ilustraciones/personajes y al kit, incluidos sus SVG. No se regeneraron imágenes, se sustituyeron personajes ni se declaró que estos materiales sean de dominio público.

El lock de npm incluye dependencias MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, MPL-2.0 y OFL-1.1. Dos entradas no indicaban licencia en el lock: se comprobó MIT en el paquete local de Vue y OFL-1.1 en el de Geist. Las dependencias de desarrollo se instalan mediante npm y no se publican como `node_modules/` en Pages. Este inventario no reemplaza los términos de cada licencia ni una autorización de los titulares.

Fuentes primarias: [Taste](https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE), [logos](https://github.com/gilbarbara/logos/blob/main/LICENSE.txt), [Lucide](https://github.com/lucide-icons/lucide/blob/main/LICENSE), [Vue](https://github.com/vuejs/core/blob/main/LICENSE), [Geist](https://github.com/vercel/geist-font/blob/main/OFL.txt). Los avisos originales conservados en el repositorio son la referencia para las fuentes instaladas.
