// 后台管理路由
export default {
  path: '/manage',
  name: 'Manage',
  component: () => import('@/views/Manage/Manage.vue'),
  children: [

  ]
}
