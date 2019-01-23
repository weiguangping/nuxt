import Vue from 'vue'

import Api from '~/assets/api'
let global = {
  install(Vue) {
    Vue.prototype.$api = Api
  }
}

Vue.use(global)
export default ({ app }, inject) => {
  app.$api = Api
}
