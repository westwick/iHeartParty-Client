<template>
  <div class="now-playing-wrapper" id="vz" :class="{hassong: currentSong !== null}">

    <audio controls="" autoplay="true" preload="none" id="player" ref="audio"> 
      <source :src="streamUrl" type="audio/mp4">
      <p>Your browser doesn't support HTML audio. Sorry.</p>
    </audio>
    
    <div class="now-playing" v-if="currentSong !== null">
      <div class="album-art">
        <img class="album-main" :src="currentSong.img" />
        <img class="fallback" src="../assets/logosquare.jpg" />
      </div>
      <div class="song-info">
        <div class="song-title">{{currentSong.title}}</div>
        <div class="song-artist">{{currentSong.artist}}</div>
      </div>
      <div class="volume-control" :class="{muted: soundMuted}" @click="toggleSound()">
        <i class="fas fa-volume-up"></i>
      </div>
    </div>
    <div v-else class="no-song-playing"> No Song Playing </div>
    <div class="song-meta">
      <p v-if="currentSong !== null">
        Song added by {{currentSong.addedBy.name}}
        <span class="vote-to-skip">
          <span class="song-timeleft">
            -<vue-countdown 
               :seconds="timeLeft"
               :message="'preparing next song'"
               :time-expire="handleTimeExpire"
               :start="startTimer">
             </vue-countdown>
          </span>
          <span v-if="currentSong.votes.down > 5">Track skipped, starting next song...</span>
          <a v-else href="#" @click.prevent="voteToSkip()">skip track</a> ({{currentSong.votes.down}} votes)
        </span>
      </p>
      <p v-else>No Track Data</p>
    </div>
  </div>
</template>

<script>
import VueCountdown from '@dmaksimovic/vue-countdown';
import { mapGetters } from 'vuex';

export default {
  name: 'NowPlaying',
  components: { VueCountdown },
  data() {
    return {
      startTimer: true,
      timeLeft: 30,
      soundMuted: false,
      streamUrl: window.location.href.includes("localhost") ? "http://localhost:8000/stream.ogg?"  + this.makeid()
       : "http://api.iheart.party:8000/stream.ogg?" + this.makeid()
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'getCurrentSong'
    })
  },
  watch: {
    currentSong: function (song) {
      this.startTimer = false;
      this.timeLeft = song.duration;
      setTimeout(() => {
        this.startTimer = true;
      }, 100);
    }
  },
  methods: {
    toggleSound() {
      this.soundMuted = !this.soundMuted;
      this.$refs.audio.muted = this.soundMuted;
    },
    voteToSkip() {
      this.$store.dispatch('voteToSkip');
    },
    handleTimeExpire() {
      // this.startTimer = false;
    },
    makeid() {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
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

  p {
    position: relative;
    width: 100%;
  }

  .vote-to-skip {
    position: absolute;
    right: 0;
    top: 0;

    a {
      color: #fff;
      text-decoration: underline;
    }
  }
}

.song-timeleft {
  display: inline-block;
  margin-right: 16px;

  .vue-countdown {
    display: inline-block;
  }
}

.album-art {
  width: 80px;
  height: 80px;
  margin-right: 16px;
  position: relative;
  
  img {
    width: 80px;
    height: 80px;
    max-width: 80px;
    min-width: 80px;
    max-height: 80px;
    min-height: 80px;
    -webkit-box-reflect: below 1px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent) , to(rgba(250, 250, 250, 0.1)));
    position: absolute;
    left: 0;
    top: 0;
  }

  .album-main {
    z-index: 3;
  }
  .fallback {
    z-index: 2;
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
