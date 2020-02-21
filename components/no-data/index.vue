<template>
  <div class="no-data-box">
    <img src="../../assets/imgs/no-data-bg.png" alt="">
    <div class="text" v-html="msg"></div>
  </div>
</template>
<script>
export default {
  props:{
    msg: {
      type: String,
      default: '哎呀，没有你想找的结果'
    }
  }
}
</script>
<style lang="scss" scoped>
.no-data-box{
  text-align: center;
  margin-top: 160px;
  color: #93D3FA;
  font-size: 24px;
  img{
    width: 374px;
    height: 280px;
  }
  .text{
    margin-top: 20px;
    line-height: 40px;
  }
}
</style>