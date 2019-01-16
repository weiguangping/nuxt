import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    nickname: '',
    avatar:'',
    uid:'',
    uperm:{course:[],major:[]},
    realname:'',
}
const mutations = {
    updateUser (state, data) {
      state.nickname = data.nickname;
      state.avatar=data.avatar;
      state.uid=data.unionid;
      state.uperm=data.uperm;
      state.realname=data.realname;
    },
    delUser(state) {
      state.nickname ='';
      state.avatar='';
      state.uid='';
      state.uperm='';
      state.realname='';
    }
}
const getters = {
   
}

const actions = {
    updateUser(context,val) {
        context.commit('updateUser',val)
    },
    reduceAction({ commit }) {
        commit('reduce')
    }
}

const user = {
    state,
    mutations,
    getters,
    actions
}

// export default new Vuex.Store({
//     state,
//     mutations,
//     getters,
//     actions
// })
let modules = () => new Vuex.Store({
  modules:{ user: user }
})

export default modules