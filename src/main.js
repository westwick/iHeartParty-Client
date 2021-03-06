import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueSocketio from 'vue-socket.io';
import {version} from '../package.json';

console.log('iHeartParty v' + version);

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    console.log('session expired');
    window.location = '/start';
  }
  return Promise.reject(error);
});

if (window.location.href.includes("localhost")) {
  Vue.use(VueSocketio, 'http://localhost:9090/rooms/1/meta');
} else {
  Vue.use(VueSocketio, 'http://api.iheart.party/rooms/1/meta');
}

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
