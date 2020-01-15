<template>
  <div>
    <div class="header" v-if="!isApp">
      <van-nav-bar
        class="bar-shadow"
        :title="$t('contractPage.travelSelf')"
        @click-left="onClickLeft"
        left-arrow
        v-if="!isApp"
      >
      </van-nav-bar>
    </div>
    <van-cell :title="$t('contractPage.travelContract')" is-link to="contract" />
    <van-cell :title="$t('alonePage.selfActive')" is-link to="prompt" />
  </div>
</template>

<script>
  export default {
    name: 'more',
    head() {
      return {
        title: '旅行合同及安全提示',
      }
    },
    data(){
      return{
        isApp: this.$route.query.platform,
      }
    },
    methods:{
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
  .alone-wrap{
    .van-cell:not(:last-child)::after{
      border-bottom-color: #D8D8D8;
      left: 0;
    }
  }
</style>
<style type="text/scss" lang="scss" scoped>
  .out-layer-con{
    position: relative;
    top: 88px;
    border-top: 2px solid #D8D8D8;
  }
</style>
