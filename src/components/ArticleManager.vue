<template>

  <div>

    <div id="category-container">
      <el-form :inline="true" :model="categoryQuery" class="demo-form-inline">
        <el-form-item label="语言">
          <el-select v-model="categoryQuery.language" placeholder="请选择类型">
            <el-option v-for="item in languages" :label="item.categoryName" :key="item.cid" :value="item.value"/>
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
        <el-table-column prop="time" label="日期" width="180" align="center"/>

        <el-table-column prop="state" label="状态" width="150" align="center">
          <template slot-scope="scope">
            <el-switch @change="modifyState(scope.row.state, scope.row.id)" v-model="scope.row.state"
                       active-text="已发布" active-value="1" inactive-value="0"/>
          </template>
        </el-table-column>

        <el-table-column prop="views" label="浏览量" width="80" align="center"/>

        <el-table-column prop="address" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="dialogEditVisible = true">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteArticle">删除</el-button>
          </template>
        </el-table-column>

        <el-dialog title="编辑" :append-to-body="true" :visible.sync="dialogEditVisible" width="57%"
                   custom-class="edit-dialog">
          <div class="el-dialog-div">
            <mavon-editor :ishljs="true" v-highlight class="editor" v-model="editorValue"/>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="closeEditDialog">取 消</el-button>
              <el-button type="primary" @click="closeEditDialog">确 定</el-button>
          </span>
        </el-dialog>
        <el-table-column prop="title" label="文章标题" align="center"/>
      </el-table>
    </div>

    <div class="page-container">
      <el-pagination @current-change="handleCurrentChange" :page-size="pagination.pageSize" :total="pagination.total"
                     layout="total, prev, pager, next, jumper"/>
    </div>

  </div>


</template>

<script>
  export default {
    data() {
      return {
        tableData: [],

        textarea: '',
        editorValue: '',

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

        pagination: {
          total: 0,
          pageSize: 0,
          currentPage: 0,
        },

        languages: [],
        value: '',
      }
    },

    created() {
      this.loadTableData();
      this.loadCategory();
    },

    methods: {
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

      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.loadTableData();
      },

      loadTableData() {
        const self = this;
        if (self.pagination.currentPage === 0) {
          self.pagination.currentPage = 1;
        }

        this.$axios.post("getArticle", {
          pageNum: self.pagination.currentPage
        }).then(function (response) {
          let d = response.data.data;
          self.tableData = d.list;
          self.pagination.total = d.navigatePages;
          self.pagination.pageSize = d.size;
          console.log(self.tableData)
        }).catch(function (error) {
          console.log("failed: " + error)
        })
      },

      modifyState(state, id) {
        this.$axios.post("setState", {
          state: state,
          id: id
        }).then(function (response) {
          console.log(response.data)
        }).catch(function (error) {
          console.log('failed to modify')
        })
      },

      loadCategory() {
        const self = this;
        this.$axios.get("getCategory")
          .then(function (response) {
            console.log(response.data);
            self.languages = response.data.data;
          }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },
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

  .editor {
    height: 100%;
  }

  .edit-dialog > div:nth-child(3) {
    padding: 15px 20px;
    flex: 0;
  }
</style>
