<template>
  <div class="mainapp">
    <now-playing></now-playing>
    <next-up></next-up>

    <search-results v-if="$store.state.showSearchResults" v-on:searchclosed="clearSearch"></search-results>
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
  methods: {
    clearSearch() {
      this.$store.commit('closeSearch');
      this.$refs.searchbar.clearSearch();
    }
  }
}
</script>