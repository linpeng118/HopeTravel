<template>
  <section class="local-play-zh">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 热门城市 -->
    <hot-city/>
    <!-- 最近浏览 -->
    <div class="recently-viewed">
      <h1 class="title">最近浏览</h1>
      <div v-swiper:mySwiper="viewedSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="viewed in viewedList"
            :key="viewed.title">
            <snap-up-item :proData="viewed" @callCollect="doCollect"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表：热门活动/日本必去滑雪胜地/冬季黄石热推/各地热卖 -->
    <!-- <swiper-list :proData="showList" /> -->
    <div class="show-list">
      <div class="show-item"
        v-for="showItem in showList"
        :key="showItem.title">
        <swipe-item :proData="showItem" />
      </div>
    </div>
    <!-- 底部距离 -->
    <div class="footer-margin"></div>
  </section>
</template>

<script>
  import SnapUpItem from '../components/items/snapUpItem'
  import SwipeItem from '../components/items/swipeItem'
  import HotCity from './partial/hotCity'
  
  export default {
    layout: 'defaultAll',
    components: {
      HotCity,
      SnapUpItem,
      SwipeItem
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
        // 最近浏览列表
        viewedList: [
          {
            type: [1, 2],
            title: '标题1',
            src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '1最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览',
            price: 1001,
            oriPrice: 2002
          },
          {
            type: [2],
            title: '标题2',
            src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '2最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览',
            price: 1002,
            oriPrice: 2002
          },
          {
            type: [1],
            title: '标题3',
            src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '3最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览',
            price: 1003,
            oriPrice: 2003
          },
          {
            type: [2],
            title: '标题4',
            src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '3最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览最近浏览',
            price: 1004,
            oriPrice: 2004
          }
        ],
        showList: [
          {
            title: '热门活动',
            list: [
              {
                type: [1, 2],
                title: '热门活1',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '11热门活动热门活动热门活动热门活动热门活动',
                price: 1001,
                oriPrice: 2002
              },
              {
                type: [2],
                title: '标题2',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1002,
                oriPrice: 2002
              },
              {
                type: [1],
                title: '标题3',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1003,
                oriPrice: 2003
              }
            ],
          },
          {
            title: '日本必去滑雪胜地',
            list: [
              {
                type: [1, 2],
                title: '标题1',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '1日本必去滑雪胜地日本必去滑雪胜地日本必去滑雪胜地日本必去滑雪胜地日本必去滑雪胜地日本必去滑雪胜地',
                price: 1001,
                oriPrice: 2002
              },
              {
                type: [2],
                title: '标题2',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1002,
                oriPrice: 2002
              },
              {
                type: [1],
                title: '标题3',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1003,
                oriPrice: 2003
              }
            ],
          },
          {
            title: '冬季黄石热推',
            list: [
              {
                type: [1, 2],
                title: '标题1',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '1冬季黄石热推冬季黄石热推冬季黄石热推冬季黄石热推冬季黄石热推冬季黄石热推冬季黄石热推冬季黄石热推',
                price: 1001,
                oriPrice: 2002
              },
              {
                type: [2],
                title: '标题2',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1002,
                oriPrice: 2002
              },
              {
                type: [1],
                title: '标题3',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1003,
                oriPrice: 2003
              }
            ],
          },
          {
            title: '各地热卖',
            list: [
              {
                type: [1, 2],
                title: '标题1',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '1各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖各地热卖',
                price: 1001,
                oriPrice: 2002
              },
              {
                type: [2],
                title: '标题2',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1002,
                oriPrice: 2002
              },
              {
                type: [1],
                title: '标题3',
                src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
                desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
                price: 1003,
                oriPrice: 2003
              }
            ],
          },
        ],
      }
    },
    methods: {
      doCollect(val) {
        console.log(val)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .local-play-zh {
    background: #f1f1f1;
    .banner {
      height: 312px;
      background: url(../assets/imgs/local_regiment/bg_banner@2x.png) no-repeat 0
        0/100%;
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
      height: 24px;
      width: 100%;
    }
  }
</style>

