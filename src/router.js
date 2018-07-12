import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Main from './views/Main.vue'
import Joiner from './views/Joiner.vue'
import { requireNick } from './services/auth';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/start',
      name: 'start',
      component: Start
    },
    {
      path: '/join',
      name: 'joiner',
      component: Joiner,
      beforeEnter: requireNick 
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: requireNick 
    },
  ]
})
