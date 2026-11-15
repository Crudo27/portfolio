<script setup>
import { navigation, personalProfile } from '../data/portfolio.js'
import ArrowIcon from './ArrowIcon.vue'
import SocialCards from './SocialCards.vue'
</script>

<template>
  <footer id="contacto" class="footer closing" tabindex="-1" aria-labelledby="contact-title">
    <div class="wrap">
      <div class="closing__cta close--type contact-content">
        <h2 id="contact-title">Hablemos<br />de <em>software.</em></h2>
        <div class="contact-details">
          <p>Puedes encontrarme en GitHub o escribirme por correo.</p>
          <SocialCards />
          <a class="btn btn--primary" href="#proyectos">Ver proyectos<ArrowIcon /></a>
        </div>
      </div>
      <div class="closing__links">
        <div class="footer-directory">
          <a class="wordmark" href="#top">portfolio<span aria-hidden="true">.</span></a>
          <nav aria-label="Navegación del pie"><a v-for="item in navigation" :key="item.href" :href="item.href"><span class="link-label">{{ item.label }}</span></a></nav>
          <a class="footer-top" href="#top"><span class="link-label">Volver al inicio</span><ArrowIcon /></a>
        </div>
        <div class="footer__legal"><span>{{ personalProfile.name }} · Desarrollo de software</span><span>Hecho con Vue 3</span></div>
        <p class="icon-credit">Los nombres y logotipos de las tecnologías pertenecen a sus respectivos titulares.</p>
      </div>
    </div>
  </footer>
</template>
