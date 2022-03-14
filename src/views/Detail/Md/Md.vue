<!-- 该组件用于处理md文件 -->
<template>
  <div>
    <div class="markdown-body">
      <!-- markdown容器 -->
      <div v-html="articleData"></div>
    </div>
  </div>
</template>

<script>
// 引入marked
import { marked } from 'marked'

export default {
  name: 'Md',
  props: ['mdData'],
  data () {
    return {

    }
  },
  mounted () {
    // 开启父组件的页面加载效果
    this.startLoading()
  },
  computed: {
    articleData () {
      this.stopLoading()
      return marked(this.mdData)
    }
  },
  methods: {
    // 开启父组件的页面加载效果
    startLoading () {
      this.$parent.fullscreenLoading = true
    },
    // 停止父组件的页面加载效果
    stopLoading () {
      this.$parent.fullscreenLoading = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
