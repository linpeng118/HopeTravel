<template>
  <div class="home-wrap" ref="refHomePage">
    <!--头部-->
    <div class="header">
      <!--下载广告-->
      <template v-if="!isAndroid">
        <div class="down-box" v-if="closeDown === 'no'" ref="refDownBox">
          <div class="left" @click="changeCloseDown">
            <van-icon name="close" />
            <!--<span v-t="'homePage.downloadText'"></span>-->
            <span>{{$t('homePage.downloadText')}}</span>
          </div>
          <div class="right">
            <a :href="downUrl">去下载</a>
          </div>
        </div>
      </template>
      <!--搜索-->
      <div class="search-box" ref="searchBox">
        <nuxt-link tag="div" class="left" to="/search" id="searchLeft">
          <van-icon name="search" />
          <span>目的地/关键词</span>
        </nuxt-link>
        <nuxt-link tag="div" class="right" to="/personal" >
          <van-icon name="user-circle-o" />
        </nuxt-link>
      </div>
    </div>
    <!--banner-->
    <div class="banner">
      <van-swipe indicator-color="white">
        <van-swipe-item v-for="banner in bannerList" :key="banner.image_url">
          <div class="img" @click="bannerLink(banner.link_url)">
            <img :src="banner.image_url"/>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--标签-->
    <div class="entry-block">
      <nuxt-link tag="div" class="entry-tourism" to="/local_play_zh">
        <img src="../assets/imgs/home/icon_play.png" alt="">
        <p class="title">当地玩乐</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/local_group">
        <img src="../assets/imgs/home/icon_local.png" alt="">
        <p class="title">当地跟团</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" :to="{ name: 'product_list', query: { itemType: 1 }}">
        <img src="../assets/imgs/home/icon_group.png" alt="">
        <p class="title">精品小团</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/custom">
        <img src="../assets/imgs/home/icon_day.png" alt="">
        <p class="title">个性定制</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/visa">
        <img src="../assets/imgs/home/icon_visa.png" alt="">
        <p class="title">签证办理</p>
      </nuxt-link>
    </div>
    <!--热门目的地-->
    <div class="hot-target">
      <div class="title">
        <div class="name">热门目的地</div>
        <nuxt-link tag="div" class="link-all" to="/search">
          查看全部
          <van-icon name="arrow"/>
        </nuxt-link>
      </div>
      <hot-place :lists="hotList" @selectDetail="selectDetail"></hot-place>
    </div>
    <!--限时抢购-->
    <div class="sale-time-box"
         v-if="timeSalesList.length">
      <h1 class="title">限时特价</h1>
      <div v-swiper:mySwiper="viewedSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(sales,index) in timeSalesList"
               :key="sales.product_id + index">
            <snap-up-item :proData="sales"
                          :isCollect="false"
                          :isShowTime="true"
                          @selectDetail="selectItem">
              <div class="count-down" v-html="sales.time"></div>
            </snap-up-item>
          </div>
        </div>
      </div>
    </div>
    <!--精选商品-->
    <div class="product-list">
      <h1 class="title">精选商品</h1>
      <van-list class="half"
                v-model="prodLoading"
                :prodFinished="prodFinished"
                finished-text="没有更多了"
                @load="onLoad">
        <van-cell class="half-item"
                  tagPos="bottom"
                  v-for="product in productList"
                  :key="product.desc">
          <hot-item :isShowTitle="false"
                    :proData="product"
                    @selectItem="selectItem" />
        </van-cell>
      </van-list>
    </div>
    <!--悬浮-->
    <drift-aside ref="driftAside" :isHome="true" @backTop="backTop"></drift-aside>
  </div>
</template>

<script>
import HotPlace from '@/components/hot_place/index.vue'
import SnapUpItem from '@/components/items/snapUpItem'
import HotItem from '@/components/items/hotItem'
import {getHomeData, getHomeHotList} from '@/api/home'
import countDown from '@/components/count-down'
import DriftAside from '@/components/drift_aside'
import {throttle as _throttle} from 'lodash'
import {setCookieByKey,getCookieByKey} from '@/assets/js/utils'
import {mapGetters,mapMutations} from 'vuex'

