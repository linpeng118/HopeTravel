<template>
  <div class="union-page">
    <van-nav-bar class="bar-shadow"
      :title="$t('helpPage.unionAgreement')"
      @click-left="onClickLeft"
      left-arrow
      fixed></van-nav-bar>
    <div class="union out-layer-con"
      v-html="$t('html.union')"></div>
  </div>
</template>

<script>
  export default {
    name: 'union',
    head() {
      return {
        title: '稀饭旅行线上分销协议'
      }
    },
    methods: {
      onClickLeft() {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .union-page {
    .out-layer-con {
      position: relative;
      top: 88px;
      border-top: 2px solid #d8d8d8;
    }
    .union {
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
  }
</style>
