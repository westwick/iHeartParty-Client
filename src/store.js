import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searching: false,
    showSearchResults: false,
    searchDirty: false,
    searchResults: [],
    user: {
      nickname: ''
    },
    currentSong: {
      artist: 'Michael Jackson',
      title: 'Thriller',
      album: 'Thriller'
    },
    nextUp: [
      {artist: 'Dr. Dre', title: 'The Next Episode', album: '2001'},
      {artist: 'Kanye West Feat. JAY Z & Big Sean', title: 'Clique', album: 'Cruel Summer'},
      {artist: 'C+C Music Factory', title: 'Gonna Make You Sweat (Everybody Dance Now)', album: 'Gonna Make You Sweat'}
    ]
  },
  mutations: {
    setNick(state, nickname) {
      state.user = {nickname};
    },
    startSearch(state) {
      state.searching = true;
      state.showSearchResults = true;
      state.searchResults = [];
    },
    endSearch(state, results) {
      state.searching = false;
      state.searchResults = results;
    },
    openSearch(state) {
      state.showSearchResults = true;
    },
    closeSearch(state) {
      state.showSearchResults = false;
      state.searchResults = [];
    },
    searchDirty(state, dirty) {
      state.searchDirty = dirty;
    }
  },
  actions: {

  }
})
