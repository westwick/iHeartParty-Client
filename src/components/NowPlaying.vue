<template>
  <div class="now-playing-wrapper">
    <div class="now-playing">
      <div class="album-art">
        <img src="../assets/mj.jpg" />
      </div>
      <div class="song-info">
        <div class="song-title">{{$store.state.currentSong.title}}</div>
        <div class="song-artist">{{$store.state.currentSong.artist}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NowPlaying',
}
</script>

<style lang="scss">
.now-playing-wrapper {
  background: #ccc;
}

.now-playing {
  padding: 0 16px;
  height: 112px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.album-art {
  img {
    width: 80px;
    height: 80px;
    margin-right: 16px;
  }
}

.song-info {
  text-align: left;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  .song-title {
    font-size: 24px;
  }
  .song-artist {
    font-size: 18px;
  }
}
</style>
