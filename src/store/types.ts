
import { EquationState } from '@/store/equations/types'

export interface RootState {
  units: 'metric' | 'standard'
  selectedMaterial?: any
  snapType?: any
  snapOptions: SnapState
  inputs: InputState
  results: ResultsState
  unitAssignment: UnitAssignmentState
  calculationSequences: CalculationState
  selectedCalculation?: CalculationData
  errors: ErrorState
  equations?: EquationState 
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
  id: number,
  requiresInputs: number[]
}

export interface UnitAssignmentState {
  [key: string]: UnitAssignmentType
}

export interface UnitAssignmentType {
  distance: string,
  force: string,
  angle: string
 
}

export interface ResultsState {
  [key: string]: ResultsData    
}

export interface ResultsData {
  name: string
  variable: string
  measurementType: 'distance' | 'angle' | 'force' | 'time'
  id: number
  value?: number
}

export interface CalculationState {
  [index: number]: CalculationData
}

export interface CalculationData {
  text: string
  id: number
  requiresInputs: string[]
  availableResults: string[]
  solveEquations: string[]
}
