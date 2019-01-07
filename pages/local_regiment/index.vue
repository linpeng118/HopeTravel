<template>
  <section class="container">
    <!-- banner -->
    <div class="banner"></div>
    <!-- 当季热门 -->
    <div class="hot-swiper"
      v-swiper:mySwiper="swiperOption">
      <h1 class="title">当季热门</h1>
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="hot in hotList"
          :key="hot.id">
          <hot-item :proData="hot" />
        </div>
      </div>
    </div>
    <!-- 热门目的地 -->
    <div class="hot-citys">
      <h1 class="title">热门目的地</h1>
      <hot-city-tag v-for="hotCity in hotCityList"
        :key="hotCity"
        :name="hotCity"
        @callOnTag="onCity" />
      <hot-city-tag className="more"
        name="更多目的地"
        @callOnTag="onMoreCity" />
    </div>
    <!-- 稀饭精选 -->
    <div class="high-quality">
      <h1 class="title">稀饭精选</h1>
      <!-- 国家-滑动tab -->
      <div class="scroll-topbar">
        <mt-navbar v-model="selected">
          <mt-tab-item :id="item"
            v-for="item in highQualities"
            :key="item">{{item}}</mt-tab-item>
        </mt-navbar>
      </div>
      <!-- 国家标签 -->
      <div class="hq-tags">
        <hot-city-tag className="more"
          name="全部"
          @callOnTag="onCityAll" />
        <hot-city-tag v-for="hotCity in hotCityList"
          :key="hotCity"
          :name="hotCity"
          @callOnTag="onCity" />
      </div>
      <!-- 列表 -->
      <mt-tab-container class="high-quality-list-wrap"
        v-model="selected">
        <mt-tab-container-item :id="selected">
          <div class="high-quality-list">
            <hot-item class="high-quality-item"
              v-for="item in highQualityList"
              :key="item.desc"
              tagPos="bottom"
              :isShowTitle="false"
              :proData="item" />
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </section>
</template>

<script>
  import {Swipe, SwipeItem, Navbar, TabItem} from 'mint-ui';
  import HotItem from './components/items/hotItem.vue';
  import HotCityTag from './components/tags/index.vue';

  export default {
    layout: 'defaultHeader',
    components: {
      Swipe,
      SwipeItem,
      Navbar,
      TabItem,
      HotItem,
      HotCityTag
    },
    data() {
      return {
        // swiper配置
        swiperOption: {
          // loop: true,
          slidesPerView: 2,
          spaceBetween: 10,
          // centeredSlides: true,
          // pagination: {
          //   el: '.swiper-pagination',
          //   dynamicBullets: true
          // },
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
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '1这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1001,
            oriPrice: 2002
          },
          {
            type: [2],
            title: '标题2',
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1002,
            oriPrice: 2002
          },
          {
            type: [1],
            title: '标题3',
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1003,
            oriPrice: 2003
          }
        ],
        hotCityList: ['欧洲', '澳新', '东南亚', '日本', '汉密尔顿岛', '中国', '美国'],
        highQualities: ['欧洲', '澳新', '东南亚', '日本', '中国', '马来西亚'],
        selected: '',
        highQualityList: [
          {
            type: [1, 2],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '1这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1001,
            oriPrice: 2002
          },
          {
            type: [2],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1002,
            oriPrice: 2002
          },
          {
            type: [1],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '3333这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1003,
            oriPrice: 2003
          },
          {
            type: [1],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '4444这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1004,
            oriPrice: 2004
          },
          {
            type: [2],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '5555这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1005,
            oriPrice: 2006
          },
          {
            type: [1],
            src: require('./assets/imgs/hot_1@2x.png'),
            desc: '6这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1006,
            oriPrice: 2006
          }
        ],
      }
    },
    mounted() {
      // this.mySwiper.slideTo(3)
    },
    methods: {
      onCity(tag) {
        console.log(tag)
      },
      onMoreCity() {
        console.log('更多')
      },
      onCityAll() {
        console.log('全部')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    background: #f1f1f1;
    height: 100%;
    .banner {
      height: 312px;
      background: url(assets/imgs/bg_banner@2x.png) no-repeat 0 0/100%;
    }
    .hot-swiper,
    .hot-citys,
    .high-quality {
      background: #fff;
      .title {
        color: #191919;
        font-size: 40px;
        font-weight: 300;
        padding: 30px 0;
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
    .hot-citys {
      margin-top: 24px;
      padding: 0 30px;
      height: 268px;
      width: 100%;
      font-size: 0;
    }
    .high-quality {
      margin-top: 24px;
      .title {
        padding-left: 32px;
      }
      .scroll-topbar {
        width: 100%;
        .mint-navbar {
          overflow-x: scroll;
          .mint-tab-item {
            min-width: 22%;
          }
        }
      }
      .hq-tags {
        margin-top: 10px;
        padding: 0 30px;
        font-size: 0;
      }
      .high-quality-list-wrap {
        padding: 0 32px;
        .high-quality-list {
          .high-quality-item {
            display: inline-block;
            margin-right: 10px;
            margin-top: 34px;
          }
        }
      }
    }
  }
</style>

