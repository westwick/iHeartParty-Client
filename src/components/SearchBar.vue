<template>
  <div class="search-bar">
    <div class="control has-icons-left">
      <input 
        type="text" 
        class="input" 
        v-model="searchTerm" 
        @keyup="submitLink"
        placeholder="Search by Artist, Track, or Album" />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { addYoutubeTrack, addRawTrack } from '../services/streamService';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: '',
      busy: false,
      apiUrl: 'https://us.api.iheart.com/api',
      headers: {
        'Accept': 'application/json',
        'X-hostName': 'hackathon-demo1'
      }
    }
  },
  watch: {
    searchTerm: function() {
      if (this.isClearing) {
        this.isClearing = false;
      } else {
        this.$store.commit('youtubeSuccess', false);
        this.$store.commit('rawSuccess', false);
        this.$store.commit('searchDirty', true);
        this.$store.commit('openSearch');
        if (!/http/.test(this.searchTerm)) {
          this.search();
        }
      }
    }
  },
  methods: {
    search: _.debounce(function() {
      this.busy = true;
      this.$store.commit('startSearch');
      this.$http.get(this.apiUrl + '/v3/search/all', {
        headers: this.headers,
        params: {
          keywords: this.searchTerm,
          track: true,
          artist: false,
          bundle: false,
          station: false,
          featuredStation: false,
          talkShow: false,
          keyword: false,
          playlist: false,
          podcast: false,
          talkTheme: false
        }
      }).then(resp => {
        this.busy = false;
        this.$store.commit('searchDirty', false);
        const tracks = resp.data.results.tracks;
        const onDemandTracks = _.filter(tracks, track => track.playbackRights.onDemand);
        this.$store.commit('endSearch', onDemandTracks);
      });
    }, 500),
    submitLink(e) {
      if (e.keyCode === 13 && /https?\:\/\/youtu\.?be/.test(this.searchTerm)) {
        this.$store.commit('startSearch');
        addYoutubeTrack(this.searchTerm).then(resp => {
          this.$store.commit('endSearch', []);
          this.$store.commit('youtubeSuccess', true);
        });
      } else if (e.keyCode === 13 && /https?/.test(this.searchTerm)) {
        this.$store.commit('startSearch');
        addRawTrack(this.searchTerm).then(resp => {
          this.$store.commit('endSearch', []);
          this.$store.commit('rawSuccess', true);
        });
      }
    },
    clearSearch() {
      this.isClearing = true;
      this.searchTerm = '';
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  width: 100%;
  background: #C50930;
  padding: 16px;
  height: 68px;
  background: linear-gradient(to bottom, #C50930, #A60628);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
}
</style>
