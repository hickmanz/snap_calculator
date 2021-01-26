import '@/scss/global.scss'
import 'vue-select/src/scss/vue-select.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { appInit } from './init'
import vuetify from './plugins/vuetify'
import localforage from 'localforage'

Vue.config.productionTip = false

const localMaterials = localforage.createInstance({
  name: 'SNAPCALC',
  storeName: 'materials'
})

const localConfig = localforage.createInstance({
  name: 'SNAPCALC',
  storeName: 'config'
})

export { localMaterials, localConfig }

appInit()
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch((e) => {
    console.debug('Error attempting to init App:', e)
  })
