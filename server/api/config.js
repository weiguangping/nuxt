const axios = require('axios')
const qs = require('qs')
const gzip = require('zlib')
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Accept-Encoding'] = 'gzip'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    if (
      config.headers['Content-Type'] ===
      'application/x-www-form-urlencoded;charset=UTF-8'
    ) {
      //POST传参序列化

      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = axios
