import { Module } from 'vuex'
import { SnapState } from './types'

export const defaultState = (): SnapState => {
    return [
      {
        text: 'Tapered Snap 1',
        disabled: false,
        image: '1.jpg',
        id: 1,
        requiresInputs: [
          1, 3
        ]
      }, {
        text: 'Tapered Snap 2',
        disabled: false,
        image: '2.jpg',
        id: 2,
        requiresInputs: [
          1, 2
        ]
      }, {
        text: 'Uniform Snap',
        disabled: false,
        image: '3.jpg',
        id: 3,
        requiresInputs: [
          1
        ]
      }
    ]
}
  export const state = defaultState()
  
  
  export const snaps: Module<SnapState, RootState> = {
    state
  }