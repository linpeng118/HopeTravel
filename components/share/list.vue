<template>
  <div class="share-wrap">
    <div class="share-pic-box">
      <div class="top-part" v-if="JSON.stringify(data) === '{}'" style="text-align: center">
        <van-loading type="spinner" />
      </div>
      <section v-else class="top-part" id="shareImg">
        <div class="header-info">
          <img :src="data.face" alt="">
          <div class="name">
            <p><strong>{{data | getName}}</strong></p>
            <p style="color:#989898">向您推荐了一个行程</p>
          </div>
        </div>
        <div class="img-product">
          <img :src="data.image" @load="savePicture" alt="" >
          <div class="code">
            <img :src="data.code" alt="">
            <!--<img :src="productImg" alt="">-->
          </div>
        </div>
        <div class="desc-product">
          <div class="title">{{data.name}}</div>
          <div class="price-box">
            <p v-if="data.special_price"><span class="special">$<strong>{{data.special_price}}</strong>起</span><span class="default">{{data.default_price}}</span></p>
            <p v-else><span class="special">$<strong>{{data.default_price}}</strong>起</span></p>
          </div>
        </div>
      </section>
      <!--<div class="save-pic" @click="show = true">-->
      <div class="save-pic" @click="show=true">
        <img src="../../assets/imgs/union/icon_down@2x.png" alt="">长按图片保存
      </div>
    </div>
    <div class="native-share">
      <div class="list-wrap">
        <ul>
          <li @click="shareRenderAll">
            <img src="../../assets/imgs/union/weixin_friend@2x.png" alt="">
            <p>微信好友</p>
          </li>
          <li @click="shareRenderAll">
            <img src="../../assets/imgs/union/qq@2x.png" alt="">
            <p>QQ好友</p>
          </li>
          <li @click="shareRenderAll">
            <img src="../../assets/imgs/union/weixin@2x.png" alt="">
            <p>微信朋友圈</p>
          </li>
          <li @click="shareRender('sina')">
            <img src="../../assets/imgs/union/sinaweibo@2x.png" alt="">
            <p>新浪微博</p>
          </li>
          <li @click="copySomething"
              v-clipboard:copy="copyLink()"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">
            <img src="../../assets/imgs/union/copy_link@2x.png" alt="">
            <p>复制连接</p>
          </li>
        </ul>
      </div>
      <div class="cancel-btn" @click="close">
        取消
      </div>
    </div>
    <div class="canvas-img" v-if="dataUrl">
      <!--<img src="../../assets/imgs/xifantours_code.jpg" alt="" width="100%">-->
      <img :src="dataUrl" alt="">
    </div>
    <div class="sure-save">
      <van-popup v-model="show">
        <div>
          <p>长按保存海报去分享</br>或者使用浏览器的分享</p>
          <div class="sure-save-img" @click="show=false">我知道了</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import {getCode,getBase64} from '@/api/sale_union'
