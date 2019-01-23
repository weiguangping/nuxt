import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from '../assets/api'
Vue.use(Vuex)

const state = {
  locales: '',
  locale: 'zh'
}
const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  GET_BASE_INFOR(state, payload) {
    state.locales = payload.exchangeBase.website.split(',')
    state.baseInfor = payload.exchangeBase
    state.isLogin = payload.isLogin
    //state.baseInfor.templateId = 'second'
    state.baseInfor.templateId = 'first'
  },
  SET_LOGIN_STATUS(state, payload) {
    state.isLogin = payload
  }
}
const actions = {
  async nuxtServerInit({ commit, state }, { app, req, res }) {
    commit('GET_BASE_INFOR', {
      isLogin: req.session.access_token ? true : false,
      exchangeBase: req.exchangeInfor
    })
  },
  setLoginStatus(context, bol) {
    context.commit('SET_LOGIN_STATUS', bol)
  }
}
const getters = {
  getBaseKey: state => key => {
    if (state.baseInfor) {
      return state.baseInfor[key]
    }
  },
  getLoginStatus: state => key => {
    return state.isLogin
  }
}
const store = () =>
  new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })

export default store
