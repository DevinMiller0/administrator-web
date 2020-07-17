<template>
  <div>

    <div style="margin-bottom: 20px; padding:10px; background-color: #ffffff">
      <el-button size="mini" type="primary" @click="deleteCategory2(scope.row.id)">添加一级分类</el-button>
      <el-button size="mini" type="primary" @click="deleteCategory2(scope.row.id)">添加二级分类</el-button>
    </div>

    <el-row :gutter="20" class="category-container-row">
      <el-col v-for="(item, index) in categoryTableData" :span="2" :key="index">
        <div class="grid-content bg-purple-dark" :class="{categoryBack:changeBackground===index}">

          <span style="margin-right: 15px" @click="categoryClick(index, item.cid)">{{item.categoryName}}</span>
          <span class="el-icon-delete" @click="delCategory"></span>

        </div>
      </el-col>
    </el-row>

    <el-table :data="category2TableData" stripe border style="width: 100%">
      <el-table-column label="ID" prop="cid" width="80" align="center"></el-table-column>
      <el-table-column label="所属分类ID" prop="cid" width="150" align="center"></el-table-column>
      <el-table-column label="分类名称" prop="name" width="200" align="center"></el-table-column>
      <el-table-column label="操 作" prop="categoryName" width="100" align="center">
        <template>
          <el-button size="mini" type="danger" @click="deleteCategory2(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="描 述" prop="description" align="center"></el-table-column>
    </el-table>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        categoryTableData: [],
        category2TableData: [],
        isBtnActive: false,
        changeBackground: '',
      }
    },
    created() {
      this.loadCategory();
    },
    methods: {
      loadCategory() {
        const self = this;
        this.$axios.get("getCategory")
          .then(function (response) {
            console.log(response.data);
            self.categoryTableData = response.data.data;
          }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },

      categoryClick(index, cid) {
        this.changeBackground = index;

        let self = this;

        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: cid
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }],
        }).then(function (response) {
          self.category2TableData = response.data.data;
          console.log('二级分类：' + JSON.stringify(response.data.data));
        }).catch(function (error) {
          console.log('failed to getCategory ' + error);
        })
      },

      delCategory() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        })
      }
    }
  }
</script>

<style scoped>
  .categoryBack {
    background: #6681FA;
    color: #ffffff;
  }
</style>

<style>

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: rgb(255, 255, 255);
    border: 1px solid #6681FA;
    color: #6681FA;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .category-container-row {
    margin-bottom: 30px;
  }
</style>
