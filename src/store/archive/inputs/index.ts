import { Module } from 'vuex'
import { getters } from './getters'
import { InputState } from './types'
import { RootState } from '../types'

export const defaultState = (): InputState => {
  return [
    {
      name: 'Beam Length',
      variable: 'L',
      measurementType: 'distance',
      id: 1
    },
    {
      name: 'Beam Width',
      variable: 'b',
      measurementType: 'distance',
      id: 2
    },
    {
      name: 'Beam Thickness',
      variable: 't',
      measurementType: 'distance',
      id: 3
    }
  ]
}

export const state = defaultState()


export const inputs: Module<InputState, RootState> = {
  state,
  getters
}