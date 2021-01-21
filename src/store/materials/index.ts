import { Module } from 'vuex'
import { MaterialState } from './types'
import { RootState } from '../types'

export const defaultState = (): MaterialState => {
  return [
    {
      text: 'Nylon 6',
      canBeFilled: true,
      allowableStrain: 8,
      allowableStrainFilled: 2.1,
      flexuralModulus: 3102
    },
    {
      text: 'PC',
      canBeFilled: false,
      allowableStrain: 8,
      flexuralModulus: 2300
    },
    {
      text: 'ABS',
      canBeFilled: false,
      allowableStrain: 6.5,
      flexuralModulus: 2500
    }
  ]
}

export const state = defaultState()

export const materials: Module<MaterialState, RootState> = {
  state
}
