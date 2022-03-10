<template>
  <div>
    <header>
      <!-- 头部 -->
      <div class="header">
        <!-- 导航栏 -->
        <div class="header-left">
          <ul>
            <li>
              <router-link to="/">
                <i class="el-icon-s-shop"></i>
                首页
              </router-link>
            </li>
            <li class="active"><i class="el-icon-s-order"></i>归档</li>
            <li><i class="el-icon-s-comment"></i>留言</li>
            <li><i class="el-icon-user-solid"></i>关于</li>
            <li><i class="el-icon-s-help"></i>占位</li>
            <li><i class="el-icon-s-help"></i>占位</li>
          </ul>
        </div>
        <!-- 搜索框 -->
        <div class="header-right">
          <el-input placeholder="请输入你要搜索的关键词">
            <template slot="suffix">
              <i class="el-icon-search" ref="searchIcon"></i>
            </template>
          </el-input>
          <!-- <div>登录</div> -->
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    onSubmit () {
      return false
    },
    seek () {
      if (this.search) {
        this.$router.push({ path: '/list', query: { search: this.search } })
        this.search = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
header {
}
.header {
  position: fixed;
  z-index: 1;
  top: 0px;

  display: flex;
  justify-content: space-around;
  background-color: grey;
  color: white;
  width: 100vw;
  height: 40px;
  opacity: 0.8;
  .header-left {
    line-height: 40px;
    li {
      list-style-type: none;
      display: inline;
      cursor: pointer;
      padding: 10px 20px;
      animation-name: example;
      animation-duration: 4s;
    }
    li:hover {
      background-color: rgb(88, 85, 113);
    }
    li.active {
      background-color: rgb(88, 85, 113);
    }
  }
  .header-right {
    line-height: 40px;
    /deep/ .el-input__inner {
      border: 0;
      height: 30px;
    }
  }
}
</style>
