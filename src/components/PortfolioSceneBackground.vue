<script setup>
import { ref } from 'vue'
import SceneOverlay from './SceneOverlay.vue'
import { useScrollSequence } from '../composables/useScrollSequence.js'
const scrollManifest = ref(null)
const root = ref(null), canvas = ref(null)
const { frame, targetFrame, ready, reduced, variant, error } = useScrollSequence(root, canvas, (_, manifest) => { scrollManifest.value = manifest })
</script>

<template>
  <div ref="root" class="portfolio-scene" :data-frame="frame" :data-target-frame="targetFrame" :data-ready="ready" :data-reduced="reduced" :data-variant="variant" :data-error="error" aria-hidden="true" inert>
    <picture class="portfolio-scene__fallback">
      <source media="(max-width: 720px), (max-aspect-ratio: 3/4)" srcset="/portfolio-scroll/frames/mobile/000.webp" width="720" height="1280" />
      <img class="portfolio-scene__landscape" src="/portfolio-scroll/frames/desktop/000.webp" width="1536" height="864" alt="" decoding="async" fetchpriority="high" draggable="false" />
    </picture>
    <canvas ref="canvas" class="portfolio-scene__canvas" width="1536" height="864"></canvas>
    <div class="portfolio-scene__veil"></div>
    <template v-if="scrollManifest">
      <SceneOverlay :src="`/portfolio-scroll/${scrollManifest.overlays.projects}`" kind="projects" />
      <SceneOverlay :src="`/portfolio-scroll/${scrollManifest.overlays.stack}`" kind="stack" />
    </template>
  </div>
</template>

<style scoped>
.portfolio-scene {
  --scene-text-scrim: 80%;
  --scene-right-scrim: 40%;
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: clip;
  pointer-events: none;
  background: var(--p-bg);
}
.portfolio-scene__landscape, .portfolio-scene__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
}
.portfolio-scene__canvas { visibility: hidden; }
.portfolio-scene[data-ready="true"] .portfolio-scene__canvas { visibility: visible; }
.portfolio-scene[data-ready="true"] .portfolio-scene__fallback { visibility: hidden; }
.portfolio-scene__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, color-mix(in srgb, var(--p-bg) var(--scene-text-scrim), transparent) 0 25%, color-mix(in srgb, var(--p-bg) 55%, transparent) 60%, color-mix(in srgb, var(--p-bg) var(--scene-right-scrim), transparent) 100%);
}
@media (max-width: 1023px) {
  .portfolio-scene__veil { background: color-mix(in srgb, var(--p-bg) var(--scene-text-scrim), transparent); }
}
</style>
