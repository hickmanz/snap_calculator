import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#7a34d0',
        secondary: '#303DAC',
        tertiary: '#391b5f',
        accent: '#11cdef',
        error: '#f5365c'
      },
      dark: {
        primary: '#bb86fc',
        secondary: '#f4f5f7',
        tertiary: '#292929',
        accent: '#11cdef',
        warning: '#fbc053',
        error: '#cf6679'
      }
    }
  }
})

export default vuetify
