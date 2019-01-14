<template>
  <section class="local-play-foreign" ref="refLocalPlayForeign">
    <lay-header :title="title" :isSearch="false" :barSearch="barSearch" :searchKeyWords="searchKeyWords"></lay-header>
    <div v-if="showList.length">
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
          <div class="area-search" ref="refAreaSeach">
          <span class="icon-search">
            <van-icon name="search" color="white" size="0.6rem" />
          </span>
            <span class="search-box">查找{{cityInfo.name}}的活动</span>
          </div>
          <div class="area-entrance">
            <div class="c-title">
              <nuxt-link to="/">查看全部</nuxt-link>
              <span>当地玩乐</span>
            </div>
            <div class="guide-list">
              <ul>
                <li v-for="category in categoryList" :key="category.type">
                  <span class="icon-guide-ticket" v-if="category.type === 1"></span>
                  <span class="icon-guide-ticket" v-if="category.type === 2"></span>
                  <span class="icon-guide-ticket" v-if="category.type === 3"></span>
                  <span class="icon-guide-ticket" v-if="category.type === 3"></span>
                  <span class="text">门票演出</span>
                </li>
                <!--<nuxt-link tag="li" to="/">-->
                  <!--<span class="icon-guide-car"></span>-->
                  <!--<span class="text">一日游&当地交通</span>-->
                <!--</nuxt-link>-->
                <!--<nuxt-link tag="li" to="/">-->
                  <!--<span class="icon-guide-special"></span>-->
                  <!--<span class="text">特色体验</span>-->
                <!--</nuxt-link>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="area-image-bg" v-if="cityInfo" :style="bgStyle">
        <!--<img :src="cityInfo.image" alt="" @load="imageLoaded">-->
        <!--<img src="../../assets/imgs/local_regiment/bg_banner@2x.png" alt="" @load="imageLoaded">-->
      </div>
      <div class="show-list">
        <div class="show-item"
             v-for="showItem in showList"
             :key="showItem.title"
             v-if="showItem.list.length">
          <swipe-item :proData="showItem" />
        </div>
      </div>
      <div style="height: 2000px;"></div>
    </div>
    <loading v-if="!showList.length"></loading>
  </section>
</template>

<script>
  import SwipeItem from '@/components/items/swipeItem'
  import {getCityInfo} from '@/api/local_play'
  import LayHeader from '@/components/header/index.vue'
  import Loading from '@/components/loading'
  import {throttle as _throttle} from 'lodash'
  import {mapMutations} from 'vuex'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  export default {
    // layout: 'defaultHeader',
    components: {
      SwipeItem,
      LayHeader,
      Loading
    },
    validate({ query }) { // 判断路由是否正确
      return query.touCityId
    },
    async asyncData({query, $axios}) {
      let {data, code} = await getCityInfo($axios, query.touCityId)
      if(code === 0) {
        return {
          cityInfo: data.city,
          original: data
        }
      } else {
        return {
          cityInfo: {},
          showList: []
        }
      }
    },
    data() {
      return {
        imgShow: false,
        title: '当地玩乐',
        barSearch: false,
        showList: [],
        searchKeyWords:'',
        categoryList: []
      }
    },
    computed: {
      // 城市背景图片处理
      bgStyle() {
        return `background-image:url(${this.cityInfo.image})`
      }
    },
    created() {
      // this.getInit()
      this.showList = this._nomalLizeshowList(this.original)
    },
    mounted() {
      this.$refs.refLocalPlayForeign.addEventListener('scroll', _throttle(this.scrollFn, 500))
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      // 初始化数据
      async getInit() {
        try {
          let {data, code} = await getCityInfo(this.cityId)
          if(code === 0) {
            this.cityInfo = data && data.city
            this.categoryList = data.category
            this.showList = this._nomalLizeshowList(data)
            console.log(this.showList)
          } else {
            this.cityInfo = {}
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 序列化数据
      _nomalLizeshowList(data) {
        let obj = {
          activity : '最新活动',
          boutique: '稀饭精选',
          welcome: '最受欢迎'
        }
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
        // console.log('scrollTab');
      },
      // 滚动监听显示header
      scrollFn() {
        window.requestAnimationFrame(() => {
          // console.log('滚动高度', this.$refs.refLocalPlayForeign.scrollTop)
          // console.log('refAreaMain', this.$refs.refAreaMain.offsetHeight)
          const s1 = this.$refs.refLocalPlayForeign.scrollTop
          const s3 = this.$refs.refAreaMain.offsetHeight
          setTimeout(() => {
            const s2 = this.$refs.refLocalPlayForeign.scrollTop
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
          a{
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

