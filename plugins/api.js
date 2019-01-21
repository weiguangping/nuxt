// let baseUrl = 'https://api.myjson.com/bins/gjn90';
// let api={
//   baseUrl:baseUrl
// }
// export default api

import Vue from 'vue'
import API from '~/api/index.js'
Vue.prototype.$API = API
Vue.use(API)