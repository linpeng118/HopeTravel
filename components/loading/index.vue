<template>
  <div class="loading">
    <div class="center-position">
      <van-loading color="white" />
      <div>{{loading}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loading: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "@/assets/style/mixin/index.scss";
  .loading{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 10000;
    .center-position{
      @include center;
      font-size:24px;
      color:#fff;
    }
  }
</style>
