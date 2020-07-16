<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="item in categoryTableData" class="infinite-list-item">{{ item.categoryName }}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        categoryTableData: []
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
          }).catch(function (error) {
          console.log('failed to getCategory')
        })
      },
      clickCategory(cid) {
        console.log(cid)
      }
    }
  }
</script>

<style scoped>
.infinite-list-item{
  height: 50px;
  background-color: antiquewhite;
  margin-bottom: 1px;
}

</style>
