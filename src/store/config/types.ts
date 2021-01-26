export interface ConfigState {
    generalConfig: GeneralConfig   
  }
  
  export interface GeneralConfig {
    darkMode: boolean
  }

  export interface Config {
    generalConfig: GeneralConfig | undefined | null

  }