<template>
  <section class="square-wrap">
    <div class="square-item" v-for="(list,index) in lists" :key="index" @click="selectProductList(list)">
      <p>{{list.title}}</p>
      <p>{{list.total}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'square',
  props: {
    lists: {
      type: Array,
      default: null
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectProductList(list) {
      this.$emit('selectProductList', list.type)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .square-wrap{
    display: flex;
    display: -webkit-flex;
    flex-wrap:wrap;
    -webkit-flex-wrap:wrap;
    h2.title{
      padding:32px 0 24px;
      font-size: 28px;
      font-weight: 400;
      color: #BEBEBE;
    }
    .square-item{
      width:160px;
      height:106px;
      margin:0 16px 16px 0;
      padding:20px 0;
      background-color: #F1F1F1;
      border-radius:8px;
      font-size: 24px;
      text-align: center;
      line-height: 33px;
    }
  }
</style>
