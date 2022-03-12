import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail/Detail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
