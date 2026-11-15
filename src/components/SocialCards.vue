<script setup>
import { socialLinks } from '../data/portfolio.js'
import { assetUrl } from '../assetUrl.js'
import ArrowIcon from './ArrowIcon.vue'
</script>

<template>
  <div class="social-cards">
    <component
      :is="platform.href ? 'a' : 'article'"
      v-for="platform in socialLinks"
      :key="platform.name"
      class="social-card"
      :class="{ 'social-card--pending': !platform.href }"
      :href="platform.href || undefined"
      :target="platform.href && platform.newTab ? '_blank' : undefined"
      :rel="platform.href && platform.newTab ? 'noopener noreferrer' : undefined"
    >
      <img class="social-card__icon" :src="assetUrl(`assets/icons/${platform.icon}.svg`)" alt="" width="32" height="32" :data-icon="platform.icon" />
      <div class="social-card__copy">
        <span class="social-card__name">{{ platform.name }}</span>
        <span class="social-card__description">{{ platform.description }}</span>
        <span class="social-card__status">{{ platform.href ? platform.action : 'Enlace pendiente' }}</span>
        <span v-if="platform.href && platform.newTab" class="sr-only">Se abre en una nueva pestaña.</span>
      </div>
      <ArrowIcon v-if="platform.href" />
    </component>
  </div>
</template>
