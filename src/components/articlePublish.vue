<template>
  <el-row class="article-pub-container">
    <el-col :span="16">
      <div class="grid-content bg-purple">
        <el-input class="editor" type="textarea" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>
    </el-col>

    <el-col :span="8">
      <div class="grid-content bg-purple-light info">
        <div class="category-container">
          <span>文章分类</span>
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>

        <div class="input-title">
          <el-input v-model="articleTitle" placeholder="请输入文章标题"/>
        </div>

        <div class="article-btn">
          <el-button type="primary" size="medium">保存并发布</el-button>
          <el-button type="success" size="medium">保存为草稿</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
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
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      submit() {

      },
      save() {
        console.log(this.articleTitle)
      }
    },
    watch:{
      'articleTitle': {
        handler:function () {
          this.save();
        }
      }
    }
  }

</script>

<style scoped>
  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 2px;
    height: 100%;
  }

  .article-pub-container {
    display: flex;
    height: 100%;
  }

  .editor {
    height: 500px;
  }

  .el-select {
    width: 215px;
  }

  .article-btn {
    padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .category-container {
    padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .input-title {
    padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
  }

</style>
