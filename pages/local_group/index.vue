<template>
  <div class="local-group-page"
    ref="refLocalGroupPage">
    <section class="local-group"
      ref="refLocalGroup">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 下标（模块）[0] -->
      <div class="hot-swiper">
        <h1 class="title">{{localgroupData[0].moduleName}}</h1>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="module0 in localgroupData[0].data"
              :key="module0.title">
              <hot-item :proData="module0" />
            </div>
          </div>
        </div>
      </div>
      <!-- 下标（模块）[1] -->
      <div class="hot-citys">
        <h1 class="title">{{localgroupData[1].moduleName}}</h1>
        <div class="city-list">
          <hot-city-tag v-for="city in localgroupData[1].data"
            :key="city.title"
            :name="city.title"
            @callOnTag="onCity" />
          <hot-city-tag className="more"
            name="更多目的地"
            @callOnTag="onMoreCity" />
        </div>
      </div>
      <!-- 下标（模块）[2] -->
      <div class="high-quality tours-tabs">
        <h1 class="title">{{localgroupData[2].moduleName}}</h1>
        <!-- 横向tabs -->
        <van-tabs v-model="selected"
          sticky
          swipeable
          :offset-top="headerHeight"
          @click="clickTab"
          @scroll="scrollTab">
          <!-- 国家标签 -->
          <div class="hq-tags"
            :class="{'fixed-tag': isFixedTags}">
            <hot-city-tag className="more"
              name="全部"
              @callOnTag="onCityAll" />
            <hot-city-tag v-for="item in localgroupData[2].data[selected] && localgroupData[2].data[selected].sub"
              :key="item.title"
              :name="item.title"
              @callOnTag="onCity" />
          </div>
          <div class="tags-height"
            v-show="isFixedTags"></div>
          <!-- 列表 -->
          <van-tab class="high-quality-list-wrap"
            v-for="item in localgroupData[2].data"
            :key="item.title"
            :id="item.title"
            :title="item.title">
            <div class="high-quality-list">
              <hot-item class="high-quality-item"
                v-for="product in productList"
                :key="product.desc"
                tagPos="bottom"
                :isShowTitle="false"
                :proData="product" />
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
  import {getLocalgroup} from '@/api/local_group'
  import {getProductList} from '@/api/products'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'
  import {LIST_TYPE} from '@/assets/js/consts/products'
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
        LIST_TYPE,
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
        // 当前默认选择第0号
        selected: 0,
        // tag是否一起吸顶
        isFixedTags: false,
        // 距离顶部的高度
        headerHeight: 44,
        // 当地跟团数据
        localgroupData: [
          {moduleName: '', data: []},
          {moduleName: '', data: []},
          {moduleName: '', data: []},
        ],
        // 产品列表
        productList: [],
      }
    },
    mounted() {
      this.init()
      // 监听滚动
      this.$refs.refLocalGroupPage.addEventListener('scroll', _throttle(this.scrollFn, 500))
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      async init() {
        await this.getLocalgroupData()
        await this.getProductsData()
      },
      async getLocalgroupData() {
        try {
          const res = await getLocalgroup()
          console.log(res.data)
          this.localgroupData = res.data
          // 默认数据
        } catch (error) {
          console.log(error)
        }
      },
      async getProductsData(data = {}) {
        try {
          const submitData = {
            type: data.type || LIST_TYPE.LOCAL_GROUP,
            keyword: data.keyword || '',
            page: data.page || 0,
            page_size: data.page_size || 9,
            start_city: data.start_city || 0,
            stop_city: data.stop_city || 0,
            span_city: data.span_city || '34',
            tag: data.tag || 0,
            duration: data.duration || 0,
            price: data.price || 0,
            product_type: data.product_type || 0,
            category: data.category || '',
            order_by: data.order_by || '',
            order: data.order || '',
          }
          const res = await getProductList(submitData)
          this.productList = res.data
        } catch (error) {
          console.log(error)
        }
      },
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
       * @param index 标签索引，
       * @param title 标题
       */
      clickTab(index, title) {
        console.log(index, title)
        this.selected = index
      },
      /**
       * 监听页面的滚动
       * @param val { scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
       */
      scrollTab(val) {
        // console.log(val)
        if (val.isFixed) {
          this.isFixedTags = true
        } else {
          this.isFixedTags = false
        }
      },
      scrollFn() {
        // console.log('scrollTop(获取/设置对象的最顶部到对象在当前窗口顶边的距离)+offsetHeight(获取元素的高度)')
        console.log(this.$refs.refLocalGroupPage.scrollTop, this.$refs.refLocalGroupPage.offsetHeight)
        // console.log('100vh高度', this.$refs.refLocalGroupPage.offsetHeight)
        // console.log('获取滚动对象整体高度', this.$refs.refLocalGroup.offsetHeight)
        const s1 = this.$refs.refLocalGroupPage.scrollTop
        setTimeout(() => {
          const s2 = this.$refs.refLocalGroupPage.scrollTop
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
      },
    }
  }
</script>

<style lang="scss" scoped>
  .local-group-page {
    font-size: 0;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .local-group {
    .banner {
      height: 312px;
      background: url("../../assets/imgs/local_regiment/bg_banner@2x.png")
        no-repeat 0 0/100%;
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
      // height: 268px;
      width: 100%;
      .city-list {
        padding: 28px 28px 0;
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
      .tags-height {
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

