
import { EquationState } from '@/store/equations/types'
import { QEquationState } from '@/store/qCurves/types'
import { MaterialData } from './materials/types'

export interface RootState {
  units: 'metric' | 'standard'
  selectedMaterial?: MaterialData
  snapType?: SnapType
  snapOptions: SnapState
  inputs: InputState
  results: ResultsState
  unitAssignment: UnitAssignmentState
  calculationSequences: CalculationState
  selectedCalculation?: CalculationData
  errors: ErrorState
  equations?: EquationState 
  qEquations?: QEquationState
}

export interface ErrorState{
  [key: string]: ErrorObj
}

export interface ErrorObj {
  txt: string
  isActive: boolean
}

export interface Scope {
  [key: string]: number | undefined
}

export interface InputState {
  [key: string]: InputData    
}

export interface InputData {
  name: string
  identifier: string
  variable: string
  measurementType: 'distance' | 'angle' | 'force' | 'time'
  id: number,
  value?: number
}
export interface SnapState {
  [index: number]: SnapType
}

export interface SnapType {
  text: string,
  disabled: boolean,
  image: string,
  id: string
}

export interface UnitAssignmentState {
  [key: string]: UnitAssignmentType
}

export interface UnitAssignmentType {
  distance: string,
  force: string,
  angle: string,
  strain: string
 
}
export interface LooseObject {
  [key: string]: any
}

export interface ResultsState {
  [key: string]: ResultsData    
}

export interface ResultsData {
  name: string
  displayVariable?: string
  variable: string
  measurementType: 'distance' | 'angle' | 'force' | 'time' | 'strain'
  id: number
  value?: number
}

export interface CalculationState {
  [index: number]: CalculationData
}

export interface CalculationData {
  text: string
  id: number
  needsQ: boolean
  requiresInputs: string[]
  availableResults: string[]
  solveEquations: string[]
}
