<template>
  <div class="publish-container">
    <div class="category-container">
      <span>标题:</span>
      <el-input class="input-title" v-model="articleTitle" placeholder="请输入文章标题"/>

      <span>文章分类:</span>
      <el-select @change="selectChange" v-model="category" filterable placeholder="请选择">
        <el-option v-for="item in options1" :label="item.categoryName" :key="item.cid" :value="item.cid"/>
      </el-select>

      <el-select @change="selectCategory2Change" v-model="category2" filterable placeholder="请选择">
        <el-option v-for="item in options2" :label="item.name" :key="item.c2id" :value="item.c2id"/>
      </el-select>

      <el-button type="primary" @click="savePublish(1)" size="medium">保存并发布</el-button>
      <el-button type="success" @click="savePublish(0)" size="medium">保存为草稿</el-button>
    </div>

    <div class="editor-container">
      <mavon-editor :ishljs="true" v-highlight class="editor" v-model="editorValue"/>
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
        value: '',
        editorValue: '',
        cid: '',
        c2id: ''
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
      selectChange(value) {
        console.log(value);
        this.cid = value;
        const self = this;
        self.option2 = '';
        // this.$axios.post("getCategory2", {
        //   cid: value
        // }).then(function (response) {
        //   console.log(response.data);
        //   self.options2 = response.data.data;
        // }).catch(function (error) {
        //   console.log('failed to getCategory')
        // });

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
       * @param value
       */
      selectCategory2Change(value) {
        this.c2id = value;
      },

      savePublish(v) {
        let self = this;

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
          satate: v,
        };

        this.$axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: 'publish/saveArticle',
          data: data,
          transformRequest: [function (data) {
            // return self.$qs.stringify(data);
            return JSON.stringify(data);
          }]
        }).then(function (response) {
          console.log(error);
          self.$message({
            type: 'success',
            message: '保存成功'
          });
          console.log(response.data)
        }).catch(function (error) {
          console.log('failed to save article ' + error)
        })

        // this.$axios.post("publish/saveArticle", {
        //   title: this.articleTitle,
        //   article: this.editorValue,
        //   author: window.localStorage.getItem("username"),
        //   author_id: window.localStorage.getItem("aid"),
        //   views: 1,
        //   category: this.category,
        //   category2: this.category2,
        //   cid: this.cid,
        //   c2id: this.c2id,
        //   time: this.getCurTime(),
        //   description: '',
        //   satate: v,
        // }).then(function (response) {
        //   console.log(response)
        // }).catch(function (error) {
        //   console.log(error);
        //   self.$message({
        //     type: 'success',
        //     message: '保存成功'
        //   });
        // });
      },

      getCurTime: function () {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let second = new Date().getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
      }
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
    height: 100%;
    margin-top: 10px;
  }

  .editor {
    height: 100%;
  }

  .publish-container {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>
