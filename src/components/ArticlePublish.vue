<template>
  <div class="publish-container">
    <div class="category-container">
      <span>标题:</span>
      <el-input class="input-title" v-model="articleTitle" placeholder="请输入文章标题"/>

      <span>文章分类:</span>
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: '',
        editorValue: ''
      }
    },
    methods: {
      submit() {

      },
      save() {
        console.log(this.articleTitle)
      }
    },
    watch: {
      'articleTitle': {
        handler: function () {
          this.save();
        }
      }
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
