<template>
  <div class="login-nav">
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="user-form">
      <el-form-item label="用户名" prop="user_name">
        <el-input type="text" v-model="userForm.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userForm: {},
      user: {},
      rules: {
        user_name: {
          required: true, message: '请输入用户名', trigger: 'blur'
        },
        password: {
          required: true, message: '请输入密码', trigger: 'blur'
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    // 登录
    login () {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$API.reqVerifyUser(this.userForm)
          if (result.code === 200) {
            this.user = result.data
            if (this.user) {
              // 登录成功
              this.$message.success('登录成功')
              // 保存用户token
              this.$store.commit('SETTOKEN', this.user.user_token)
              // 保存用户信息
              this.$store.dispatch('getUserInfo')
              // 跳转至首页
              this.$router.push('/')
            } else {
              // 登录失败
              this.$message.error('登录失败，请重新输入用户名或密码')
            }
          }
        } else {
          this.$message.warning('请输入正确的用户名或密码')
        }
      })
    },
    // 重置表单
    resetForm () {
      this.userForm = {}
    }
  }
}
</script>

<style lang='less' scoped>
.login-nav{
  width:  80vw;
  height: 60vh;
  position: relative;
  top:calc(50% - 30vh);
  left:calc(50% - 40vw);
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;

  .user-form{
    width: 50%;
    position: relative;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }

  /deep/.el-form-item__label:before{
    display: none;
  }
}

</style>
