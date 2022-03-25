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
import API from '@/api/index.js'

const $axiosQiNiu = axios.create({
  baseURL: 'https://cdn-typora-articles.huecmx.xyz'
})
Vue.prototype.$axiosQiNiu = $axiosQiNiu

Vue.prototype.$dayjs = dayjs

Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
