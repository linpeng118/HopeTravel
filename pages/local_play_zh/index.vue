<template>
  <div class="local-play-zh"
    ref="refLocalPlayPage">
    <lay-header v-if="!isApp"
      :title="$t('tours.localPlay')"
      @leftClick="leftClick"
      @rightClick="rightClick"></lay-header>
    <div v-if="showList.length">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 热门城市 -->
      <hot-city :hotCityList="hotCity"
        @clickItem="linkCityHandle"
        @selectMore="selectMore"></hot-city>
      <!-- 最近浏览 -->
      <div class="recently-viewed"
        v-if="viewedList.length">
        <h1 class="title">{{$t('recentlyViewed')}}</h1>
        <div v-swiper:mySwiper="viewedSwiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="viewed in viewedList"
              :key="viewed.product_id">
              <snap-up-item :proData="viewed"
                @selectDetail="selectItem"
                @callCollect="callCollect" />
            </div>
          </div>
        </div>
      </div>
      <!-- 列表：热门活动/日本必去滑雪胜地/冬季黄石热推/各地热卖 -->
      <!-- <swiper-list :proData="showList" /> -->
      <div class="show-list">
        <div class="show-item"
          v-show="showItem.list.length"
          v-for="showItem in showList"
          :key="showItem.title">
          <swipe-item :proData="showItem"
            @selectItems="selectItem" />
        </div>
      </div>
      <!-- 底部广告 -->
      <lay-footer :imageInfo="footerAdvert"
        class="footer-margin"
        v-if="JSON.stringify(footerAdvert) === '{}'"></lay-footer>
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
  import {TOKEN, CURRENCY, PRODUCTIDS} from '@/assets/js/config'
  import {getCookieByKey, setCookieByKey, getLocalStore} from '@/assets/js/utils'
  import {addFavorite, delFavorite} from '@/api/products'
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
        isApp: this.$route.query.platform,
        appVersion: this.$route.query.app_version,
        appLanguage: this.$route.query.language,
        appCurrency: this.$route.query.currency,
        appPhoneType: this.$route.query.phone_type,
        // swiper配置
        viewedSwiperOption: {
          slidesPerView: 'auto',
          slidesOffsetBefore: 16,
          spaceBetween: 8,
          on: {
            slideChange() {
              // console.log('onSlideChangeEnd', this);
            },
            tap() {
              // console.log('onTap', this);
            }
          }
        },
        // 最近浏览列表
        viewedList: [
        ],
        showList: [],
        // 热门城市
        hotCity: [],
        // 热门活动
        footerAdvert: {},
        // 收藏
      }
    },
    head() {
      return {
        title: '当地玩乐'
      }
    },
    async beforeMount() {
      // 判断是否APP
      if (this.isApp) {
        if (this.appVersion) {
          this.jsBridge = require("@/assets/js/jsBridge").default;
          this.vxSetPlatform(this.isApp)
          this.vxSetLanguage(this.appLanguage)
          this.vxSetCurrency(this.appCurrency)
          this.vxSetPhoneType(this.appPhoneType)
          this.vxSetAppVersion(this.appVersion)
          console.log(this.appLanguage, this.appCurrency, this.appPhoneType, this.appVersion);
          await this.jsBridge.webRegisterHandler('obtainUserToken', (token, callback) => {
            // console.log(111, token);
            if (token) {
              this.vxSetToken(token)
            }
            // callback({test: 'obtainUserToken callback success!!'})
          })
          await this.jsBridge.webRegisterHandler('getLocalStorage', (productIds, callback) => {
            // console.log(222, JSON.parse(productIds));
            if (productIds) {
              this.getViewedList(JSON.parse(productIds))
              // callback({test: 'getLocalStorage callback success!!'})
            }
          })
        } else {
          this.appBridge = require("@/assets/js/appBridge").default;
          // 货币
          try {
            let currency = await this.appBridge.obtainUserCurrency()
            // 安卓只能返回JSON字符串
            if (this.appBridge.browserVersion && this.appBridge.browserVersion.isAndroid()) {
              setCookieByKey(CURRENCY, currency)
            } else {
              setCookieByKey(CURRENCY, currency.userCurrency)
            }
          } catch (error) {
            console.log(error);
          }
          // APP浏览记录数据及token
          try {
            let token = await this.appBridge.obtainUserToken()
            if (token) {
              this.vxSetToken(token)
            }
            let productIds = await this.appBridge.getLocalStorage()
            if (productIds) {
              this.getViewedList(productIds)
            }
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        let productIds = getLocalStore('browsList')
        if (productIds && productIds.length) {
          this.getViewedList(productIds)
        }
      }
    },
    async mounted() {
      // 监听滚动
      this.$refs.refLocalPlayPage.addEventListener('scroll', this.scrollFn)
      this.init()
    },
    beforeDestroy() {
      this.$refs.refLocalPlayPage.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      ...mapMutations({
        // 设置品台
        vxSetPlatform: 'setPlatform',
        // 改变token
        vxSetToken: 'setToken',
        // 设置语言
        vxSetLanguage: "setLanguage",
        // 设置货币
        vxSetCurrency: "setCurrency",
        // 设置机型
        vxSetPhoneType: "setPhoneType",
        // 设置版本
        vxSetAppVersion: "setAppVersion",
        // 修改头部状态
        vxChangeHeaderStatus: 'header/changeStatus',
      }),
      // 头部返回按钮
      leftClick() {
        if (this.isApp) {
          // app
          if (this.appVersion) {
            this.jsBridge.webCallHandler('backPreviousView')
          } else {
            this.appBridge.backPreviousView()
          }
        } else {
          // web
          let href = window.location.href.slice(-1)
          if(href == '#'){
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        }
      },
      rightClick() {
        this.$router.push({
          path: '/search'
        })
      },
      // 跳转到详情页面
      selectItem(productId) {
        if (this.isApp) {
          // app详情跳转
          let params = {
            product_id: productId.toString()
          }
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpProductDetailView', params)
          } else {
            this.appBridge.jumpProductDetailView(params)
          }
        } else {
          // m跳转
          // let routeData = this.$router.resolve({
          //   path: '/product/detail',
          //   query: {
          //     productId
          //   }
          // });
          // window.open(routeData.href, '_blank')
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
        if (code === 0) {
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
        } catch (error) {
          console.log(error)
        }
      },
      // 序列化数据
      _nomalLizeshowList(data) {
        let showList = []
        let len = data.length
        this.hotCity = data[0].data
        this.footerAdvert = data[len - 1].data[0]
        for (let i = 1; i < len - 1; i++) {
          let obj = {}
          obj.name = data[i].moduleName
          obj.list = data[i].data
          showList.push(obj)
        }
        return showList
      },
      // 滚动监听显示header
      scrollFn() {
        const s1 = this.$refs.refLocalPlayPage.scrollTop
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('webViewScrollViewDidScroll', {top: s1.toString()})
          } else {
            this.appBridge.webViewScrollViewDidScroll({top: s1.toString()});
          }
        }
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
      },
      linkCityHandle(cityId) {
        let query = {
          touCityId: cityId
        }
        if (this.isApp) {
          const params = {
            path: `local_play_foreign?touCityId=${cityId}&platform=${this.isApp}`
          }
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpWebHTML', params)
          } else {
            this.appBridge.jumpWebHTML(params);
          }
        } else {
          this.$router.push({
            path: `/local_play_foreign`,
            query
          })
        }
      },
      // 更多城市
      selectMore() {
        let query = {}
        if (this.isApp) {
          try {
            let params = {
              path: `local_play_foreign/more_city?platform=${this.isApp}`
            }
            if (this.appVersion) {
              this.jsBridge.webCallHandler('jumpWebHTML', params)
            } else {
              this.appBridge.jumpWebHTML(params);
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          this.$router.push({
            path: `/local_play_foreign/more_city`,
            query
          })
        }
      },
      // 收藏
      async callCollect(val) {
        let token = getCookieByKey(TOKEN);
        console.log(token);
        if (!token) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpToLoginView')
          } else {
            this.appBridge.jumpToLoginView();
          }
          return
        }
        let data = {
          product_id: val.product_id.toString()
        }
        if (val.is_favorite) {
          // 取消收藏
          await this.removeFavorite(data)
        } else {
          // 添加收藏
          await this.addFavorite(data)
        }
        const index = this.viewedList.findIndex(item => {
          return item.product_id === val.product_id
        })
        this.viewedList[index].is_favorite = !this.viewedList[index].is_favorite
      },
      // 添加收藏
      async addFavorite(val) {
        try {
          let {code} = await this.$api.products.addFavorite(data)
          if (code === 0) {
            this.$toast(this.$t(localPlayPage.collectionSuc))
          } else {
            this.$toast(this.$t(localPlayPage.collectionFail))
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 取消收藏
      async removeFavorite(val) {
        try {
          let {code} = await this.$api.products.addFavorite(data)
          if (code === 0) {
            this.$toast(this.$t('localPlayPage.collectionSuc'))
          } else {
            this.$toast(this.$t('localPlayPage.collectionFail'))
          }
        } catch (error) {
          console.log(error);
        }
      },
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
      background: url("../../assets/imgs/local_regiment/bg_play_local2x.png")
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
      margin-top: 24px;
    }
  }
</style>

