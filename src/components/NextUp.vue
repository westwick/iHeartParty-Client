<template>
  <div class="next-up-wrapper">
    <div class="next-tracks-container">
      <div class="no-tracks" v-if="$store.state.nextUp.length === 0">
        <h2>No Tracks Added</h2>
        <p>Use the search below to add some songs to the group playlist!</p>
      </div>
      <transition-group name="flip-list" tag="div">
        <div v-if="$store.state.nextUp.length > 0" class="next-track" v-for="track in $store.state.nextUp" :key="track.id">
          <div class="track-score" :class="{pos: track.votes.score >= 0, neg: track.votes.score < 0}">
            <span v-if="track.votes.score > 0">+</span>
            {{ track.votes.score }}
          </div>
          <div class="track-meta">
            <p>Added by: {{ track.addedBy.name }}</p>
            <p v-if="getVoters(track).up.length">Upvotes: {{ getVoters(track).up.join(', ') }}</p>
            <p v-if="getVoters(track).down.length">Downvotes: {{ getVoters(track).down.join(', ') }}</p>
          </div>
          <div class="next-title">
            {{ track.title }}
            <span class="next-duration"> ({{ getFormattedTrackLength(track.duration) }})</span>
          </div>
          <div class="next-artist">{{ track.artistName }} <span v-if="track.albumName">&middot; {{track.albumName}}</span></div>
          <div class="next-up-rater">
            <div class="rater vote-down" @click="downvoteTrack(track.id)">
              <i class="far fa-thumbs-down" :class="{downvoted: didUserDownvoteTrack(track)}"></i>
              <span class="down-votes">{{ track.votes.down }}</span>
            </div>
            <div class="rater vote-up" @click="upvoteTrack(track.id)">
              <i class="far fa-thumbs-up" :class="{upvoted: didUserUpvoteTrack(track)}"></i>
              <span class="up-votes">{{ track.votes.up }}</span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { getNick } from '../services/auth';
import * as moment from 'moment';

export default {
  name: 'NextUp',
  methods: {
    upvoteTrack(id) {
      this.$store.dispatch('upvoteTrack', id)
    },
    downvoteTrack(id) {
      this.$store.dispatch('downvoteTrack', id)
    },
    didUserDownvoteTrack(track) {
      return this.checkVotesByUser(track) < 0;
    },
    didUserUpvoteTrack(track) {
      return this.checkVotesByUser(track) > 0;
    },
    getVoters(track) {
      const upvoters = [];
      const downvoters = [];
      for (const key in track.userVotes) {
        if (track.userVotes[key] > 0) {
          upvoters.push(key);
        } else if (track.userVotes[key] < 0) {
          downvoters.push(key);
        }
      };
      return { up: upvoters, down: downvoters };
    },
    checkVotesByUser(track) {
      const username = this.$store.state.user.nickname;
      let vote = 0;
      Object.keys(track.userVotes).forEach(user => {
        if (user === username) {
          vote = track.userVotes[username];
        }
      });
      return vote;
    },
    getFormattedTrackLength(duration) {
      if (!duration) return '0:00';
      return moment('2020-04-20').startOf('day').seconds(duration).format('m:ss');
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
  padding: 0 16px;
  overflow-y: scroll;
  // now-playing = 112px
  // song-meta   = 40px
  // pl-info     = 30px
  // search-bar  = 68px
  // total       = 250px
  height: calc(100vh - 250px);


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
  padding: 8px 64px 8px 48px;
  position: relative;

  .track-meta {
    background: rgba(255, 255, 255, .8);
    display: none;
    position: absolute;
    top: 0;
    left: 48px;
    width: calc(100% - 106px);
    height: 100%;
    z-index: 3;
    font-size: 12px;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    color: #000;
    font-weight: 500;
  }

  .track-score {
    cursor: help;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &.pos {
      color: #52d521;
    }
    &.neg {
      color: #c51f19;
    }
    &:hover {
      & + .track-meta {
        display: flex;
      }
    }
  }
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
    .upvoted, .downvoted {
      color: #333;
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
