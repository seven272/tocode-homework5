import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import routers from '@/routes.js'
import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(routers)
app.use(store)
app.mount('#app')
