import { Module } from 'vuex'
import { EquationState } from './types'
import { RootState } from '../types'

export const defaultState = (): EquationState => {
  return {
    eq1: {
      expr: 'P = L^2 + b - t'

    },
    eq2: {
      expr: 'P = (b * t^2 * E * S)/(6 * L)'

    },
    eq3: {
      expr: 'S = 1.5 * ((t*Y)/(L^2*Q))'
    }
  }
}

export const state = defaultState()

export const equations: Module<EquationState, RootState> = {
  state
}
