<template>
  <div class="page-container">
    <header-bar title="邀请好友加入"></header-bar>
    <div style="padding-top: 46px;" class="">
      <div class="invite-box" >
        <h3>邀请好友，一起赚钱</h3>
        <h2>您可额外获得好友25%收益</h2>
        <div id="saveImg" class="save-area" v-if="!dataUrl">
          <div class="pep-info">
            <div class="desc">
              <img :src="faceImage" alt="" @load="isLoadImg('face')">
              <div>
                <h2 class="name">{{profile | getName}}</h2>
                <p>我加入了稀饭联盟，赚了不少钱了， 你也快来吧！</p>
              </div>
            </div>
          </div>
          <div class="slogan">
            <p class="title">越分享，越富有</p>
            <p>扫描二维码，加入分销联盟一起来赚钱吧！</p>
            <img :src="codeImg" alt="" @load="isLoadImg('code')">
          </div>
        </div>

        <div class="canvas-img" v-if="dataUrl">
          <img :src="dataUrl" alt="">
        </div>
      </div>
    </div>
    <div class="popup-tran" v-if="show">
      <van-popup v-model="show">
        <p>长按保存海报去分享</p>
        <van-button plain @click="show=false" size="small">我知道了</van-button>
      </van-popup>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {getCode,getBase64} from '@/api/sale_union'
import {profileInfo} from '@/assets/js/mixins/profile'
import html2canvas from 'html2canvas'
export default {
  name: 'share_friends',
  filters: {
    getName(value) {
      // console.log(value)
      if (value.chinese_name) {
        return value.chinese_name
      } else if(value.last_name && value.first_name){
        return value.last_name + value.first_name
      } else if(value.nickname){
        return value.nickname
      } else {
        return value.phone || value.email
      }
    }
  },
  components: {
    HeaderBar
  },
  mixins: [profileInfo],
  data(){
    return {
      codeImg: '',
      show: true,
      dataUrl: '',
      faceImage: '',
      overLoadImg: ''
    }
  },
  watch:{
    overLoadImg(newValue) {
      console.log(newValue)
      if(newValue==='codeface'){
        this.htmlChangeCanvas()
      }
    }
  },
  mounted(){
    this.getQRCode()
    // this.htmlChangeCanvas()
  },
  methods: {
    async getQRCode(){
      let url = `${window.location.origin}/personal/sale_union/share_friends?referrer_id=${this.profile.customer_id}`
      let res = await getCode(url)
      this.codeImg = res.data
      let faceImg = await getBase64(this.profile.face)
      this.faceImage = 'data:image/jpg;base64,' + faceImg.data
    },
    async htmlChangeCanvas(){
      console.log('zhixingl')
      let canvas = await html2canvas(document.querySelector('#saveImg'))
      this.dataUrl = canvas.toDataURL()
    },
    isLoadImg(value){
      this.overLoadImg += value
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background: #F5F4F9;
    min-height: 100vh;
    h2,h3{
      color: #F79309;
      text-align: center;
    }
    h2{
      font-size:40px;
      height: 60px;
    }
    h3{
      font-size:32px;

      height: 50px;
    }
    .invite-box{
      padding: 50px 0;
      position: relative;
      width: 100%;
      .save-area{
        margin: 15px;
        height: 850px;
        padding: 120px 30px 30px 30px;
        background: url("../../../assets/imgs/union/share_bg.png") no-repeat;
        background-size: 100%;
      }
      .pep-info{
        background:#fff;
        box-shadow:0px 4px 4px rgba(217,217,217,0.14);
        border-radius:12px;
        font-size:28px;
        margin: 0 46px;
        .desc{
          display: flex;
          padding: 45px;
          align-items: center;
          justify-content: center;
          background: url('../../../assets/imgs/union/yao_words.png') no-repeat right;
          background-size: 200px 200px;
          color: #5B5B5B;
          & > div{
            flex: 1;
            padding-left: 20px;
          }
        }
        h2.name{
          height:46px;
          font-size:36px;
          color: #FCAA23;
          text-align: left;
          margin-bottom: 10px;
        }
        img{
          width:100px;
          height:100px;
          border-radius:50%;
        }
      }
      .slogan{
        margin-top: 140px;
        text-align: center;
        color: #fff;
        font-size:24px;
        p{
          padding: 8px 0;
        }
        p.title{
          font-size:32px;
          font-weight: bold;
        }
        img{
          width: 165px;
          height: 165px;
          margin-top: 30px;
        }
      }
    }
    .canvas-img{
      height: 850px;
      margin: 15px;
      img{
        width: 100%;
        height: 850px;
      }
    }
  }
</style>
<style>
  .popup-tran .van-popup{
    background: transparent;
    color: #fff;
    font-size: 24px;
    text-align: center;
  }
  .popup-tran .van-popup button{
    color: #fff;
    background: transparent !important;
    margin-top: 20px;
  }
</style>
