<template>
  <div class="joiner fullscreenflexcenter">
    <img src="../assets/logo.png" class="logo">
    <div class="join-form">
      <p>Hi, {{$store.state.user.nickname}}</p>
      <router-link class="button" tag="button" to="/">Join a Party</router-link>
      <router-link class="button" tag="button" to="/">Create a Party</router-link>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'joiner',
}
</script>

<style lang="scss" scoped>
.joiner {
  color: #fff;

  .button {
    width: 300px;
  }
}

.join-form {
  display: flex;
  flex-direction: column;
  p,.button {
    margin-bottom: 16px;
  }
}
</style>