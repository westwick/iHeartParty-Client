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
      <div class="volume-control">
        <i class="fas fa-volume-up"></i>
      </div>
    </div>
    <div class="song-meta">
      <p>BPM: 120 | Key: F# Minor</p>
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

  .volume-control {
    margin-left: auto;
    width: 48px;
    height: 48px;
    border: 1px solid #333;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #333;
  }
}

.song-meta {
  background: #bbb;
  text-align: left;
  padding: 8px 16px;
  font-size: 13px;
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
    font-weight: 500;
  }
  .song-artist {
    font-size: 20px;
  }
}
</style>
