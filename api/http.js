import axios from 'axios' // 引入axios
import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到
import url from './env.js'
const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37'
// vuex
// import * as Tool from 'UTIL/vuex'
// axios 配置
axios.defaults.timeout = 5000 // 设置请求超时
// axios.defaults.baseURL = url.baseUrl // 默认请求地址
// axios.defaults.headers.common['Authorization'] = `token ${TOKEN}` // Authorization
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 请求头的设置
// 请求
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  let URL = config.url.split(config.baseURL)
  // Tool.open(URL[1], config.showLoading)
  return config
}, (error) => {
  // Tool.toast('错误的传参', 'fail')
  return Promise.reject(error)
})
// 返回
axios.interceptors.response.use((res) => {
  // console.log(res)
  // 拦截器配置
  // if (res.data.success) {
  //   Tool.toast(res.data.msg)
  //   Tool.close()
  //   return Promise.reject(res)
  // }
  // Tool.close()
  // return res // 全部数据
  return res.data // data数据
}, (error) => {
  // 请求失败
  // Tool.toast('网络异常', 'fail')
  // Tool.close()
  return Promise.reject(error)
})
// export const get = (url, params, config, showLoading) => axios.get(url, {
//   params
// }, config).then(response => {
//   if (response.status === 200) {
//     return response.data
//   } else {
//     throw response.data
//   }
// })
// export const post = (url, params, showLoading) => axios.post(url, params, {
//   showLoading: showLoading
// })

export function get(url, params, config) {
    return axios
        .get(
            url, {
                params
            },
            config
        )
        .then(response => {
           console.log(response)
            if (response.status === 200) {
                return response.data
            } else {
                throw response.data
            }
        })
        .catch(error => {
            if (error.response.status == 500) {
                throw error.response.data
            }
        })
}
export function post(url, params, config) {
    return axios
        .post(url, params, config)
        .then(response => {
            if (response.status === 200) {
                return response.data
            } else {
                throw response.data
            }
        })
        .catch(error => {
            if (error.response.status == 500) {
                throw error.response.data
            }
        })
}