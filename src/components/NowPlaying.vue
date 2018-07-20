<template>
  <div class="now-playing-wrapper" id="vz" :class="{hassong: $store.state.currentSong !== null}">

    <audio controls="" autoplay="true" preload="none" id="player" ref="audio"> 
      <source :src="streamUrl" type="audio/mp4">
      <p>Your browser doesn't support HTML audio. Sorry.</p>
    </audio>
    
    <div class="now-playing" v-if="$store.state.currentSong !== null">
      <div class="album-art">
        <img :src="$store.state.currentSong.img" />
      </div>
      <div class="song-info">
        <div class="song-title">{{$store.state.currentSong.title}}</div>
        <div class="song-artist">{{$store.state.currentSong.artist}}</div>
      </div>
      <div class="volume-control" :class="{muted: soundMuted}" @click="toggleSound()">
        <i class="fas fa-volume-up"></i>
      </div>
    </div>
    <div v-else class="no-song-playing"> No Song Playing </div>
    <div class="song-meta">
      <p v-if="$store.state.currentSong !== null">Song added by {{$store.state.currentSong.addedBy.name}}</p>
      <p v-else>No Track Data</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NowPlaying',
  data() {
    return {
      soundMuted: false,
      streamUrl: window.location.href.includes("localhost") ? "http://localhost:8000/stream.ogg"
       : "http://api.iheart.party:8000/stream.ogg"
    }
  },
  methods: {
    toggleSound() {
      this.soundMuted = !this.soundMuted;
      this.$refs.audio.muted = this.soundMuted;
    }
  }
}
</script>

<style lang="scss">
.now-playing-wrapper {
  background: #ccc;

  &.hassong {
    background: linear-gradient(to bottom, rgba(20,20,21,.68), rgba(20,20,19,.70)), url('../assets/spectrum.gif') 50% 50% no-repeat;
    background-size: cover;
  }
}

#player {
  display: none;
}

.no-song-playing {
  padding: 0 16px;
  height: 112px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    min-width: 48px;
    min-height: 48px;
    border: 2px solid #FFF;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #FFF;
    cursor: pointer;

    &.muted {
      color: rgba(255,255,255,.5);
      border-color: rgba(255,255,255,.5);
    }
  }
}

.song-meta {
  background: #333;
  text-align: left;
  padding: 0 16px;
  font-size: 13px;
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
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
    font-weight: 400;
    line-height: 18px;
    color: #FFF;
  }
  .song-artist {
    font-size: 18px;
    color: #ddd;
  }
}
</style>
