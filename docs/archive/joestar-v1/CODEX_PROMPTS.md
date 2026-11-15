# Prompts listos para Codex CLI — Portfolio Johnny + Gyro

Ejecútalos **en el mismo chat de Codex**, uno después del otro. La carpeta descomprimida `portfolio_johnny_gyro_kit/` debe estar disponible en la raíz del repositorio o en una ruta que puedas indicar a Codex. Verifica que los nombres de las skills coincidan con las instaladas; si no, Codex debe reportarlo, **no fingir haberlas ejecutado**.

---

## PROMPT 1 — Inspección, assets e integración inicial (Taste)

```text
$design-taste-frontend

Estoy trabajando en mi portfolio personal Vue 3 y he preparado un kit de ilustraciones originalizadas a partir de fan art de Johnny Joestar y Gyro Zeppeli. El directorio entregado es portfolio_johnny_gyro_kit/.

OBJETIVO: integrar el sistema visual de escenas SIN reconstruir el portfolio ni alterar mis secciones, proyectos, stack o modales.

1. Lee DESIGN.md, package.json, la estructura Vue y portfolio_johnny_gyro_kit/README.md y asset-manifest.json.
2. Inspecciona el Hero y la sección Contacto. Conserva las decisiones positivas del diseño actual.
3. Copia los recursos utilizables de backgrounds/, characters/ y overlays/ a public/portfolio-scenes/ manteniendo sus nombres y rutas; trata references/ como material auxiliar, no como recursos de producción.
4. Registra el mapeo de recursos en una configuración centralizada reutilizable (escenas hero, projects, stack, contact).
5. Define qué elemento ocupará el fondo fijo, el velo de contraste, el personaje Johnny en el lado derecho y la futura aparición de Gyro en Contacto.
6. Respeta la composición: Johnny sentado de espaldas hacia la izquierda, dejando libre el texto de la izquierda. Conserva las fuentes sans-serif actuales, sin serif cursiva editorial.
7. Actualiza DESIGN.md solo con las decisiones aprobadas y los nombres exactos de assets; evita reescribir la guía completa.
8. Comprueba que las rutas de archivos cargan. No implementes animaciones complejas todavía.

No inventes sprites separados de cabello/ropa ni alteres las imágenes fingiendo que son capas riggeadas. No introduzcas dependencias pesadas. No realices commits.

Al finalizar indica archivos modificados y cualquier incompatibilidad de assets.
```

---

## PROMPT 2 — Fondo vivo y transiciones por scroll (Emil's)

```text
$emil-design-eng

Ahora implementa el fondo atmosférico e interactivo utilizando los recursos integrados en el paso anterior.

1. Crea un componente Vue reutilizable, por ejemplo PortfolioSceneBackground.vue, con cuatro capas de escena: Hero, Proyectos, Stack y Contacto, asociadas a las secciones REALES presentes en el proyecto.
2. Mantén los paisajes fijos detrás de toda la interfaz y haz transiciones suaves de opacidad entre imágenes al entrar en cada sección. Evita pantallas en negro, saltos al hidratar y cambios bruscos de tono.
3. Coloca a Johnny a la derecha, sentado de espaldas y mirando algo hacia la izquierda. Debe acompañar el recorrido sin tapar títulos, tarjetas ni botones. Reduce su presencia en secciones densas si mejora la legibilidad.
4. Usa stars.svg con opacidad baja. Coloca EXCLUSIVAMENTE joestar-star.svg en Proyectos como constelación de cinco puntas y golden-ratio.svg en Stack como espiral y rectángulos áureos. No coloques la estrella en Stack. Si ya usas orbit-nodes.svg o technical-grid.svg, reasigna por sección o usa los nombres explícitos. Añade ligerísimo movimiento ambiental si corresponde; no debe competir con el contenido.
5. Usa IntersectionObserver y/o requestAnimationFrame para calcular las transiciones; evita escuchas de scroll no reguladas. Limpia observers/listeners en onBeforeUnmount.
6. Conserva la navegación, los modales, el foco de teclado y las animaciones ya existentes.
7. Mantén capas decorativas con pointer-events:none, aria-hidden=true, alt vacío. Preload moderado, lazy loading de fondos secundarios, CSS transform/opacity cuando sea posible.
8. Para prefers-reduced-motion desactiva animación ambiental/parallax y conserva una transición instantánea o discreta.
9. En móviles usa un diseño legible y estable, con Johnny pequeño en la parte inferior o fondo atenuado, sin ocultar contenido ni incrementar CLS.

No instales Three.js, GSAP u otra dependencia salvo necesidad demostrable. No sobreescribas DESIGN.md con nuevas decisiones estéticas arbitrarias. No realices commits.

Al terminar, ejecuta el build y explica la estrategia de scroll y de limpieza de recursos.
```

---

## PROMPT 3 — Contacto: aparición de Gyro + pulido (Emil's)

