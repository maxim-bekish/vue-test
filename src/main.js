import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App'
import MainApp from './MainApp.vue'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      { path: '/', redirect: '/page/false/1' },
      { name: 'Page', path: '/page/:sort/:page(\\d+)', component: MainApp },
   ]
})

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')
