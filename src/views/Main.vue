<template>
  <div class="mainapp">
    <now-playing></now-playing>
  </div>
</template>

<script>
import NowPlaying from '../components/NowPlaying'

export default {
  name: 'party',
  components: {NowPlaying}
}
</script>