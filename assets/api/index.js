import axios from 'axios'

export function fetchget(url, params, config) {
  return axios
    .get(
      url,
      {
        params
      },
      config
    )
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
export function fetchpost(url, params, config) {
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

export default {
  isLogin: () => {
    return fetchget('/server/isLogin')
  },
  getExchange: () => {
    return fetchget('/server/getExchange')
  },
  login: data => {
    return fetchpost('/server/login', data)
  },
  loginStrategy: () => {
    return fetchget('/server/login/strategy')
  },
  loginObainCode: () => {
    return fetchpost('/server/login/captcha')
  },
  loginVerifying: data => {
    return fetchpost('/server/login/verifying', data)
  },
  logout: () => {
    return fetchget('/server/logout')
  },
  registerCaptha: data => {
    return fetchpost('/server/register/captcha', data)
  },
  register: data => {
    return fetchpost('/server/register', data)
  },
  pwdCaptha: data => {
    return fetchpost('/server/pwd/captcha', data)
  },
  reset: data => {
    return fetchpost('/server/pwd/reset', data)
  },
  indexBottom: () => {
    return fetchget('/server/bottom/infor')
  },
  header: data => {
    return data
      ? Promise.all([fetchget('/server/domain'), fetchget('/server/isLogin')])
      : Promise.all([fetchget('/server/domain')])
  }
}
