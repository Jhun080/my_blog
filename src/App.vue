<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <div class="header">
      <Header></Header>
    </div>
    <!-- 内容部分 -->
    <div class="main-content">
      <el-row :gutter="10">
        <!-- 根据路由显示的内容 -->
        <el-col :span="18">
          <Home></Home>
        </el-col>
        <!-- 固定部分 标签分类、专栏…………-->
        <el-col :span="6"> 未完成 </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Home from '@/views/Home/Home.vue'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    Home
  }
}
</script>

<style lang="less" scoped>
.header {
}
.main-content {
  margin-top: 80px;
  .el-row{
    margin: 0px !important;
  }
}

</style>
