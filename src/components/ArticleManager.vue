<template>

  <div>
    <div id="category-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="语言">
          <el-select @change="selectChange" v-model="c1" placeholder="请选择类型">
            <el-option v-for="item in category" :label="item.categoryName" :key="item.cid" :value="item.cid"/>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="c2" placeholder="请选择类型">
            <el-option v-for="item in category2" :label="item.name" :key="item.c2id" :value="item.c2id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectArticle">查询</el-button>
          <el-button type="primary" @click="selectAllArticle">all</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="content-container">
      <el-table stripe :data="tableData" border style="width: 100%">
        <el-table-column prop="time" label="日期" width="180" align="center"/>

        <el-table-column prop="state" label="状态" width="150" align="center">
          <template slot-scope="scope">
            <el-switch @change="modifyState(scope.row.state, scope.row.id)" v-model="scope.row.state"
                       active-text="已发布" active-value="1" inactive-value="0"/>
          </template>
        </el-table-column>

        <el-table-column prop="views" label="浏览量" width="80" align="center"/>

        <el-table-column label="分类" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.category +' / '+ scope.row.category2}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="modifyClick(
              scope.row.id,
              scope.row.cid,
              scope.row.category,
              scope.row.c2id,
              scope.row.category2,
              scope.row.title
              )">
              修改
            </el-button>

            <el-button size="mini" type="warning" @click="editClick(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column label="关键词&描述" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" round @click="keywords(scope.row)">查看</el-button>
          </template>
        </el-table-column>

        <el-dialog title="编辑" :append-to-body="true" :visible.sync="dialogEditVisible" width="85%" :close-on-click-modal="false"
                   custom-class="edit-dialog">
          <div class="el-dialog-div">
            <mavon-editor
              :ishljs="true"
              :codeStyle="codeStyle" class="editor" v-model="editorValue"/>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="closeEditDialog">取 消</el-button>
              <el-button type="primary" @click="certainEditDialog">确 定</el-button>
          </span>
        </el-dialog >

        <el-dialog title="修改" :append-to-body="true" :visible.sync="modifyDialogVisiable" :close-on-click-modal="false">
          <el-input v-model="dialogTitle" placeholder="文章标题" style="margin-bottom: 20px"></el-input>

          <el-select v-model="dialogOption1" @change="dialogChange1" filterable placeholder="一级分类">
            <el-option v-for="item in dialogOptions1"
                       :label="item.categoryName"
                       :key="item.cid"
                       :value="{value:item.cid,label:item.categoryName}"/>
          </el-select>

          <el-select v-model="dialogOption2" @change="dialogChange2" filterable placeholder="二级分类">
            <el-option v-for="item in dialogOptions2"
                       :label="item.name"
                       :key="item.c2id"
                       :value="{value:item.c2id,label:item.name}"/>
          </el-select>

          <div slot="footer" class="dialog-footer">
            <el-button @click="modifyDialogVisiable = false">取 消</el-button>
            <el-button type="primary" @click="certainModifyDialog">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="关键词&描述" :append-to-body="true" :visible.sync="dialogKeywordsVisiable" :close-on-click-modal="false">

          <div class="keywords-content" >
            <el-tag
              :key="tag"
              v-for="tag in keywordsArr"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

            <el-input
              style="margin-top: 12px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入描述内容"
              v-model="description">
            </el-input>

          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogKeywordsVisiable = false">取 消</el-button>
            <el-button type="primary" @click="submitKeywords">确 定</el-button>
          </div>
        </el-dialog>

        <el-table-column prop="title" label="文章标题" align="center"/>
      </el-table>
    </div>

    <div class="page-container">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="pagination.pageSize"
                     :total="pagination.total"
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
        description: '',


        dialogTitle: '',
        dialogArticleId: '',
        dialogCid: '',
        dialogC2id: '',
        dialogOption1: '',
        dialogOption2: '',
        dialogOptions1: [],
        dialogOptions2: [],


        dialogEditVisible: false,
        dialogDeleteVisible: false,
        modifyDialogVisiable: false,
        dialogKeywordsVisiable: false,
        inputVisible: false,
        inputValue: '',
        keywordsArr: [],

        pagination: {
          total: 0,
          pageSize: 0,
          currentPage: 0,
        },

        category: [],
        category2: [],
        c1: '',
        c2: '',

        editArticleId: '',
        //atelier-seaside-light
        codeStyle: 'tomorrow-night-eighties',
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

      //编辑后确认提交
      certainEditDialog() {
        let self = this;
        this.$axios({
          method: 'post',
          url: 'updateArticle',
          data: {
            id: self.editArticleId,
            article: self.editorValue,
          },
        }).then(function (response) {
          console.log(response.data);
          self.dialogEditVisible = false;
        }).catch(function (error) {
          console.log(error);
        })
      },

      certainModifyDialog() {
        console.log(this.dialogOption1);
        console.log(this.dialogOption2);
        console.log(this.dialogTitle);
        console.log(this.dialogCid);
        console.log(this.dialogC2id);
        let self = this;
        this.$axios({
          method: 'post',
          url: 'modifyArticleInfo',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            id: self.dialogArticleId,
            category: self.dialogOption1,
            category2: self.dialogOption2,
            cid: self.dialogCid,
            c2id: self.dialogC2id,
            title: self.dialogTitle,
          },
          transformRequest: [function (data) {
            return JSON.stringify(data);
          }]
        }).then(function (response) {
          console.log(response.data);
          if (response.data.code === 200) {
            self.modifyDialogVisiable = false;
            self.loadTableData()
          }
        })
      },

      //删除
      deleteArticle(id) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: 'deleteArticle',
            data: {
              articleId: id
            },
            transformRequest: [function (data) {
              return self.$qs.stringify(data)
            }]
          }).then(function (response) {
            if (response.data.code === 200) {
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              self.loadTableData();
            }
          }).catch(function (error) {
            console.log('删除失败：' + error)
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //查询分类的文章列表
      selectArticle() {
        this.loadTableData();
      },

      //修改文章标题或分类
      modifyClick(id, cid, category, c2id, category2, title) {
        const self = this;
        this.dialogCid = cid;
        this.dialogC2id = c2id;
        this.dialogOption1 = category;
        this.dialogOption2 = category2;
        this.dialogTitle = title;
        this.dialogArticleId = id;

        this.$axios({
          type: 'get',
          url: 'getCategory',
        }).then(function (response) {
          self.dialogOptions1 = response.data.data;
          console.log("一级分类：" + self.dialogCategory1);
          self.modifyDialogVisiable = true;
        }).catch(function (error) {
          console.log('failed to getCategory ' + error)
        });


        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: this.dialogCid
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }],
        }).then(function (response) {
          self.dialogOptions2 = response.data.data;
          console.log('二级分类：' + response.data.data);
        }).catch(function (error) {
          console.log('failed to getCategory ' + error);
        })
      },

      selectAllArticle() {
        this.c2 = '';
        this.c1 = '';
        this.loadTableData();
      },

      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.loadTableData();
      },

      /**
       * loading data table
       */
      loadTableData() {
        const self = this;
        if (self.pagination.currentPage === 0) {
          self.pagination.currentPage = 1;
        }

        this.$axios({
          method: 'post',
          url: 'getArticle',
          data: {
            pageNum: self.pagination.currentPage,
            cid: self.c1,
            c2id: self.c2
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }]
        }).then(function (response) {
          let d = response.data.data;
          self.tableData = d.list;
          self.pagination.total = d.total;
          self.pagination.pageSize = d.pageSize;
          console.log(self.tableData)
        }).catch(function (error) {
          console.log("failed: " + error)
        });
      },

      /**
       * modify state of data
       * @param state specific the state
       * @param id data for state
       */
      modifyState(state, id) {
        let self = this;
        this.$axios({
          method: 'post',
          url: 'setState',
          data: {
            state: state,
            id: id
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }]
        }).then(function (response) {
          console.log(response.data)
        }).catch(function (error) {
          console.log('failed to modify')
        })
      },

      /**
       * loading category
       */
      loadCategory() {
        const self = this;
        this.$axios({
          type: 'get',
          url: 'getCategory',
        }).then(function (response) {
          self.category = response.data.data;
          console.log('loadCategory：' + self.category.toString());
        }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },

      /**
       * category change
       */
      selectChange(value) {
        console.log(value);
        const self = this;
        self.c2 = '';

        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: value
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }],
        }).then(function (response) {
          console.log(response.data);
          self.category2 = response.data.data;
        }).catch(function (error) {
          console.log('failed to getCategory ' + error);
        })
      },

      dialogChange1(params) {
        let {value, label} = params;
        this.dialogCid = value;
        this.dialogOption1 = label;
        this.dialogOption2 = '';
        let self = this;

        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: value
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data);
          }],
        }).then(function (response) {
          self.dialogOptions2 = response.data.data;
          console.log('二级分类：' + response.data.data);
        }).catch(function (error) {
          console.log('failed to getCategory ' + error);
        })
      },

      dialogChange2(params) {
        let {value, label} = params;
        this.dialogC2id = value;
        this.dialogOption2 = label;
      },

      //点击编辑按钮
      editClick(id) {
        console.log('文章id：' + id);
        this.editArticleId = id;

        let self = this;
        this.$axios({
          method: 'post',
          url: 'getArticleById',
          data: {
            articleId: id
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data)
          }]
        }).then(function (response) {

          let data = response.data;

          console.log(data);
          console.log('article: ' + data.data.article);

          self.editorValue = data.data.article;
          self.dialogEditVisible = true;

        }).catch(function (error) {
          console.log('请求失败：' + error)
        });
      },

      // 关键词与描述
      keywords(obj) {
        this.dialogKeywordsVisiable = true;
        if (obj.keywords === null) {
          this.keywordsArr = [];
        } else {
          this.keywordsArr = obj.keywords.split(",");
        }

        this.description = obj.description;

      },

      handleClose(tag) {
        this.keywordsArr.splice(this.keywordsArr.indexOf(tag), 1);
        console.log(this.keywordsArr)
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.keywordsArr.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      submitKeywords() {
        let keywords = this.keywordsArr.toString();
        let description = this.description;
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th {
    text-align: center;
  }

  .el-dialog-div {
    /*height: 100%;*/
    height: 740px;
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
    min-height: 600px;
    height: 100%;
  }

  .edit-dialog > div:nth-child(3) {
    padding: 15px 20px;
    flex: 0;
  }


  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
