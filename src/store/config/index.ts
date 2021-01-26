import { Module } from 'vuex'
import { ConfigState } from './types'
import { RootState } from '../types'
import { actions } from './actions'
import { mutations } from './mutations'

export const defaultState = (): ConfigState => {
  return {
    generalConfig: {
      darkMode: true
    }
  }
}

export const state = defaultState()

const namespaced = true

export const config: Module<ConfigState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
}
