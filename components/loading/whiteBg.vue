<template>
  <div class="white-bg">
    <van-loading color="white" />
    <div class="text">{{loading}}</div>
  </div>
</template>

<script>
export default {
  name: 'whiteBg',
  props: {
    loading: {
      type: String,
      default: this.$t('dataLoading')
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .white-bg{
    position: fixed;
    top: 88px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    .text{
      text-align: center;
      padding-top: 100px;
      font-size: 28px;
    }
  }
</style>
