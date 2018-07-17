<template>
  <div class="next-up-wrapper">
    <div class="next-tracks-container">
      <div class="no-tracks" v-if="$store.state.nextUp.length === 0">
        <h2>No Tracks Added</h2>
        <p>Use the search below to add some songs to the group playlist!</p>
      </div>
      <transition-group name="flip-list" tag="div">
        <div v-if="$store.state.nextUp.length > 0" class="next-track" v-for="track in $store.state.nextUp" :key="track.id">
          <div class="next-title">{{ track.title }}</div>
          <div class="next-artist">{{ track.artistName }} &middot; {{track.albumName}}</div>
          <div class="next-up-rater">
            <div class="rater vote-down" @click="downvoteTrack(track.id)">
              <i class="far fa-thumbs-down"></i>
              <span class="down-votes">{{ track.votes.down }}</span>
            </div>
            <div class="rater vote-up" @click="upvoteTrack(track.id)">
              <i class="far fa-thumbs-up"></i>
              <span class="up-votes">{{ track.votes.up }}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextUp',
  methods: {
    upvoteTrack(id) {
      this.$store.dispatch('upvoteTrack', id)
    },
    downvoteTrack(id) {
      this.$store.dispatch('downvoteTrack', id)
    }
  }
}
</script>

<style lang="scss">
.flip-list-move {
  transition: transform .75s ease-in-out;
}

.no-tracks {
  text-align: center;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 20px;
}

.next-up-wrapper {
  text-align: left;
  padding: 0 16px 68px;


  h2 {
    font-weight: bold;
    margin-bottom: 8px;
  }
}

.next-avatar img {
  border-radius: 20px;
  float: left;
  margin-right: 20px;
  width: 35px;
  -webkit-box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.4); 
  box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.4);
  border: 1px solid #666;
}

.next-track {
  border-bottom: 1px solid #eee;
  padding: 8px 64px 8px 0;
  position: relative;
}

.next-up-rater {
  position: absolute;
  right: 0;
  top: 12px;
  display: flex;
  .rater {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    color: #aaa;
    &:hover {
      color: #666;
    }
    .up-votes,.down-votes {
      font-size: 12px;
      color: #bbb;
    }
  }
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
