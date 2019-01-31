<template>
  <section class="local-play-foreign"
    ref="refLocalPlayForeign">
    <lay-header v-if="!isApp"
      :title="title"
      :isSearch="false"
      :classBg="classBg"
      :barSearch="barSearch"
      :searchKeyWords="searchKeyWords"
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
          <div class="area-search"
            ref="refAreaSeach"
            @click="selectSearch">
            <span class="icon-search">
              <van-icon name="search"
                color="white"
                size="0.6rem" />
            </span>
            <span class="search-box">查找{{cityInfo.name}}的活动</span>
          </div>
          <div class="area-entrance">
            <div class="c-title"
              @click="selectProductList(null)">
              <div class="link">查看全部</div>
              <span>当地玩乐</span>
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
        <h1 class="title">最近浏览</h1>
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
  import LayHeader from '@/components/header/index.vue'
  import Loading from '@/components/loading'
  import {throttle as _throttle} from 'lodash'
  import {mapMutations} from 'vuex'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import SnapUpItem from '@/components/items/snapUpItem'
  import {Toast} from 'vant'
  import {setCookieByKey} from '@/assets/js/utils'
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
        title: '当地玩乐',
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
    created() {
    },
    async mounted() {
      this.init()
      if (this.isApp) {
        this.appBridge = require('@/assets/js/appBridge.js').default
        // this.appBridge.hideNavigationBar()
        let currency = this.appBridge.obtainUserCurrency()
        setCookieByKey('currency', currency.userCurrency)
        let productIds = await this.appBridge.getLocalStorage()
        if (productIds) {
          this.getViewedList(productIds)
        }
        let token = await this.appBridge.obtainUserToken()
        this.vxChangeTokens(token)
      } else {
        this.$refs.refLocalPlayForeign.addEventListener('scroll', _throttle(this.scrollFn, 100))
      }
    },
    methods: {
      ...mapMutations({
        vxChangeTokens: 'setToken', // 改变token
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      // 返回上一级菜单
      leftClick() {
        if (this.isApp) {
          this.appBridge.backPreviousView()
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
          Toast('加载失败')
        }
      },
      // 获取最近浏览
      async getViewedList(ids) {
        let {data, code} = await getProductList(ids)
        if (code === 0) {
          this.viewedList = data
          console.log(this.viewedList)
        } else {
          this.viewedList = []
        }
      },
      // 跳转到详情页面
      selectItem(productId) {
        // console.log(productId)
        if (this.isApp) {
          // app详情跳转
          console.log('app详情跳转')
          this.appBridge.jumpProductDetailView({
            productID: productId.toString()
          })
        } else {
          // m跳转
          console.log('m跳转')
          this.$router.push({
            path: '/product/detail',
            query: {
              productId
            }
          })
        }
      },
      // 跳转search
      selectSearch() {
        if (this.isApp) {
          console.log('app搜索')
          this.appBridge.jumpSearchView()
        } else {
          // m跳转
          console.log('m搜索')
        }
      },
      // 序列化数据
      _nomalLizeshowList(data) {
        if (!data) return []
        let obj = {
          activity: '最新活动',
          boutique: '稀饭精选',
          welcome: '最受欢迎'
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
        console.log('滚动了')
        if (this.isApp) {
          this.appBridge.webViewScrollViewDidScroll({'top': s1.toString()})
        }
        const s1 = this.$refs.refLocalPlayForeign.scrollTop
        const s3 = this.$refs.refAreaMain.offsetHeight
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
            this.title = ''
            this.barSearch = true
            this.searchKeyWords = `查找${this.cityInfo.name}的活动`
          } else {
            this.title = '当地玩乐'
            this.barSearch = false
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
          this.appBridge.jumpProductListView(data)
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
      // 搜藏
      async callCollect(val) {
        if (this.isApp) {
          let json = {
            type: val.is_favorite ? '1' : '0',
            product_id: val.product_id.toString()
          }
          this.appBridge.userCollectProduct(json)
          this.appBridge.collectProductResult().then(res => {
            if (res.code == 0) {
              this.$toast('操作成功')
              const index = this.viewedList.findIndex(item => {
                return item.product_id === val.product_id
              })
              this.viewedList[index].is_favorite = !this.viewedList[index].is_favorite
            } else {
              this.$toast('操作失败')
            }
          })
          // let res = await this.appBridge.collectProductResult()
        } else {
          ('web2.0')
        }
      },
      moreCity() {
        if (this.isApp) {
          query.platform = 'app'
          this.appBridge.jumpWebHTML({
            path: 'local_play_foreign/more_city?platform=app'
          })
        } else {
          this.$router.push({
            path: `/local_play_foreign/more_city`
          })
        }
      }
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
      justify-content: center;
      align-items: center;
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
            align-items: center;
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
    .show-item {
      margin-top: 24px;
      padding: 22px 0 34px 0;
      height: 514px;
      background: #fff;
    }
  }
</style>

