<template>
  <div class="now-playing-wrapper" id="vz">

    <audio controls="" autoplay="true" preload="none" id="player"> 
      <source src="http://localhost:8000/stream.ogg" type="audio/ogg">
      <p>Your browser doesn't support HTML audio. Sorry.</p>
    </audio>
    
    <div class="now-playing">
      <div class="album-art">
        <img src="../assets/mj.jpg" />
      </div>
      <div class="song-info">
        <div class="song-title">{{$store.state.currentSong.title}}</div>
        <div class="song-artist">{{$store.state.currentSong.artist}}</div>
      </div>
      <div class="volume-control">
        <i class="fas fa-volume-up" @click="startViz()"></i>
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
  methods: {
    startViz() {
      var audioElement = document.getElementById('player');
      var parentElement = document.getElementById('vz');
      var visualizer = new AudioVisualizer();

      // Create Web Audio API references and creates container svg element for visualizer inserted inside parentElement
      visualizer.containerHeight = 400;
      visualizer.containerWidth = 400;
      visualizer.create(audioElement, parentElement);

      // Refer to Web Audio API analyser for option's reference
      visualizer.analyserOptions({
        fftSize: 2048,
        minDecibels: -87,
        maxDecibels: -3,
        smoothingTimeConstant: 0.83
      });

      // CSS styling for visualizer container
      visualizer.containerStyles({
        position: 'absolute',
        top: visualizer.containerHeight * -1,
        left: 0,
        'z-index': 10000,
        'pointer-events': 'none'
      });

      // Options for visualization bars
      // Available colors: purple, blue, green, red, orange, gray
      visualizer.options({
        color: 'orange',
        opacity: 0.7,
        interval: 30,
        frequencyDataDivide: 9,
        barPadding: 1.7
      });

      visualizer.initialize();
      visualizer.start();
    }
  }
}
</script>

<style lang="scss">
.now-playing-wrapper {
  background: #ccc;
  background: linear-gradient(to bottom, rgba(20,20,21,.68), rgba(20,20,19,.70)), url('../assets/spectrum.gif') 50% 50% no-repeat;
  background-size: cover;
}

#player {
  display: none;
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
    border: 2px solid #FFF;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #FFF;
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