// import Mshare from 'm-share'
export default {
  name: 'list',
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
  props:{
    data:{
      type: Object,
      default: null
    },
    ids: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: false,
      dataUrl: '',
      productImg: '',
      faceImg: '',
      codeImg: ''
    }
  },
  async mounted(){
    console.log('data',this.data)
  },
  methods: {
    close(){
      this.dataUrl = ''
      this.$emit('close')
    },
    async savePicture() {
      let canvas = await html2canvas(document.querySelector('#shareImg'))
      this.dataUrl = canvas.toDataURL()
    },
    async copySomething() {
      try {
        let text = window.location.href + 'referrer_id=' + this.data.customer_id
        await this.$copyText(text)
        this.$toast('复制成功')
      } catch (e) {
        console.error(e)
      }
    },
    onCopy(e) {
      this.$toast("复制成功")
    },
    // 复制失败
    onError(e) {
      this.$toast("复制失败")
    },
    async imgSwitchBase64(){
      let face = await getBase64(this.data.face)
      let product = await getBase64(this.data.image)
      this.faceImg = 'data:image/jpg;base64,'+ face.data
      this.productImg = 'data:image/jpg;base64,'+ product.data
    },
    shareRender(value) {
      const Mshare = require('m-share')
      var config = {
        title: this.data.name,
        desc: '',
        link: window.location.origin + '/product/detail?productId=' + this.ids.product_id + '-' + this.ids.customer_id + '&platform=sinaWeibo',
        types: ['wx', 'wxline', 'qq', 'qzone', 'sina'], // 开启的分享图标, 默认为全部
        infoMap: {
        },
        fnDoShare: function (type) {
          console.log(1);
        }
      }
      Mshare.init(config)
      Mshare.to(value, config)
    },
    shareRenderAll() {
      if(navigator.userAgent.indexOf('MicroMessenger') >= 0) {
        this.shareRender('wx')
      } else if(navigator.userAgent.indexOf('QBWebViewType') >= 0 || navigator.userAgent.indexOf('MQQBrowser') >= 0){
        this.shareRender('qq')
      } else {
        this.show = true
      }
    },
    copyLink(){
      return window.location.origin + '/product/detail?productId=' + this.data.product_id + '-' + this.data.customer_id
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>
  .share-wrap{
    font-size: 24px;
    .share-pic-box{
      margin: 0 48px;
      padding-top: 20%;
      .top-part{
        height: 600px;
        padding: 25px 32px;
        background-color: #fff;
        overflow: hidden;
      }
      .header-info{
        display: flex;
        align-items: center;
        img{
          width:70px;
          height:70px;
          border-radius:50%;
          background-color: #eee;
          border: none;
        }
        .name{
          flex: 1;
          padding-left: 15px;
        }
      }
      .img-product{
        padding:20px 0;
        border-bottom: 2px dashed #DEDEDE;
        position: relative;
        img{
          width: 100%;
          height: 280px;
          border-radius: 8px;
          background-color: #eee;
          border: none;
        }
        .code{
          position: absolute;
          top: 46px;
          right: 22px;
          width: 118px;
          height: 118px;
          img{
            width: 100%;
            height: 100%;
            border: none;
          }
        }

      }
      .desc-product{
        padding-top: 20px;
        .title{
          height: 80px;
          line-height: 40px;
          overflow: hidden;
          font-size:28px;
        }
        .price-box{
          text-align: center;
          font-size:20px;
          color: #989898;
        }
        .special{
          line-height: 68px;
          color: #EF9A1A;
          strong{
            font-size:42px;
            font-weight:bold;
          }
        }
        .default{
          text-decoration: line-through;
        }
      }
      .save-pic{
        height:80px;
        line-height: 80px;
        text-align: center;
        background-color: #F4F4F4;
        color: #5B5B5B;
        font-size:28px;
        img {
          height: 40px;
          width: 40px;
          vertical-align: text-bottom;
          margin-right: 10px;
        }
      }
    }
    .native-share{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 260px;
      background-color: #fff;
      .list-wrap {
        padding: 0 30px;
        ul{
          display: flex;
          flex-wrap:wrap;
          font-size:20px;
          line-height:44px;
          color: #989898;
          padding-top: 20px;
          li{
            width: 20%;
            margin-bottom: 20px;
            text-align: center;
          }
          img{
            width: 80px;
            height: 80px;
          }
        }
      }
      .cancel-btn{
        height:80px;
        background:#F4F4F4;
        line-height: 80px;
        text-align: center;
        color: #989898;
        font-size:32px;
      }
    }
    .canvas-img{
      position: fixed;
      top: 0;
      left: 48px;
      right: 48px;
      height: 600px;
      z-index: 100;
      padding-top: 20%;
      box-sizing: content-box;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .sure-save .van-popup{
      color: #fff;
      background-color: transparent;
      text-align: center;
      .sure-save-img{
        width:254px;
        height:80px;
        border:2px solid rgba(255,255,255,1);
        box-shadow:0px 0px 12px rgba(0,0,0,0.1);
        border-radius:8px;
        line-height: 80px;
        color: #fff;
        text-align: center;
        margin-top: 70px;
      }
    }
  }
</style>
