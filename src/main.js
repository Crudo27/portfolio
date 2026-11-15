import { createApp, createSSRApp } from 'vue'
import '@fontsource-variable/geist/wght.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './style.css'
import './motion.css'
import App from './App.vue'

// La compilación incluye HTML prerenderizado; el servidor de desarrollo monta desde cero.
const app = document.querySelector('#app').hasChildNodes()
  ? createSSRApp(App)
  : createApp(App)

app.mount('#app')
