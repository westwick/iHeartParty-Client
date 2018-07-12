<template>
  <div class="search-results">
    <p class="search-header">Search Results</p>
    <i class="far fa-times-circle close-btn" @click="closeSearch()"></i>
    <p v-if="$store.state.searching">Searching...</p>
    <p v-if="!$store.state.searching && !$store.state.searchDirty && $store.state.searchResults.length === 0" class="no-results">No results found.</p>
    <div v-else v-for="result of $store.state.searchResults" class="search-result" @click="addTrack(result)" :class="{selected: result.selected}">
      <div class="search-img">
        <img v-bind:src="result.image" />
      </div>
      <div class="track-info">
        <div class="search-title">
          {{ result.title }}
          <span v-if="result.version" class="song-version">({{ result.version }})</span>
        </div>
        <div class="search-artist">
          {{ result.artistName }} &middot; {{ result.albumName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  methods: {
    closeSearch() {
      this.$emit('searchclosed');
    },
    addTrack(track) {
      this.$store.dispatch('selectTrack', track.id);
    }
  }
}
</script>

<style lang="scss">
.search-header {
  width: 100%;
  text-align: center;
  padding: 8px 0;
}

.close-btn {
  position: absolute;
  right: 8px;
  top: 10px;
  cursor: pointer;
}

.search-results {
  width: 100vw;
  height: 100vh;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1;
  text-align: left;
  overflow-y: scroll;
}

.search-result {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
  cursor: pointer;
  transition: all .1s ease-in-out;

  &.selected {
    transform: translateX(120%);
  }

  &:hover {
    background-color: #f8f8f8;
  }

  .search-img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
    float: left;
    position: relative;
    top: 6px;
  }

  .search-title {
    font-weight: 500;
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search-artist {
    font-size: 16px;
    color: #666;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .song-version {
    font-size: 16px;
    color: #666;
    font-weight: normal;
  }
}
</style>
