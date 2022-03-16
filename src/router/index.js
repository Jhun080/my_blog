import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1.分布式
// 2.动态引入配置
const routerList = []
function importAll (r) {
  r.keys().forEach((key) => {
    routerList.push(r(key).default)
  })
}
// require.context('./',false,xx) :查询 ./ 目录下的以routes.js结尾的文件，不查询子目录
importAll(require.context('./', false, /\.routes\.js/))

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  // 解构数组路由
  ...routerList
]

// 重写$router.push方法
// 1.先把VueRouter原型对象的push保存一份
const originPush = VueRouter.prototype.push
// 2.重写push | replace
// location:跳转方向，传递哪些参数
// resolve:成功回调
// reject:失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 当用户设置了回调函数时
    // call与apply区别:
    // 相同点：都可以调用函数一次，可以篡改函数上下文一次
    // 不同点：call传递参数用逗号隔开，apply传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
