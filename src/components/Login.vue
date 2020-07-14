<template>
  <div class="login-container">
    <el-card class="box-card">
      <h2 class="text-login">LOGIN</h2>
      <el-form ref="form" class="login-form">
        <el-form-item>
          <el-input v-model="username" type="text" name="username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" @click="login" name="password" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        username: 'admin',
        password: '111',
      };
    },
    methods: {
      login() {
        let self = this;
        if (this.username === '' || this.password === '') {
          this.$message.error('账号或密码不能为空');
          return;
        }

        this.$axios({
          method: 'post',
          url: 'login',
          data: {
            username: this.username,
            password: this.password,
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }],
        }).then(function (response) {
          let resp = response.data;
          console.log(resp);
          if (resp.code === 200) {
            let token = resp.data.token;
            let username = resp.data.username;
            let aid = resp.data.aid;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("aid", aid);
            self.$router.push('/')
          } else {
            self.$message({
              type: 'warning',
              message: '登录失败!'
            });
          }
        }).catch(function () {
          self.$message({
            type: 'warning',
            message: '登录失败!'
          });
        });
      }
    },
    created() {
      let token = window.localStorage.getItem("token");
      let username = window.localStorage.getItem("username");
      if (token !== '' || username !== '') {
        this.$router.push("/ArticleManager")
      }
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
    background-color: #ffffff;
  }

  .box-card {
    width: 480px;
    height: 360px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.31);
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
