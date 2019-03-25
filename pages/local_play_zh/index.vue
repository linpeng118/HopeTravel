<template>
  <div class="local-play-zh"
    ref="refLocalPlayPage">
    <lay-header v-if="!isApp"
      title="当地玩乐"
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
  import {PRODUCTIDS} from '@/assets/js/config'
  import {setCookieByKey,getLocalStore} from '@/assets/js/utils'
  import {addFavorite,delFavorite} from '@/api/products'
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
    // async asyncData({$axios}) {
    //   let {data, code} = await getPlay($axios)
    //   console.log(data)
    //   if (code === 0) {
    //     return {
    //       original: data
    //     }
    //   } else {
    //     return {
    //       original: []
    //     }
    //   }
    // },
    fetch({store}) {
    },
    created() {
    },
    head() {
      return {
        title: '当地玩乐'
      }
    },
    async mounted() {
      // 监听滚动
      this.$refs.refLocalPlayPage.addEventListener('scroll', _throttle(this.scrollFn, 100))
      this.init()
      if (this.isApp) {
        this.appBridge = require('@/assets/js/appBridge.js').default
        // this.appBridge.hideNavigationBar()
        let currency = await this.appBridge.obtainUserCurrency()

        setCookieByKey('currency', currency.userCurrency)
        let productIds = await this.appBridge.getLocalStorage()
        if (productIds) {
          this.getViewedList(productIds)
        }
        let token = await this.appBridge.obtainUserToken()
        this.vxChangeTokens(token)
      } else {
        let productIds = getLocalStore('browsList')
        if(productIds && productIds.length) {
          this.getViewedList(productIds)
        }
      }
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus', // 修改头部状态
        vxChangeTokens: 'setToken', // 改变token
      }),
      // 头部返回按钮
      leftClick() {
        if (this.isApp) {
          //app
          this.appBridge.backPreviousView()
        } else {
          //web
          this.$router.go(-1)
        }
      },
      //
      rightClick() {
        this.$router.push({
          path: '/search'
        })
      },
      // 跳转到详情页面
      selectItem(productId) {
        if (this.isApp) {
          // app详情跳转
          var json = {productID: productId.toString()}
          this.appBridge.jumpProductDetailView(json)
        } else {
          // m跳转
          // console.log('m跳转')
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
        let {data, code} = await getPlay()
        if (code === 0) {
          this.showList = this._nomalLizeshowList(data)
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
      doCollect(val) {
        // console.log(val)
      },
      // 滚动监听显示header
      scrollFn() {
        const s1 = this.$refs.refLocalPlayPage.scrollTop
        if (this.isApp) {
          this.appBridge.webViewScrollViewDidScroll({'top': s1.toString()})
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
          // query.platform = 'app'
          this.appBridge.jumpWebHTML({
            path: `local_play_foreign?touCityId=${cityId}&platform=app`
          })
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
          query.platform = 'app'
          // jumpWebHTML
          this.appBridge.jumpWebHTML({
            path: 'local_play_foreign/more_city?platform=app'
          })
        } else {
          this.$router.push({
            path: `/local_play_foreign/more_city`,
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
              let index = this.viewedList.findIndex(item => {
                return item.product_id === val.product_id
              })
              this.viewedList[index].is_favorite = !this.viewedList[index].is_favorite
            } else {
              this.$toast('操作失败')
            }
          })
          // let res = await this.appBridge.collectProductResult()
        } else {
          // console.log(val.product_id)
          this.addCollectOrNot(val)
        }
      },
      // 取消收藏和添加收藏
      async addCollectOrNot(val) {
        if(!this.isApp) {
          if(val.is_favorite) {
            let {code} =  await delFavorite({
              product_id: val.product_id
            })
            if(code===0) {
              this.$toast('取消收藏')
            } else {
              this.$toast('取消收藏失败')
            }
          } else {
            let {code} =  await addFavorite({
              product_id: val.product_id
            })
            if(code===0) {
              this.$toast('收藏成功')
            } else {
              this.$toast('收藏失败')
            }
          }
          const index = this.viewedList.findIndex(item => {
            return item.product_id === val.product_id
          })
          this.viewedList[index].is_favorite = !this.viewedList[index].is_favorite
        }
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

