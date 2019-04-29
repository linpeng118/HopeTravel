<template>
  <div class="weituo out-layer-con">
    <div class="notice_txt">
      {{$t('html.contract')}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'contract',
  head() {
    return {
      title: this.$t('contractPage.travelContract')
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .out-layer-con{
    position: relative;
    border-top: 2px solid #D8D8D8;
  }
  .weituo{
    font-size: 28px;
    line-height: 34px;
    padding: 32px;
    h2.title{
      text-align: center;
      font-size: 34px;
      padding: 20px 0;
    }
    .p-left-20{
      padding-left: 60px;
    }
    p{
      margin: 10px 0;
      img{
        width: 100%;
      }
    }
    .txt-index{
      text-indent: 30px;
    }
  }
</style>
