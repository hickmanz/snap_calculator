import { ActionTree } from 'vuex'
import { RootState, LooseObject, Scope } from './types'
import { Config } from './config/types'
import { create, all } from 'mathjs'
import regression, { DataPoint } from 'regression'
import { config } from './config'

const math = create(all)

const closestIndex = (num: number, arr: number[]) => {
  let curr = arr[0]
  let diff = Math.abs(num - curr)
  let index = 0
  for (let val = 0; val < arr.length; val++) {
    const newdiff = Math.abs(num - arr[val])
    if (newdiff < diff) {
      diff = newdiff
      curr = arr[val]
      index = val
    }
  }
  return index
}

export const actions: ActionTree<RootState, RootState> = {
  async init ({ dispatch }, payload: Config) {
    // Should init the store, and ensure we've loaded our
    // configuration if there is any.
    const initLocal = await dispatch('config/initLocal', payload)
    return [initLocal]
  },
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
  updateSnapType (context, data) {
    context.commit('updateSnapType', data)
    context.dispatch('updateResults')
  },
  updateResults (context) {
    console.log('running')
    // do math in here. call it with every actions that would affect calculation (input change or calculation type or material or snap type)
    const scope: Scope = {}
    let expressions: string[] = []
    const calcData: LooseObject = {}
    let errFound = false

    // Data validation
    if (!context.state.snapType) {
      context.state.errors.err1.isActive = true
      errFound = true
    } else {
      context.state.errors.err1.isActive = false
      calcData.snapType = context.state.snapType
    }

    if (!context.state.selectedMaterial) {
      context.state.errors.err2.isActive = true
      errFound = true
    } else {
      context.state.errors.err2.isActive = false
      calcData.material = context.state.selectedMaterial
    }

    if (!context.state.selectedCalculation) {
      context.state.errors.err3.isActive = true
      errFound = true
      return
    } else {
      calcData.selectedCalc = context.state.selectedCalculation
      context.state.errors.err3.isActive = false
      if (!context.state.equations) {
        alert('Equations are not set in the value store')
        return
      } else {
        expressions = context.getters.getEquationExpressions
      }
      let inputsMissing = 0
      calcData.selectedCalc.requiresInputs.forEach((inputId: string) => {
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

    if (calcData.selectedCalc.needsQ) {
      // solve for q given snap type
      scope.E = calcData.material.flexuralModulus
      if (scope.L && scope.t && context.state.qEquations) {
        const qArray = context.state.qEquations[calcData.snapType.id]
        let aspectRatio = scope.L / scope.t
        const xValues: number[] = []
        const regressionPoints: DataPoint[] = []

        if (aspectRatio < 2) {
          context.state.errors.err5.isActive = true
          return
        } else if (aspectRatio > 11) {
          aspectRatio = 11
          context.state.errors.err5.isActive = false
        } else {
          context.state.errors.err5.isActive = false
        }
        qArray.forEach((points) => {
          xValues.push(points[0])
        })
        const index: number = closestIndex(aspectRatio, xValues)
        for (let i = index - 1; i < index + 2; i++) {
          if (qArray[i]) {
            regressionPoints.push(qArray[i])
          }
        }
        scope.Q = (regression.linear(regressionPoints).predict(aspectRatio))[1]
      } else {
        // somethings wrong
        alert('Fatal Error: Attempted to solve for Q but required variables were not present')
        return
      }
    }
    // Use list of equations
    expressions.forEach(expr => {
      if (!math.evaluate) {
        return
      }
      math.evaluate(expr, scope)
    })

    calcData.selectedCalc.availableResults.forEach(function (resultId: string) {
      const payload = {
        key: resultId,
        value: scope[context.state.results[resultId].variable]
      }
      context.commit('updateResults', payload)
    })
  }
}
