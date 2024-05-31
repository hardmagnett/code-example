import { createApp } from 'vue'
import { createPinia } from 'pinia'
import attachAllALibraryComponents from '@/a-library/attachAllALibraryComponents.js';


import App from './App.vue'
import router from './router.ts'

import './main.css'


const app = createApp(App)

attachAllALibraryComponents(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
