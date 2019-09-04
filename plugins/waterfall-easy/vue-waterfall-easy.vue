
<template>
  <div>
    <div class="vue-waterfall-easy-container">
      <div class="loading ball-beat" v-show="isPreloading_c" :class="isFirstLoad?'first':''">
        <slot name="loading" :isFirstLoad="isFirstLoad"></slot>
        <template v-if="!hasLoadingSlot">
          <div class="dot" v-for="(n,ind) in loadingDotCount" :key="ind" :style="loadingDotStyle"></div>
        </template>
      </div>
      <div class="vue-waterfall-easy-scroll" ref="scrollEl">
        <div class="vue-waterfall-easy">
          <div class="img-box" v-for="(v,i) in imgsArr_c" :key="i">
            <a @click="onImgSlide(v)" :data-index="i" v-if="v.type!=1"><img :style="'height:'+v._height+'px;'" :src="v.src" /> </a>
            <a @click="clickvideo(v)" :data-index="i" v-else><img :style="'height:'+v._height+'px;'" :src="v.src" />
              <div class="elseicon" :style="'height:'+v._height+'px;margin-top:-'+v._height+'px;'" ></div>
            </a>
          </div>
        </div>
        <div class="over" v-if="over" ref="over">
        </div>
      </div>
    </div>
    <!--视频弹出框-->
    <van-popup v-model="isVideoShow"
               position="right">
      <van-nav-bar title=""
                   left-arrow
                   @click-left="pausePlay" />
      <div class="video"
           v-if="product&& product.video">
        <div class="video-main video-div">
          <video ref="productVideo"
                 :src="product.video"
                 controls="controls"
                 autoplay
                 preload="auto">
            暂时不支持播放该视频
          </video>
          <!--<div class="video-loading">-- v-if="product.videos[0] && product.videos[0].video"><i></i>--:src="product.videos[0].video"></div>-->
        </div>
      </div>
    </van-popup>
  </div>


</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>
  import {
    ImagePreview
  } from 'vant';
