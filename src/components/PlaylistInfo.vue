<template>
  <div class="playlist-info-wrapper">
    <p>{{ totalSongs }} tracks | {{ getFormattedDuration(totalLength) }} playlist length | ending approx {{ endTime() }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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

</style>
