// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

// const state = {
//     nickname: '',
//     avatar:'',
//     uid:'',
//     uperm:{course:[],major:[]},
//     realname:'',
// }
// const mutations = {
//     updateUser (state, data) {
//       state.nickname = data.nickname;
//       state.avatar=data.avatar;
//       state.uid=data.unionid;
//       state.uperm=data.uperm;
//       state.realname=data.realname;
//     },
//     delUser(state) {
//       state.nickname ='';
//       state.avatar='';
//       state.uid='';
//       state.uperm='';
//       state.realname='';
//     }
// }
// const getters = {

// }

// const actions = {
//     updateUser(context,val) {
//         context.commit('updateUser',val)
//     },
//     reduceAction({ commit }) {
//         commit('reduce')
//     }
// }

// const user = {
//     state,
//     mutations,
//     getters,
//     actions
// }

// // export default new Vuex.Store({
// //     state,
// //     mutations,
// //     getters,
// //     actions
// // })
// let modules = () => new Vuex.Store({
//   modules:{ user: user }
// })

import Locale from '~/locales'
export const state = () => ({
  locales: Locale(),
  locale: Locale()[1]
})
export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
	  	// console.log(locale)
      state.locale = locale
    }
  }
}


// import Vue from 'vue'
// import Vuex, { Store } from 'vuex'
// Vue.use(Vuex)

// const state = {
//     locales: '',
//     locale: 'zh'
// }
// const mutations = {
//     SET_LANG(state, locale) {
//       console.log('11111')
//             state.locale = locale
//         if (state.locales.indexOf(locale) !== -1) {
//         }
//     },
//     GET_BASE_INFOR(state, payload) {
//         // state.locales = payload.exchangeBase.website.split(',')
//         // state.baseInfor = payload.exchangeBase
//         // state.isLogin = payload.useBase
//         //     //state.baseInfor.templateId = 'second'
//         // state.baseInfor.templateId = 'first'
//     }
// }
// const actions = {
//     async nuxtServerInit({ commit, state }, { app, req, res }) {
//         // console.log(1)
//         // console.log(req.userInfor)
//         //     // let url = 'http://' + req.headers.host
//         //     // let useBase = await app.$axios.get(url + '/server/isLogin')
//         //     // let exchangeBase = await app.$axios.get(url + `/server/getExchange`)
//         // commit('GET_BASE_INFOR', {
//         //     useBase: req.userInfor,
//         //     exchangeBase: req.exchangeInfor
//         // })
//     }
// }
// const getters = {
//     getBaseKey: state => key => {
//         if (state.baseInfor) {
//             return state.baseInfor[key]
//         }
//     },
//     getUseKey: state => key => {
//         if (state.user) {
//             return state.user[key]
//         }
//     }
// }
// const store = () =>
//     new Vuex.Store({
//         state,
//         getters,
//         mutations,
//         actions
//     })

// export default store