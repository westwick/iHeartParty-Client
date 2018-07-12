import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      nickname: ''
    },
    currentSong: {
      artist: 'Michael Jackson',
      title: 'Thriller',
      album: 'Thriller'
    }
  },
  mutations: {
    setNick(state, nickname) {
      state.user = {nickname};
    }
  },
  actions: {

  }
})
