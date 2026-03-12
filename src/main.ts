import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'

import App from './App.vue'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import './app.scss'

const app = createApp(App)

app.use(createPinia())
// extras are handled via the imported CSS above, so no options are required
app.use(Quasar)

app.mount('#app')
