import Vue from 'vue'
import Vuex from 'vuex'
import { RootState, CalculationData, Scope, InputData, ResultsData, SnapType } from './types'
import { materials } from './materials'
import { equations } from './equations'
import { create, all } from 'mathjs'

Vue.use(Vuex)

const math = create(all)

export default new Vuex.Store<RootState>({
  state: {
    units: 'metric',
    selectedMaterial: {
    },
    selectedCalculation: undefined,
    snapType: {
    },
    unitAssignment: {
      metric: {
        distance: 'mm',
        force: 'N',
        angle: 'degrees'
      },
      standard: {
        distance: 'in',
        force: 'lbf',
        angle: 'degrees'
      }
    },
    calculationSequences: [
      {
        text: 'Force and strain given deflection',
        id: 1,
        requiresInputs: [
          'inpt1', 'inpt3', 'inpt5', 'inpt2'
        ],
        availableResults: [
          'rslt1', 'rslt2'
        ],
        solveEquations: [
          'eq1', 'eq2'
        ]
      },
      {
        text: 'Deflection required',
        id: 2,
        requiresInputs: [
          'inpt1', 'inpt3', 'inpt4'
        ],
        availableResults: [
          'rslt3', 'rslt4'
        ],
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
      }
    },
    snapOptions: [
      {
        text: 'Tapered Snap 1',
        disabled: false,
        image: '1.jpg',
        id: 1,
        requiresInputs: [
          1, 3, 5, 2
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
  },
  modules: {
    materials,
    equations
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
      state.selectedMaterial = data
    },
    updateResults (state, payload) {
      state.results[payload.key].value = Number(payload.value)
    }
  },
  actions: {
    updateInput (context, payload) {
      for (const inputField in context.state.inputs) {
        if (context.state.inputs[inputField].id === payload.id) {
          payload.key = inputField
          context.commit('updateInput', payload)
        }
      }
      context.dispatch('updateResults')
    },
    updateMaterial (context, data) {
      context.commit('updateMaterial', data)
      context.dispatch('updateResults')
    },
    updateCalculation (context, data) {
      context.commit('updateCalculation', data)
      context.dispatch('updateResults')
    },
    updateResults (context) {
      // do math in here. call it with every actions that would affect calculation (input change or calculation type or material or snap type)
      const scope: Scope = {}
      let expressions: string[] = []
      let calcData
      let errFound = false
      // Data validation
      if (Object.keys(context.state.snapType).length === 0) {
        context.state.errors.err1.isActive = true
        errFound = true
      } else {
        context.state.errors.err1.isActive = false
      }

      if (Object.keys(context.state.selectedMaterial).length === 0) {
        context.state.errors.err2.isActive = true
        errFound = true
      } else {
        context.state.errors.err2.isActive = false
      }

      if (!context.state.selectedCalculation) {
        context.state.errors.err3.isActive = true
        errFound = true
        return
      } else {
        calcData = context.state.selectedCalculation
        context.state.errors.err3.isActive = false
        if (!context.state.equations) {
          alert('Equations are not set in the value store')
          return
        } else {
          expressions = context.getters.getEquationExpressions
        }
        let inputsMissing = 0
        calcData.requiresInputs.forEach(inputId => {
          if (!context.state.inputs[inputId].value) {
            inputsMissing++
          } else {
            scope[context.state.inputs[inputId].variable] = context.state.inputs[inputId].value
          }
        })
        if (inputsMissing > 0) {
          context.state.errors.err4.isActive = true
          errFound = true
        } else {
          context.state.errors.err4.isActive = false
        }
      }
      if (errFound) {
        return
      }
      // Use list of equations
      expressions.forEach(expr => {
        if (!math.evaluate) {
          return
        }
        math.evaluate(expr, scope)
      })

      calcData.availableResults.forEach(function (resultId: string) {
        const payload = {
          key: resultId,
          value: scope[context.state.results[resultId].variable]
        }
        context.commit('updateResults', payload)
      })
      // get data on solveEquations from selected calc
      // solve required equations in order
      // get available results from selectedcalc
      // step through availresults -> get var -> lookup var in scope -> set each result with a commit

      // const h = parse('x^2 + x')
      // console.log(h.evaluate({ x: 3 })) // '7'
    }
  },
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
