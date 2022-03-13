<!-- 首页显示的内容列表的一项简介 -->
<template>
  <div class="list-nav">
    <!--  -->
    <el-row :gutter="15">
      <!-- 图片区 -->
      <el-col :span="6">
        <img src="@/assets/List/404.png" class="list-icon" />
        <!-- 文章创建时间 -->
        <div class="list-date">{{ createTime }}</div>
      </el-col>
      <!-- 简介区 -->
      <el-col :span="18">
        <!-- 置顶标记 -->
        <div class="list-title" @click="findDetail(article.article_url)">
          <span class="top active" v-if="article.istop==1">置顶</span>
          <!-- 标题 -->
          <span>{{ article.article_title }}</span>
        </div>
        <!-- 内容-->
        <div class="list-content">
          &emsp;&emsp;摘要: {{ article.article_summary }}
        </div>
        <!-- 分类、浏览信息 -->
        <div class="list-detail">
          <div style="margin-right:100px">
            <span class="list-category"
              v-for="category in article.classifications"
              :key="category.category_id"
            >
              {{ category.classification.classification_name }}
            </span>
          </div>
          <div>
            浏览({{ article.article_view }})留言({{ article.article_comment }})
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['article'],
  data () {
    return {

    }
  },
  computed: {
    // 文章创建时间
    createTime () {
      return this.$dayjs(this.article.article_createtime).format('YYYY-MM-DD')
    }
  },
  methods: {
    // 跳转至文章详情
    findDetail (articleURL) {
      this.$router.push(`/detail?aricleURL=${articleURL}`)
    }
  }
}
</script>

<style lang="less" scoped>
.list-nav {
  width: 50vw;
  height: 200px;
  text-align: center;
  background-color: white;
  margin: 10px 0px;
  border-radius: 20px;
  text-align: left;
  position: relative;
  opacity: 0.9;
  img {
    border-radius: 20px;
  }
  .list-icon {
    height: 100%;
  }
  .list-date {
    font-size: 14px;
    text-align: center;
  }
  .list-title {
    text-align: center;
    font-size: 18px;
    margin: 15px 0px 10px 0px;
    cursor: pointer;

    .top{
      margin-right: 10px;
      color: red;
      font-style:italic;
      font-size: 14px;
      display: none;
    }
    .top.active{
      display: inline;
    }
  }
  .list-content {
    text-align: left;
    font-size: 14px;
    color: grey;
  }
  .list-detail{
    display: flex;
    //justify-content: space-around;
    font-size: 14px;
    position: absolute;
    bottom: 2px;
    right: 30px;

    .list-category{
      margin-right:20px;
      color: rgb(163,113,77);
      padding: 0px 5px;
      border: 2px solid rgb(163,113,77);
      border-radius: 10%;
    }
  }
}
</style>
