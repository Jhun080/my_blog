<!-- 首页显示的内容列表的一项简介 -->
<template>
  <div class="list-nav">
    <!--  -->
    <el-row :gutter="15">
      <!-- 图片区 -->
      <el-col :span="6">
        <img src="@/assets/List/404.png" class="list-icon" />
        <div class="list-date">2022-08-19 15:14</div>
      </el-col>
      <!-- 简介区 -->
      <el-col :span="18">
        <!-- 置顶标记 -->
        <div class="list-title" @click="findDetail">
          <span class="top active">置顶</span>
          <!-- 标题 -->
          <span>二分查找</span>
        </div>
        <!-- 内容-->
        <div class="list-content">
          &emsp;&emsp;摘要: 不断地将排序好的数组进行二分，逐步缩小范围，直到找到元素或找不到该元素为止。
        </div>
        <!-- 分类、浏览信息 -->
        <div class="list-detail">
          <div style="margin-right:100px">
            <span style="margin-right:20px">算法</span>
            <span style="margin-right:20px">LeetCode</span>
          </div>
          <div>
            浏览(10)留言(10)
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {

    }
  },
  methods: {
    // 跳转至文章详情
    findDetail (articleId = 114514) {
      this.$router.push(`/detail/${articleId}`)
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
    bottom: 0px;
    right: 30px;
  }
}
</style>