export default {
  name: 'home',
  components: {
    HotPlace,
    SnapUpItem,
    HotItem,
    countDown,
    DriftAside
  },
  async asyncData({$axios}){
    let indexData
    let {code,data} = await $axios.$get('/api/index/mobile')
    if(code === 0 ) {
      indexData = data
    }
    return {
      indexData
    }
  },
  data() {
    return {
      // closeDown: process.client ? getCookieByKey(DOWN_CLOSE) || 'no' : '',
      productList: [],
      viewedSwiperOption: { // swiper配置
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
      timeSalesList: [], // 限时特价
      bannerList: [], // banner
      navList: [], // 小图标
      hotList: [], // 热门目的地
      prodLoading:false,
      prodFinished:false,
      prodPagination: {},
      isAndroid: this.$route.query.platform
      // isAndroid: process.client ? !!window.cordova : 'ww'
    }
  },
  computed: {
    ...mapGetters([
      'closeDown'
    ])
  },
  mounted() {
    this.getHomeInitData()
    this.getTime()
    // 监听滚动
    this.$refs.refHomePage.addEventListener('scroll',this.scrollFn)
    //
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      this.downUrl = 'http://www.htw.tourscool.net/uploads/tourscool.apk'
    } else if (u.indexOf('iPhone') > -1) {
      this.downUrl = 'https://itunes.apple.com/cn/app/稀饭旅行/id1449120712?mt=8'
    }
    // this.isAndroid = process.client ? !!window.cordova: ''
  },
  beforeDestroy() {
    this.$refs.refHomePage.removeEventListener('scroll', this.scrollFn)
  },
  methods: {
    // 判断手机是安卓还是苹果
    downUrl() {

    },
    // 转化为两位数
    numChangeT(n) {
      return n < 10 ? '0' + n : '' + n
    },
    // 倒计时时间转化
    timeToData( maxtime ) {
      let second = Math.floor( maxtime % 60);       //计算秒
      let minite = Math.floor((maxtime / 60) % 60); //计算分
      let hour = Math.floor((maxtime / 3600) % 24 ); //计算小时
      let day = Math.floor((maxtime / 3600) / 24);//计算天
      return `<span>${this.numChangeT(day)}</span>天<span>${this.numChangeT(hour)}</span>时<span>${this.numChangeT(minite)}</span>分<span>${this.numChangeT(second)}</span>秒`
      // return day+':'+this.numChangeT(hour)+':'+this.numChangeT(minite)+':'+this.numChangeT(second)
    },
    getTime() {
      setInterval(() => {
        this.timeSalesList.forEach(value => {
          var time = this.timeToData(value.special_end_date);
          if( typeof value.jishi == 'undefined' ) {
            this.$set(value,'time',time);
          } else {
            value.time = time
          }
          if( value.special_end_date ) {
            -- value.special_end_date
          } else {
            value.special_end_date = 0
          }
        })
      },1000)
    },
    // banner跳转
    bannerLink(link) {
      if(link.indexOf('?') < 0) {
        window.location.href = link
      } else {
        let query = link.split('?')[1].replace('keyword', 'keyWords')
        this.$router.push({
          path: `/product_list?${query}`,
        })
      }
    },
    // 跳转商品详情
    selectItem(item) {
      // this.$router.push({
      //   name: 'product-detail',
      //   query: {
      //     productId: item
      //   }
      // })
      let routeData = this.$router.resolve({
        name: 'product-detail',
        query: {
          productId: item
        }
      });
      window.open(routeData.href, '_blank')
    },
    // 目的地跳转列表
    selectDetail(query) {
      query.itemType = 0
      this.$router.push({
        name: 'product_list',
        query
      })
    },
    getHomeInitData() {
        this.bannerList = this.indexData[0].data
        this.hotList = this.indexData[1].data.slice(0, 8)
        this.timeSalesList = this.indexData[2].data
        // let {banner,hot, special} = data
        // this.bannerList = banner
        // this.hotList = hot.data[0].destination.slice(0,8)
        // this.timeSalesList = special.data
    },
    async onLoad() {
      console.log('onload')
      const submitData = {
        page: (this.prodPagination.page || 0) + 1
      }
      const res = await getHomeHotList(submitData)
      if(res.code === 0) {
        this.productList.push(...res.data)
        this.prodPagination = res.pagination
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      } else {
        console.log(res.msg)
        this.productList = []
        this.prodPagination= {}
        this.prodLoading = false
        this.prodFinished = false
      }
    },
    // 滚动
    scrollFn() {
      const s1 = this.$refs.refHomePage.scrollTop
      let SCROLL = 300
      const h1 = this.$refs.refDownBox && this.$refs.refDownBox.getBoundingClientRect().height
      let homeHeight = this.$refs.refHomePage.getBoundingClientRect().height
      // console.log(homeHeight)
      if(s1>homeHeight) {
        this.$refs.driftAside.homeScrollShow()
      } else{
        this.$refs.driftAside.homeScrollHide()
      }
      setTimeout(() => {
        if (s1 === 0) {
          this.$refs.searchBox.style.backgroundColor = `transparent`
          this.$refs.searchBox.style.color = `rgb(255,255,255)`
          document.getElementById('searchLeft').style.backgroundColor = `rgba(255,255,255,0.8)`
          document.getElementById('searchLeft').style.color = `#989898`
          this.$refs.searchBox.style.position = 'inherit'
          this.$refs.searchBox.style.top = 'auto'
        } else{
          let rate = s1/ SCROLL
          this.$refs.searchBox.style.backgroundColor = `rgba(255,255,255,${rate})`
          document.getElementById('searchLeft').style.backgroundColor = `rgba(200,200,200,${rate})`
          document.getElementById('searchLeft').style.color = `rgba(152,152,152,${rate})`
          this.$refs.searchBox.style.color = `rgba(152,152,152,${rate})`

          if(s1 > h1 || !h1) {
            this.$refs.searchBox.style.position = 'fixed'
            this.$refs.searchBox.style.top = '0px'
          }
        }
      }, 17)
    },
    // 返回顶部
    backTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.$refs.refHomePage.scrollTop / 3)
        this.$refs.refHomePage.scrollTop = this.$refs.refHomePage.scrollTop + speed
        if (this.$refs.refHomePage.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 17)
    },
    // 关闭下载
    changeCloseDown() {
      this.setCloseDown('yes')
    },
    ...mapMutations(['setCloseDown'])
  },
}
</script>

