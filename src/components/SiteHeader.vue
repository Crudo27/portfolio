<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { navigation } from '../data/portfolio.js'
import ArrowIcon from './ArrowIcon.vue'
import { useDialogMotion } from '../composables/useDialogMotion.js'

const menu = ref(null)
const { isOpen: menuOpen, ready: menuReady, open: openMenu, close: closeMenu, onClosed: onMenuClosed } = useDialogMotion(menu)
const activeHash = ref('')
let desktop

function syncHash() {
  activeHash.value = window.location.hash
}

function navigate(event) {
  closeMenu()
  document.querySelector(event.currentTarget.hash)?.focus({ preventScroll: true })
}

function closeOnDesktop(event) {
  if (event.matches) closeMenu()
}

onMounted(() => {
  desktop = window.matchMedia('(min-width: 1024px)')
  desktop.addEventListener('change', closeOnDesktop)
  syncHash()
  window.addEventListener('hashchange', syncHash)
})

onBeforeUnmount(() => {
  desktop?.removeEventListener('change', closeOnDesktop)
  window.removeEventListener('hashchange', syncHash)
})
</script>

<template>
  <header class="nav nav--centre" :class="{ 'nav--enhanced': menuReady }" @keydown.esc.stop>
    <div class="wrap nav__bar">
      <a class="skip-link" href="#top">Saltar al contenido</a>
      <a class="nav__logo wordmark" href="#top" aria-label="Portfolio, inicio">portfolio<span aria-hidden="true">.</span></a>
      <nav class="nav__links" aria-label="Navegación principal">
        <a v-for="item in navigation" :key="item.href" class="nav__link" :href="item.href" :aria-current="activeHash === item.href ? 'location' : undefined">{{ item.label }}</a>
      </nav>
      <div class="nav__actions">
        <a class="nav__link contact-link" href="#contacto" :aria-current="activeHash === '#contacto' ? 'location' : undefined">Contacto<ArrowIcon /></a>
        <button v-if="menuReady" class="btn icon-button menu-button" type="button" aria-haspopup="dialog" aria-controls="mobile-menu" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'" @click="openMenu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
        </button>
      </div>
    </div>
    <dialog id="mobile-menu" ref="menu" class="mobile-menu" aria-labelledby="menu-title" @close="onMenuClosed" @cancel.prevent="closeMenu()" @click.self="closeMenu">
      <div class="mobile-menu__head">
        <p id="menu-title" class="wordmark">portfolio<span aria-hidden="true">.</span></p>
        <button class="btn icon-button menu-close" type="button" aria-label="Cerrar menú" autofocus @click="closeMenu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
        </button>
      </div>
      <nav aria-label="Navegación móvil">
        <a v-for="item in navigation" :key="item.href" :href="item.href" :aria-current="activeHash === item.href ? 'location' : undefined" @click="navigate"><span class="link-label">{{ item.label }}</span><ArrowIcon /></a>
        <a href="#contacto" :aria-current="activeHash === '#contacto' ? 'location' : undefined" @click="navigate"><span class="link-label">Contacto</span><ArrowIcon /></a>
      </nav>
      <p class="mobile-menu__foot">Desarrollo de software<br />Ingeniería de Sistemas</p>
    </dialog>
  </header>
</template>
