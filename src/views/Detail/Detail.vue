<!-- 展示某个文章的详细内容 -->
<template>
  <div class="article">
    <div class="markdown-body">
      <!-- markdown容器 -->
      <div v-html="md"></div>
    </div>
  </div>
</template>

<script>
// 引入marked
import testmd from '@/md/二分查找.md'
// const marked = require('marked')
import { marked } from 'marked'

export default {
  name: 'Detail',
  data () {
    return {
      md: ''
    }
  },
  mounted () {
    // 调用marked函数，传入markdown格式的内容，返回一段html
    this.md = marked(testmd)
    // console.log(testmd)
  }
}
</script>

<style lang="less" scoped>
.article {
  width: 75%;
  border-left: 50px solid white;
  border-right: 50px solid white;
  border-radius: 20px;
  opacity: 1;
  .markdown-body {

  }
}
</style>
