import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash';
import { sendTrack } from './services/streamService';

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
      {artist: 'Dr. Dre', title: 'The Next Episode', album: '2001', addedBy: {
        name: 'andrea',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
      }},
      {artist: 'Kanye West Feat. JAY Z & Big Sean', title: 'Clique', album: 'Cruel Summer', addedBy: {
        name: 'sivori',
        avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
      }},
      {artist: 'C+C Music Factory', title: 'Gonna Make You Sweat (Everybody Dance Now)', album: 'Gonna Make You Sweat', addedBy: {
        name: 'bennett',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }},
      {artist: 'REM', title: 'Radio Free Europe', album: 'Green', addedBy: {
        name: 'adarsh',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
      }},
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
    },
    selectTrack(state, trackId) {
      state.searchResults = _.map(state.searchResults, result => {
        if (result.id === trackId) {
          result.selected = true;
        }
        return result;
      });
    }
  },
  actions: {
    selectTrack({commit}, trackId) {
      commit('selectTrack', trackId);
      sendTrack(trackId).then(resp => {
        console.log(resp);
      });
    }
  }
})
