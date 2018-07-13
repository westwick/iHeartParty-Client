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
      <p>Genre: Pop | Year: 1982 | BPM: 120 | Key: F# Minor</p>
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
  /* background: #ccc; */
  background: rgb(238,238,238); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(238,238,238,1) 0%, rgba(204,204,204,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(238,238,238,1) 0%,rgba(204,204,204,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(238,238,238,1) 0%,rgba(204,204,204,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#cccccc',GradientType=0 ); /* IE6-9 */
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
    border: 2px solid #222;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #222;
  }
}

.song-meta {
  background: #333;
  text-align: left;
  padding: 8px 16px;
  font-size: 13px;
  color: #fff;
}

.album-art {
  width: 80px;
  height: 80px;
  margin-right: 16px;
  
  img {
    width: 80px;
    height: 80px;
    -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent) , to(rgba(250, 250, 250, 0.1)))
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
    font-weight: 700;
    line-height: 18px;
    color: #000;
  }
  .song-artist {
    font-size: 18px;
  }
}
</style>
