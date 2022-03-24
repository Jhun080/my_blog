<template>
  <div>
    <el-container>
      <el-aside>
        <Menu :isCollapse="isCollapse"> </Menu>
      </el-aside>
      <el-container>
        <el-header> header </el-header>
        <!-- 内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from './Menu/Menu.vue'

export default {
  name: 'Manage',
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    Menu
  },
  mounted () {
    // 隐藏头部菜单(header)
    this.hideHeader()
  },
  methods: {
    // 隐藏头部菜单(header)
    hideHeader () {
      this.$parent.$refs.header.style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(84,92,100);
  text-align: left;
  line-height: 200px;
  height: 100vh;
  width: 200px !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  //line-height: 160px;
}

</style>
