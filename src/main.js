import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App'
import { VueQueryPlugin } from '@tanstack/vue-query'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      { path: '/', redirect: '/page/false/1' },
      { name: 'Page', path: '/page/:sort/:page(\\d+)', component: import('./MainApp') },

   ]
})


const app = createApp(App)
   .use(VueQueryPlugin)
   .use(router)
   .mount('#app')