<style type="text/scss" lang="scss" scoped>
  .home-wrap{
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    .banner{
      height: 420px;
      img{
        height: 420px;
        width: 100%;
      }
    }
    .header{
      position: absolute;
      width: 100%;
      top: 0;
      z-index: 2100;
      .down-box{
        width: 100%;
        height: 80px;
        padding:0 32px;
        background-color: #398BF6;
        color: #fff;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        font-size:24px;
        i{
          vertical-align: text-bottom;
        }
        .right{
          a{
            height:40px;
            width:114px;
            display: block;
            line-height: 40px;
            background-color: #EFA11A;
            border-radius:20px;
            text-align: center;
            color: #fff;
          }
        }
      }
      .search-box{
        height:88px;
        /*background-color: rgba(255,255,255,.7);*/
        padding: 0 30px;
        display: flex;
        display: -webkit-flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        color: #fff;
        transition: 0.3s all;
        width: 100%;
        .left{
          width:618px;
          height:72px;
          padding: 12px 14px;
          border-radius:36px;
          background-color: rgba(255,255,255,0.8);
          color: #989898;
          display: flex;
          display: -webkit-flex;
          font-size: 42px;
          align-items: center;
          -webkit-align-items: center;
          transition: 0.3s all;
          span{
            font-size: 22px;
          }
        }
        .right {
          font-weight: bold;
          i{
            font-size: 60px;
            vertical-align: middle;
          }
        }
      }
    }

    .entry-block{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      padding:52px 48px;
      background-color: #fff;
      text-align: center;
      .entry-tourism{
        width: 96px;
        .title{
          color: #191919;
          font-size: 24px;
        }
        img{
          width: 88px;
          height: 88px;
        }
      }
    }
    .hot-target{
      padding: 12px 24px 12px 38px;
      background-color: #fff;
      .title{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding-bottom: 40px;
        .name{
          color: #191919;
          font-size:40px;
          font-weight:400;
        }
        .link-all{
          color: #5E5E5E;
          font-size: 24px;
        }
        i{
          vertical-align: text-top;
        }
      }
    }
    .sale-time-box{
      margin-top:24px;
      background-color: #fff;
      .swiper-container{
        z-index: 0;
        padding-right: 60px;
      }
      .title {
        color: #191919;
        font-size: 40px;
        font-weight: 300;
        padding: 24px 32px
      }
    }
    .product-list{
      background-color: #fff;
      margin-top:24px;
      .title {
        color: #191919;
        font-size: 40px;
        font-weight: 300;
        padding: 24px 32px
      }
      .half{
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        padding: 0 15px;
        display: -webkit-flex;
        -webkit-flex-wrap: wrap;
      }
      .half-item{
        width: 50%;
      }
      .van-cell{
        padding: 10px;
      }
    }
    .count-down{
      margin-left: 10px;
    }
  }
</style>
<style>
  .home-wrap .van-swipe__indicator--active{
    width: 32px;
    height:12px;
    border-radius: 6px;
  }
  .home-wrap .count-down span{
    width: 40px;
    display: inline-block;
    background-color: rgba(0,0,0,0.6);
    border-radius:6px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 6px;
  }
</style>
