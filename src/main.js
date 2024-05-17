import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      { path: '/', redirect: '/page/false/1' },
      { name: 'Page', path: '/page/:sort/:page(\\d+)', component: import('./MainApp') },

   ]
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
