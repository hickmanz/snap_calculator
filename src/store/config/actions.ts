import Vue from 'vue'
import { ActionTree } from 'vuex'
import { ConfigState, Config } from './types'
import { RootState } from '../types'
import { Globals } from '@/globals'
import { localConfig } from '@/main'

export const actions: ActionTree<ConfigState, RootState> = {
  async initLocal ({ commit }, payload: Config) {
    const darkMode = await localConfig.getItem(Globals.LOCAL_CONFIG_THEME_KEY)
    commit('onInitLocal', { darkMode }) // Just loads local storage config into the store.
  },
  saveGeneralConfig ({ state }) {
    // save config items to local storage
    localConfig.setItem(Globals.LOCAL_CONFIG_THEME_KEY, state.generalConfig.darkMode)
  },
  updateDarkMode ({ commit }, payload: boolean) {
    commit('updateDarkMode', payload)
  }
}
