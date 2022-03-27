import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

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

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到要跳转到的路由信息
  // from:可以获取到正要离开的路由的信息
  // next:放行函数 next()放行  next(path):放行到指定的路由
  // next(false)重置到from路由对应的地址  next至少要执行一次

  // 用户登录了才会有token，未登录不会有token
  const token = store.state.user.token
  // 用户信息:用户名
  const username = store.getters.username

  if (token) {
    // 用于记录导航守卫中发请求获取到的用户信息
    let userName
    // 首先获取username
    if (username === null) {
      // 用户信息不存在，获取用户信息
      try {
        // 获取用户数据
        await store.dispatch('getUserInfo')
        // 如果userName还是空，说明用户token过期
        userName = store.getters.username
      } catch (error) {

      }
    }
    if (userName && to.path === '/login') {
      // 用户已经登录，去login(阻止，并跳转至首页)
      next('/')
    } else if (!userName && to.path === '/login') {
      // 用户未登录，去login，放行
      next()
    } else {
      // 用户去非login界面，放行
      next()
    }
  } else {
    next()
  }
})

export default router
