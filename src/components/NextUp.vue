<template>
  <div class="next-up-wrapper">
    <h2>Next Up</h2>
    <div class="next-tracks-container">
      <div class="next-track" v-for="track in $store.state.nextUp">
        <div class="next-title">{{ track.title }}</div>
        <div class="next-artist">{{ track.artist }} &sdot; {{track.album}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextUp',
}
</script>

<style lang="scss">
.next-up-wrapper {
  text-align: left;
  padding: 0 16px;
  margin-top: 16px;

  h2 {
    font-weight: bold;
  }
}

.next-track {
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
}

.next-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.next-artist {
  font-size: 13px;
  font-weight: 400;
  color: #666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
