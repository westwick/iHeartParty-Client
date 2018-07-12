<template>
  <div class="mainapp">
    <now-playing></now-playing>
    <next-up></next-up>

    <search-bar></search-bar>
  </div>
</template>

<script>
import NowPlaying from '../components/NowPlaying'
import NextUp from '../components/NextUp'
import SearchBar from '../components/SearchBar'

export default {
  name: 'searchbar',
  components: { NowPlaying, NextUp, SearchBar }
}
</script>