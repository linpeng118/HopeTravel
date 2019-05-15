<template>
  <div class="alone-wrap out-layer-con">
    <van-cell :title="$t('alonePage.agreement')" is-link to="weituo" />
    <van-cell :title="$t('alonePage.selfActive')" is-link to="security" />
  </div>
</template>

<script>
export default {
  name: 'more',
  head() {
    return {
      title: '预定协议'
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
    border-top: 2px solid #D8D8D8;
  }
</style>
