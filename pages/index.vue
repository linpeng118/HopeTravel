<template>
  <div class="home-wrap">
    <!--头部-->
    <div class="header">
      <!--下载广告-->
      <div class="down-box" v-if="closeDown">
        <div class="left" @click="closeDown = false">
          <van-icon name="close" />
          <span>下载稀饭APP，领新人福利</span>
        </div>
        <div class="right">
          <a href="https://www.baidu.com/">去下载</a>
        </div>
      </div>
      <!--搜索-->
      <div class="search-box">
        <nuxt-link tag="div" class="left" to="/search">
          <van-icon name="search" />
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
          <div class="img">
            <img :src="banner.image_url"/>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--标签-->
    <div class="entry-block">
      <nuxt-link tag="div" class="entry-tourism" :to="{ name: 'product_list', params: { itemType: 3 }}">
        <img src="../assets/imgs/home/icon_group.png" alt="">
        <p class="title">精品小团</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/local_play_zh">
        <img src="../assets/imgs/home/icon_play.png" alt="">
        <p class="title">当地玩乐</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/local_group">
        <img src="../assets/imgs/home/icon_local.png" alt="">
        <p class="title">当地跟团</p>
      </nuxt-link>
      <nuxt-link tag="div" class="entry-tourism" to="/custom">
        <img src="../assets/imgs/home/icon_day.png" alt="">
        <p class="title">一日游</p>
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
                          @selectDetail="selectItem"/>
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
  </div>
</template>

<script>
import HotPlace from '@/components/hot_place/index.vue'
import SnapUpItem from '@/components/items/snapUpItem'
import HotItem from '@/components/items/hotItem'
import {getHomeData, getHomeHotList} from '@/api/home'

export default {
  name: 'home',
  components: {
    HotPlace,
    SnapUpItem,
    HotItem
  },
  data() {
    return {
      closeDown: true,
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
      prodPagination: {}
    }
  },
  mounted() {
    this.getHomeInitData()
  },
  methods: {
    // 跳转商品详情
    selectItem(item) {
      this.$router.push({
        name: 'product-detail',
        query: {
          productId: item
        }
      })
    },
    // 目的地跳转列表
    selectDetail(detail) {
      this.$router.push({
        name: 'product_list',
        params: {
          itemType: 1,
          ...detail
        }
      })
    },
    async getHomeInitData() {
      let {code, data} = await getHomeData()
      if(code === 0) {
        let {banner,hot, special} = data
        this.bannerList = banner
        this.hotList = hot.data[0].destination
        this.timeSalesList = special.data
      }
    },
    async onLoad() {
      console.log('onload')
      const submitData = {
        page: (this.prodPagination.page || 0) + 1
      }
      const res = await getHomeHotList(submitData)
      this.productList.push(...res.data)
      this.prodPagination = res.pagination
      // 加载状态结束
      this.prodLoading = false
      // 数据全部加载完成
      if (!this.prodPagination.more) {
        this.prodFinished = true
      }
    },
    onHot() {}
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .home-wrap{
    background-color: #F1F1F1;
    .banner{
      height: 420px;
      img{
        height: 420px;
        width: 100%;
      }
    }
    .header{
      position: fixed;
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
        justify-content: space-between;
        align-items: center;
        font-size:24px;
        i{
          vertical-align: text-top;
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
        background-color: rgba(255,255,255,.7);
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          width:618px;
          height:72px;
          padding: 12px 14px;
          border-radius:36px;
          background-color: rgba(255,255,255,0.81);
          color: #989898;
          font-size: 48px;
        }
        .right {
          color: #fff;
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
      justify-content: space-between;
      padding:52px 48px;
      background-color: #fff;
      text-align: center;
      .entry-tourism{
        width: 96px;
        .title{
          color: #191919;
          margin-top: 12px;
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
        justify-content: space-between;
        align-items: center;
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
        flex-wrap: wrap;
      }
      .half-item{
        width: 50%;
      }
    }
  }
</style>
<style>
  .home-wrap .van-swipe__indicator--active{
    width: 32px;
    height:12px;
    border-radius: 6px;
  }
</style>
