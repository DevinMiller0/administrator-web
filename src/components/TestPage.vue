<template>
    <div class="editor-container">
      <mavon-editor
        :ishljs="true"
        :subfield="false"
        :scrollStyle="true"
        v-model="editorValue"
        class="editor"
        style="min-height: 600px; height: 100%"
      />
    </div>
</template>

<script>
    export default {
      data() {
          return {
            editorValue:'',
          }
      }
    }
</script>

<style scoped>

</style>

<style>

  .editor-container {
    height: 800px;
  }
</style>
