import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

// INIT AOS (SETELAH APP SIAP)
AOS.init({
  duration: 800,
  once: true
})

app.mount('#app')