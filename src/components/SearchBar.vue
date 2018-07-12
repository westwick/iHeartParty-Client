<template>
  <div class="search-bar">
    <div class="control has-icons-left">
      <input type="text" class="input" v-model="searchTerm" placeholder="Search by Artist, Track, or Album" />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';

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
        this.$store.commit('searchDirty', true);
        this.$store.commit('openSearch');
        this.search();
      }
    }
  },
  methods: {
    search: _.debounce(function() {
      this.busy = true;
      this.$store.commit('startSearch')
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
        console.log(onDemandTracks);
      })
    }, 500),
    clearSearch() {
      this.isClearing = true;
      this.searchTerm = '';
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  width: 100vw;
  background: #C50930;
  padding: 16px;
  background: linear-gradient(to bottom, #C50930, #A60628);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
}
</style>
