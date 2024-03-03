import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    updataUserInfo(state,userInfo){
        state.userInfo = userInfo;//将数据更新到state.userInfo
    },
    deleteUserInfo(state){
      state.userInfo = {};
    },
    noticeAddLink(state){
      state.addLink++;
    }
  },
  actions: {
  },
  modules: {
  }
})
