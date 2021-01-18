import { Module } from 'vuex'
import { EquationState } from './types'
import { RootState } from '../types'

export const defaultState = (): EquationState => {
  return {
    eq1: {
      expr: 'P = L^2 + b - t'

    },
    eq2: {
      expr: 'y = b^4 + t'

    }
  }
}

export const state = defaultState()

export const equations: Module<EquationState, RootState> = {
  state
}
