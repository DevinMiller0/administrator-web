<template>
  <div class="login-container">
    <el-card class="box-card">
      <h2 class="text-login">LOGIN</h2>

      <el-form ref="form" label-width="80px" class="loginForm">

        <el-form-item prop="name">
          <el-input type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="homeBut" type="primary">登录</el-button>
        </el-form-item>
      </el-form>

    </el-card>

  </div>

</template>

<script>
  export default {
    name: "login"
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
    height: 400px;
    text-align: center;
  }

  .text-login {
    line-height: 60px;
  }

  .el-form-item {
    margin-left: 0;
  }

</style>
