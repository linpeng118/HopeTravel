<template>
  <div class="about-us-page">
    <div class="header"
         v-if="!isApp">
      <van-nav-bar class="bar-shadow"
                   :title="$t('personalPage.aboutUs')"
                   @click-left="onClickLeft"
                   left-arrow>
      </van-nav-bar>
    </div>
    <div class="weituo out-layer-con" v-html="$t('html.aboutUs')">
    </div>
  </div>
</template>

<script>
  export default {
    name: "weituo",
    head() {
      return {
        title: '关于我们'
      }
    },
    data() {
      return {
        isApp: this.$route.query.platform,
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

<style type="text/scss" lang="scss">
  .about-us-page {
    .header {
      border-bottom: 2px solid #dedede;
    }
    .out-layer-con {
      position: relative;
    }
    .weituo {
      font-size: 28px;
      line-height: 44px;
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
        &.border {
          border-bottom: 1px solid #dedede;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
      }
      .txt-index {
        text-indent: 30px;
      }
    }
  }

</style>
