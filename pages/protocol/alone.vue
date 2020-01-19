<template>
<div>
  <div class="header" v-if="!isApp">
        <van-nav-bar
          class="bar-shadow"
          :title="$t('alonePage.reservation')"
          @click-left="onClickLeft"
          left-arrow
          v-if="!isApp"
        >
        </van-nav-bar>
      </div>
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
<style scoped>
  .out-layer-con{
    position: relative;
    top: 88px;
    border-top: 2px solid #D8D8D8;
  }
</style>
