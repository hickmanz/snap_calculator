import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ConfigState } from './types'
import { Globals } from '@/globals'
import { localConfig } from '@/main'
import vuetify from '@/plugins/vuetify'

export const mutations: MutationTree<ConfigState> = {
  /**
   * During init of the store, sets localConfig.
   * This would usually be set once loaded from localStorage.
   */
  async onInitLocal (state, { darkMode }) {
    Vue.set(state.generalConfig, 'darkMode', darkMode)
  },
  updateDarkMode (state, payload) {
    Vue.set(state.generalConfig, 'darkMode', payload)
    vuetify.framework.theme.dark = state.generalConfig.darkMode
  }
}
