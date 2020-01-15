<template>
  <div class="agreement-page">
    <div class="header"
      v-if="!isApp">
      <van-nav-bar class="bar-shadow"
        :title="$t('helpPage.userAgreement')"
        @click-left="onClickLeft"
        left-arrow
        v-if="!isApp">
      </van-nav-bar>
    </div>
    <div class="agreement out-layer-con"
      v-html="$t('helpPage.agreement')"></div>
  </div>

</template>

<script>
  export default {
    name: 'agreement',
    data() {
      return {
        isApp: this.$route.query.platform,
      }
    },
    head() {
      return {
        title: '用户协议'
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
  .agreement-page {
    .out-layer-con {
      position: relative;
      border-top: 2px solid #d8d8d8;
    }

    .agreement {
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
