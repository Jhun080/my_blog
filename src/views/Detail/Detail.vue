<!-- 展示某个文章的详细内容 -->
<template>
  <div class="article" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="markdown-body">
      <!-- markdown容器 -->
      <div v-html="md"></div>
    </div>
  </div>
</template>

<script>
// 引入marked
import { marked } from 'marked'

export default {
  name: 'Detail',

  data () {
    return {
      md: '',
      // 当前要读取的文件路径
      fullscreenLoading: false

    }
  },
  mounted () {
    // 调用marked函数，传入markdown格式的内容，返回一段html
    // this.md = marked(require(`@/md/${this.input}`))

    // this.md = marked(testmd)
    // console.log(testmd)
    // this.getMdFile('C:\\Users\\Jhun\\Desktop\\JS源码_课件\\原型与原型链.md')
    // axios.get(this.input2).then((data) => {
    //   this.md = marked(data.data)
    //   // console.log(data)
    // })
    // 获取文章详情
    this.getArticleDetail()
  },
  computed: {
    // 网站地址
    articleURL () {
      return 'http://cdn-typora-articles.huecmx.xyz/' + this.$route.query.aricleURL
    }
  },
  methods: {
    // 获取文章详情
    async getArticleDetail () {
      // 开启页面加载
      this.fullscreenLoading = true

      const result = await this.$axiosQiNiu.get(this.articleURL, {
        params: {
          timestamp: new Date().getTime()
        }
      })
      if (result.status === 200) {
        this.md = marked(result.data)
      }
      // 解除页面加载
      this.fullscreenLoading = false
    }
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
