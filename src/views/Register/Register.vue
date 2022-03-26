<!-- 注册界面 -->
<template>
  <div class="register-nav">
    <div class="register-title">用户注册</div>
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="user-form">
      <el-form-item label="用户名" prop="user_name">
        <el-input type="text" v-model="userForm.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input type="password" v-model="userForm.rePassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register()">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    // 确认密码验证规则
    var validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userForm: {},
      rules: {
        user_name: {
          required: true, message: '请输入用户名', trigger: 'blur'
        },
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最小长度为6个字符', trigger: 'blur' }
        ],
        rePassword: {
          validator: validateRePassword, trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // 注册功能
    register () {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$API.reqRegister(this.userForm)
          if (result.code === 200) {
            // 注册成功
            this.$message.success(result.message)
            this.$router.push('/')
          } else {
            // 注册失败
            this.$message.error(result.message)
          }
        } else {
          this.$message.warning('请输入符合规定的用户名和密码')
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
.register-nav{
  width:  80vw;
  height: 60vh;
  position: relative;
  top:calc(50% - 30vh);
  left:calc(50% - 40vw);
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;

  .register-title{
    position: relative;
    transform:translateY(50%);
    font-size: 25px;
    font-weight: bold;
  }

  .user-form{
    width: 50%;
    position: relative;
    top:45%;
    left:50%;
    transform:translate(-50%,-50%);
  }

  /deep/.el-form-item__label:before{
    display: none;
  }
}
</style>
