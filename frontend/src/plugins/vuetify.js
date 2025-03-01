/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false, // Változtatható: true = sötét mód, false = világos mód
        colors: {
          primary: '#C6AC8F', // **Egyedi primary szín (pl. kék)**
          secondary: '#FF5722', // **Másodlagos szín**
          accent: '#FFC107', // **Kiemelt szín**
          error: '#D32F2F', // **Hiba szín**
          warning: '#FBC02D', // **Figyelmeztető szín**
          success: '#4CAF50', // **Siker szín**
          info: '#1976D2', // **Információs szín**
          background: '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    global: {
      style: {
      },
    },
  },
})

export default vuetify