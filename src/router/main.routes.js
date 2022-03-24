// 主页路由
export default {
  path: '/main',
  // name: 'main',
  component: () => import('@/views/Main/Main.vue'),
  children: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: 'detail',
      name: 'Detail',
      component: () => import('@/views/Detail/Detail.vue')
    },
    {
      path: 'archive',
      name: 'Archive',
      component: () => import('@/views/Archive/Archive.vue')
    }
  ]
}
