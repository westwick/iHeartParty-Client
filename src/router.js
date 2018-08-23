import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start.vue'
import Main from './views/Main.vue'
import Approval from './views/Approval.vue'
import Callback from './views/Callback.vue'
import { requireAuth } from './services/auth';

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
      path: '/approval',
      name: 'approval',
      component: Approval
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      beforeEnter: requireAuth
    },
  ]
})
