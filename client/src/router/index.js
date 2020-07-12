import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/friendList',
    name: 'friendList',
    component: () => import(/* webpackChunkName: "FriendList" */ '../views/FriendList.vue')
  },
  {
    path: '/friendList/:userId?',
    name: 'friendsProfile',
    component: () => import(/* webpackChunkName: "profile" */ '../components/profile.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
