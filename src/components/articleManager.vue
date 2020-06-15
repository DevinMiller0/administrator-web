<template>

  <div>

    <div id="category-container">
      <!--    <el-select v-model="value" placeholder="选择语言">-->
      <!--      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>-->
      <!--    </el-select>-->

      <el-form :inline="true" :model="categoryQuery" class="demo-form-inline">
        <el-form-item label="语言">
          <el-select v-model="categoryQuery.language" placeholder="请选择类型">
            <el-option v-for="item in languages" :label="item.label" :key="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="categoryQuery.region" placeholder="请选择类型">
            <el-option v-for="item in languages" :label="item.label" :key="item.value" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectArticle">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div id="content-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" align="center"/>

        <el-table-column prop="state" label="状态" width="150" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-text="已发布" active-value="1" inactive-value="0"/>
          </template>
        </el-table-column>

        <el-table-column prop="views" label="浏览量" width="80" align="center"/>

        <el-table-column prop="address" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="dialogEditVisible = true">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteArticle">删除</el-button>

          </template>

        </el-table-column>

        <el-dialog title="编辑" :append-to-body="true" :visible.sync="dialogEditVisible" width="57%" custom-class="edit-dialog">

          <div class="el-dialog-div">
            //省略其他内容
          </div>

          <span slot="footer" class="dialog-footer">
              <el-button @click="closeEditDialog">取 消</el-button>
              <el-button type="primary" @click="closeEditDialog">确 定</el-button>
          </span>
        </el-dialog>

        <el-table-column prop="name" label="文章标题" align="center"/>

      </el-table>
    </div>

    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     :page-size="10" layout="total, prev, pager, next, jumper" :total="60"/>
    </div>

  </div>


</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          state: '0',
          author: 'admin',
          views: '0',
          category: '',
          category2: '',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          state: '1',
          author: 'admin',
          views: '0'
        },
          {
            date: '2016-05-03',
            name: '王小虎',
            state: '1',
            author: 'admin',
            views: '0'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            state: '1',
            author: 'admin',
            views: '0'
          },
        ],

        dialogEditVisible: false,
        dialogDeleteVisible: false,

        articleDetail: {
          title: 'this is a title',
          content: 'fasdf sasgtgrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4'
        },

        categoryQuery: {
          language: '',
          type: '',
        },


        languages: [{
          value: '选项1',
          label: 'JAVA'
        }, {
          value: '选项2',
          label: 'Android'
        }, {
          value: '选项3',
          label: 'Flutter'
        }, {
          value: '选项4',
          label: 'Vue'
        }, {
          value: '选项5',
          label: 'Golang'
        }],
        value: '',
      }
    },

    methods: {
      openEditDialog() {
        this.dialogEditVisible = true;
      },

      //关闭edit
      closeEditDialog() {
        this.dialogEditVisible = false;
      },

      //删除
      deleteArticle() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //查询
      selectArticle() {
        console.log(this.categoryQuery.language + "  " + this.categoryQuery.type)
      },

      //分页页面发生变化
      handleSizeChange() {

      },

      handleCurrentChange() {

      },

      currentPage4() {

      }

    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    text-align: center;
  }

  .el-dialog-div {
    height: 100%;
    overflow: auto;
    border: 1px solid rgba(100, 182, 255, 0.53);
    border-radius: 3px;
  }

  .category-container {
    margin-bottom: 15px;
  }

  .page-container {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-pagination {
    background-color: #ffffff;
    border-radius: 3px;
  }

</style>

<style>
  .edit-dialog {
    display: flex;
    flex-flow: column;
    margin-top: 5vh !important;
    width: 58%;
    height: 89%;
  }

  .edit-dialog > div:nth-child(1) {
    padding: 15px 20px;
    flex: 0;
  }

  .edit-dialog > div:nth-child(2) {
    padding: 0 20px;
    flex: 100%;
  }

  .edit-dialog > div:nth-child(3) {
    padding: 15px 20px;
    flex: 0;
  }
</style>
