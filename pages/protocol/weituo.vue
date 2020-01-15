<template>
  <div class="entrust-page out-layer-con" v-html="$t('html.entrust')"></div>
</template>

<script>
  export default {
    name: 'entrust',
    head() {
      return {
        title: '委托协议样本'
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .out-layer-con {
    position: relative;
    top: 88px;
    border-top: 2px solid #d8d8d8;
  }
  .entrust-page {
    font-size: 28px;
    line-height: 34px;
    padding: 32px;
    h2.title {
      text-align: center;
      font-size: 34px;
      padding: 20px 0;
    }
    .p-left-20 {
      padding-left: 60px;
    }
    p {
      margin: 10px 0;
      img {
        width: 100%;
      }
    }
    .txt-index {
      text-indent: 30px;
    }
  }
</style>
