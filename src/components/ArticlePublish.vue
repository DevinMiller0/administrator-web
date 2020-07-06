<template>
  <div class="publish-container">
    <div class="category-container">
      <span>标题:</span>
      <el-input class="input-title" v-model="articleTitle" placeholder="请输入文章标题"/>

      <span>文章分类:</span>
      <el-select @change="selectChange" v-model="option1" filterable placeholder="请选择">
        <el-option v-for="item in options1" :label="item.categoryName" :key="item.cid" :value="item.cid"/>
      </el-select>

      <el-select v-model="option2" filterable placeholder="请选择">
        <el-option v-for="item in options2" :label="item.name" :key="item.c2id" :value="item.c2id"/>
      </el-select>

      <el-button type="primary" size="medium">保存并发布</el-button>
      <el-button type="success" size="medium">保存为草稿</el-button>
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
        textarea: '',
        articleTitle: '',
        options1: [],
        options2: [],
        option1: '',
        option2: '',
        value: '',
        editorValue: ''
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
        const self = this;
        self.option2 = '';
        this.$axios.post("getCategory2", {
          cid: value
        })
          .then(function (response) {
            console.log(response.data);
            self.options2 = response.data.data;
          })
          .catch(function (error) {
            console.log('failed to getCategory')
          })
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
