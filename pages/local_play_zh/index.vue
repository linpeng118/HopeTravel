<template>
  <div class="local-play-zh" ref="refLocalPlayPage">
    <lay-header title="当地玩乐" @leftClick="leftClick"></lay-header>
    <div v-if="showList.length">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 热门城市 -->
      <hot-city :hotCityList="hotCity" @clickItem="linkCityHandle" @selectMore="selectMore"></hot-city>
      <!-- 最近浏览 -->
      <div class="recently-viewed" v-if="viewedList.length">
        <h1 class="title">最近浏览</h1>
        <div v-swiper:mySwiper="viewedSwiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                 v-for="viewed in viewedList"
                 :key="viewed.product_id">
              <snap-up-item :proData="viewed"
                            :isShowTime="false"
                            @selectDetail="selectItem" />
            </div>
          </div>
        </div>
      </div>
      <!-- 列表：热门活动/日本必去滑雪胜地/冬季黄石热推/各地热卖 -->
      <!-- <swiper-list :proData="showList" /> -->
      <div class="show-list">
        <div class="show-item"
             v-for="showItem in showList"
             :key="showItem.title" v-if="showItem.list.length">
          <swipe-item :proData="showItem" @selectItem="selectItem" />
        </div>
      </div>
      <!-- 底部广告 -->
      <lay-footer :imageInfo="footerAdvert" class="footer-margin"></lay-footer>
    </div>
    <loading v-if="!showList.length"></loading>
  </div>
</template>

<script>
  import {throttle as _throttle} from 'lodash'
  import {mapMutations} from 'vuex'
  import {getPlay, getProductList} from '@/api/local_play'
  import SnapUpItem from '@/components/items/snapUpItem'
  import SwipeItem from '@/components/items/swipeItem'
  import HotCity from '@/components/local_hot_city/hotCity'
  import LayHeader from '@/components/header'
  import LayFooter from '@/components/footer'
  import Loading from '@/components/loading'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import {PRODUCTIDS} from '@/assets/js/config'
  import {getUrlParam} from '@/assets/js/utils'
  export default {
    components: {
      HotCity,
      SnapUpItem,
      SwipeItem,
      LayHeader,
      LayFooter,
      Loading
    },
    data() {
      return {
        // swiper配置
        viewedSwiperOption: {
          slidesPerView: 'auto',
          slidesOffsetBefore: 16,
          spaceBetween: 8,
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap() {
              console.log('onTap', this);
            }
          }
        },
        // 最近浏览列表
        viewedList: [
          // {
          //   type: [1, 2],
          //   title: '标题1',
          //   src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
          //   desc: '1最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览',
          //   price: 1001,
          //   oriPrice: 2002
          // },
        ],
        showList: [],
        // 热门城市
        hotCity: [],
        // 热门活动
        footerAdvert:{}
      }
    },
    async asyncData({$axios}) {
      let {data, code} = await getPlay($axios)
      if (code === 0) {
        return {
          original: data
        }
      } else {
        return {
          original: []
        }
      }
    },
    fetch ({store}) {
    },
    created() {
      this.showList = this._nomalLizeshowList(this.original)
      // console.log(this.showList)
    },
    mounted() {
      // 监听滚动
      this.$refs.refLocalPlayPage.addEventListener('scroll', _throttle(this.scrollFn, 500))
      // this.getViewedList('')
      if (this.getPlatForm()) {
        this.appBridge = require('@/assets/js/appBridge.js').default
        const localProductIds = this.appBridge.getLocalStorage().toString()
        console.log('localProductIds:' + localProductIds)
        this.getViewedList(localProductIds)
      }
      console.log('2019年1月15日11:04:26')
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      // 判断是app还是web
      getPlatForm() {
        return getUrlParam('platform') ? true : false
      },
      // 头部返回按钮
      leftClick() {
        if (this.getPlatForm()) {
          //app
          this.appBridge.backPreviousView()
        } else {
          //web
          this.$router.go(-1)
        }
      },
      // 跳转到详情页面
      selectItem(productId) {
        if(this.getPlatForm()) {
          // app详情跳转
          this.appBridge.jumpProductDetailView({
            productID: productId
          })
        } else {
          // m跳转
          this.$router.push({
            path: '/product/detail',
            query: {
              productId
            }
          })
        }
      },
      // 获取最近浏览
     async getViewedList(ids) {
       let {data, code} = await getProductList(ids)
       if(code === 0) {
         this.viewedList = data
       } else {
         this.viewedList = []
       }
      },
      async init() {
        try {
          let {data, code} = await getPlay()
          if (code === 0) {
            this.showList = this._nomalLizeshowList(data)
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 序列化数据
      _nomalLizeshowList(data) {
        let showList = []
        let len = data.length
        this.hotCity = data[0].data
        this.footerAdvert = data[len-1].data
        for(let i = 1; i < len - 1;i++){
          let obj = {}
          obj.name = data[i].moduleName
          obj.list = data[i].data
          showList.push(obj)
        }
        return showList
      },
      doCollect(val) {
        console.log(val)
      },
      // 滚动监听显示header
      scrollFn() {
        window.requestAnimationFrame(() => {
          const s1 = this.$refs.refLocalPlayPage.scrollTop
          setTimeout(() => {
            const s2 = this.$refs.refLocalPlayPage.scrollTop
            const direct = s2 - s1
            if (s1 === 0) {
              // console.log('处于顶部')
              this.vxChangeHeaderStatus(HEADER_TYPE.TOP)
            } else if (direct > 0) {
              // console.log('向下滚动')
              this.vxChangeHeaderStatus(HEADER_TYPE.DOWN)
            } else if (direct < 0) {
              // console.log('向上滚动')
              this.vxChangeHeaderStatus(HEADER_TYPE.UP)
            }
          }, 17)
        })
      },
      linkCityHandle(cityId){
        let query = {
          touCityId: cityId
        }
        if (this.getPlatForm()) {
          query.platform = 'app'
        }
        this.$router.push({
          path: `/local_play_foreign`,
          query
        })
      },
      // 更多城市
      selectMore() {
        let query = {}
        if (this.getPlatForm()) {
          query.platform = 'app'
        }
        this.$router.push({
          path: `/local_play_foreign/more_city`,
          query
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .local-play-zh {
    font-size: 0;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .banner {
      height: 312px;
      background: url("../../assets/imgs/local_regiment/bg_banner@2x.png")
        no-repeat 0 0/100%;
    }
    .recently-viewed {
      width: 100%;
      background: #fff;
      .title {
        padding-left: 32px;
        color: #191919;
        font-size: 40px;
        font-weight: 300;
      }
    }
    .recently-viewed {
      margin-top: 24px;
      padding: 18px 0 18px;
      .swiper-container {
        margin-top: 28px;
        width: 100%;
        height: 548px;
        .swiper-slide {
          width: 686px !important;
          font-size: 38px;
        }
      }
    }
    .show-list {
      .show-item {
        margin-top: 24px;
        padding: 22px 0 34px 0;
        height: 514px;
        background: #fff;
      }
    }
    .footer-margin {
      margin-top:24px;
    }
  }
</style>

