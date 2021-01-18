
export interface InputState {
    [index: number]: InputData    
}

export interface InputData {
    name: string
    variable: string
    measurementType: 'distance' | 'angle' | 'force' | 'time'
    id: number
}