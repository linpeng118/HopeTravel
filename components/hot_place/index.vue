<template>
  <div class="hot-place">
    <div class="hot-item" v-for="list in lists" :key="list.id">
      <img :src="list.image" alt="">
      <div class="title">{{list.title}}</div>
      <div class="desc">{{list.desc}}</div>
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
    justify-content: space-around;
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
