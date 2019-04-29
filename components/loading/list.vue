<template>
  <div class="empty-data">
    <van-loading />
    <div>{{loading}}</div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    loading: {
      type: String,
      default: this.$t('dataLoading')
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .empty-data{
    position: absolute;
    padding-top: 120px;
    top: 90px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    font-size: 24px;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    flex-direction: column;
    -webkit-flex-direction: column;
  }
</style>
