<template>
  <section class="local-play-foreign" ref="refLocalPlayForeign">
    <lay-header :title="title" :isSearch="false" :classBg="classBg" :barSearch="barSearch" :searchKeyWords="searchKeyWords" @leftClick="leftClick"></lay-header>
    <div v-if="!loadFail">
      <div class="area-play">
        <!---->
        <div class="area-location">
          <div class="icon"></div>
          <div class="name">{{cityInfo.name}}</div>
        </div>
        <div class="area-main" ref="refAreaMain">
          <div class="area-info">
            {{cityInfo.description}}
          </div>
          <div class="area-search" ref="refAreaSeach" @click="selectSearch">
            <span class="icon-search">
              <van-icon name="search" color="white" size="0.6rem" />
            </span>
            <span class="search-box">查找{{cityInfo.name}}的活动</span>
          </div>
          <div class="area-entrance">
            <div class="c-title" @click="selectProductList(null)">
              <div class="link">查看全部</div>
              <span>当地玩乐</span>
            </div>
            <div class="guide-list">
              <ul>
                <li v-for="category in categoryList" :key="category.type" @click="selectProductList(category.type_id)">
                  <span :class="iconChow(category.type)"></span>
                  <span class="text">{{category.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="area-image-bg" v-if="cityInfo" :style="bgStyle">
        <!--<img :src="cityInfo.image" alt="" @load="imageLoaded">-->
        <!--<img src="../../assets/imgs/local_regiment/bg_banner@2x.png" alt="" @load="imageLoaded">-->
      </div>
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
      <!--列表数据-->
      <div class="show-list">
        <div class="show-item"
             v-for="showItem in showList"
             :key="showItem.title"
             v-if="showItem.list.length">
          <swipe-item :proData="showItem" @selectItems="selectItem" />
        </div>
      </div>
    </div>
    <loading v-if="!loadFail && !showList.length "></loading>
  </section>
</template>

<script>
  import SwipeItem from '@/components/items/swipeItem'
  import {getCityInfo,getProductList} from '@/api/local_play'
  import LayHeader from '@/components/header/index.vue'
  import Loading from '@/components/loading'
  import {throttle as _throttle} from 'lodash'
  import {mapMutations} from 'vuex'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import {getUrlParam} from '@/assets/js/utils'
  import SnapUpItem from '@/components/items/snapUpItem'
  import { Toast } from 'vant'
  export default {
    // layout: 'defaultHeader',
    transition: 'page',
    components: {
      SwipeItem,
      LayHeader,
      Loading,
      SnapUpItem
    },
    validate({ query }) { // 判断路由是否正确
      return query.touCityId
    },
    async asyncData({query, $axios}) {
      let {data, code} = await getCityInfo($axios, query.touCityId)
      if(code === 0) {
        return {
          cityInfo: data.city,
          original: data,
          categoryList: data.category,
          loadFail: false,
          classBg: false
        }
      } else {
        Toast('加载失败')
        return {
          cityInfo: {},
          showList: [],
          categoryList: [],
          loadFail: true,
          classBg: true
        }
      }
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
        imgShow: false,
        title: '当地玩乐',
        barSearch: false,
        showList: [],
        searchKeyWords:'',
        categoryList: [],
        viewedList: [],
      }
    },
    computed: {
      // 城市背景图片处理
      bgStyle() {
        return `background-image:url(${this.cityInfo.image})`
      }
    },
    created() {
      this.showList = this._nomalLizeshowList(this.original)
    },
    mounted() {
      this.$refs.refLocalPlayForeign.addEventListener('scroll', _throttle(this.scrollFn, 500))
      if (this.getPlatForm()) {
        this.appBridge = require('@/assets/js/appBridge.js').default
        this.appBridge.hideNavigationBar()
        const localProductIds = this.appBridge.getLocalStorage().toString()
        console.log('localProductIds:' + localProductIds)
        this.getViewedList(localProductIds)
      }
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      // 返回上一级菜单
      leftClick () {
        if (this.getPlatForm()) {
          this.appBridge.backPreviousView()
        } else {
          this.$router.go(-1)
        }
      },
      // 判断是app还是web
      getPlatForm() {
        return getUrlParam('platform') ? true : false
      },
      // 判断显示icon
      iconChow(type) {
        if (type === 1) { // 门票演出
          return 'icon-guide-ticket'
        } else if(type === 2) { // 一日游
          return 'icon-guide-car'
        } else if(type === 3) { // 特色体验
          return 'icon-guide-special'
        }
      },
      // 初始化数据
      async getInit() {
        try {
          let {data, code} = await getCityInfo(this.cityId)
          if(code === 0) {
            this.cityInfo = data && data.city
            this.categoryList = data.category
            this.showList = this._nomalLizeshowList(data)
          } else {
            this.cityInfo = {}
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 获取最近浏览
      async getViewedList(ids) {
        let {data, code} = await getProductList(ids)
        if(code === 0) {
          this.viewedList = data
          console.log(this.viewedList)
        } else {
          this.viewedList = []
        }
      },
      // 跳转到详情页面
      selectItem(productId) {
        // console.log(productId)
        if(this.getPlatForm()) {
          // app详情跳转
          console.log('app详情跳转')
          this.appBridge.jumpProductDetailView({
            productID: productId
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
        if(this.getPlatForm()) {
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
          activity : '最新活动',
          boutique: '稀饭精选',
          welcome: '最受欢迎'
        }

        // if(data) return false
        let {activity,boutique,welcome} = data
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
        window.requestAnimationFrame(() => {
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
        })
      },
      selectProductList(typeId) {
        if(this.getPlatForm()) {
          let data = {
            'itemType': '2'
          }
          if (typeId !== null) {
            data.product_type = typeId.toString()
          }
          this.appBridge.jumpProductListView(data)
        } else {
          // web页面跳转
          console.log('web页面跳转')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .local-play-foreign{
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
  .area-play{
    position: relative;
    z-index: 1;
    .city-img{
      position: absolute;
      height: 786px;
      width: 100%;
      top:0;
      left: 0;
      background: url('../../assets/imgs/local_regiment/bg_banner@2x.png') no-repeat;
      background-size: cover;
      z-index: 0;
    }
    .area-location{
      padding-top: 156px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon{
        width: 52px;
        height: 62px;
        background: url('../../assets/imgs/icon_location@2x.png') no-repeat 0 10px;
        background-size: 100%;
        padding-top:10px;
      }
      .name{
        height: 86px;
        font-size:64px;
        font-weight:300;
        color:#fff;
        line-height: 86px;
      }
    }
    .area-main{
      margin: 0 32px;
      .area-info{
        padding: 20px;
        margin-top: 198px;
        background:rgba(0,0,0,0.4);
        border-radius:8px;
        color: #fff;
        font-size:22px;
      }
      .area-search{
        height:94px;
        background:rgba(255,255,255,0.45);
        border-radius:8px;
        margin: 20px 0 14px 0;
        padding: 24px;
        display: flex;
        .icon-search{
          width:44px;
          height:44px;
        }
        .search-box{
          flex: 1;
          font-size:32px;
          font-weight:300;
          color: #fff;
          padding-left:10px;
        }
      }
      .area-entrance{
        border-radius:8px;
        background: #fff;
        padding-bottom: 17px;
        .c-title{
          padding-left: 20px;
          font-size:24px;
          font-weight:300;
          color:#989898;
          line-height: 72px;
          .link{
            float: right;
            padding: 0 20px;
            color: #399EF6;
            text-decoration: none;
          }
        }
        .guide-list{
          li{
            height: 68px;
            padding: 13px 24px;
            display: flex;
            align-items: center;
            [class^=icon-guide]{
              height: 32px;
              width: 32px;
              margin-right: 14px;
            }
            .icon-guide-ticket{
              background: url('../../assets/imgs/icon_ticket@2x.png') no-repeat;
              background-size: 100%;
            }
            .icon-guide-car{
              background: url('../../assets/imgs/icon_car@2x.png') no-repeat;
              background-size: 100%;
            }
            .icon-guide-special{
              background: url('../../assets/imgs/icon_special@2x.png') no-repeat;
              background-size: 100%;
            }
            .text{
              color: #989898;
              font-size:32px;
              font-weight:300;
            }
          }
        }
      }
    }
  }
  .area-image-bg{
    position: absolute;
    width: 100%;
    height:874px;
    top: 0;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-color: #ccc;
    img{
      display:none;
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

