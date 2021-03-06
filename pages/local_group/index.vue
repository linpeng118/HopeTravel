<template>
  <div class="local-group-page"
    ref="refLocalGroupPage">
    <!-- header -->
    <search-header v-if="!isApp"
      :title="$t('tours.localGroup')"
      ref="refSearchHeader"
      @leftClick="leftClick"
      @rightClick="rightClick" />
    <!-- body -->
    <section class="local-group"
      ref="refLocalGroup">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 下标（模块）[0] -->
      <div class="hot-swiper"
        v-if="localgroupData[0].data.length">
        <h1 class="title">{{localgroupData[0].moduleName}}</h1>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="module0 in localgroupData[0].data"
              :key="module0.title">
              <hot-item :proData="module0"
                @click.native="onHot(module0.product_id)" />
            </div>
          </div>
        </div>
      </div>
      <!-- 下标（模块）[1] -->
      <div class="hot-citys"
        v-if="localgroupData[1].data.length">
        <h1 class="title">{{localgroupData[1].moduleName}}</h1>
        <div class="city-list">
          <hot-city-tag v-for="city in localgroupData[1].data"
            :key="city.title"
            :tag="city"
            @callOnTag="onHotCity(city)" />
          <hot-city-tag className="active"
            :tag="{title: $t('localGroupPage.moreDestinations')}"
            @callOnTag="onMoreCity" />
        </div>
      </div>
      <!-- 下标（模块）[2] -->
      <div class="high-quality tours-tabs"
        v-if="localgroupData[2].data.length">
        <h1 class="title">{{localgroupData[2].moduleName}}</h1>
        <!-- 横向tabs -->
        <van-tabs v-model="selected"
          sticky
          swipeable
          :offset-top="headerHeight"
          @click="clickTab"
          @scroll="scrollTab">
          <!-- 国家标签 -->
          <div class="hq-tags"
            :class="{'fixed-tag': isFixedTags}"
            :style="{paddingTop: isFixedTags ? `calc(100vw * ${isApp? 40 : 90} / 375 + 24px`: '24px'}">
            <hot-city-tag :class="{'active': activeCity===$t('all')}"
              :tag="{title: $t('all')}"
              @callOnTag="onCityAll" />
            <hot-city-tag v-for="item in localgroupData[2].data[selected] && localgroupData[2].data[selected].sub"
              :key="item.title"
              :tag="item"
              :class="{'active': activeCity===item.title}"
              @callOnTag="onCity(item)" />
          </div>
          <div class="tags-height"
            v-show="isFixedTags"></div>
          <!-- 列表 -->
          <van-tab class="high-quality-list-wrap"
            v-for="item in localgroupData[2].data"
            :key="item.title"
            :id="item.title"
            :title="item.title">
            <van-list class="high-quality-list tours-list-no-bb"
              v-model="prodLoading"
              :prodFinished="prodFinished"
              :finished-text="$t('noMore')"
              @load="onLoad">
              <van-cell class="high-quality-item"
                tagPos="bottom"
                v-for="product in productList"
                :key="product.desc">
                <hot-item :isShowTitle="false"
                  :proData="product"
                  @selectItem="onHot" />
              </van-cell>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
    </section>
    <!-- 加载态 -->
    <loading v-if="loading"
      style="z-index: 3000"></loading>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {throttle as _throttle} from 'lodash'
  import {getLocalgroup} from '@/api/local_group'
  import {getProductList} from '@/api/products'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import {LIST_TYPE} from '@/assets/js/consts/products'
  import SearchHeader from '@/components/header'
  import HotItem from '@/components/items/hotItem.vue'
  import HotCityTag from '@/components/tags/index.vue'
  import Loading from '@/components/loading'
  import {setCookieByKey} from '@/assets/js/utils'
  import {CURRENCY} from '@/assets/js/config'

  export default {
    layout: 'default',
    components: {
      SearchHeader,
      HotItem,
      HotCityTag,
      Loading
    },
    data() {
      return {
        CURRENCY,
        isApp: this.$route.query.platform,
        appVersion: this.$route.query.app_version,
        appLanguage: this.$route.query.language,
        appCurrency: this.$route.query.currency,
        appPhoneType: this.$route.query.phone_type,
        LIST_TYPE,
        loading: true,
        // swiper配置
        swiperOption: {
          // loop: true,
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetBefore: 16,
          on: {
            // tap() {
            //   console.log('onTap', this);
            // }
          }
        },
        // 当前默认选择第0号
        selected: 0,
        // tag是否一起吸顶
        isFixedTags: false,
        // 距离顶部的高度,只能通过计算属性获取。是变量。不同尺寸显示不同
        headerHeight: 44,
        // 当地跟团数据
        localgroupData: [
          {moduleName: '', data: []},
          {moduleName: '', data: []},
          {moduleName: '', data: []},
        ],
        activeCity: '全部',
        // 产品列表
        productList: [],
        prodPagination: {}, // 分页数据
        prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
        prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      }
    },
    head() {
      return {
        title: '当地跟团'
      }
    },
    watch: {
      isFixedTags() {
        // console.log(this.$refs.refSearchHeader.$el.offsetHeight)
        this.headerHeight = this.isApp ? 0 : this.$refs.refSearchHeader.$el.offsetHeight
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
        } else {
          this.appBridge = require("@/assets/js/appBridge").default;
          // 货币
          let currency = await this.appBridge.obtainUserCurrency()
          // 安卓只能返回JSON字符串
          if (this.appBridge.browserVersion && this.appBridge.browserVersion.isAndroid()) {
            setCookieByKey(CURRENCY, currency)
          } else {
            setCookieByKey(CURRENCY, currency.userCurrency)
          }
        }
      }
    },
    async mounted() {
      // 初始化
      this.init()
      // 监听滚动
      this.$refs.refLocalGroupPage.addEventListener('scroll', this.scrollFn)
    },
    beforeDestroy() {
      this.$refs.refLocalGroupPage.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus', // 修改头部状态
        vxSetPlatform: 'setPlatform', // 设置品台
        vxSetLanguage: "setLanguage", // 设置语言
        vxSetCurrency: "setCurrency", // 设置货币
        vxSetPhoneType: "setPhoneType", // 设置机型
        vxSetAppVersion: "setAppVersion" // 设置版本
      }),
      // rightClick
      rightClick() {
        this.$router.push({
          path: '/search'
        })
      },
      async init() {
        await this.getLocalgroupData()
        if (this.localgroupData[2].data && this.localgroupData[2].data.length) {
          await this.getProductListData()
        }
      },
      // 获取当地跟团数据
      async getLocalgroupData() {
        try {
          const res = await getLocalgroup()
          // 初始化本地跟团数据
          this.localgroupData = res.data
        } catch (error) {
          // console.log(error)
        }
      },
      // 获取产品列表
      async getProductListData(val = {}) {
        this.loading = true
        const submitData = {
          type: LIST_TYPE.LOCAL_GROUP,
          start_city: val.start_city || null,
          stop_city: val.stop_city || null,
          span_city: val.span_city || null,
          product_type: val.product_type || null,
          category: val.category || null, // 横向tag
        }
        let {code, data, pagination, msg} = await getProductList(submitData)
        // 初始化产品列表
        if (code === 0) {
          this.productList = data
          this.prodPagination = pagination
        }
        // console.log(this.productList)
        this.loading = false
      },
      // 返回上一级页面
      leftClick() {
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('backPreviousView')
          } else {
            this.appBridge.backPreviousView()
          }
        } else {
          let href = window.location.href.slice(-1)
          if(href == '#'){
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        }
      },
      // 点击当季热门item
      onHot(productId) {
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
          // let routeData = this.$router.resolve({
          //   name: 'product-detail',
          //   query: {
          //     productId
          //   }
          // });
          // window.open(routeData.href, '_blank')
          this.$router.push({
            name: 'product-detail',
            query: {
              productId
            }
          })
        }
      },
      onHotCity(hotCity) {
        console.log('hotCity', hotCity)
        if (this.isApp) {
          const params = {
            'item_type': String(LIST_TYPE.LOCAL_GROUP),
            'category': String(hotCity.category),
            'product_type': String(hotCity.product_type),
            'span_city': String(hotCity.span_city),
            'start_city': String(hotCity.start_city),
            'placeholder': String(hotCity.title),
          }
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpProductListView', params)
          } else {
            this.appBridge.jumpProductListView(params)
          }
        } else {
          let query = {
            keyword: encodeURIComponent(hotCity.title),
            itemType: '1',
            category: hotCity.category || null,
            product_type: hotCity.product_type || null,
            span_city: hotCity.span_city || null,
            start_city: hotCity.start_city || null,
          }
          this.$router.push({
            name: 'product_list-play_foreign',
            query
          })
          // console.log(hotCity)
        }
      },
      onMoreCity() {
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpDestinationView')
          } else {
            this.appBridge.jumpDestinationView()
          }
        } else {
          // console.log('web操作更多城市')
          this.$router.push({
            path: '/search'
          })
        }
      },
      /**
       * 点击目的地
       * @param index 标签索引
       * @param title 标题
       */
      clickTab(index, title) {
        this.selected = index
        this.category = this.localgroupData[2].data[index].category
        this.startCity = this.localgroupData[2].data[index].start_city
        this.spanCity = this.localgroupData[2].data[index].span_city
        const submitData = {
          category: this.category,
          start_city: this.start_city,
          span_city: this.span_city,
        }
        // console.log(submitData)
        this.getProductListData(submitData)
      },
      // 点击全部城市
      onCityAll() {
        this.activeCity = this.$t('all')
        this.getProductListData()
      },
      // 精选下的城市
      onCity(city) {
        this.activeCity = city.title
        this.category = city.category
        this.startCity = city.start_city
        this.spanCity = city.span_city
        this.getProductListData({
          category: this.category,
          start_city: this.startCity,
          span_city: this.spanCity,
        })
      },
      /**
       * 监听页面的滚动
       * @param val { scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
       */
      scrollTab(val) {
        if (val.isFixed) {
          this.isFixedTags = true
        } else {
          this.isFixedTags = false
        }
      },
      // 监听滚动
      scrollFn() {
        // console.log('scrollTop(获取/设置对象的最顶部到对象在当前窗口顶边的距离)+offsetHeight(获取元素的高度)')
        // console.log(this.$refs.refLocalGroupPage.scrollTop, this.$refs.refLocalGroupPage.offsetHeight)
        // console.log('100vh高度', this.$refs.refLocalGroupPage.offsetHeight)
        // console.log('获取滚动对象整体高度', this.$refs.refLocalGroup.offsetHeight)
        const s1 = this.$refs.refLocalGroupPage.scrollTop
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('webViewScrollViewDidScroll', {top: s1.toString()})
          } else {
            this.appBridge.webViewScrollViewDidScroll({top: s1.toString()});
          }
        }
        setTimeout(() => {
          const s2 = this.$refs.refLocalGroupPage.scrollTop
          const direct = s2 - s1
          if (s1 === 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.TOP)
          } else if (direct > 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.DOWN)
          } else if (direct < 0) {
            this.vxChangeHeaderStatus(HEADER_TYPE.UP)
          }
        }, 17)
      },
      // 滚动产品列表到底出发
      async onLoad() {
        console.log('onLoad')
        // 异步更新数据
        if (this.prodPagination.more) {
          const submitData = {
            type: LIST_TYPE.LOCAL_GROUP,
            page: this.prodPagination.page + 1,
            category: this.category,
            start_city: this.startCity,
            span_city: this.spanCity,
          }
          // console.log(submitData)
          const res = await getProductList(submitData)
          this.productList.push(...res.data)
          this.prodPagination = res.pagination
          // console.log('get more over', this.productList)
        } else {
          // console.log('no more')
        }
        // 加载状态结束
        this.prodLoading = false;
        // 数据全部加载完成
        this.prodFinished = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .local-group-page {
    font-size: 0;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .local-group {
    .banner {
      height: 312px;
      background: url("../../assets/imgs/local_regiment/bg_banner@2x.png")
        no-repeat 0 0/100%;
    }
    .hot-swiper,
    .hot-citys,
    .high-quality {
      margin-top: 24px;
      padding: 30px 0 34px;
      background: #fff;
      .title {
        padding-left: 32px;
        color: #191919;
        font-size: 40px;
        font-weight: 300;
      }
    }
    .hot-swiper {
      height: 522px;
      .swiper-wrapper {
        margin-top: 28px;
        .swiper-slide {
          font-size: 38px;
          width: 332px !important;
        }
      }
    }
    .hot-citys {
      // height: 268px;
      width: 100%;
      .city-list {
        padding: 28px 28px 0;
      }
    }
    .high-quality {
      .title {
        padding-left: 32px;
      }
      .hq-tags {
        padding: 24px 30px;
        background: #fff;
        width: 100%;
        overflow: hidden;
        &.fixed-tag {
          position: fixed;
          top: 0;
          z-index: 9;
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
        }
      }
      .tags-height {
        height: 172px;
      }
      .high-quality-list-wrap {
        padding: 0 15px;
        .high-quality-list {
          padding: 0 15px;
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          display: -webkit-flex;
          -webkit-flex-wrap: wrap;
          .high-quality-item {
            display: inline-block;
            margin-top: 34px;
            padding: 8px;
            width: 50%;
          }
        }
      }
    }
  }
</style>

