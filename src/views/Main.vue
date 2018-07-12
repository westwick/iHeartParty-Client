<template>
  <div class="mainapp">
    <now-playing></now-playing>
    <next-up></next-up>
  </div>
</template>

<script>
import NowPlaying from '../components/NowPlaying'
import NextUp from '../components/NextUp'

export default {
  name: 'party',
  components: {NowPlaying, NextUp}
}
</script>