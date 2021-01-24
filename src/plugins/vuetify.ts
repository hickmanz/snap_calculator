import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff0266',
        secondary: '#03DAC',
        tertiary: '#ff7597',
        accent: '#11cdef',
        error: '#f5365c'
      },
      dark: {
        primary: '#bb86fc',
        secondary: '#f4f5f7',
        accent: '#11cdef',
        warning: '#fbc053',
        error: '#cf6679'
      }
    },
    dark: true
  }
})

export default vuetify
