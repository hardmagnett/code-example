import { createApp } from 'vue'
import { createPinia } from 'pinia'
import bootstrapALibrary from '@/a-library/bootstrap.js';


import App from './App.vue'
import router from './router'

import './main.css'


const app = createApp(App)

bootstrapALibrary({
  vueApp: app,
  appName: 'code-example'
})

app.use(createPinia())
app.use(router)

app.mount('#app')
