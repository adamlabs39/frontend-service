import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PhosphorIcons from "@phosphor-icons/vue"

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import AutoComplete from 'primevue/autocomplete'
import Chip from 'primevue/chip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PhosphorIcons)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});
app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('Select', Select);
app.component('AutoComplete', AutoComplete);
app.component('Chip', Chip);

app.mount('#app')
