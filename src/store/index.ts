import Vue from 'vue'
import Vuex from 'vuex'

import { actions } from './actions'

import { RootState, CalculationData, InputData, ResultsData, SnapType } from './types'
import { materials } from './materials'
import { equations } from './equations'
import { qEquations } from './qCurves'
import { config } from './config'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    units: 'metric',
    selectedCalculation: undefined,
    unitAssignment: {
      metric: {
        distance: 'mm',
        force: 'N',
        angle: 'degrees',
        strain: '%'
      },
      standard: {
        distance: 'in',
        force: 'lbf',
        angle: 'degrees',
        strain: '%'
      }
    },
    calculationSequences: [
      {
        text: 'Normal force and strain given deflection',
        id: 1,
        requiresInputs: [
          'inpt1', 'inpt2', 'inpt3', 'inpt6'
        ],
        availableResults: [
          'rslt1', 'rslt5'
        ],
        needsQ: true,
        solveEquations: [
          'eq3', 'eq2'
        ]
      },
      {
        text: 'Deflection required (DONT USE)',
        id: 2,
        requiresInputs: [
          'inpt1', 'inpt3', 'inpt4'
        ],
        availableResults: [
          'rslt3', 'rslt4'
        ],
        needsQ: false,
        solveEquations: [
          'eq1', 'eq2'
        ]
      }
    ],
    inputs: {
      inpt1: {
        name: 'Beam Length',
        identifier: 'beamLength',
        variable: 'L',
        measurementType: 'distance',
        id: 1
      },
      inpt2: {
        name: 'Beam Width',
        identifier: 'beamWidth',
        variable: 'b',
        measurementType: 'distance',
        id: 2
      },
      inpt3: {
        name: 'Beam Thickness',
        identifier: 'beamThickness',
        variable: 't',
        measurementType: 'distance',
        id: 3
      },
      inpt4: {
        name: 'Lead Angle',
        identifier: 'leadAngle',
        variable: 'alpha',
        measurementType: 'angle',
        id: 4
      },
      inpt5: {
        name: 'Return Angle',
        identifier: 'returnAngle',
        variable: 'alpha2',
        measurementType: 'angle',
        id: 5
      },
      inpt6: {
        name: 'Deflection',
        identifier: 'deflection',
        variable: 'Y',
        measurementType: 'distance',
        id: 6
      }
    },
    results: {
      rslt1: {
        name: 'Normal Force',
        variable: 'P',
        measurementType: 'force',
        id: 1,
        value: undefined
      },
      rslt2: {
        name: 'Deflection',
        variable: 'y',
        measurementType: 'distance',
        id: 2,
        value: undefined
      },
      rslt3: {
        name: 'Beam Length3',
        variable: 'L',
        measurementType: 'distance',
        id: 3,
        value: undefined
      },
      rslt4: {
        name: 'Beam Length4',
        variable: 'd',
        measurementType: 'distance',
        id: 4,
        value: undefined
      },
      rslt5: {
        name: 'Maximum Strain',
        displayVariable: '∈',
        variable: 'S',
        measurementType: 'strain',
        id: 5,
        value: undefined
      }
    },
    errors: {
      err1: {
        txt: 'Snap type not defined',
        isActive: false
      },
      err2: {
        txt: 'Material not defined',
        isActive: false
      },
      err3: {
        txt: 'Calculation type not defined',
        isActive: false
      },
      err4: {
        txt: 'Inputs missing',
        isActive: false
      },
      err5: {
        txt: 'Thats a weird aspect ratio snap, bud',
        isActive: false
      }
    },
    snapOptions: [
      {
        text: 'Tapered Snap - Type 2',
        disabled: false,
        image: 't2.jpg',
        id: 't2'
      }, {
        text: 'Uniform Snap - DO NOT USE',
        disabled: false,
        image: '3.jpg',
        id: 'u1'
      }
    ]
  },
  modules: {
    materials,
    equations,
    qEquations,
    config
  },
  mutations: {
    updateSnapType (state, type: SnapType) {
      Vue.set(state, 'snapType', type)
    },
    updateCalculation (state, type: CalculationData) {
      Vue.set(state, 'selectedCalculation', type)
    },
    updateInput (state, payload) {
      state.inputs[payload.key].value = Number(payload.value)
    },
    updateMaterial (state, data) {
      Vue.set(state, 'selectedMaterial', data)
    },
    updateResults (state, payload) {
      state.results[payload.key].value = Number(payload.value)
    }
  },
  actions,
  getters: {
    activeInputs (state) {
      const activeInputs: Array<InputData> = []
      if (state.selectedCalculation) {
        state.selectedCalculation.requiresInputs.forEach(function (inputId: string) {
          const newActiveInputs = state.inputs[inputId]
          if (newActiveInputs) activeInputs.push(newActiveInputs)
        })
      }
      return activeInputs
    },
    activeResults (state) {
      const activeResults: Array<ResultsData> = []
      if (state.selectedCalculation) {
        state.selectedCalculation.availableResults.forEach(function (resultId: string) {
          const newActiveResults = state.results[resultId]
          if (newActiveResults) activeResults.push(newActiveResults)
        })
      }
      return activeResults
    },
    activeErrors (state) {
      const activeErrors: Array<string> = []
      for (const error in state.errors) {
        if (state.errors[error].isActive === true) {
          activeErrors.push(state.errors[error].txt)
        }
      }
      return activeErrors
    },
    getEquationExpressions (state) {
      const expressions: string[] = []
      if (state.selectedCalculation) {
        state.selectedCalculation.solveEquations.forEach(equationId => {
          if (state.equations) {
            expressions.push(state.equations[equationId].expr)
          }
        })
        return expressions
      } else {
        return undefined
      }
    }
  }
})
