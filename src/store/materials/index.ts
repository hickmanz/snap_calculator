import { Module } from 'vuex'
import { MaterialState } from './types'
import { RootState } from '../types'

export const defaultState = (): MaterialState => {
  return [
    {
      text: 'Nylon 66',
      variable: 'L',
      measurementType: 'distance',
      id: 1
    },
    {
      text: 'Nylon 12',
      variable: 'b',
      measurementType: 'distance',
      id: 2
    },
    {
      text: 'PC/ABS',
      variable: 't',
      measurementType: 'distance',
      id: 3
    }
  ]
}

export const state = defaultState()

export const materials: Module<MaterialState, RootState> = {
  state
}
