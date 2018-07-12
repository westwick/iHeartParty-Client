<template>
  <div class="start fullscreenflexcenter">
    <img src="../assets/logo.png" class="logo">
    <div class="nick-form">
      <input class="input" v-model="nickname" type="text" placeholder="choose a nickname" minlength="2" maxlength="15"/>
      <button class="button" @click="login()">Continue</button>
    </div>
  </div>
</template>

<script>
import { setNick } from '../services/auth';

export default {
  name: 'start',
  methods: {
    login() {
      setNick(this.nickname)
      this.$store.commit('setNick', this.nickname)
      this.$router.push('/join')
    }
  }
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
