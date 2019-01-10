<template>
  <div class="local-regiment-page"
    ref="refLocalRegimentPage">
    <section class="local-regiment"
      ref="refLocalRegiment">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 当季热门 -->
      <div class="hot-swiper">
        <h1 class="title">当季热门</h1>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="hot in hotList"
              :key="hot.title">
              <hot-item :proData="hot" />
            </div>
          </div>
        </div>
      </div>
      <!-- 热门目的地 -->
      <div class="hot-citys">
        <h1 class="title">热门目的地</h1>
        <div class="city-list">
          <hot-city-tag v-for="hotCity in hotCityList"
            :key="hotCity"
            :name="hotCity"
            @callOnTag="onCity" />
          <hot-city-tag className="more"
            name="更多目的地"
            @callOnTag="onMoreCity" />
        </div>
      </div>
      <!-- 稀饭精选 -->
      <div class="high-quality tours-tabs">
        <h1 class="title">稀饭精选</h1>
        <!-- 横向tabs -->
        <van-tabs v-model="selected"
          sticky
          swipeable
          :offset-top="headerHeight"
          @scroll="scrollTab">
          <!-- 国家标签 -->
          <div class="hq-tags"
            :class="{'fixed-tag': isFixedTags}">
            <hot-city-tag className="more"
              name="全部"
              @callOnTag="onCityAll" />
            <hot-city-tag v-for="hotCity in hotCityList"
              :key="hotCity"
              :name="hotCity"
              @callOnTag="onCity" />
          </div>
          <div class="tags-height" v-show="isFixedTags"></div>
          <!-- 列表 -->
          <van-tab class="high-quality-list-wrap"
            v-for="item in highQualities"
            :key="item"
            :id="item"
            :title="item">
            <div class="high-quality-list">
              <hot-item class="high-quality-item"
                v-for="item in highQualityList"
                :key="item.desc"
                tagPos="bottom"
                :isShowTitle="false"
                :proData="item" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {throttle as _throttle} from 'lodash'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import HotItem from '@/components/items/hotItem.vue'
  import HotCityTag from '@/components/tags/index.vue'

  export default {
    layout: 'defaultHeader',
    components: {
      HotItem,
      HotCityTag
    },
    data() {
      return {
        // swiper配置
        swiperOption: {
          // loop: true,
          slidesPerView: 'auto',
          spaceBetween: 10,
          slidesOffsetBefore: 16,
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
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '1这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1001,
            oriPrice: 2002
          },
          {
            type: [2],
            title: '标题2',
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1002,
            oriPrice: 2002
          },
          {
            type: [1],
            title: '标题3',
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '3这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1003,
            oriPrice: 2003
          }
        ],
        hotCityList: ['欧洲', '澳新', '东南亚', '日本', '汉密尔顿岛', '中国', '美国'],
        headerHeight: 44,
        highQualities: ['欧洲', '澳新', '东南亚', '日本', '中国', '马来西亚'],
        selected: '',
        highQualityList: [
          {
            type: [1, 2],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '1这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1001,
            oriPrice: 2002
          },
          {
            type: [2],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '2这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1002,
            oriPrice: 2002
          },
          {
            type: [1],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '3333这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1003,
            oriPrice: 2003
          },
          {
            type: [1],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '4444这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1004,
            oriPrice: 2004
          },
          {
            type: [2],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '5555这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1005,
            oriPrice: 2006
          },
          {
            type: [1],
            src: require('~/assets/imgs/local_regiment/hot_1@2x.png'),
            desc: '6这是一个测试,这是一个测试这是一个测试这是一个测试,这是一个测试这是一个测试',
            price: 1006,
            oriPrice: 2006
          }
        ],
        isFixedTags: false,
      }
    },
    mounted() {
      // 监听滚动
      this.$refs.refLocalRegimentPage.addEventListener('scroll', _throttle(this.scrollFn, 500))
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      onCity(tag) {
        console.log(tag)
      },
      onMoreCity() {
        console.log('更多')
      },
      onCityAll() {
        console.log('全部')
      },
      /**
       * 监听页面的滚动
       * @param val { scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
       */
      scrollTab(val) {
        console.log(val)
        if (val.isFixed) {
          this.isFixedTags = true
        } else {
          this.isFixedTags = false
        }
      },
      scrollFn() {
        window.requestAnimationFrame(() => {
          // console.log('scrollTop(获取/设置对象的最顶部到对象在当前窗口顶边的距离)+offsetHeight(获取元素的高度)')
          console.log(this.$refs.refLocalRegimentPage.scrollTop, this.$refs.refLocalRegimentPage.offsetHeight)
          // console.log('100vh高度', this.$refs.refLocalRegimentPage.offsetHeight)
          // console.log('获取滚动对象整体高度', this.$refs.refLocalRegiment.offsetHeight)
          const s1 = this.$refs.refLocalRegimentPage.scrollTop
          setTimeout(() => {
            const s2 = this.$refs.refLocalRegimentPage.scrollTop
            const direct = s2 - s1
            if (s1 === 0) {
              console.log('处于顶部')
              this.vxChangeHeaderStatus(HEADER_TYPE.TOP)
            } else if (direct > 0) {
              console.log('向下滚动')
              this.vxChangeHeaderStatus(HEADER_TYPE.DOWN)
            } else if (direct < 0) {
              console.log('向上滚动')
              this.vxChangeHeaderStatus(HEADER_TYPE.UP)
            }
          }, 17)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .local-regiment-page {
    font-size: 0;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .local-regiment {
    .banner {
      height: 312px;
      background: url('../../assets/imgs/local_regiment/bg_banner@2x.png') no-repeat 0
        0/100%;
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
      height: 268px;
      width: 100%;
      .city-list {
        padding: 28px;
      }
    }
    .high-quality {
      .title {
        padding-left: 32px;
      }
      .scroll-topbar {
        padding: 30px 0 10px;
        width: 100%;
        .mint-navbar {
          overflow-x: scroll;
          .mint-tab-item {
            min-width: 22%;
            .mint-tab-item-label {
              font-size: 32px !important;
            }
          }
        }
      }
      .hq-tags {
        background: #fff;
        height: 172px;
        padding: 24px 30px;
        &.fixed-tag {
          position: fixed;
          top: calc(92px + 44px + 40px);
          z-index: 999;
        }
      }
      .tags-height{
        height: 172px;
      }
      .high-quality-list-wrap {
        padding: 0 32px 32px;
        .high-quality-list {
          .high-quality-item {
            display: inline-block;
            margin-right: 10px;
            margin-top: 34px;
            width: 332px !important;
          }
        }
      }
    }
  }
</style>

