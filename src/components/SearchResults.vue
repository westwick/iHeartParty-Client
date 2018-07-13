<template>
  <div class="search-results">
    <p class="search-header">Search Results</p>
    <i class="far fa-times-circle close-btn" @click="closeSearch()"></i>
    <p v-if="$store.state.searching">Searching...</p>
    <p v-if="!$store.state.searching && !$store.state.searchDirty && $store.state.searchResults.length === 0" class="no-results">
      No results found.
      <span>Try changing your search criteria.</span>
    </p>
    <div v-else v-for="result of $store.state.searchResults" class="search-result" @click="addTrack(result)">
      <div class="added">
        Your song was added!
      </div>
      <div class="track-wrapper" :class="{selected: result.selected}">
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

.no-results {
  text-align: center;
  margin-top: 24px;
  span {
    display: block;
    color: #aaa;
  }
}
.search-header {
  width: 100%;
  text-align: center;
  padding: 8px 0;
  background: linear-gradient(to bottom, #C50930, #A60628);
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
}

.close-btn {
  position: fixed;
  right: 8px;
  top: 8px;
  cursor: pointer;
  color: #fff;
  z-index: 101;
  font-size: 24px;
}

.search-results {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 1;
  text-align: left;
  overflow-y: scroll;
  padding-top: 40px;
  padding-bottom: 68px;
  transition: all .3s ease-in-out;
  transform: translateY(100vh);

  &.expanded {
    transform: translateY(0);
  }
}

.search-result {
  border-bottom: 1px solid #eee;
  cursor: pointer;
  position: relative;

  .added {
    position: absolute;
    top: 0;
    left: 16px;
    z-index: -1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .track-wrapper {
    background: #fff;
    padding: 8px 16px;
    transition: all .1s ease-in-out;
    &.selected {
      transform: translateX(120%);
    }

    &:hover {
      background-color: #f8f8f8;
    }
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