```text
$emil-design-eng

Quiero completar la narrativa visual del portfolio: Johnny contempla el horizonte desde el Hero y, al llegar a Contacto, Gyro aparece junto a él, ambos de espaldas.

1. Usa los recortes existentes johnny-back.png y gyro-back.png como dos capas independientes con el mismo punto de anclaje al terreno.
2. Johnny debe mantenerse reconocible, a la derecha. Gyro debe aparecer a su izquierda en la escena de Contacto, sin cubrir texto, links o controles.
3. Al entrar en Contacto, Gyro hace fade-in con un pequeño desplazamiento de 8–16px, sin salto de layout. Al volver hacia arriba, el efecto se invierte sin parpadeos.
4. Mantén idénticos horizonte, escala visual, iluminación y paleta entre personajes. Evita cambios de escena demasiado marcados.
5. Puedes dar movimiento mínimo al conjunto (1–3 px de desplazamiento ambiental muy lento), pero NO simules cabello y ropa articulados si no existen capas individuales.
6. En móvil, reajusta sus posiciones y tamaños o usa el montaje estático de referencia como fallback si la composición de dos sprites no funciona.
7. Respeta prefers-reduced-motion: Gyro debe aparecer correctamente sin desplazamientos animados.
8. Revisa contraste, legibilidad y enlaces de contacto, incluido tab y foco de teclado.
9. Actualiza solo la parte correspondiente de DESIGN.md y evita modificar mis datos personales.

Valida los componentes y no realices commits.
```

---

## PROMPT 4 — Auditoría final con navegador y pruebas (Impeccable)

```text
$impeccable

Realiza una revisión final de la integración de escenas Johnny/Gyro en mi portfolio Vue 3 utilizando los principios de audit, critique, polish y harden de Impeccable.

1. Lee DESIGN.md, README de assets y docs/validation.md si existe.
2. Prueba en escritorio 1440x900 y 1920x1080, tablet 768x1024, móvil 390x844 y 360x800.
3. Usa Chrome DevTools MCP si está disponible para inspeccionar renderizado, consola, interacciones, capturas y cambios de layout. Si Chromium está bloqueado por el sandbox, NO afirmes haber hecho pruebas de navegador: usa un navegador MCP externo permitido o prepara un script Playwright para ejecutar fuera del sandbox.
4. Comprueba que el texto del Hero y las tarjetas se leen claramente sobre cada paisaje y que las capas no interceptan clics.
5. Verifica cambios entre las cuatro secciones, aparición/desaparición de Gyro, navegación ascendente y descendente, teclado, Escape, scroll y preferencia de movimiento reducido.
6. Examina problemas de rendimiento y memoria, fugas de observers/listeners, carga de imágenes, CLS, errores de consola y exceso de animaciones.
7. Corrige SOLO defectos confirmados y documenta los resultados reales. No rediseñes el portfolio ni sustituyas las ilustraciones por fondos genéricos.
8. Ejecuta build, pruebas actuales, copy-lint y cualquier verificación existente. No realices commits.

Entrega resumen de incidencias, correcciones, evidencias y pendientes. Si Impeccable no carga, informa la limitación y continúa solo con lo que puedas verificar.
```

---

## Revisión humana opcional

Cuando Codex termine, comprueba personalmente que los personajes no tapan el nombre en móvil y que el cambio de escena no distrae del portfolio. No es necesario imponer más partículas o efectos complejos.


---

## PROMPT EXTRA — Si ya integraste el primer ZIP y solo quieres estos dos cambios

```text
$design-taste-frontend
$emil-design-eng

Mi portfolio Vue 3 ya tiene integrado el primer kit visual de Johnny y Gyro. No quiero ningún rediseño ni nuevas ilustraciones. He añadido la versión actualizada del kit al repositorio.

Lee DESIGN.md, portfolio_johnny_gyro_kit/ACTUALIZACION_GEOMETRIA.md y asset-manifest.json.

Realiza ÚNICAMENTE dos cambios de overlays:
1. PROYECTOS: usa /portfolio-scenes/overlays/joestar-star.svg, una constelación con nodos formando una estrella de cinco puntas. Actívala solo cuando la sección Proyectos esté visible y anímala con una aparición muy sutil.
2. STACK: usa /portfolio-scenes/overlays/golden-ratio.svg, con espiral y rectángulos áureos. Actívalo solo cuando la sección Stack esté visible, sustituyendo cualquier HUD circular que hayas añadido como overlay de código.

Copia los SVG nuevos desde portfolio_johnny_gyro_kit/overlays/ a public/portfolio-scenes/overlays/; actualiza el mapeo de escenas si existe. Las rutas viejas orbit-nodes.svg y technical-grid.svg están sustituidas por compatibilidad, pero no mantengas su anterior asignación a secciones.

NO modifiques backgrounds, characters, fuentes, layout, contenido, paleta, animaciones de Johnny/Gyro, ni lógica de modales o navegación. Mantén opacidad baja, pointer-events:none, aria-hidden y prefers-reduced-motion. Comprueba responsive y build, y documenta solo los dos overlays nuevos en DESIGN.md. No hagas commit.
```
