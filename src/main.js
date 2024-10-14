//global styling
//import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const vuetify = createVuetify({
    components,
    directives
})
const app = createApp(App);

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app');

