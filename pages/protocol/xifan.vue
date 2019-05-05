<template>
  <div class="privacy-page">
    <van-nav-bar class="bar-shadow"
      :title="$t('personalPage.privacyPoli')"
      @click-left="onClickLeft"
      left-arrow
      v-if="!isApp">
    </van-nav-bar>
    <div class="weituo out-layer-con"
      v-html="$t('html.privacy')"></div>
  </div>

</template>

<script>
  export default {
    name: 'weituo',
    data() {
      return {
        isApp: this.$route.query.platform,
      }
    },
    head() {
      return {
        title: '隐私政策'
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .privacy-page {
    .out-layer-con {
      position: relative;
      border-top: 2px solid #d8d8d8;
    }
    .weituo {
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
