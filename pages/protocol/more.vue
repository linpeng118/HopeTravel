<template>
  <div class="alone-wrap out-layer-con">
    <van-cell title="旅行合同" is-link to="contract" />
    <van-cell title="安全提示" is-link to="prompt" />
  </div>
</template>

<script>
  export default {
    name: 'more',
    head() {
      return {
        title: '旅行合同及安全提示'
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .alone-wrap{
    .van-cell:not(:last-child)::after{
      border-bottom-color: #D8D8D8;
      left: 0;
    }
  }
</style>
<style>
  .out-layer-con{
    position: relative;
    top: 88px;
    border-top: 2px solid #D8D8D8;
  }
</style>
