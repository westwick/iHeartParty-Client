import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash';
import { sendTrack, voteTrack } from './services/streamService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    youtubeSuccess: false,
    rawSuccess: false,
    searching: false,
    showSearchResults: false,
    searchDirty: false,
    searchResults: [],
    user: {
      nickname: ''
    },
    currentSong: null,
    nextUp: []
  },
  getters: {
    getCurrentSong: state => state.currentSong,
    getTotalSongs: state => state.nextUp.length,
    getTotalLength: state => _.sumBy(state.nextUp, 'duration')
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
    },
    // websocket events
    setCurrentTrack(state, track) {
      if (track === null) return;
      state.currentSong = {
        artist: track.artistName,
        title: track.title,
        album: track.albumname,
        img: track.imagePath,
        addedBy: track.addedBy,
        votes: track.votes,
        duration: track.duration
      }
    },
    setPlaylist(state, playlist) {
      if (playlist && playlist !== null && playlist.length > 0) {
        state.nextUp = playlist;
      }
    },
    youtubeSuccess(state, success) {
      state.youtubeSuccess = success;
    },
    rawSuccess(state, success) {
      state.rawSuccess = success;
    }
  },
  actions: {
    selectTrack({commit}, trackId) {
      commit('selectTrack', trackId);
      sendTrack(trackId).then(resp => {
        // console.log(resp);
      });
    },
    upvoteTrack({commit}, trackId) {
      voteTrack(trackId, true).then(resp => {
        // console.log(resp)
      })
    },
    downvoteTrack({commit}, trackId) {
      voteTrack(trackId, false).then(resp => {
        // console.log(resp)
      })
    },
    voteToSkip() {
      voteTrack('current', false).then(resp => {});
    }
  }
})
