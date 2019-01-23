const axios = require('./config')

function axiosGet(url, config) {
  return axios.get(url, config).then(
    res => {
      return res
    },
    error => {
      return Promise.reject(error.response)
    }
  )
}

function axiosPost(url, params, config) {
  return axios.post(url, params, config).then(
    res => {
      console.log(res)
      return res
    },
    error => {
      console.log(error)
      return Promise.reject(error.response)
    }
  )
}
module.exports = {
  login: params => {
    return axiosPost('/oauth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization:
          'Basic b3BlbmlkOjY5M2JiMDBhMTkxMzRlM2M5ZmM5OTBiYzk3NDJmNjE0'
      }
    })
  },
  loginStrategy: token => {
    return axiosGet('/api/oauth2/login/strategy', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  loginCaptcha: token => {
    return axiosPost(
      '/api/oauth2/login/captcha',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: 'Bearer ' + token
        }
      }
    )
  },
  loginVerifying: (params, token) => {
    return axiosPost('/api/oauth2/login/verifying', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + token
      }
    })
  },
  isLogin: token => {
    return token
      ? axiosGet('/api/public/user', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      : axiosGet('/api/public/user')
  },
  registerCaptha: params => {
    return axiosPost('/api/oauth2/register/captcha', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  },
  register: params => {
    return axiosPost('/api/oauth2/register', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  },
  pwdCaptha: params => {
    return axiosPost('/api/oauth2/pwd/captcha', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  },
  reset: (params, token) => {
    console.log(token)
    return axiosPost('/api/oauth2/pwd', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + token
      }
    })
  },
  getExchange: () => {
    return axiosGet('/api/public/exchange_info')
  },
  bottomInfor: () => {
    return axiosGet('/api/public/index_bottom')
  },
  domain: () => {
    return axiosGet('/api/public/security/function/domain')
  }
}
