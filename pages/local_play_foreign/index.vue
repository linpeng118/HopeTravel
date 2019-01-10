<template>
  <section class="container">
    <div class="area-play">
      <!---->
      <div class="area-location">
        <div class="icon"></div>
        <div class="name">{{cityInfo.city.name}}</div>
      </div>
      <div class="area-main">
        <div class="area-info">
          {{cityInfo.city.description}}
        </div>
        <div class="area-search">
          <span class="icon-search"></span>
          <span class="search-box">查找{{cityInfo.city.name}}的活动</span>
        </div>
        <div class="area-entrance">
          <div class="c-title">
            <nuxt-link to="/">查看全部</nuxt-link>
            <span>当地玩乐</span>
          </div>
          <div class="guide-list">
            <ul>
              <nuxt-link tag="li" to="/">
                <span class="icon-guide-ticket"></span>
                <span class="text">门票演出</span>
              </nuxt-link>
              <nuxt-link tag="li" to="/">
                <span class="icon-guide-car"></span>
                <span class="text">一日游&当地交通</span>
              </nuxt-link>
              <nuxt-link tag="li" to="/">
                <span class="icon-guide-special"></span>
                <span class="text">特色体验</span>
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="area-image-bg" :style="bgstyle"></div>
  </section>
</template>

<script>
  import SwipeItem from '../components/items/swipeItem'
  import {getCityInfo} from '../api/city'
  export default {
    layout: 'defaultHeader',
    components: {
      SwipeItem
    },
    validate({ query }) { // 判断路由是否正确
      return query.touCityId
    },
    async asyncData({ query }) {
      console.log(query)
      let {data} = await getCityInfo(query.touCityId)
      return {
        cityInfo: data
      }
    },
    data() {
      return {
        cityId: this.$route.query.touCityId || 0,
        cityInfo: {}
      }
    },
    computed: {
      bgstyle() {
        return `background-image:url(${this.cityInfo.city.image})`
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
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
          display: inline-block;
          background: url('../../assets/imgs/icon_location@2x.png') no-repeat;
          background-size: 100%;
        }
        .search-box{
          flex: 1;
          font-size:32px;
          font-weight:300;
          color: #fff;
          padding-left:30px;
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
  }
</style>

