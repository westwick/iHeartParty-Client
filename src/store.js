import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      nickname: ''
    }
  },
  mutations: {
    setNick(state, nickname) {
      console.log('set nickname');
      state.user = {nickname};
    }
  },
  actions: {

  }
})
