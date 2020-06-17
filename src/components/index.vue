<template>
  <el-container class="home-container">
    <el-header>
      <span>Gleaners后台管理</span>
      <div>
        <span>Admin</span>
        <el-button @click="open" type="danger" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu
          :default-active="$route.name"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-menu-item index="home" @click="switchMenu(0)">
            <i class="el-icon-s-home"/>
            <span slot="title">HOME</span>
          </el-menu-item>

          <el-menu-item index="articleManager" @click="switchMenu(1)">
            <i class="el-icon-menu"/>
            <span slot="title">文章管理</span>
          </el-menu-item>

          <el-menu-item index="articlePublish" @click="switchMenu(2)">
            <i class="el-icon-edit-outline"/>
            <span slot="title">文章发布</span>
          </el-menu-item>

          <el-menu-item index="dataStatistic" @click="switchMenu(3)">
            <i class="el-icon-data-analysis"/>
            <span slot="title">数据统计</span>
          </el-menu-item>

          <el-menu-item index="categoryManager" @click="switchMenu(4)">
            <i class="el-icon-files"/>
            <span slot="title">分类管理</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>

    </el-container>

  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        dialogEditVisible: false,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      switchMenu(index) {
        switch (index) {
          case 0: {
            console.log('home');
            this.$router.push({
              path: '/home'
            });
            break
          }
          case 1: {
            console.log('文章管理');
            this.$router.push({
              path: '/articleManager'
            });
            break
          }
          case 2: {
            console.log('文章发布');
            this.$router.push({
              path: '/articlePublish'
            });
            break
          }
          case 3: {
            console.log('数据统计');
            this.$router.push({
              path: '/dataStatistic'
            });
            break
          }

          case 4: {
            console.log('数据统计');
            this.$router.push({
              path: '/categoryManager'
            });
            break
          }
        }
      },


      open() {
        this.$confirm('确认退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已退出！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消！'
          });
        });
      }
    }
  }
</script>

<style scoped>

  .el-header {
    background-color: #333;
    color: #6b6b6b;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #333333;
  }

  .el-main {
    background-color: #E9EEF3;
  }

  .home-container {
    height: 100%;
  }



</style>

<style>
  .el-menu-item.is-active {
    color: #6681FA;
    background-color: #6e7278 !important;
  }
</style>
