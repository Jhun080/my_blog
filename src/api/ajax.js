// 对axios进行二次封装
import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// start():进度条开始  done():进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'

// 引入store仓库
// import store from '@/store'

// 1.利用axios对象的方法create，创建一个axios实例
const requests = axios.create({
  // 配置
  baseURL: process.env.VUE_APP_BASE_API, // 基本路径前缀（自动匹配生产环境或开发环境）
  // baseURL: 'https://101.42.111.16:9615/api',
  timeout: 5000 // 请求超时时间
})
// 请求拦截器：在请求发出前，做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，其中有一个属性，headers请求头
  // 进度条开始动
  nprogress.start()
  // 在请求中添加uuid
  // if (store.state.detail.uuid_token) {
  //   // 在请求头中添加字段(userTempId)，不是固定的，要与后台商量好
  //   config.headers.userTempId = store.state.detail.uuid_token
  // }
  // // 需要携带token给服务器
  // if (store.state.user.token) {
  //   config.headers.token = store.state.user.token
  // }
  return config
})

// 响应拦截器：成功和失败两种
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data
  },
  () => {
    // 失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)

// 对外暴露
export default requests
