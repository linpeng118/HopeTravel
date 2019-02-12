<template>
  <div class="hot-place">
    <div class="hot-item" v-for="(list, index) in lists" :key="index" @click="selectDetail(list)">
      <img :src="list.image || list.image_url" alt="">
      <div class="title">{{list.content || list.name || list.title}}</div>
      <div class="desc" v-if="isDesc">{{list.subTitle}}</div>
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
    },
    isDesc: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectDetail(detail){
      let {content} = detail
      this.$emit('selectDetail', content)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .hot-place{
    display: flex;
    text-align: center;
    flex-wrap:wrap;
    .hot-item{
      margin-bottom: 20px;
      margin-right: 12px;
      width:160px;
    }
    .title{
      font-size: 22px;
      color: #000000;
    }
    .desc{
      font-size: 22px;
      color: #BEBEBE;
    }
    img{
      width:160px;
      height:120px;
      border-radius:6px;
    }
  }
</style>
