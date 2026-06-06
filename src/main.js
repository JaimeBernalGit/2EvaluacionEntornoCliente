import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { useUiStore } from './stores/ui'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
const pinia = createPinia()
const uiStore = useUiStore()
uiStore.iniciarTema()
createApp(App).use(router).use(pinia).mount('#app')
