<!-- 首页内容 -->
<template>
    <!-- 文章内容简介列表组 -->
    <div class="list-group">
      <List
        v-for="article in articleList"
        :key="article.article_id"
        :article="article"
      >
      </List>
    </div>
</template>

<script>
import List from '@/components/List/List.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 文章列表数据
      articleList: []
    }
  },
  components: {
    List
  },
  mounted () {
    this.getAllArticle()
  },
  methods: {
    // 获取所有文章
    async getAllArticle () {
      const result = await this.$API.reqGetAllArticle()
      if (result.code === 200) {
        this.articleList = result.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-group{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
