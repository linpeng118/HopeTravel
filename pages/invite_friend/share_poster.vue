<template>
  <div class="poster-wrap">
    <div class="bg">
      <div class="con">
        <img src="../../assets/imgs/invite/poster_bg_w@2x.png" alt="">
      </div>
    </div>
    <div class="btn-words">
      <div class="left">
        <h2>有你有我游世界</h2>
        <h1>长按识别二维码</h1>
        <h1>下载稀饭旅行APP</h1>
      </div>
      <div class="code">
        <img :src="imgData" alt="">
      </div>
    </div>
    <!--<div class="close">-->
      <!--<img src="../../assets/imgs/invite/icon_close@2x.png" alt="">-->
    <!--</div>-->
  </div>
</template>

<script>
import {getCode} from '@/api/sale_union'
export default {
  name: 'share_poster',
  data(){
    return {
      imgData: ''
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    async init(){
      let url = window.location.origin + '/invite_friend/gift_giving' + window.location.search
      console.log(this.$route.query)
      let {code,data} = await getCode(url)
      if(code === 0){
        this.imgData = data
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .poster-wrap{
    width: 100%;
    height: 100vh;
    position: relative;
    .bg{
      height: calc(100vh - 280px);
      background: url("../../assets/imgs/invite/poster_bg@2x.png") no-repeat center;
      background-size: cover;
      text-align: center;
      position: relative;
      width: 100%;
      padding-top: 150px;
      img{
        width: 614px;
      }
    }
    .btn-words{
      position: absolute;
      left: 0;
      right: 0;
      height: 280px;
      bottom: 0;
      padding: 40px;
      display: flex;
      align-items: center;
      h1{
        font-size: 48px;
      }
      h2{
        font-size: 30px;
        font-weight: normal;
      }
      .code{
        width: 212px;
        height: 212px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .left{
        flex: 1;
      }
    }
    .close{
      position: absolute;
      top: 30px;
      left: 50px;
      width: 32px;
      height: 32px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
