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
            <li :class="{active:tab=='MessageBoard'}" @click="toMessageBoard"><i class="el-icon-s-comment"></i>留言板</li>
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
          <div class="login" v-if="userInfo.user_name==null" @click="toLogin">登录</div>
          <!-- 注册按钮 -->
          <div class="register" v-if="userInfo.user_name==null" @click="toRegister">注册</div>
          <!-- 用户信息区 -->
          <div class="user-info" v-if="userInfo.user_name!=null">
            <div class="user-icon">
              <!-- 头像 -->
              <img :src="userIcon" class="icon">
              <!-- 头像下拉菜单 -->
              <div class="menu">
                <div class="menu-item" @click="dialogVisible=true">
                  <li class="el-icon-s-custom">&nbsp;&nbsp;修改头像</li>
                  <li class="el-icon-arrow-right"></li>
                </div>
                <div class="menu-item" @click="loginOut">
                  <li class="el-icon-error">&nbsp;&nbsp;退出登录</li>
                  <li class="el-icon-arrow-right"></li>
                </div>
              </div>
            </div>
            <div class='user-name'>欢迎你：{{ userInfo.user_name }}</div>
          </div>
          <!-- 退出登录按钮 -->
          <div class="loginout" v-if="userInfo.user_name!=null" @click="loginOut">退出登录</div>
          <!-- 后台管理按钮-->
          <!-- <div class="toManage" @click="toManage">后台管理</div> -->
        </div>
      </div>
    </header>

    <el-dialog
      title="修改用户头像"
      :visible.sync="dialogVisible"
      width="30%">
      <!-- 图片上传 -->
      <!-- :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" -->
      <el-upload
        class="avatar-uploader"
        action="none"
        :auto-upload='false'
        :show-file-list="false"
        :on-change="uploadImage">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserIcon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      search: '',
      query: '',
      // 弹出框显示状态
      dialogVisible: false,
      // 要保存的文件
      imgFile: null,
      // 图片上传后的名字
      imgName: ''
    }
  },
  computed: {
    tab () {
      return this.$route.name
    },
    userInfo () {
      return this.$store.state.user.userInfo || {}
    },
    userIcon () {
      return `http://cdn-blog-resource.huecmx.xyz/userIcon/${this.userInfo.user_icon}?imageView2/1/w/200/h/200/q/100` || ''
    },
    // 预览图片路径
    imageUrl () {
      if (this.imgName !== '') {
        return `http://cdn-blog-resource.huecmx.xyz/imageCache/${this.imgName}`
      }
      return ''
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
    // 退出登录
    loginOut () {
      this.$confirm('确定要退出登陆吗？').then(async () => {
        // 退出登陆
        const result = await this.$store.dispatch('userLogout', this.userInfo)
        if (result.code === 200) {
          this.$message.success('退出登陆成功!')
        } else {
          this.$message.error('退出登陆失败!')
        }
      }).catch(() => {

      })
    },
    // 修改用户头像
    async editUserIcon () {
      // 判断用户是否上传了图片
      if (this.imgName && this.imgFile) {
        // 用户已经上传了图片
        const formData = new FormData()
        formData.append('imgFile', this.imgFile.raw)
        formData.append('fileName', this.imgName)
        formData.append('user_id', this.$store.state.user.userInfo.user_id)
        const result = await this.$API.reqUploadImage(formData)
        if (result.code === 200) {
          this.imgName = result.data
          this.$message.success('头像修改成功')
          // 初始化
          this.imgName = ''
          this.imgFile = null
          // 重新获取用户数据
          await this.$store.dispatch('getUserInfo')
          // 关闭对话框
          this.dialogVisible = false
        } else {
          this.$message.error('头像修改失败')
        }
      }
    },
    // 上传图片
    async uploadImage (file) {
      if (this.beforeAvatarUpload(file.raw)) {
        // 文件校验通过
        // 记录用户上传的图片文件
        this.imgFile = file
        const formData = new FormData()
        formData.append('imgFile', file.raw)
        const result = await this.$API.reqUploadPreviewImage(formData)
        if (result.code === 200) {
          this.imgName = result.data
          this.$message.success('图片上传成功')
        } else {
          this.$message.error('图片上传失败')
        }
      }
    },
    // 上传成功时执行
    handleAvatarSuccess (res, file) {
      this.imageUrl = `http://cdn-blog-resource.huecmx.xyz/imageCache/${res.data}`
      this.$message({
        type: res.flag ? 'success' : 'error',
        message: res.message
      })
    },
    // 上传之前执行
    beforeAvatarUpload (file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGOrPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        return isJPGOrPNG && isLt2M
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return isJPGOrPNG && isLt2M
      }
      return isJPGOrPNG && isLt2M
    },
    // 跳转至登录界面
    toLogin () {
      this.$router.push('/login')
    },
    // 跳转至注册界面
    toRegister () {
      this.$router.push('/register')
    },
    // 跳转至后台管理
    toManage () {
      this.$router.push('/manage')
    },
    // 跳转至首页
    toHome () {
      this.$router.push('/main/home')
    },
    // 跳转至归档
    toArchive () {
      this.$router.push('/main/archive')
    },
    // 跳转至留言板
    toMessageBoard () {
      this.$router.push('/main/messageboard')
    }
  }
}
</script>
<style lang="less" scoped>
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

    .register {
      margin-left: 10px;
      width: 50px;
      text-align: center;
    }

    .register:hover{
      color:rgb(144, 147, 148);
      cursor: pointer;
      transition: all .5s;
    }

    .loginout {
      margin-left: 10px;
      width: 70px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      transition: all .5s;
    }

    .loginout:hover{
      color:white;
      filter: invert(100%);
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

    .user-info{
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;

      .user-icon{
        .icon{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .icon:hover + .menu{
          visibility: visible;
          opacity: 1;
          transition: all .5s;
        }

        .menu{
          position: absolute;
          visibility: hidden;
          opacity: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          transform: translate(-130px,-15px);
          width: 300px;
          min-height: 10px;
          padding: 20px 0px;
          border-radius: 10px;
          background-color: white;
          transition: all .5s;

          .menu-item{
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            width: calc(100% - 80px);
            height: 40px;
            padding: 0px 15px;
            border-radius: 10px;
            color: rgb(97,102,109);
            cursor: pointer;

            *{
              line-height: 40px;
            }
          }

          .menu-item:hover{
            background-color: rgb(227,229,231);
            transition: all .5s;
          }
        }

        .menu:hover{
          visibility: visible;
          opacity: 1;
          transition: all .5s;
        }

      }

      .user-name{
        line-height: 40px;
        margin-left: 10px;
      }

    }
  }
}

// 图片上传组件样式
.avatar-uploader{
  display: flex;
  justify-content: center;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
