import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';
import App from './App.vue'
import Main from '../components/Main.vue'
import Post from '../components/Post.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component: Main,
      props: true,
    },
    {
      path: '/post/:id',
      name:'post',
      component: Post,
      props: true,
    },
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
