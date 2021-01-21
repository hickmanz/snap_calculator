export interface MaterialState {
    [index: number]: MaterialData    
  }
  
  export interface MaterialData {
    text: string
    canBeFilled: boolean
    allowableStrain: number
    allowableStrainFilled?: number 
    flexuralModulus: number
  }