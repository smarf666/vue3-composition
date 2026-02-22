import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// create the app here like you were using the CDN
const app = createApp(App)

// Tell the app to use the router and the vue store
app.use(createPinia())
app.use(router)


// mount the app to the div in index.html
app.mount('#app')
