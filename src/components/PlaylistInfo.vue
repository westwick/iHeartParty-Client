<template>
  <div class="playlist-info-wrapper">
    <p class="playlist-info">
      {{ totalSongs }} tracks
      <span class="divider">|</span>
      {{ getFormattedDuration(totalLength) }} playlist length
      <span class="divider">|</span>
      ending approx {{ endTime() }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as moment from 'moment';

export default {
  name: 'PlaylistInfo',
  computed: {
    ...mapGetters({
      totalSongs: 'getTotalSongs',
      totalLength: 'getTotalLength'
    })
  },
  methods: {
    getFormattedDuration(duration) {
      if (!duration) return '0:00';
      return moment('2020-04-20').startOf('day').seconds(duration).format('HH:mm:ss');
    },
    endTime() {
      return moment().add(this.totalLength, 's').format('h:mm a');
    }
  }
}
</script>

<style lang="scss">
.playlist-info {
  font-size: 13px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  color: #666;
}

span.divider {
  color: #bbb;
  padding: 0 16px;
}
</style>
