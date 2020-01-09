<template>
  <div class="product-detail-page" ref="refProductDetailPage">
    <product-detail-header class="product-detail-header"
      v-if="product"
      :transparent="isTransparent"
      :title="product.name"
      fixed
      @callOnRight="onHeaderRight"
      @callOnLeft="onHeaderLeft"
      ref="refProdctDetailHeader" />
      <div class="product-detail" ref="refProductDetail">
        <!-- banner -->
        <div class="banner-wrap">
          <van-swipe class="banner" :autoplay="6000" @change="onBannerChange" :show-indicators="false">
            <van-swipe-item v-for="image in product.images" :key="image">
              <div class="banner-img">
                <img :src="image" alt="image" />
              </div>
            </van-swipe-item>
          </van-swipe>
          <!-- banner页数 -->
          <div class="custom-indicator">
            <span><img src="../../assets/imgs/product/icon_img@2x.png" />{{product.images && product.images.length }}</span>
            <span v-if="product.videos && product.videos.length"><img src="../../assets/imgs/product/icon_video_s@2x.png" />{{product.videos.length}}</span>
          </div>
          <!-- 产品编号 产品类型-->
          <div class="serial-num">
            <span>{{product.departure_city | departureCity}}地{{ $t("dateTripPage.startOff")}} {{product.tour_category}}</span>
            <span>{{ $t("productDetailPage.productId") }}：{{ product.product_id }}</span>
          </div>
          <div class="video-box"></div>
        </div>
      </div>
  </div>
</template>

<script>
import ProductDetailHeader from '@/components/header/productDetail'
import {
    getCookie,
    getCookieByKey,
    getLocalStore,
    setLocalStore,
    getSessionStore,
    setSessionStore,
  } from '@/assets/js/utils'
import {SESSIONSTORE, PLATFORM, CURRENCY} from '@/assets/js/config'
export default {
  layout: 'default',
  head() {
    return {
      title: `${this.product.name || '产品详情'}`,
      meta: [
        {
          name: 'description',
          content: this.product.name || '',
          hid: 'description',
        },
      ],
    }
  },
  components: {
    ProductDetailHeader
  },
  filters: {
    departureCity(value) {
      const _arr = value.split('/')
      return _arr.length > 1 ? `${_arr[0]}等${_arr.length}` : value
    }
  },
  async asyncData({$axios, query, store, req, redirect}) {
    let productId, attributes, attributes_override, expense, itinerary, notice, product, top_price, transfer, reviews
    productId = Number(query.productId)
     try {
        let currency = getCookie(CURRENCY, req && req.headers && req.headers.cookie)
        let {code, msg, data} = await $axios.$get(`/api/product/${productId}/newdetail`, {
          headers: {
            Platform: store.state.platform,
            'Phone-Type': store.state.phoneType,
            'App-Version': store.state.phoneType,
            Language: store.getters.language,
            Currency: currency || store.state.currency,
          },
        })
        if (code === 0) {
          attributes = data.attributes // 增值服务
          attributes_override = data.attributes_override // 属性覆盖
          expense = data.expense // 费用说明对象
          itinerary = data.itinerary // 行程详情
          notice = data.notice // 注意事项
          product = data.product // 产品信息
          top_price = data.top_price // 团期价格
          transfer = data.transfer
          reviews = data.reviews.product ? data.reviews : null //评论版块
        } else {
          // redirect('../error')
          console.log('error:', msg)
        }
      } catch (error) {
        console.log('detail-error', error)
      }
      return {
        attributes,
        attributes_override,
        expense,
        itinerary,
        notice,
        product,
        top_price,
        transfer,
        reviews,
      }
  },
  data(){
    return {
      isTransparent: false, // 导航头是否透明
    }
  },
  created(){
    console.log(1232132131, this.product);
  },
  methods: {
    // 显示右上角更多操作
    onHeaderRight() {
      this.showMore = !this.showMore
    },
    onHeaderLeft() {
      if (this.$route.query.sem) {
        this.$router.push('/')
      } else {
        let href = window.location.href.slice(-1)
        if (href == '#') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },
    onBannerChange(){},
    // 显示title
    playVideo(){}
  }
};
</script>

<style scoped lang="scss">
@import "~/assets/style/product/detail1.scss";

</style>
