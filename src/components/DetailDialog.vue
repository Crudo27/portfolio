<script setup>
import { computed, nextTick, ref } from 'vue'
import ArrowIcon from './ArrowIcon.vue'
import { useDialogMotion } from '../composables/useDialogMotion.js'

const dialog = ref(null)
const selected = ref(null)
const { open: openDialog, close, onClosed } = useDialogMotion(dialog)
let opener

const sections = computed(() => selected.value?.kind === 'project'
  ? [
      { title: 'Problema que busca resolver', text: selected.value.problem },
      { title: 'Objetivos', items: selected.value.goals },
      { title: 'Funcionalidades', items: selected.value.features, note: selected.value.featuresNote },
      { title: 'Tecnologías utilizadas', items: selected.value.technologies, tags: true },
      { title: 'Aspectos técnicos', paragraphs: selected.value.technicalHighlights },
      { title: 'Estado de desarrollo', text: selected.value.status },
    ]
  : [
      { title: 'Para qué la utilizo', text: selected.value?.usage },
      { title: 'Experiencia práctica', text: selected.value?.experience },
      { title: 'Proyectos en los que la he utilizado', items: selected.value?.projects },
      { title: 'Aspectos que me interesan', items: selected.value?.interests },
    ])

const links = computed(() => (selected.value?.links || []).flatMap((link) => {
  try {
    const { protocol } = new URL(link.href)
    return ['https:', 'http:', 'mailto:'].includes(protocol)
      ? [{ ...link, external: protocol !== 'mailto:' }]
      : []
  } catch {
    return []
  }
}))

async function open(entry, event) {
  selected.value = entry
  opener = event?.currentTarget || document.activeElement
  const interaction = { detail: event?.detail || 0 }
  await nextTick()
  if (!dialog.value) return
  dialog.value.scrollTop = 0
  openDialog(interaction)
}

function onClose() {
  if (dialog.value?.open) return
  onClosed()
  if (opener?.isConnected) opener.focus({ preventScroll: true })
  opener = null
}

function onBackdropClick(event) {
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(event)
}

defineExpose({ open })
</script>

<template>
  <dialog id="detail-dialog" ref="dialog" class="detail-dialog" aria-labelledby="detail-title" @keydown.esc.stop @cancel.prevent="close()" @close="onClose" @click.self="onBackdropClick">
    <div class="detail-dialog__header">
      <div>
        <h2 id="detail-title">{{ selected?.name || 'Detalles' }}</h2>
        <p v-if="selected?.category" class="muted">{{ selected.category }}</p>
      </div>
      <button class="btn icon-button detail-dialog__close" type="button" aria-label="Cerrar detalles" autofocus @click="close">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </button>
    </div>
    <div v-if="selected" class="detail-dialog__content">
      <p v-for="paragraph in (selected.description || 'Descripción ampliada por confirmar.').split('\n\n')" :key="paragraph" :class="{ 'detail-dialog__pending': !selected.description }">{{ paragraph }}</p>
      <section v-for="section in sections" :key="section.title" class="detail-dialog__section">
        <h3>{{ section.title }}</h3>
        <p v-if="section.note" class="detail-dialog__note">{{ section.note }}</p>
        <template v-if="section.text"><p v-for="paragraph in section.text.split('\n\n')" :key="paragraph">{{ paragraph }}</p></template>
        <template v-else-if="section.paragraphs?.length"><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></template>
        <ul v-else-if="section.items?.length" :class="{ 'detail-dialog__tags': section.tags }" role="list"><li v-for="item in section.items" :key="item">{{ item }}</li></ul>
        <p v-else class="detail-dialog__pending">Por confirmar.</p>
      </section>
      <div class="detail-dialog__links">
        <a v-for="link in links" :key="link.href" :href="link.href" :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noopener noreferrer' : undefined">{{ link.label }}<span v-if="link.external" class="sr-only">Se abre en una nueva pestaña.</span><ArrowIcon /></a>
        <p v-if="selected.kind === 'project' && !links.length" :class="{ 'detail-dialog__pending': !selected.repositoryNote }">{{ selected.repositoryNote || 'Repositorio y demostración por confirmar.' }}</p>
      </div>
    </div>
  </dialog>
</template>
