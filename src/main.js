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

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
