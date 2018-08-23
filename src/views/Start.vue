<template>
  <div class="start fullscreenflexcenter">
    <img src="../assets/logo.png" class="logo">
    <div class="nick-form">
      <button class="button" @click="auth.login()">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'start',
  props: ['auth']
}
</script>

<style lang="scss">
@import '../styles/main.scss';

.logo {
  width: 300px;
  height: auto;
}

.nick-form {
  max-width: 300px;
  margin: 0 auto;

  .button {
    margin-top: 16px;
    width: 300px;
    margin-bottom: 80px;
  }
}
</style>
