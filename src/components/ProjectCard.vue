<script setup>
import ArrowIcon from './ArrowIcon.vue'

defineProps({
  project: { type: Object, required: true },
})
defineEmits(['select'])
</script>

<template>
  <article :aria-labelledby="`project-${project.cover}`" class="project-card">
    <div class="project-card__heading">
      <h3 :id="`project-${project.cover}`">{{ project.name }}</h3>
      <span class="project-status">{{ project.statusLabel || 'Ficha en preparación' }}</span>
    </div>
    <button type="button" class="project-cover project-trigger" :class="`project-cover--${project.cover}`" aria-haspopup="dialog" aria-controls="detail-dialog" :aria-label="`Explorar ${project.name}`" :aria-describedby="`cover-${project.cover}`" @click="$emit('select', project, $event)">
      <span :id="`cover-${project.cover}`" class="sr-only">{{ `Portada conceptual provisional de ${project.name}; no representa su interfaz real.` }}</span>
      <span class="cover-content" aria-hidden="true">
        <span class="cover-label">Portada conceptual</span>
        <span class="cover-title"><span v-for="line in project.title" :key="line">{{ line }}</span></span>
        <svg v-if="project.cover === 'brain'" class="cover-art brain-art" viewBox="0 0 320 220" fill="none">
          <circle cx="115" cy="110" r="90" stroke="currentColor" stroke-width="1.2" />
          <circle cx="205" cy="110" r="90" stroke="currentColor" stroke-width="1.2" />
          <circle cx="160" cy="110" r="45" fill="currentColor" />
        </svg>
        <svg v-else-if="project.cover === 'vende'" class="cover-art vende-art" viewBox="0 0 320 220" fill="none">
          <ellipse cx="160" cy="110" rx="142" ry="84" stroke="currentColor" stroke-width="1.2" />
          <ellipse cx="160" cy="110" rx="95" ry="84" stroke="currentColor" stroke-width="1.2" />
          <ellipse cx="160" cy="110" rx="45" ry="84" stroke="currentColor" stroke-width="1.2" />
          <path d="M18 110h284M35 70h250M35 150h250" stroke="currentColor" stroke-width="1.2" />
        </svg>
        <svg v-else class="cover-art idemne-art" viewBox="0 0 320 220" fill="none">
          <path d="M28 195V25h85v170M113 25h85v170M198 25h85v170M28 25l85 170 85-170 85 170" stroke="currentColor" stroke-width="1.2" />
        </svg>
        <span class="cover-footer"><span>Explorar proyecto</span><ArrowIcon /></span>
      </span>
    </button>
    <p v-if="project.summary" class="project-summary">{{ project.summary }}</p>
  </article>
</template>
