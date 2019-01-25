<template>
  <div class="play-ways">
    <img :src="item.image" alt="">
    <div class="title">
      <span>{{item.subTitle}}</span>
      <span class="desc">{{item.content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'play_ways',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .play-ways{
    padding: 12px 0 20px 0;
    img {
      width:506px;
      height:120px;
      border-radius:8px;
    }
    .title{
      font-size:24px;
      color: #000;
      font-weight: 400;
      span.desc{
        font-size:22px;
        color: #BEBEBE;
      }
    }
  }
</style>
