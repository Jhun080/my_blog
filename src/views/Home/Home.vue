<!-- 首页内容 -->
<template>
    <!-- 文章内容简介列表组 -->
    <div class="list-group" v-loading.fullscreen.lock="fullscreenLoading">
      <List
        v-for="article in articleList"
        :key="article.article_id"
        :article="article"
      >
      </List>
      <!-- 分页栏 -->
      <!--  -->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
    </el-pagination>
    </div>
</template>

<script>
import List from '@/components/List/List.vue'

export default {
  name: 'Home',
  data () {
    return {
      // 文章列表数据
      articleList: [],
      fullscreenLoading: false,
      currentPage: 1, // 当前页码
      pageSize: 2, // 每页显示数据条数
      total: 0, // 数据总条数
      query: ''// 查询条件
    }
  },
  components: {
    List
  },
  mounted () {
    // 分页查询文章数据
    this.getArticleData()
  },
  methods: {
    // 获取所有文章
    // async getAllArticle () {
    //   // 开启页面加载
    //   // this.fullscreenLoading = true
    //   const result = await this.$API.reqGetAllArticle()
    //   if (result.code === 200) {
    //     this.articleList = result.data
    //   }
    //   // 关闭页面加载
    //   // this.fullscreenLoading = false
    // },
    // 分页查询文章数据
    async getArticleData () {
      const result = await this.$API.reqGetArticlePage({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        query: this.query
      })
      if (result.code === 200) {
        this.articleList = result.data.rows
        this.total = result.data.total
      }
    },
    // 分页栏页码改变事件
    handleCurrentChange (val) {
      this.currentPage = val
      // 分页查询
      this.getArticleData()
    },
    // 分页栏每页显示条数修改事件
    handleSizeChange (val) {
      this.pageSize = val
      // 分页查询
      this.getArticleData()
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
