<template>
  <!-- 内容部分 -->
    <div class="main-content">
      <el-row :gutter="1">
        <!-- 根据路由显示的内容 -->
        <el-col class="col-left">
          <router-view></router-view>
        </el-col>
        <!-- 固定部分 标签分类、专栏…………-->
        <el-col class="col-right">
          <Sidebar></Sidebar>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import Sidebar from '@/views/Sidebar/Sidebar.vue'

export default {
  name: 'Main',
  components: {
    Sidebar
  }
}
</script>

<style lang='less' scoped>
.main-content {
  //margin-top: 80px;

  .el-row {
    margin: 0px !important;
  }

  .col-left {
    display: flex;
    justify-content: center;
    width: 63vw;
  }

  .col-right {
    width: 33vw;
  }
}

@media only screen and (max-width: 1000px) {
  .main-content {
    display: flex;
    justify-content: center;
    .col-left {
      width: 100vw;
    }

    .col-right {
      display: none;
    }
  }
}
</style>
