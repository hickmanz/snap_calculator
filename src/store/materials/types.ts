export interface MaterialState {
    [index: number]: MaterialData    
  }
  
  export interface MaterialData {
    text: string
    variable: string
    measurementType: 'distance' | 'angle' | 'force' | 'time'
    id: number
  }