<template>
  <section class="local-play-zh">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 热门城市 -->
    <!-- 最近浏览 -->
    <div class="recently-viewed"
      v-swiper:mySwiper="viewedSwiperOption">
      <h1 class="title">最近浏览</h1>
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="item in hotList"
          :key="item.id">
          <snap-up-item :proData="item">
          </snap-up-item>
        </div>
      </div>
    </div>
    <!-- 热门活动 -->
    <!-- 日本必去滑雪胜地 -->
    <!-- 冬季黄石热推 -->
    <!-- 各地热卖 -->
    <div class="hot-swiper"
      v-swiper:mySwiper="swiperOption">
      <h1 class="title">热门活动</h1>
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="hot in hotList"
          :key="hot.id">
          <hot-item :proData="hot" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import hotItem from '../components/items/hotItem'
  import snapUpItem from '../components/items/snapUpItem'

  export default {
    layout: 'defaultAll',
    components: {
      hotItem,
      snapUpItem
    },
    data() {
      return {
        // swiper配置
        viewedSwiperOption: {
          slidesPerView: 'auto',
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
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap() {
              console.log('onTap', this);
            }
          }
        },
        hotList: [
          {
            type: [1, 2],
            title: '标题1',
            src: require('../assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '1这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .local-play-zh {
    background: #f1f1f1;
    height: 100%;
    .banner {
      height: 312px;
      background: url(../assets/imgs/local_regiment/bg_banner@2x.png) no-repeat 0 0/100%;
    }
    .recently-viewed,
    .hot-swiper {
      width: 100%;
      background: #fff;
      .title {
        color: #191919;
        font-size: 40px;
        font-weight: 300;
        padding: 18px 0 28px;
      }
    }
    .recently-viewed {
      margin-top: 24px;
      padding-left: 32px;
      .swiper-wrapper {
        width: 100%;
        .swiper-slide {
          width: 686px !important;
          font-size: 38px;
        }
      }
    }
    .hot-swiper {
      height: 522px;
      width: 100%;
      padding-left: 32px;
      .swiper-wrapper {
        width: 100%;
        .swiper-slide {
          font-size: 38px;
          width: 332px !important;
          // padding-left: 32px;
        }
      }
    }
  }
</style>

