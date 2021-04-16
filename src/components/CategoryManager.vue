<template>
  <div>

    <div style="margin-bottom: 20px; padding:10px; background-color: #ffffff">
      <el-button size="mini" type="primary" @click="addCategory1Dialog = true">添加一级分类</el-button>
      <el-button size="mini" type="primary" @click="addCategory2Dialog = true">添加二级分类</el-button>
    </div>


    <el-dialog title="添加一级分类" :append-to-body="true" :visible.sync="addCategory1Dialog">
      <el-input v-model="beCategory1" placeholder="一级分类名" style="margin-bottom: 20px"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategory1Dialog = false">取 消</el-button>
        <el-button type="primary" @click="certainAddCategory1">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加二级分类" :append-to-body="true" :visible.sync="addCategory2Dialog">
      <el-input v-model="beCategory2" placeholder="二级分类名" style="margin-bottom: 20px"></el-input>

      <el-input type="textarea" :rows="2" placeholder="请输入描述内容" v-model="description">
      </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategory2Dialog = false">取 消</el-button>
        <el-button type="primary" @click="certainAddCategory2">确 定</el-button>
      </div>
    </el-dialog>


    <el-row :gutter="20" class="category-container-row">
      <el-col v-for="(item, index) in categoryTableData" :span="2" :key="index">
        <div class="grid-content bg-purple-dark" :class="{categoryBack:changeBackground===index}">
          <span style="margin-right: 15px" @click="categoryClick(index, item.cid)">{{item.categoryName}}</span>
          <span class="el-icon-delete" @click="delCategory(item.cid)"></span>
        </div>
      </el-col>
    </el-row>

    <el-table :data="category2TableData" stripe border style="width: 100%">
      <el-table-column label="ID" prop="c2id" width="80" align="center"></el-table-column>
      <el-table-column label="所属分类ID" prop="cid" width="150" align="center"></el-table-column>
      <el-table-column label="分类名称" prop="name" width="200" align="center"></el-table-column>
      <el-table-column label="操 作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="editCategory2(scope.row.c2id,scope.row.name, scope.row.description)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteCategory2(scope.row.c2id)">删除</el-button>
          <el-button size="mini" type="warning" @click="mangeDevide(scope.row.cid, scope.row.c2id)">划分</el-button>
        </template>
      </el-table-column>
      <el-table-column label="描 述" prop="description" align="center"></el-table-column>

      <el-dialog title="修改二级分类" :append-to-body="true" :visible.sync="editCategory2DialogVisiable">
        <el-input v-model="category2Name" placeholder="" style="margin-bottom: 20px"></el-input>
        <el-input type="textarea" v-model="category2Desc" placeholder="" style="margin-bottom: 20px"></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="editCategory2DialogVisiable = false">取 消</el-button>
          <el-button type="primary" @click="certainEditCategory2">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="文章划分" :append-to-body="true" :visible.sync="devideDialogVisible">
        <el-table :data="devideData" stripe border style="width: 100%">
          <el-table-column label="category3" prop="name" align="center"></el-table-column>
          <el-table-column label="操 作" width="230" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteCategory3(scope.row.cid3)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-input size="small" v-model="addCategory3" type="text" :rows="1" style="width: 30%"
                    placeholder="请输入划分名"></el-input>
          <el-button size="small" type="primary" @click="btnAddDevide">add</el-button>
        </div>

      </el-dialog>
    </el-table>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        categoryTableData: [],
        category2TableData: [],
        devideData: [],
        isBtnActive: false,
        addCategory1Dialog: false,
        addCategory2Dialog: false,
        editCategory2DialogVisiable: false,
        devideDialogVisible: false,
        changeBackground: '',
        beCategory1: '',
        beCategory2: '',
        cid: '',
        c2id: '',
        uploadCid1: '',
        uploadCid2: '',
        description: '',
        category2Name: '',
        category2Desc: '',
        addCategory3: '',

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
            console.log(self.categoryTableData)
          }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },

      categoryClick(index, cid) {
        this.changeBackground = index;
        this.cid = cid;
        this.loadCategory2()
      },

      loadCategory2() {
        let self = this;
        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: self.cid
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

      delCategory(cid) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          self.$axios({
            method: 'post',
            url: 'categoryManager/deleteCategory',
            data: {
              cid: cid
            },
            transformRequest: [function (data) {
              return self.$qs.stringify(data)
            }]
          }).then(function (response) {
            if (response.data.code === 200) {
              self.loadCategory();
            }
          })
        }).catch(function (error) {

        })
      },

      deleteCategory2(id) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$axios({
            method: 'post',
            url: 'categoryManager/deleteCategory2',
            data: {
              c2id: id
            },
            transformRequest: [function (data) {
              return self.$qs.stringify(data)
            }]
          }).then(function (response) {
            if (response.data.code === 200) {
              self.loadCategory2();
            }
          })
        }).catch(() => {
          console.log("取消")
        })
      },

      deleteCategory3(cid3) {
        let self = this;
        self.$axios({
          method: 'post',
          url: 'categoryManager/delCategory3',
          data: {
            cid3: cid3,
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }]
        }).then(function (response) {
          if (response.data.code === 200) {
            self.loadCategory3(self.uploadCid1, self.uploadCid2, self);
          }
        });
      },

      editCategory2(c2id, categoryName, description) {
        this.editCategory2DialogVisiable = true;
        this.category2Name = categoryName;
        this.category2Desc = description;
        this.c2id = c2id;
      },

      mangeDevide(cid1, cid2) {
        let self = this;
        self.devideDialogVisible = true;
        self.uploadCid1 = cid1;
        self.uploadCid2 = cid2;
        self.loadCategory3(cid1, cid2, self);
      },

      btnAddDevide() {
        let self = this;
        if (self.addCategory3 !== '') {
          self.$axios({
            method: 'post',
            url: 'categoryManager/addCategory3',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              cid1: self.uploadCid1,
              cid2: self.uploadCid2,
              name: self.addCategory3
            },
            transformRequest: [function (data) {
              return JSON.stringify(data)
            }]
          }).then(function (response) {
            if (response.data.code === 200) {
              self.addCategory3 = '';
              self.loadCategory3(self.uploadCid1, self.uploadCid2, self);
            }
          });
        }
      },

      certainEditCategory2() {
        let self = this;
        this.$axios({
          method: 'post',
          url: 'categoryManager/modifyCategory2Info',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            c2id: self.c2id,
            name: self.category2Name,
            description: self.category2Desc
          },
          transformRequest: [function (data) {
            return JSON.stringify(data)
          }]
        }).then(function (response) {
          if (response.data.code === 200) {
            self.editCategory2DialogVisiable = false;
            self.loadCategory2()
          }
        }).catch(function (error) {
          console.log(error)
        })
      },

      certainAddCategory1() {
        const self = this;
        this.$axios({
          method: 'post',
          url: 'categoryManager/addCategory1',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            categoryName: self.beCategory1
          },

          transformRequest: [function (data) {
            return JSON.stringify(data)
          }]
        }).then(function (response) {
          if (response.data.code === 200) {
            self.addCategory1Dialog = false;
            self.loadCategory();
          }
        }).catch(function (error) {

        })
      },

      certainAddCategory2() {
        const self = this;
        this.$axios({
          method: 'post',
          url: 'categoryManager/addCategory2',
          data: {
            cid: self.cid,
            description: self.description,
            name: self.beCategory2,
          },
          headers: {
            'Content-Type': 'application/json'
          },
          transformRequest: [function (data) {
            return JSON.stringify(data)
          }]
        }).then(function (response) {
          if (response.data.code === 200) {
            self.description = '';
            self.beCategory2 = '';
            self.addCategory2Dialog = false;
            self.loadCategory2();
          }
        }).catch(function (error) {

        })
      },

      loadCategory3(cid1, cid2, self) {
        self.$axios({
          method: 'post',
          url: 'categoryManager/getCategory3',
          data: {
            cid1: cid1,
            cid2: cid2
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data)
          }]
        }).then(function (response) {
          let d = response.data;
          if (d.code === 200) {
            self.devideData = d.data;
          }
          console.log("response：" + JSON.stringify(response.data))
        }).catch(function (error) {
          console.log("error：" + error)
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

  .el-dialog {
    width: 30%;
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
