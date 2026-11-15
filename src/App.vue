<script setup>
import { ref } from 'vue'
import { personalProfile, projects, technologies } from './data/portfolio.js'
import ArrowIcon from './components/ArrowIcon.vue'
import SiteHeader from './components/SiteHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import SiteFooter from './components/SiteFooter.vue'
import DetailDialog from './components/DetailDialog.vue'
import PortfolioSceneBackground from './components/PortfolioSceneBackground.vue'

const details = ref(null)

function explore(entry, kind, event) {
  details.value.open({ ...entry, kind }, event)
}
</script>

<template>
  <PortfolioSceneBackground />
  <SiteHeader />

  <main id="top" tabindex="-1">
    <section class="hero hero--statement" data-enter aria-labelledby="hero-title">
      <div class="wrap">
        <div class="hero-text hero__in">
          <h1 id="hero-title">Gian Piero<br /><em>Rodríguez.</em></h1>
          <div class="hero-intro">
            <p class="hero-role">Desarrollador de software.<br /><span>Estudiante de Ingeniería de Sistemas.</span></p>
            <div class="hero-description">
              <p class="hero__lead">Me interesan el backend, la arquitectura de software, los algoritmos, la inteligencia artificial y el desarrollo de videojuegos.</p>
              <a class="btn btn--primary" href="#proyectos">Ver proyectos<ArrowIcon /></a>
            </div>
          </div>
          <div class="hero__facts">
            <span>Código, sistemas y curiosidad.</span>
            <span>Una selección de {{ projects.length }} proyectos</span>
            <a class="hero-scroll" href="#sobre-mi"><span class="link-label">Conoce mi perfil</span><ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>

    <section id="proyectos" tabindex="-1" class="section projects-section" aria-labelledby="projects-title">
      <div class="wrap">
        <h2 id="projects-title">Proyectos <em>seleccionados.</em></h2>
        <div class="section-intro">
          <p>Explora Second Brain, Vende360 e Idemne.</p>
          <p class="muted">Fichas en preparación. Los detalles sin confirmar se indican dentro de cada proyecto.</p>
        </div>
        <div class="project-grid">
          <ProjectCard v-for="project in projects" :key="project.name" :project="project" @select="(entry, event) => explore(entry, 'project', event)" />
        </div>
      </div>
    </section>

    <section id="sobre-mi" tabindex="-1" class="section about-section" data-moment="word-highlight" aria-labelledby="about-title">
      <div class="wrap">
        <h2 id="about-title">Sobre mí.</h2>
        <p class="sr-only about-statement-readable">Estudio Ingeniería de Sistemas y me especializo en desarrollo de software.</p>
        <p class="mo-wh__text about-statement" aria-hidden="true">Estudio Ingeniería de Sistemas y me especializo en <strong>desarrollo de software.</strong></p>
        <div class="about-bottom">
          <p class="about-note">Mi interés por el software también pasa por entender cómo se organiza, cómo aprende y cómo se convierte en una experiencia interactiva.</p>
          <ul class="interest-list" aria-label="Áreas de interés">
            <li v-for="interest in personalProfile.interests" :key="interest">{{ interest }}<span class="interest-dot" aria-hidden="true"></span></li>
          </ul>
        </div>
      </div>
    </section>

    <section id="stack" tabindex="-1" class="section stack-section" aria-labelledby="stack-title">
      <div class="wrap">
        <h2 id="stack-title">Mi stack <em>tecnológico.</em></h2>
        <div class="stack-layout">
          <div class="stack-copy">
            <p>Lenguajes, frameworks y bases de datos con los que trabajo principalmente.</p>
            <p class="stack-display" aria-hidden="true">Lenguajes<br /> y <em>frameworks.</em></p>
            <p class="muted">Selecciona una tecnología para conocerla y consultar la experiencia documentada.</p>
          </div>
          <ul class="tools-grid" aria-label="Tecnologías principales">
            <li v-for="tool in technologies" :key="tool.name" class="tool-row">
              <button type="button" class="tool-button" aria-haspopup="dialog" aria-controls="detail-dialog" :aria-label="`Explorar ${tool.name}`" @click="explore(tool, 'technology', $event)">
                <img :src="`/assets/icons/${tool.icon}.svg`" alt="" width="36" height="36" :data-icon="tool.icon" />
                <span class="tool-copy"><span class="tool-name">{{ tool.name }}</span><span class="tool-category">{{ tool.category }}</span></span>
                <ArrowIcon />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="trayectoria" tabindex="-1" class="section trajectory-section" aria-labelledby="trajectory-title">
      <div class="wrap">
        <h2 id="trajectory-title">Formación <em>y trayectoria.</em></h2>
        <div class="trajectory-layout">
          <div class="trajectory-intro">
            <p class="trajectory-display">En<br /> <em>construcción.</em></p>
            <p>Mi recorrido combina la formación en Ingeniería de Sistemas con el desarrollo de proyectos de software.</p>
          </div>
          <ol class="trajectory-list">
            <li>
              <span class="trajectory-meta">Formación actual</span>
              <h3>Ingeniería de Sistemas</h3>
              <p>Estudiante con especialización en desarrollo de software.</p>
              <p class="provisional-note">Institución y fechas por añadir.</p>
            </li>
            <li>
              <span class="trajectory-meta">Práctica en proyectos</span>
              <h3>Second Brain, Vende360 e Idemne</h3>
              <p>Second Brain, asistente empresarial en evolución; Vende360, participación durante prácticas profesionales; Idemne, diseño y preproducción de un videojuego personal.</p>
            </li>
            <li>
              <span class="trajectory-meta">Contenido provisional</span>
              <h3>Experiencia laboral</h3>
              <p>Este espacio se completará con experiencia confirmada.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </main>

  <SiteFooter />
  <DetailDialog ref="details" />
</template>
