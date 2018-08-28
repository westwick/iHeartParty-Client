<template>
  <div class="mainapp">
    <now-playing></now-playing>
    <playlist-info></playlist-info>
    <next-up></next-up>

    <search-results :class="{expanded: $store.state.showSearchResults}" v-on:searchclosed="clearSearch"></search-results>
    <search-bar ref="searchbar"></search-bar>
  </div>
</template>

<script>
import NowPlaying from '../components/NowPlaying'
import NextUp from '../components/NextUp'
import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'

export default {
  name: 'searchbar',
  components: { NowPlaying, NextUp, SearchBar, SearchResults },
  props: ['auth'],
  mounted() {
    this.auth.auth0.client.userInfo(this.auth.getAccessToken(), (err, profile) => {
      this.$store.commit('setNick', profile.nickname);
    });
  },
  sockets: {
    connect: function(){
      // console.log('socket connected')
    },
    track: function(val) {
      console.log('track', val);
      this.$store.commit('setCurrentTrack', val);
    },
    playlist: function(val) {
      console.log('playlist', val)
      this.$store.commit('setPlaylist', val);
    }
  },
  methods: {
    clearSearch() {
      this.$store.commit('closeSearch');
      this.$refs.searchbar.clearSearch();
    }
  }
}
</script>