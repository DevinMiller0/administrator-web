<template>
  <div class="publish-container">
    <div class="category-container">
      <span>标题:</span>
      <el-input class="input-title" v-model="articleTitle" placeholder="请输入文章标题"/>

      <span>文章分类:</span>
      <el-select v-model="c1" @change="selectChange" filterable placeholder="请选择">
        <el-option v-for="item in options1"
                   :label="item.categoryName"
                   :key="item.cid"
                   :value="{value:item.cid,label:item.categoryName}"/>
      </el-select>

      <el-select v-model="c2" @change="selectCategory2Change" filterable placeholder="请选择">
        <el-option v-for="item in options2"
                   :label="item.name"
                   :key="item.c2id"
                   :value="{value:item.c2id,label:item.name}"/>
      </el-select>

      <el-button type="primary" @click="savePublish(1)" size="medium">保存并发布</el-button>
      <el-button type="success" @click="savePublish(0)" size="medium">保存为草稿</el-button>
    </div>

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
      <el-button class="button-new-tag" size="small" @click="showInput">+ 添加关键词</el-button>

      <el-input
        style="margin-top: 12px"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入描述内容"
        v-model="description">
      </el-input>

    </div>

    <div class="editor-container">
      <mavon-editor
        :ishljs="false"
        v-model="editorValue"
        class="editor"
        :scrollStyle="true"/>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleTitle: '',
        options1: [],
        options2: [],
        category: '',
        category2: '',
        editorValue: '',
        cid: '',
        c2id: '',

        inputVisible: false,
        inputValue: '',
        keywordsArr: [],

        //no use
        c1: '',
        c2: ''
      }
    },

    methods: {
      save() {
        console.log(this.articleTitle)
      },

      /**
       * loading category
       */
      loadCategory() {
        const self = this;
        this.$axios.get("getCategory")
          .then(function (response) {
            console.log(response.data);
            self.options1 = response.data.data;
          }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },

      /**
       * category change
       */
      selectChange(params) {
        const {value, label} = params;
        this.cid = value;
        this.category = label;
        console.log(this.cid + '  ' + this.category);

        const self = this;
        self.option2 = '';
        this.$axios({
          method: 'post',
          url: 'getCategory2',
          data: {
            cid: value
          },
          transformRequest: [function (data) {
            return self.$qs.stringify(data)
          }]
        }).then(function (response) {
          console.log(response.data);
          self.options2 = response.data.data;
        }).catch(function (error) {
          console.log('failed to getCategory')
        });
      },

      /**
       * category2 change
       * @param params
       */
      selectCategory2Change(params) {
        const {value, label} = params;
        this.c2id = value;
        this.category2 = label;
      },

      savePublish(v) {
        let self = this;
        let keywords = this.keywordsArr.toString();
        let description = this.description;
        if (this.articleTitle === '') {
          this.$message({
            type: 'warning',
            message: '请输入文章标题!'
          });
          return;
        }
        if (this.category === '' || this.category2 === '') {
          this.$message({
            type: 'warning',
            message: '请选择分类!'
          });
          return;
        }
        if (this.editorValue === '') {
          this.$message({
            type: 'warning',
            message: '请输入文章内容!'
          });
          return;
        }

        let data = {
          title: this.articleTitle,
          article: this.editorValue,
          author: window.localStorage.getItem("username"),
          author_id: window.localStorage.getItem("aid"),
          views: 0,
          category: this.category,
          category2: this.category2,
          cid: this.cid,
          c2id: this.c2id,
          time: this.getCurTime(),
          description: '',
          state: v,
        };

        this.$axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: 'publish/saveArticle',
          data: data,
          transformRequest: [function (data) {
            return JSON.stringify(data);
          }]
        }).then(function (response) {
          console.log(response.data);
          self.articleTitle = '';
          self.c1 = '';
          self.c2 = '';
          self.editorValue = '';
          self.$message({
            type: 'success',
            message: '保存成功'
          });
        }).catch(function (error) {
          console.log('failed to save article ' + error)
        })
      },

      getCurTime: function () {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let second = new Date().getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
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
    },

    watch: {
      'articleTitle': {
        handler: function () {
          this.save();
        }
      }
    },

    created() {
      this.loadCategory();
    },
  }

</script>

<style scoped>
  .input-title {
    width: 500px;
  }

  .editor-container {
    border: 1px solid #ffffff;
    /*height: 100%;*/
    height: 800px;
    margin-top: 10px;
  }

  .editor {
    min-height: 800px;
    height: 100%;
  }

  .publish-container {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>

<style>
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

  .keywords-content{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
