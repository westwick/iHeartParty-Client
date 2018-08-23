<template>
  <div id="app">
    <router-view :auth="auth" />
  </div>
</template>

<script>
import AuthService from './services/authService';

const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: 'start',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>