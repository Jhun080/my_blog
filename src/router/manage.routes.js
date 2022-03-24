// 后台管理路由
export default {
  path: '/manage',
  // name: 'Manage',
  component: () => import('@/views/Manage/Manage.vue'),
  children: [
    {
      path: '/',
      redirect: '/manage/datamanage'
    },
    {
      path: 'datamanage',
      name: 'DataManage',
      component: () => import('@/views/Manage/DataManage/DataManage.vue')
    }
  ]
}
