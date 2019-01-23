import axios from './config'

axios.defaults.baseURL = '/'
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
