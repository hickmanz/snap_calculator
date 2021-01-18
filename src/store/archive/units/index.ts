import { Module } from 'vuex'
import { UnitAssignmentState } from './types'
import { RootState } from '../types'

export const defaultState = (): UnitAssignmentState => {
    return{
        metric: {
          distance: 'mm',
          force: 'N'
        } ,
        standard: {
          distance: 'in',
          force: 'lbf'
        }
    }
}
  export const state = defaultState()
  
  
  export const unitAssignment: Module<UnitAssignmentState, RootState> = {
    state,
  }