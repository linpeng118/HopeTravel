<template>
  <section class="local-play-foreign"
    ref="refLocalPlayForeign">
    <lay-header v-if="!isApp"
      :title="title"
      :isSearch="false"
      :classBg="classBg"
      @leftClick="leftClick"></lay-header>
    <div v-if="showList.length">
      <div class="area-play">
        <!---->
        <div class="area-location"
          @click="moreCity">
          <div class="icon"></div>
          <div class="name">{{cityInfo.name}}</div>
        </div>
        <div class="area-main"
          ref="refAreaMain">
          <div class="area-info">
            {{cityInfo.description}}
          </div>
          <!--<div class="area-search"-->
          <!--ref="refAreaSeach"-->
          <!--@click="selectSearch">-->
          <!--<span class="icon-search">-->
          <!--<van-icon name="search"-->
          <!--color="white"-->
          <!--size="0.6rem" />-->
          <!--</span>-->
          <!--<span class="search-box">查找{{cityInfo.name}}的活动</span>-->
          <!--</div>-->
          <div class="area-entrance">
            <div class="c-title"
              @click="selectProductList(null)">
              <div class="link">{{$t('seeAll')}}</div>
              <span v-t="'tours.localPlay'"></span>
            </div>
            <div class="guide-list">
              <ul>
                <li v-for="category in categoryList"
                  :key="category.type"
                  @click="selectProductList(category.type_id)">
                  <span :class="iconChow(category.type)"></span>
                  <span class="text">{{category.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="area-image-bg"
        v-if="cityInfo"
        :style="bgStyle">
        <!--<img :src="cityInfo.image" alt="" @load="imageLoaded">-->
        <!--<img src="../../assets/imgs/local_regiment/bg_banner@2x.png" alt="" @load="imageLoaded">-->
      </div>
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
      <!--列表数据-->
      <div class="show-list">
        <div class="show-item"
          v-show="showItem.list.length"
          v-for="showItem in showList"
          :key="showItem.title">
          <swipe-item :proData="showItem"
            @selectItems="selectItem" />
        </div>
      </div>
    </div>
    <loading v-if="!showList.length"></loading>
  </section>
</template>

<script>
  import SwipeItem from '@/components/items/swipeItem'
  import {getCityInfo, getProductList} from '@/api/local_play'
  import {addFavorite, delFavorite} from '@/api/products'
  import LayHeader from '@/components/header/index.vue'
  import Loading from '@/components/loading'
  import {throttle as _throttle} from 'lodash'
  import {mapMutations} from 'vuex'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import SnapUpItem from '@/components/items/snapUpItem'
  import {setCookieByKey, getLocalStore} from '@/assets/js/utils'
  export default {
    // layout: 'default',
    transition: 'page',
    components: {
      SwipeItem,
      LayHeader,
      Loading,
      SnapUpItem
    },
    validate({query}) { // 判断路由是否正确
      return query.touCityId
    },
    async asyncData({query, $axios}) {
      let {touCityId} = query
      return {
        touCityId
      }
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
        imgShow: false,
        title: this.$t('tours.localPlay'),
        barSearch: false,
        showList: [],
        searchKeyWords: '',
        categoryList: [],
        viewedList: [],
        classBg: false,
        cityInfo: {},
      }
    },
    head() {
      return {
        title: ''
      }
    },
    computed: {
      // 城市背景图片处理
      bgStyle() {
        return `background-image:url(${this.cityInfo.image})`
      }
    },
    async beforeMount() {
      // 判断是否APP
      if (this.isApp) {
        if (this.appVersion) {
          this.jsBridge = require("@/assets/js/jsBridge").default;
          this.vxSetLanguage(this.appLanguage)
          this.vxSetCurrency(this.appCurrency)
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
              setCookieByKey('currency', currency)
            } else {
              setCookieByKey('currency', currency.userCurrency)
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
      this.init()
      // 监听滚动
      this.$refs.refLocalPlayForeign.addEventListener('scroll', this.scrollFn)
    },
    beforeDestroy() {
      this.$refs.refLocalPlayForeign.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      ...mapMutations({
        // 改变token
        vxSetToken: 'setToken',
        // 设置语言
        vxSetLanguage: "setLanguage",
        // 设置货币
        vxSetCurrency: "setCurrency",
        vxChangeHeaderStatus: 'header/changeStatus', // 修改头部状态

      }),
      // 返回上一级菜单
      leftClick() {
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('backPreviousView')
          } else {
            this.appBridge.backPreviousView()
          }
        } else {
          this.$router.go(-1)
        }
      },
      // 判断显示icon
      iconChow(type) {
        if (type === 1) { // 门票演出
          return 'icon-guide-ticket'
        } else if (type === 2) { // 一日游
          return 'icon-guide-car'
        } else if (type === 3) { // 特色体验
          return 'icon-guide-special'
        }
      },
      // 初始化数据
      async init() {
        let {data, code} = await getCityInfo(this.touCityId)
        if (code === 0) {
          this.cityInfo = data.city
          this.categoryList = data.category
          this.showList = this._nomalLizeshowList(data)
        } else {
          this.$toast(this.$t('loadFail'))
        }
      },
      // 获取最近浏览
      async getViewedList(ids) {
        let {data, code} = await getProductList(ids)
        if (code === 0) {
          this.viewedList = data
          // console.log(this.viewedList)
        } else {
          this.viewedList = []
        }
      },
      // 跳转到详情页面
      selectItem(productId) {
        // console.log(productId)
        if (this.isApp) {
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
          let routeData = this.$router.resolve({
            path: '/product/detail',
            query: {
              productId
            }
          });
          window.open(routeData.href, '_blank')
        }
      },
      // 跳转search,搜索
      selectSearch() {
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpSearchView')
          } else {
            this.appBridge.jumpSearchView()
          }
        } else {
          // m跳转
          // console.log('m搜索')
        }
      },
      // 序列化数据
      _nomalLizeshowList(data) {
        if (!data) return []
        let obj = {
          activity: this.$t('localPlayPage.activity'),
          boutique: this.$t('localPlayPage.boutique'),
          welcome: this.$t('localPlayPage.welcome')
        }

        // if(data) return false
        let {activity, boutique, welcome} = data
        let showList = [
          {
            name: obj.boutique,
            list: boutique
          },
          {
            name: obj.welcome,
            list: welcome
          },
          {
            name: obj.activity,
            list: activity
          }
        ]
        return showList
      },
      scrollTab() {
      },
      // 滚动监听显示header
      scrollFn() {
        // console.log('滚动了')
        const s1 = this.$refs.refLocalPlayForeign.scrollTop
        const s3 = this.$refs.refAreaMain.offsetHeight
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('webViewScrollViewDidScroll', {top: s1.toString()})
          } else {
            this.appBridge.webViewScrollViewDidScroll({top: s1.toString()});
          }
        }
        setTimeout(() => {
          const s2 = this.$refs.refLocalPlayForeign.scrollTop
          const direct = s2 - s1
          if (s1 === 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.TOP)
          } else if (direct > 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.DOWN)
          } else if (direct < 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.UP)
          }
          if (s1 > s3) {
            // this.title = ''
            // this.barSearch = true
            // this.searchKeyWords = `查找${this.cityInfo.name}的活动`
          } else {
            this.title = this.$t('tours.localPlay')
            // this.barSearch = false
          }
        }, 17)
      },
      selectProductList(typeId) {
        if (this.isApp) {
          let data = {
            'itemType': '2',
            'keyword': this.cityInfo && this.cityInfo.name
          }
          if (typeId !== null) {
            data.product_type = typeId.toString()
          }
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpProductListView', data)
          } else {
            this.appBridge.jumpProductListView(data);
          }
        } else {
          let query = {
            keyword: encodeURIComponent(this.cityInfo.name),
            itemType: '2',
          }
          if (typeId !== null) {
            query.product_type = typeId.toString()
          }
          this.$router.push({
            name: 'product_list-play_foreign',
            query
          })
        }
      },
      // 收藏
      async callCollect(val) {
        let token = getCookieByKey('token');
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
      // 更多城市
      moreCity() {
        if (this.isApp) {
          query.platform = 'app'
          try {
            const params = {
              path: `local_play_foreign/more_city?touCityId=${cityId}&platform=${this.isApp}`
            }
            if (this.appVersion) {
              this.jsBridge.webCallHandler('jumpWebHTML', params)
            } else {
              this.appBridge.jumpWebHTML(params);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$router.push({
            path: `/local_play_foreign/more_city`
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .local-play-foreign {
    font-size: 0;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
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
      position: relative;
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
  }
  .area-play {
    position: relative;
    z-index: 1;
    .city-img {
      position: absolute;
      height: 786px;
      width: 100%;
      top: 0;
      left: 0;
      background: url("../../assets/imgs/local_regiment/bg_banner@2x.png")
        no-repeat;
      background-size: cover;
      z-index: 0;
    }
    .area-location {
      padding-top: 156px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      .icon {
        width: 52px;
        height: 62px;
        background: url("../../assets/imgs/icon_location@2x.png") no-repeat 0 10px;
        background-size: 100%;
        padding-top: 10px;
      }
      .name {
        height: 86px;
        font-size: 64px;
        font-weight: 300;
        color: #fff;
        line-height: 86px;
      }
    }
    .area-main {
      margin: 0 32px;
      .area-info {
        padding: 20px;
        margin-top: 198px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        color: #fff;
        font-size: 22px;
      }
      .area-search {
        height: 94px;
        background: rgba(255, 255, 255, 0.45);
        border-radius: 8px;
        margin: 20px 0 14px 0;
        padding: 24px;
        display: flex;
        display: -webkit-flex;
        .icon-search {
          width: 44px;
          height: 44px;
        }
        .search-box {
          flex: 1;
          font-size: 32px;
          font-weight: 300;
          color: #fff;
          padding-left: 10px;
        }
      }
      .area-entrance {
        border-radius: 8px;
        background: #fff;
        padding-bottom: 17px;
        margin-top: 20px;
        .c-title {
          padding-left: 20px;
          font-size: 24px;
          font-weight: 300;
          color: #989898;
          line-height: 72px;
          .link {
            float: right;
            padding: 0 20px;
            color: #399ef6;
            text-decoration: none;
          }
        }
        .guide-list {
          li {
            height: 68px;
            padding: 13px 24px;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            [class^="icon-guide"] {
              height: 32px;
              width: 32px;
              margin-right: 14px;
            }
            .icon-guide-ticket {
              background: url("../../assets/imgs/icon_ticket@2x.png") no-repeat;
              background-size: 100%;
            }
            .icon-guide-car {
              background: url("../../assets/imgs/icon_car@2x.png") no-repeat;
              background-size: 100%;
            }
            .icon-guide-special {
              background: url("../../assets/imgs/icon_special@2x.png") no-repeat;
              background-size: 100%;
            }
            .text {
              color: #989898;
              font-size: 32px;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
  .area-image-bg {
    position: absolute;
    width: 100%;
    height: 874px;
    top: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-color: #ccc;
    img {
      display: none;
    }
  }
  .show-list {
    position: relative;
    .show-item {
      margin-top: 24px;
      padding: 22px 0 34px 0;
      height: 514px;
      background: #fff;
    }
  }
</style>

