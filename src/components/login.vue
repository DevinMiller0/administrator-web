<template>
  <div class="login-container">
    <el-card class="box-card">
      <h2 class="text-login">LOGIN</h2>

      <el-form ref="form" class="login-form">
        <el-form-item>
          <el-input v-model="username" type="text" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>

</template>

<script>
  export default {
    data: {
      username: '',
      password: '',
    }
  }
</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .box-card {
    width: 480px;
    height: 360px;
    text-align: center;
  }

  .text-login {
    line-height: 60px;
  }

  .login-form {
    margin-left: 50px;
    margin-right: 50px;
  }

  .btn-login {
    width: 120px;
  }
</style>
