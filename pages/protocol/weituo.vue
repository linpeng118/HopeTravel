<template>
<div class="con" :class="!isApp?'appPadding':''">
    <div class="header" v-if="!isApp">
        <van-nav-bar
          class="bar-shadow"
          :title="$t('alonePage.agreement')"
          @click-left="onClickLeft"
          left-arrow
          v-if="!isApp"
        >
        </van-nav-bar>
      </div>
    <div class="entrust-page out-layer-con" v-html="$t('html.entrust')"></div>
  </div>
</template>

<script>
  export default {
    name: 'entrust',
    head() {
      return {
        title: '委托协议样本'
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

<style type="text/scss" lang="scss" scoped>
.appPadding{
    padding-top: 92px;
}
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .out-layer-con {
    /* position: relative;
    top: 88px; */
    border-top: 2px solid #d8d8d8;
  }
  .entrust-page {
    font-size: 28px;
    line-height: 38px;
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
</style>
