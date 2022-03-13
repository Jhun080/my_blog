import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入md样式
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'

// axios
import axios from 'axios'

// dayjs
import dayjs from 'dayjs'

// 统一接收api文件夹中的全部请求函数
import * as API from '@/api/index.js'

// const $axios = axios.create({
//   // baseURL: 'http://localhost:9615/api'
//   baseURL: 'http://101.42.111.16:9615/api'
// })
// Vue.prototype.$axios = $axios
const $axiosQiNiu = axios.create({
  baseURL: 'http://cdn-typora-articles.huecmx.xyz'
})
Vue.prototype.$axiosQiNiu = $axiosQiNiu

Vue.prototype.$dayjs = dayjs

Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
