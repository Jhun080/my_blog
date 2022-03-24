<!-- 后台管理系统菜单栏 -->
<template>
  <div class="menu">
    <!-- @open="handleOpen" @close="handleClose" -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">文件管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: ['isCollapse'],
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>

.menu {
  text-align: center;
  /deep/.el-menu {
    border: 0px;
    width: 100%;
    color: white;
    background-color: rgb(84,92,100);
    /deep/ .el-menu--inline{
      background-color: rgb(84,92,100);
    }
  }
}
</style>
