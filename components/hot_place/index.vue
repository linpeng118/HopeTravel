<template>
  <div class="hot-place">
    <div class="hot-item" v-for="list in lists" :key="list.category">
      <img :src="list.image" alt="">
      <div class="title">{{list.subTitle}}</div>
      <div class="desc">{{list.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hot_place',
  props: {
    lists: {
      type: Array,
      default: null
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .hot-place{
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-wrap:wrap;
    .hot-item{
      margin-bottom: 20px;
    }
    .title{
      font-size: 24px;
      color: #000000;
    }
    .desc{
      font-size: 22px;
      color: #BEBEBE;
    }
    img{
      width:160px;
      height:120px;
      border-radius:8px;
    }
  }
</style>
