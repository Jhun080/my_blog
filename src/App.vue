<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <div class="header">
      <Header></Header>
    </div>
    <!-- 内容部分 -->
    <div class="main-content">
      <el-row :gutter="1">
        <!-- 根据路由显示的内容 -->
        <el-col :span="16">
          <Home></Home>
        </el-col>
        <!-- 固定部分 标签分类、专栏…………-->
        <el-col :span="8">
          <Sidebar></Sidebar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Home from '@/views/Home/Home.vue'
import Sidebar from '@/views/Sidebar/Sidebar.vue'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    Home,
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.header {
}
.main-content {
  margin-top: 80px;
  .el-row {
    margin: 0px !important;
  }
}
</style>
