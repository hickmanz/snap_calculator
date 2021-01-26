import vuetify from './plugins/vuetify'
import store from './store'
import { GeneralConfig, Config } from './store/config/types'

export const appInit = async (): Promise<Config> => {
  let generalConfig: GeneralConfig | undefined | null

  await store.dispatch('init')

  if (store.state.config && store.state.config.generalConfig) {
    vuetify.framework.theme.dark = store.state.config.generalConfig.darkMode
  }
  return { generalConfig }
}
