<template>
  <div class="search-bar">
    <div class="control has-icons-left">
      <input type="text" class="input" placeholder="Search by Artist, Track, or Album" />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
}
</script>

<style lang="scss">
.search-bar {
  width: 100vw;
  background: #C50930;
  padding: 16px;
  background: linear-gradient(to bottom, #C50930, #A60628);
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
