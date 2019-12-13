<template>
  <div>
    <div class="header" v-if="!isApp">
      <van-nav-bar
        class="bar-shadow"
        title="我的米粒"
        @click-left="onClickLeft"
        left-arrow>
      </van-nav-bar>
    </div>
    <div class="out-layer-con integral" v-html="$t('integralPage.integrHtml')">
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isApp: this.$route.query.platform
    }
  },
  head() {
    return {
      title: "米粒说明"
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
  .out-layer-con{
    position: relative;
    border-top: 2px solid #D8D8D8;
  }
  .integral{
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