export default {
  name: 'vue-waterfall-easy',
  props: {
    width: { // 容器宽度
      type: Number
    },
    height: { // 容器高度
      type: [Number, String]
    },
    reachBottomDistance: { // 滚动触底距离，触发加载新图片
      type: Number, // selector
      default: 20  // 默认在最低那一列到底时触发
    },
    loadingDotCount: { // loading 点数
      type: Number,
      default: 3
    },
    loadingDotStyle: {
      type: Object,
    },
    gap: { // .img-box 间距
      type: Number,
      default: 20
    },
    mobileGap: {
      type: Number,
      default: 8
    },
    maxCols: {
      type: Number,
      default: 5
    },
    imgsArr: {
      type: Array,
      required: true,
    },
    srcKey: {
      type: String,
      default: 'src'
    },
    hrefKey: {
      type: String,
      default: 'href'
    },
    imgWidth: {
      type: Number,
      default: 240
    },
    isRouterLink: {
      type: Boolean,
      default: false
    },
    loadi:{type: Boolean,
      default: false},
    linkRange: { // card | img | custom 自定义通过slot自定义链接范围
      type: String,
      default: 'card'
    },
    loadingTimeOut: { // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
      type: Number,
      default: 500
    },
    cardAnimationClass: {
      type: [String],
      default: 'default-card-animation'
    },
    enablePullDownEvent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      msg: 'this is from vue-waterfall-easy.vue',
      isMobile:true, // 初始化移动端
      isPreloading: true, // 正在预加载中，显示加载动画
      isPreloading_c: true,
      imgsArr_c: [], // 待图片预加载imgsArr完成，插入新的字段height之后,才会生成imgsArr_c，这时才开始渲染
      loadedCount: 0,
      cols: NaN, // 需要根据窗口宽度初始化
      imgBoxEls: null, // 所有的.img-box元素
      beginIndex: 0, // 开始要排列的图片索引,首次为第二列的第一张图片，后续加载则为已经排列图片的下一个索引
      colsHeightArr: [],
      // 自定义loading
      LoadingTimer: null,
      isFirstLoad: true, // 首次加载
      over: false, // 结束waterfall加载
      isVideoShow:false,
      product:{},
    }
  },
  computed: {
    colWidth() { // 每一列的宽度
      return this.imgWidth + this.gap
    },
    imgWidth_c() { // 对于移动端重新计算图片宽度`
      return window.innerWidth / 2 - this.mobileGap
    },
    hasLoadingSlot() {
      return !!this.$scopedSlots.loading
    }
  },
  watch: {
    isPreloading(newV, oldV) {
      if (newV) {
        setTimeout(() => {
          if (!this.isPreloading&&loadi) return // 500毫秒内预加载完图片则不显示加载动画
          this.isPreloading_c = true
        }, this.loadingTimeOut)
      } else {
        this.isPreloading_c = false
      }
    },
    imgsArr(newV, oldV) {
      if (this.imgsArr_c.length > newV.length || (this.imgsArr_c.length > 0 && newV[0] && !newV[0]._height)) {
        this.reset()
      }
      this.preload()
    },

  },

  mounted() {
    this.loadingMiddle()
    this.preload()
    this.cols = this.calcuCols()
    this.$on('preloaded', () => {
      this.isFirstLoad = false

      this.imgsArr_c = this.imgsArr.concat([]) // 预加载完成，这时才开始渲染
      this.$nextTick(() => {
        this.isPreloading = false
        this.imgBoxEls = this.$el.getElementsByClassName('img-box')
        // console.log('图片总数', this.imgBoxEls.length)
        this.waterfall()
      })

    })
    if (this.enablePullDownEvent) this.pullDown()
    this.scroll()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.response)
  },
  methods: {
    // ==1== 预加载
    preload(src, imgIndex) {
      this.imgsArr.forEach((imgItem, imgIndex) => {
        if (imgIndex < this.loadedCount) return // 只对新加载图片进行预加载
        // 无图时
        if (!imgItem[this.srcKey]) {
          this.imgsArr[imgIndex]._height = '0'
          this.loadedCount++

          // 支持无图模式
          if (this.loadedCount == this.imgsArr.length) {
            this.$emit('preloaded')
          }
          return
        }
        var oImg = new Image()
        oImg.src = imgItem[this.srcKey]
        oImg.onload = oImg.onerror = (e) => {
          this.loadedCount++
          // 预加载图片，计算图片容器的高
          this.imgsArr[imgIndex]._height = e.type == 'load' ? Math.round(this.imgWidth_c / (oImg.width / oImg.height)) : (this.imgWidth_c)
          if (e.type == 'error') {
            this.imgsArr[imgIndex]._error = true
            this.$emit('imgError', this.imgsArr[imgIndex])
          }
          if (this.loadedCount == this.imgsArr.length) {
            this.$emit('preloaded')
          }
        }
      })
      console.log(this.imgsArr)

    },
    // ==2== 计算cols
    calcuCols() { // 列数初始化
      return 2
    },
    // ==3== waterfall布局
    waterfall() {
      let that=this;
      if (!this.imgBoxEls) return
      // console.log('waterfall')
      let top, left, height, colWidth = this.imgBoxEls[0].offsetWidth
      if (this.beginIndex == 0) this.colsHeightArr = []
      for (let i = this.beginIndex; i < this.imgsArr.length; i++) {
        if (!that.imgBoxEls[i]) return
        height = that.imgBoxEls[i].offsetHeight
        if (i < that.cols) {
          that.colsHeightArr.push(height)
          top = 0
          left = i * colWidth
        } else {
          let minHeight = Math.min.apply(null, that.colsHeightArr) // 最低高低
          let minIndex = that.colsHeightArr.indexOf(minHeight) // 最低高度的索引
          top = minHeight
          left = minIndex * colWidth
          // 设置元素定位的位置
          // 更新colsHeightArr
          that.colsHeightArr[minIndex] = minHeight + height
        }
        that.imgBoxEls[i].style.left = left + 'px'
        that.imgBoxEls[i].style.top = top + 'px'
      }
      this.beginIndex = this.imgsArr.length // 排列完之后，新增图片从这个索引开始预加载图片和排列

    },
    // ==4== resize 响应式
    response() {
      var old = this.cols
      this.cols = this.calcuCols()
      if (old === this.cols) return // 列数不变直接退出
      this.beginIndex = 0 // 开始排列的元素索引
      this.waterfall()
      if (this.over) this.setOverTipPos()
    },

    // ==5== 滚动触底事件
    scrollFn() {
      var scrollEl = this.$refs.scrollEl
      if (this.isPreloading) return
      var minHeight = Math.min.apply(null, this.colsHeightArr)
      if (scrollEl.scrollTop + scrollEl.offsetHeight > minHeight - this.reachBottomDistance) {
        this.isPreloading = true
        this.$emit('scrollReachBottom',true) // 滚动触底
      }
    },
    scroll() {
      this.$refs.scrollEl.addEventListener('scroll', this.scrollFn)
    },
    waterfallOver() {
      this.$refs.scrollEl.removeEventListener('scroll', this.scrollFn)
      this.isPreloading = false
      this.over = true
      this.setOverTipPos()
    },
    setOverTipPos() {
      var maxHeight = Math.max.apply(null, this.colsHeightArr)
      this.$nextTick(() => {
        this.$refs.over.style.top = maxHeight + 'px'
      })
    },

    // ==7== 下拉事件
    pullDown() {
      var scrollEl = this.$el.querySelector('.vue-waterfall-easy-scroll')
      var startY
      scrollEl.addEventListener('touchmove', (e) => {

        if (scrollEl.scrollTop === 0) {
          var t = e.changedTouches[0]
          if (!startY) startY = t.pageY
          var pullDownDistance = t.pageY - startY
          if (pullDownDistance > 0) {
            e.preventDefault()
          }
          this.$emit('pullDownMove', pullDownDistance)
        }
      })
      scrollEl.addEventListener('touchend', (e) => {
        if (scrollEl.scrollTop === 0) {
          startY = NaN
          this.$emit('pullDownEnd')
        }
      })

    },
    // other
    loadingMiddle() {
      // 对滚动条宽度造成的不居中进行校正
      var scrollEl = this.$el.querySelector('.vue-waterfall-easy-scroll')
      var scrollbarWidth = scrollEl.offsetWidth - scrollEl.clientWidth
      this.$el.querySelector('.loading').style.marginLeft = -scrollbarWidth / 2 + 'px'
    },
    clickvideo(v){
      this.product=v
      console.log(this.product)
      this.isVideoShow=true
    },
    // 暂停视频
    pausePlay() {
      this.$refs.productVideo.pause()
      this.isVideoShow = false
    },
    // 点击预览图片
    onImgSlide(data) {
      console.log(data)
      // const index = data.arr.findIndex(item => item === data.item)
      ImagePreview({
        images: [data.src],
        startPosition: 0,
      });
    },
    reset() {
      this.imgsArr_c = []
      this.beginIndex = 0
      this.loadedCount = 0
      this.isFirstLoad = true
      this.isPreloading = true
      this.scroll()
      this.over = false
    }
  }
}
</script>
<style lang="scss" scoped>

    .vue-waterfall-easy-scroll {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .vue-waterfall-easy {
      position: absolute;
      width: 100%; // 移动端生效
      .img-box {
        position: absolute;
        box-sizing: border-box;
        width: 50%; // 移动端生效
      }
      .img-box {
        animation: show-card 0.4s;
        transition: left 0.6s, top 0.6s;
        transition-delay: 0.1s;
      }
      a {
        display: block;
      }
      a.img-inner-box {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
      }
      .__err__ .img-wraper {
        background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q==);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50% 50%;
        img {
          display: none;
        }
      }
      a.img-wraper {
        & > img {
          width: 100%;
          display: block;
          border: none;
        }
      }
      .over {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 12px;
        line-height: 1.6;
        color: #aaa;
      }
    }

    .loading.first {
      bottom: 50%;
      transform: translate(-50%, 50%);
    }
    .loading {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 6px;
      z-index: 999;
      &.ball-beat > .dot {
        vertical-align: bottom;
        background-color: #bbbabe;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 3px;
        animation-fill-mode: both;
        display: inline-block;
        animation: ball-beat 0.7s 0s infinite linear;
      }
      &.ball-beat > .dot:nth-child(2n-1) {
        animation-delay: 0.35s;
      }
    }

      .van-popup {
        width: 100vw;
        height: 100vh;
        font-size: 24px;
        margin-top: -2px;
      }

      .video {
        position: fixed;
        top: 88px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
      }

      .video-main {
        margin-top: 200px;
        font-size: 0;
        font-family: none;
        white-space: nowrap;
        overflow: hidden;
      }

      .video-div {
        overflow: hidden;
        position: relative !important;
        background: #000;
        max-height: 18rem;
      }

      video {
        width: 100%;
        height: 100%;
        background: #000;
      }

      .video-loading {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;

        i {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          border: 2px solid #fff;
          border-radius: 24px;
          animation: videoloading 1s infinite linear;
          clip: rect(0 auto 12px 0);
        }
      }

      .play-btn {
        display: block;
        position: absolute;
        margin: -0.95rem 0 0 -0.95rem;
        top: 50%;
        left: 50%;

        &:after {
          display: block;
          content: "";
          width: 50px;
          height: 50px;
          background: url("../../assets/imgs/icon_video@2x.png") no-repeat;
          background-size: cover;
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-animation: playvideo 1.2s infinite;
          animation: playvideo 1.2s infinite;
          margin-top: -30%;
        }
      }

    @keyframes videoloading {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
      }
    }

    @keyframes playvideo {
      0%,
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }

      50% {
        -webkit-transform: scale(1.4);
        transform: scale(1.4);
      }
    }

  .elseicon{
    position: absolute;
    z-index: 100;
    width: 100%;
    background: url("../../assets/imgs/tour/video2.png") no-repeat;
    background-size:100px 100px;
    background-position:center center;
  }
</style>
