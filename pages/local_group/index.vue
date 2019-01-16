<template>
  <div class="local-group-page"
    ref="refLocalGroupPage">
    <!-- header -->
    <search-header :title="'当地跟团'" @leftClick="leftClick" />
    <!-- body -->
    <section class="local-group"
      ref="refLocalGroup">
      <!-- banner -->
      <div class="banner"></div>
      <!-- 下标（模块）[0] -->
      <div class="hot-swiper" v-if="localgroupData[0].data.length">
        <h1 class="title">{{localgroupData[0].moduleName}}</h1>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="module0 in localgroupData[0].data"
              :key="module0.title">
              <hot-item :proData="module0"
                @click.native="onHot(module0.product_id)" />
            </div>
          </div>
        </div>
      </div>
      <!-- 下标（模块）[1] -->
      <div class="hot-citys" v-if="localgroupData[1].data.length">
        <h1 class="title">{{localgroupData[1].moduleName}}</h1>
        <div class="city-list">
          <hot-city-tag v-for="city in localgroupData[1].data"
            :key="city.title"
            :tag="city"
            @callOnTag="onHotCity(city)" />
          <hot-city-tag className="more"
            :tag="{title: '更多目的地'}"
            @callOnTag="onMoreCity" />
        </div>
      </div>
      <!-- 下标（模块）[2] -->
      <div class="high-quality tours-tabs" v-if="localgroupData[2].data.length">
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
              :tag="{title: '全部'}"
              @callOnTag="onCityAll" />
            <hot-city-tag v-for="item in localgroupData[2].data[selected] && localgroupData[2].data[selected].sub"
              :key="item.title"
              :tag="item"
              @callOnTag="onCity(item)" />
          </div>
          <div class="tags-height"
            v-show="isFixedTags"></div>
          <!-- 列表 -->
          <van-tab class="high-quality-list-wrap"
            v-for="item in localgroupData[2].data"
            :key="item.title"
            :id="item.title"
            :title="item.title">
            <van-list class="high-quality-list tours-list-no-bb"
              v-model="prodLoading"
              :prodFinished="prodFinished"
              finished-text="没有更多了"
              @load="onLoad">
              <van-cell class="high-quality-item"
                tagPos="bottom"
                v-for="product in productList"
                :key="product.desc">
                <hot-item :isShowTitle="false"
                  :proData="product" @selectItem="onHot" />
              </van-cell>
            </van-list>
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
  import SearchHeader from '@/components/header/index.vue'
  import HotItem from '@/components/items/hotItem.vue'
  import HotCityTag from '@/components/tags/index.vue'
  import {getUrlParam} from '@/assets/js/utils'

  export default {
    layout: 'default',
    components: {
      SearchHeader,
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
            // tap() {
            //   console.log('onTap', this);
            // }
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
        prodPagination: {}, // 分页数据
        prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
        prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      }
    },
    mounted() {
      // 引入appBridge
      // 初始化
      this.init()
      // 监听滚动
      this.$refs.refLocalGroupPage.addEventListener('scroll', _throttle(this.scrollFn, 500))
      //
      if (this.getPlatForm()) {
        this.appBridge = require('@/assets/js/appBridge').default
        this.appBridge.hideNavigationBar()
      } else {
        console.log('m操作')
      }
    },
    methods: {
      ...mapMutations({
        vxChangeHeaderStatus: 'header/changeStatus' // 修改头部状态
      }),
      // 判断是app还是web
      getPlatForm() {
        return getUrlParam('platform') ? true : false
      },
      async init() {
        await this.getLocalgroupData()
        await this.getProductListData()
      },
      // 获取当地跟团数据
      async getLocalgroupData() {
        try {
          const res = await getLocalgroup()
          console.log('getLocalgroupData', res.data)
          // 初始化本地跟团数据
          this.localgroupData = res.data
        } catch (error) {
          console.log(error)
        }
      },
      // 获取产品列表
      async getProductListData(data = {}) {
        const submitData = {
          type: LIST_TYPE.LOCAL_GROUP,
          start_city: data.start_city || 0,
          stop_city: data.stop_city || 0,
          span_city: data.span_city || '34',
          product_type: data.product_type || 0,
          category: data.category || '', // 横向tag
        }
        const res = await getProductList(submitData)
        // 初始化产品列表
        this.productList = res.data
        this.prodPagination = res.pagination
        console.log('getProductListData', this.productList, this.prodPagination)
      },
      // 返回上一级页面
      leftClick() {
        if (this.getPlatForm) {
          this.appBridge.backPreviousView()
        } else {
          this.$router.go(-1)
        }
      },
      // 点击当季热门item
      onHot(productId) {
        console.log('product_id：' + productId)
        if (this.getPlatForm()) {
          this.appBridge.jumpProductDetailView({
            productID: productId.toString()
          })
        } else {
          console.log('m操作')
        }
      },
      onHotCity(hotCity) {
        console.log(hotCity)
        if (this.getPlatForm()) {
          const params = {
            'itemType': LIST_TYPE.LOCAL_GROUP,
            'category': hotCity.category,
            'span_city': hotCity.span_city,
          }
          this.appBridge.jumpProductListView(params)
        } else {
          console.log('m操作')
        }
      },
      onMoreCity() {
        console.log('更多')
        if (this.getPlatForm()) {
          this.appBridge.jumpDestinationView()
        } else {
          console.log('m操作')
        }
      },
      /**
       * @param index 标签索引
       * @param title 标题
       */
      clickTab(index, title) {
        console.log(index, title, this.localgroupData[2].data[index])
        this.selected = index
        const submitData = {
          category: this.localgroupData[2].data[index].category,
        }
        this.getProductListData(submitData)
      },
      // 精选下的城市
      onCity(city) {
        this.getProductListData({
          category: city.category,
          start_city: city.start_city,
          span_city: city.span_city,
        })
      },
      // 点击全部
      onCityAll() {
        this.getProductListData()
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
      // 监听滚动
      scrollFn() {
        // console.log('scrollTop(获取/设置对象的最顶部到对象在当前窗口顶边的距离)+offsetHeight(获取元素的高度)')
        // console.log(this.$refs.refLocalGroupPage.scrollTop, this.$refs.refLocalGroupPage.offsetHeight)
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
      // 滚动产品列表到底出发
      async onLoad() {
        console.log('onLoad')
        // 异步更新数据
        if (this.prodPagination.more) {
          const submitData = {
            type: LIST_TYPE.LOCAL_GROUP,
            page: this.prodPagination.page + 1
          }
          console.log(submitData)
          const res = await getProductList(submitData)
          this.productList.push(...res.data)
          this.prodPagination = res.pagination
          console.log('get more over', this.productList)
        } else {
          console.log('no more')
        }
        // 加载状态结束
        this.prodLoading = false;
        // 数据全部加载完成
        this.prodFinished = false;
      }
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
      .hq-tags {
        padding: 24px 30px;
        background: #fff;
        height: 172px;
        &.fixed-tag {
          position: fixed;
          top: calc(92px + 44px + 24px + 15px);
          z-index: 999;
          box-shadow: 0 0.053333rem 0.16rem rgba(0, 0, 0, 0.1);
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
            padding: 0;
            width: 332px !important;
          }
        }
      }
    }
  }
</style>

