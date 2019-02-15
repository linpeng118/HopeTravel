<template>
  <div class="drift-wrap" v-if="isShowDrift">
    <div>
      <a href="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226"><img src="../../assets/imgs/home/icon_contact.png" alt=""></a>
    </div>
    <div @click="callPhone">
      <img src="../../assets/imgs/home/icon_phone.png" alt="">
    </div>
    <div @click="backTop">
      <img src="../../assets/imgs/home/icon_back_top.png" alt="">
    </div>
    <!--显示电话号码-->
    <van-popup v-model="isTel">
      <div class="tel-list">
        <dl class="center-tel">
          <dd>
            <van-icon name="phone" class="big-icon" />
            <div class="tel-box">
              <p>中国客服电话</p>
              <p class="tel"><a href="tel:00864001181388">00-118-1388</a></p>
            </div>
          </dd>
          <dd>
            <van-icon name="phone" class="big-icon" />
            <div class="tel-box">
              <p>美国客服电话</p>
              <p class="tel"><a href="tel:0018889330336">(001)888-933-0336</a></p>
            </div>
          </dd>
          <dd>
            <van-icon name="phone" class="big-icon"/>
            <div class="tel-box">
              <p>日本客服电话</p>
              <p class="tel"><a href="tel:0081355455311">(0081)3-5545-5311</a></p>
            </div>
          </dd>
        </dl>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {throttle as _throttle} from 'lodash'
export default {
  name: 'drift_aside',
  data() {
    return {
      isShowDrift: false, // 是否显示
      scrollTop: 0, // 滚动的距离
      isTel: false, // 电话号码显示
    }
  },
  mounted() {
    // 监听滚动
    window.addEventListener('scroll', _throttle(this.scrollFn, 100))
  },
  destroyed () {
    // 移除监听
    window.removeEventListener('scroll', _throttle(this.scrollFn, 100))
  },
  methods: {
    backTop() {
      console.log('返回顶部')
      let timer = setInterval(() => {
        let speed = Math.floor(-this.scrollTop / 3)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + speed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 17)
    },
    callPhone() {
      this.isTel = !this.isTel
    },
    scrollFn() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let width = document.body.clientHeight
      this.scrollTop = scrollTop
      if (this.scrollTop > width) {
        this.isShowDrift = true
      } else {
        this.isShowDrift = false
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .drift-wrap{
    width: 88px;
    height: 400px;
    position: fixed;
    right: 10px;
    bottom: 80px;
    img{
      height: 88px;
      width: 88px;
    }
    .van-popup{
      border-radius: 16px;
    }
    .tel-list{
      .center-tel{
        width: 450px;
        font-size:28px;
        color: #aaa;
        dd{
          display: flex;
          display: -webkit-flex;
          height: 140px;
          padding: 0 50px;
          border-bottom: 1px solid #d8d8d8;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;
          &:last-child{
            border-bottom: none;
          }
          .big-icon{
            font-size: 50px;
            border-radius: 50%;
            border: 2px solid #aaa;
            padding:10px;
            margin-right: 20px;
          }
          .tel-box{
            flex: 1;
            a{
              color: #000;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
