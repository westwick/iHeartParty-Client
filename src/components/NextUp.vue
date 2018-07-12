<template>
  <div class="next-up-wrapper">
    <div class="next-tracks-container">
      <div class="next-track" v-for="track in $store.state.nextUp">
        <div class="next-title">{{ track.title }}</div>
        <div class="next-artist">{{ track.artist }} &middot; {{track.album}}</div>
        <div class="next-up-rater">
          <div class="rater vote-down">
            <i class="far fa-thumbs-down"></i>
            <span class="down-votes">3</span>
          </div>
          <div class="rater vote-up">
            <i class="far fa-thumbs-up"></i>
            <span class="up-votes">1</span>
          </div>
        </div>
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

  h2 {
    font-weight: bold;
    margin-bottom: 8px;
  }
}

.next-track {
  border-bottom: 1px solid #eee;
  padding: 8px 80px 8px 0;
  position: relative;
}

.next-up-rater {
  position: absolute;
  right: 0;
  top: 12px;
  display: flex;
  .rater {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    color: #bbb;
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
