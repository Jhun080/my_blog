<template>
  <div>
    <header>
      <!-- 头部 -->
      <div class="header">
        <!-- 导航栏 -->
        <div class="header-left">
          <ul>
            <li :class="{active:tab=='Home'}" @click="toHome"><i class="el-icon-s-shop"></i>首页</li>
            <li :class="{active:tab=='Archive'}" @click="toArchive"><i class="el-icon-s-order"></i>归档</li>
            <li><i class="el-icon-s-comment"></i>留言</li>
            <li><i class="el-icon-user-solid"></i>关于</li>
            <li><i class="el-icon-s-help"></i>占位</li>
            <li><i class="el-icon-s-help"></i>占位</li>
          </ul>
        </div>

        <div class="header-right">
          <!-- 搜索框 -->
          <!-- <el-input placeholder="请输入你要搜索的关键词" v-model="query" @keyup.enter.native="findData">
            <template slot="suffix">
              <i class="el-icon-search" ref="searchIcon"></i>
            </template>
          </el-input> -->
          <!-- 登录按钮 -->
          <!-- <div class="login" @click="toLogin">登录</div> -->
          <!-- 后台管理按钮-->
          <!-- <div class="toManage" @click="toManage">后台管理</div> -->
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
      search: '',
      query: ''
    }
  },
  computed: {
    tab () {
      return this.$route.name
    }
  },
  methods: {
    // 查询文章数据
    findData () {
      this.$store.state.query = this.query
    },
    onSubmit () {
      return false
    },
    seek () {
      if (this.search) {
        this.$router.push({ path: '/list', query: { search: this.search } })
        this.search = ''
      }
    },
    // 跳转至登录界面
    toLogin () {
      this.$router.push('/login')
    },
    // 跳转至后台管理
    toManage () {
      this.$router.push('/manage')
    },
    // 跳转至首页
    toHome () {
      this.$router.push('/')
    },
    // 跳转至归档
    toArchive () {
      this.$router.push('/main/archive')
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
  background-color: rgba(40, 42, 44, 0.6);
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
      transition: all .5s;
    }
    li:hover {
      background-color: rgb(88, 85, 113);
      transition: all .5s;
    }
    li.active {
      background-color: rgb(88, 85, 113);
    }
  }
  .header-right {
    line-height: 40px;
    display: flex;
    justify-content: center;

    .search {
      line-height: 40px;
      /deep/ .el-input__inner {
        line-height: 40px;
        border: 0;
        height: 25px;
      }
    }

    .login {
      margin-left: 10px;
      width: 50px;
      text-align: center;
    }

    .login:hover{
      color:rgb(144, 147, 148);
      cursor: pointer;
      transition: all .5s;
    }

    .toManage {
      margin-left: 10px;
      width: 100px;
      text-align: center;
    }

    .toManage:hover{
      color:rgb(144, 147, 148);
      cursor: pointer;
      transition: all .5s;
    }
  }
}
</style>
