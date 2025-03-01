/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import axios from './axios'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import toastOptions from './toastification';

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(axios)
    .use(Toast, toastOptions)
}
