<template>
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
        <el-button size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="openDeleteDialog(scope.$index, scope.row)">删除</el-button>





        <el-dialog
          title="编辑"
          :visible.sync="dialogEditVisible"
          width="50%">

          <div class="el-dialog-div">

            //省略其他内容
          </div >

          <span slot="footer" class="dialog-footer">
              <el-button @click="closeEditDialog">取 消</el-button>
              <el-button type="primary" @click="closeEditDialog">确 定</el-button>
            </span>
        </el-dialog>

      </template>
    </el-table-column>

    <el-dialog
      title="提示"
      :visible.sync="dialogDeleteVisible"
      width="30%">
      <h3>这是一段信息</h3>

      <div class="el-dialog-div">

        //省略其他内容
      </div >

      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDeleteDialog">取 消</el-button>
              <el-button type="primary" @click="closeDeleteDialog">确 定</el-button>
            </span>
    </el-dialog>

    <el-table-column prop="name" label="文章标题" align="center"/>
  </el-table>


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
        }],

        dialogEditVisible: false,
        dialogDeleteVisible: false,

        articleDetail: {
          title: 'this is a title',
          content: 'fasdf sasgtgrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4'
        }
      }
    },
    methods: {
      submitEdit() {
        this.dialogEditVisible = false
      },

      openDeleteDialog(index, row) {
        this.dialogDeleteVisible = true;
      },

      closeDeleteDialog() {
        this.dialogDeleteVisible = false;
      },

      openEditDialog() {
        this.dialogEditVisible = true;
      },

      closeEditDialog() {
        this.dialogEditVisible = false;
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    text-align: center;
  }

  .el-dialog-div{
    height: 60vh;
    overflow: auto;
  }

</style>
