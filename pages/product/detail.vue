<template>
  <div class="product-detail-page"
    ref="refProductDetailPage">
    <!-- 头部 -->
    <product-detail-header class="product-detail-header"
      v-if="product"
      :transparent="isTransparent"
      :title="product.name"
      fixed
      @callOnRight="onHeaderRight"
      @callOnLeft="onHeaderLeft"
      ref="refProdctDetailHeader" />
    <div class="product-detail"
      ref="refProductDetail"
      v-if="product">
      <!-- banner -->
      <div class="banner-wrap">
        <van-swipe class="banner"
          :autoplay="4000"
          indicator-color="white"
          @change="onBannerChange">
          <van-swipe-item v-for="image in product.images"
            :key="image">
            <!-- <div class="banner-img" 
:style="{'background': `url(${image}) no-repeat 0 0/100% 100%`}"></div> -->
            <div class="banner-img">
              <img :src="image"
                alt="image">
            </div>
          </van-swipe-item>

          <!-- banner页数 -->
          <div class="custom-indicator"
            slot="indicator">
            {{ current + 1 }}/{{product.images&&product.images.length}}
          </div>
        </van-swipe>
        <!-- 产品编号 -->
        <div class="serial-num">
          {{$t('productDetailPage.productId')}}：{{product.code}}
        </div>
        <!--视频-->
        <div class="video-box"
          @click="playVideo"
          v-if="product.videos && product.videos[0].video">
          视频
        </div>
      </div>
      <!-- 产品 -->
      <div class="product">
        <p class="setelse">
          <span>
            <span v-if="product.comment_score !== '0.0'">{{product.comment_score}}分</span>
            <span v-else>暂无评论</span>
            </span> &nbsp;&nbsp;
        <span v-if="product.sales>0">出行人数：{{product.sales}}</span> </p>
        <!-- name -->
        <p class="name">
          <span class="prod-tag"
            v-if="product.self_support">{{$t('selfSupport')}}</span>
          {{product.name}}
        </p>
        <!-- 价格 -->
        <div class="price-wrap">
          <span class="share-btn"
            @click="shareProductHandle"
            v-if="profile.is_agent && product.agent_fee.substring(1) > 0">
            <img src="../../assets/imgs/union/icon_share@2x.png"
              alt=""
              width="16"
              height="16" />
            <span>{{$t('productDetailPage.shareMakes')}}{{product.agent_fee}}</span>
          </span>
          <span class="price fs-48 fw-800"
            :style="{'color': product.self_support ? '#EF9A1A' : '#fb605d'}">
            {{product.special_price ? product.special_price: product.default_price}}
            <span class="unit">&nbsp;{{$t('since')}}</span>
          </span>
          <span class="default-price"
            v-if="product.special_price">
            {{product.default_price}}
          </span>
          <div class="showapp"
            v-if="product.is_newer_discount"
            @click="downloadApp">
            <img src="../../assets/imgs/phone2.png"
              alt="" />App下单立减{{product.newer_min_discount}}起,更有新人优惠等你拿
          </div>
        </div>
      </div>
      <!-- 特色 -->
      <div class="destination mt-24">
        <div class="item-wrap"
          @click="onServerCop"
          v-if="couponList&&couponList.length">
          <div class="item-list">
            <span class="item-titlex">{{$t('productDetailPage.getCoupon')}}&nbsp;&nbsp;&nbsp;</span>
            <span v-for="(item,index) in couponList"
              class="setspecial"
              :key="index">
              <i class="ileft"></i>
              {{item}}
              <i class="iright"></i>
            </span>
          </div>
          <div class="item-arrow">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="item-wrap"
          @click="onServerNode">
          <div class="item-list">
            <div class="item"
              v-for="(item,index) in serviceNote"
              :key="index">
              <img src="../../assets/imgs/product/tick@2x.png"
                alt="icon">
              {{item.title}}
            </div>
          </div>
          <div class="item-arrow">
            <van-icon name="arrow" />
          </div>
        </div>
        <!-- 出发地结束地 -->
        <div class="city"
          v-show="product.product_entity_type || product.tour_category==='Unassigned'">
          <div class="from">
            <img src="../../assets/imgs/product/from@2x.png"
              alt="from">
            <span class="title">{{$t('productDetailPage.origin')}}</span>
            <span class="addr">{{product.departure_city}}</span>
          </div>
          <div class="to">
            <img src="../../assets/imgs/product/to@2x.png"
              alt="from">
            <span class="title">{{$t('productDetailPage.inTheEnd')}}</span>
            <span class="addr">{{product.end_city}}</span>
          </div>
        </div>
      </div>

      <!-- 团期价格 -->
      <div class="group-price mt-24"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <div class="title">
          <img src="../../assets/imgs/product/price@2x.png"
            alt="icon">
          {{$t('productDetailPage.groupPrice')}}
        </div>
        <div class="content mt-12">
          <div v-for="(item,index) in topPrice"
            :key="index"
            class="g-price-item"
            @click="onGroupPriceDate(item)">
            <p class="time">
              {{item.month}}/{{item.day}}&nbsp;{{getWeek(item.year, item.month, item.day)}}
            </p>
            <span class="price"
              style="color:#ccc"
              v-if="item.is_soldout">
              {{$t('saleOver')}}
            </span>
            <span class="price"
              v-else>
              {{item.price}}
            </span>
          </div>
          <div class="g-price-item more"
            @click="onGroupPriceMore">
            {{$t('productDetailPage.moreGroup')}}
          </div>
        </div>
      </div>
      <!-- api -->
      <div class="recommend mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/praise@2x.png"
            alt="icon">
          {{$t('tours.torusRecommend')}}
        </div>
        <div class="content mt-12"
          v-html="product.small_description"></div>
      </div>

      <!--评论版块-->
      <div class=" mt-24 comment__wrapper"
        v-if="reviews">
        <h1>
          <b v-if="reviews.comment.score !== '0.0'">{{$t('comment.rate')}} {{reviews.comment.score}}</b>
          <b v-else>暂无评论</b>
          <span @click="jumpTo(`/comment/detail/${product.product_id}`)">{{$t('seeAll')}}（{{reviews.product.comment_count}}）
            <van-icon name="arrow" /></span>
        </h1>
        <p>
          <span>{{reviews.comment.user_name}}</span>
          <span>{{reviews.comment.created.split(' ')[0]}}</span>
        </p>

        <p class="comment__cnt"
          @click="jumpTo(`/comment/detail/${product.product_id}`)">{{reviews.comment.content}}</p>
      </div>

      <!-- tab触发则滚动 -->
      <div class="tab-list-wrap"
        :class="{'fixed-tab': isTabFixed}"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <div class="tab-list"
          ref="refTabList">
          <div class="tab-item"
            v-for="tab in tabList"
            :key="tab.name"
            :class="{'active': activeTab===tab.id}"
            @click="clickTab(tab)"
            v-show="tab.isShow">
            <span>{{tab.name}}</span>
            <span class="tab-day"
              v-show="tab.id===2">{{showDay}}</span>
          </div>
        </div>
      </div>
      <div class="tab-height mt-24"
        ref="refTabHeight"
        v-show="isTabFixed && (product.product_entity_type || product.tour_category==='Unassigned')"></div>
      <!-- 产品特色 -->
      <div class="features"
        ref="refFeatures"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <!-- :style="{'background': `url(${bgFeat}) no-repeat 0 0/100% 100%`}"> -->
        <div v-if="hasFeature">
          <img v-for="item in product.feature_images"
            :key="item"
            :src="item"
            alt="img"
            width="100%">
        </div>
      </div>
      <!-- 行程概要 -->
      <div class="trip"
        ref="refTrip">
        <div class="header-wrap"
          v-show="product.product_entity_type || product.tour_category==='Unassigned'">
          <h3 class="header-title">{{$t('productDetailPage.travelProfile')}}</h3>
          <div class="header-content">
            <div class="item">
              <img src="../../assets/imgs/product/trip_1@2x.png"
                alt="trip">
              <p>{{$t('productDetailPage.dayTrip')}}</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_2@2x.png"
                alt="trip">
              <p>{{itinerary.total_attractions}}{{$t('productDetailPage.scenicSpot')}}</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_3@2x.png"
                alt="trip">
              <p>{{$t('productDetailPage.zhEn')}}</p>
            </div>
          </div>
        </div>
        <div class="content-wrap">
          <div class="content-title">{{$t('productDetailPage.itineraryDetail')}}</div>
          <div class="content"
            v-for="item in itinerary.items"
            :key="item.product_itinerary_id"
            :ref="`refContent${item.sort_order}`">
            <div class="title-wrap">
              <span class="icon">D{{item.sort_order}}</span>
              <span class="title-s">{{item.title}}</span>
            </div>
            <div class="detail">
              <!-- 概况 -->
              <div class="summarize-wrap">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;{{$t('productDetailPage.general')}}
                </h3>
                <div class="body"
                  v-html="item.content"></div>
              </div>
              <!-- 地点 -->
              <div class="attractions-wrap"
                v-for="attr in item.attractions"
                :key="attr.tour_city_id">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;{{attr.name}}
                </h3>
                <div class="body">
                  <div class="attr-imgs">
                    <prod-detail-img-item :proData="attr.images"
                      @callOnSlide="onImgSlide" />
                  </div>
                  <div class="desc"
                    v-html="attr.content"></div>
                </div>
              </div>
              <!-- 酒店 -->
              <div class="hotel-wrap"
                v-if="item.hotel">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;{{$t('productDetailPage.hotel')}}
                </h3>
                <div class="body"
                  v-html="item.hotel"></div>
              </div>
              <!-- 餐食（contain_meal：1包含，2不包含） -->
              <div class="meals-wrap"
                v-if="item.meal.breakfast.contain_meal==1 || item.meal.lunch.contain_meal==1 || item.meal.dinner.contain_meal==1">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;{{$t('productDetailPage.meals')}}
                </h3>
                <div class="body">
                  <p class="breakfast"
                    v-if="item.meal.breakfast.contain_meal==1">
                    {{$t('productDetailPage.breakfast')}}：
                    <span v-if="item.meal.breakfast.remark">{{item.meal.breakfast.remark}}</span>
                    <span v-else>{{$t('productDetailPage.include')}}</span>
                  </p>
                  <p class="lunch"
                    v-if="item.meal.lunch.contain_meal==1">
                    {{$t('productDetailPage.lunch')}}：
                    <span v-if="item.meal.lunch.remark">{{item.meal.lunch.remark}}</span>
                    <span v-else>{{$t('productDetailPage.include')}}</span>
                  </p>
                  <p class="dinner"
                    v-if="item.meal.dinner.contain_meal==1">
                    {{$t('productDetailPage.dinner')}}：
                    <span v-if="item.meal.dinner.remark">{{item.meal.dinner.remark}}</span>
                    <span v-else>{{$t('productDetailPage.include')}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- AD-custom -->
      <div class="ad-custom"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <span>{{$t('productDetailPage.adCustomText')}}</span>
        <span class="custom"
          @click="onAdCustom">{{$t('productDetailPage.customText')}}</span>
      </div>
      <!-- 费用明细 -->
      <div class="cost"
        ref="refCost"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <h1 class="title">
          {{$t('costDetail')}}
        </h1>
        <div class="group-price-desc">
          <h3 class="title-s">{{$t('productDetailPage.groupCostDetail')}}</h3>
          <div class="price-item-wrap">
            <div class="price-item"
              v-for="item in standartPrice"
              :key="item.name">
              <p class="num">{{item.name}}</p>
              <p class="price">{{item.price}}/人</p>
            </div>
          </div>
        </div>
        <div class="price-desc">
          <h3 class="title-s">{{$t('productDetailPage.priceDescription')}}</h3>
          <div class="text"
            v-html="expense.price_notice"></div>
        </div>
        <div class="price-include">
          <h3 class="title-s">{{$t('productDetailPage.feeIncludes')}}</h3>
          <div class="text"
            v-html="expense.package_include"></div>
        </div>
        <van-collapse v-model="priceExclude">
          <van-collapse-item :title="$t('productDetailPage.feeExcludes')"
            name="exclude">
            <span v-html="expense.package_exclude"></span>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!-- 注意事项 -->
      <div class="notice mt-24"
        ref="refNotice">
        <van-collapse v-model="activeNotice"
          accordion>
          <van-collapse-item v-for="(item, index) in notice"
            :key="item.title"
            :title="item.title"
            :name="index+1">
            <span v-html="item.content"></span>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!--引导二维码-->
      <div class="code-two">
        <div class="img-box">
          <img src="../../assets/imgs/product/img_qr_code@2x.png" alt="" class="code">
          <div>
            {{$t('productDetailPage.xifanlvxing')}}
          </div>
        </div>
        <div class="word-explain">
          <h2>{{$t('productDetailPage.jiebanlvyou')}}</h2>
          <p>{{$t('productDetailPage.pingtuan')}}</p>
          <p>{{$t('productDetailPage.playTogether')}}</p>
          <p>{{$t('productDetailPage.helpTogether')}}</p>
        </div>
        <div class="btn-box"
             v-clipboard:copy="'zmcslxs'"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError"
        >
          复制公众号
        </div>
      </div>
      <!--悬浮-->
      <drift-aside ref="driftAside"
      
        @backTop="backTop"
      ></drift-aside>
      <!-- 底部按钮 -->
      <div class="footer-fixed">
        <div class="footer-tabbar">
          <div class="operate">
            <div class="btn-operate"
              v-for="item in operateTabbar"
              :key="item.name"
              @click="onOperate(item)">
              <img :src="item.icon"
                alt="icon">
              <p class="operate-name">{{item.name}}</p>
            </div>
          </div>
          <div class="reserve">
            <van-button class="btn-reserve"
              :style="{'background': product.self_support ? '#EF9A1A' : '#fb605d'}"
              size="large"
              @click="btnReserve">{{product.is_soldout
                            ? $t('productDetailPage.orderNotice')
                            : $t('productDetailPage.orderNow')}}</van-button>
          </div>
        </div>
      </div>
      <!-- 服务说明 -->
      <van-actionsheet v-model="showServiceNode"
        :title="$t('productDetailPage.serviceDescription')"
        class="service-note">
        <div class="servive-item mt-50"
          v-for="(item,index) in serviceNote"
          :key="index">
          <h3 class="title">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">&nbsp;{{item.title}}
          </h3>
          <p class="desc">{{item.content}}</p>
        </div>
      </van-actionsheet>
      <!-- 优惠卷展开 -->
      <van-actionsheet v-model="showServiceCop"
        :title="$t('coupons')"
        class="service-note">
        <p class="cup-class">{{$t('productDetailPage.availableCoupons')}}</p>
        <div class="cup-item"
          v-for="(item,index) in couponDetails"
          :key="index">
          <div class="cupleft">
            <p class="p1">{{item.minus_label}}</p>
            <p class="p2">{{item.full_label}}</p>
          </div>
          <div class="cupcon">
            <p class="p1">{{item.title}}</p>
            <p class="p2">{{item.date_label}}</p>
            <p class="p2">{{item.period_label}}</p>
          </div>
          <div class="cupright">
            <span class="btn1"
              @click="getcouponobj(item.id)"
              v-if="item.is_receivable === true">{{$t('productDetailPage.receive')}}</span>
            <span class="btn2"
              v-if="item.is_received === true && item.is_receivable === false">{{$t('productDetailPage.haveReceive')}}</span>
          </div>
        </div>
      </van-actionsheet>
      <!-- 恢复预定通知 -->
      <van-actionsheet v-model="showSoldOut"
        title=" "
        class="sold-out">
        <div class="sold-out-content">
          <h3 class="title">{{$t('productDetailPage.soldOutDesc')}}</h3>
          <p class="desc mt-30">{{$t('productDetailPage.emailOrPhone')}}</p>
          <div class="account-wrap mt-30">
            <van-cell-group class="account-input">
              <van-field class="tours-input"
                v-model="account"
                :placeholder="$t('plhdNameEmail')">
              </van-field>
            </van-cell-group>
            <van-button class="account-btn"
              slot="button"
              size="small"
              @click="btnOrder">{{$t('submit')}}</van-button>
          </div>
        </div>
      </van-actionsheet>
    </div>
    <!-- 加载态 -->
    <loading v-if="loading"></loading>
    <!-- 右上角更多操作 -->
     <transition name="fade">
      <div class="show-more"
        v-show="showMore">
        <div class="show-more-item"
          @click="onHomePage">
          <img src="~/assets/imgs/product/icon_home@2x.png"
            alt="">
          <span class="item-title">{{$t('productDetailPage.homePage')}}</span>
        </div>
        <div class="show-more-item"
          @click="onDest">
          <img src="~/assets/imgs/product/icon_pos@2x.png"
            alt="">
          <span class="item-title">{{$t('productDetailPage.destination')}}</span>
        </div>
        <div class="show-more-item"
          @click="onPersonal">
          <img src="~/assets/imgs/product/icon_person@2x.png"
            alt="">
          <span class="item-title">{{$t('productDetailPage.personal')}}</span>
        </div>
        <div class="show-more-item"
          @click="onFollow">
          <img src="~/assets/imgs/product/icon_star@2x.png"
            alt="">
          <span class="item-title">{{$t('productDetailPage.myFollow')}}</span>
        </div>
      </div>
    </transition>
    <!--分享按钮-->
    <div v-if="isShareBtn && profile.is_agent && product.agent_fee.substring(1) > 0"
      class="share-box-show"
      @click="shareProductHandle">
      <img src="../../assets/imgs/union/icon_share@2x.png"
        alt=""
        width="20"
        height="20">
    </div>
    <div class="share-box">
      <van-popup v-model="shareListShow"
        :overlay="false">
        <share-list @close="shareListShow = false"
          :data="shareDataInfo"
          :ids="ids"></share-list>
      </van-popup>
    </div>
    <!--视频弹出框-->
    <van-popup v-model="isVideoShow"
      position="right">
      <van-nav-bar title=""
        left-arrow
        @click-left="pausePlay" />
      <div class="video"
        v-if="product.videos && product.videos[0].video">
        <div class="video-main video-div">
          <video ref="productVideo"
            :src="product.videos[0].video"
            controls="controls"
            autoplay
            preload="auto">
            暂时不支持播放该视频
          </video>
          <!--<div class="video-loading">-- v-if="product.videos[0] && product.videos[0].video"><i></i>--:src="product.videos[0].video"></div>-->
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex';
  import {
    throttle as _throttle
  } from 'lodash'
  import {
    ImagePreview
  } from 'vant';
  import ProductDetailHeader from '@/components/header/productDetail'
  import ProdDetailImgItem from '@/components/items/prodDetailImgItem'
  import Loading from '@/components/loading'
  import {
    getCookie,
    getLocalStore,
    setLocalStore,
    setSessionStore
  } from '@/assets/js/utils'
  import {
    OPERATE_TYPE
  } from '@/assets/js/consts'
  import {
    ENTITY_TYPE
  } from '@/assets/js/consts/products'
  import {
    DLG_TYPE
  } from '@/assets/js/consts/dialog'
  import {
    getProductDetail,
    addFavorite,
    delFavorite,
    schedule
  } from '@/api/products'
  import {
    couponList,
    couponDetail,
    getcouponobj
  } from '@/api/profile'
  import shareList from '@/components/share/list'
  import {
    getCode,
    getBase64,
    getViewStat
  } from '@/api/sale_union'
  import {
    SESSIONSTORE,
    PLATFORM,
    CURRENCY
  } from '@/assets/js/config'
  import onCustomerService from '@/assets/js/customerService.js'
  import DriftAside from '@/components/drift_aside'
  import { replaceServerUrl } from '@/assets/js/utils'
  export default {
    layout: 'default',
    head() {
      return {
        title: `${this.product.name || '产品详情'}`,
        meta: [
          {name: 'description', content: this.product.name || '', 'hid': 'description'},
        ]
      }
    },
    components: {
      ProductDetailHeader,
      ProdDetailImgItem,
      Loading,
      shareList,
      DriftAside
    },
    async asyncData({
      $axios,
      query,
      store,
      req
    }) {
      let productId,
        attributes,
        attributes_override,
        expense,
        itinerary,
        notice,
        product,
        top_price,
        transfer,
        reviews
      if (String(query.productId).indexOf('-') >= 0) {
        productId = Number(query.productId.toString().split('-')[0])
      } else {
        productId = Number(query.productId)
      }
      try {
        let currency = getCookie(CURRENCY, req && req.headers && req.headers.cookie)
        let {
          code,
          msg,
          data
        } = await $axios.$get(`/api/product/${productId}`, {
          headers: {
            'Platform': store.state.platform,
            'Phone-Type': store.state.phoneType,
            'App-Version': store.state.phoneType,
            'Language': store.getters.language,
            'Currency': currency ? currency : 'CNY'
          }
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

          console.log('data:', data.product.product_id)
        } else {
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
        reviews
      }
    },
    data() {
      return {
        ENTITY_TYPE,
        loading: false,
        // productId: Number(this.$route.query.productId) || null,
        isTransparent: false, // 导航头是否透明
        current: 0, // 导航页数
        // bgFeat: require('../../assets/imgs/product/bg_features.png'),
        activeTab: 1, // 选中的tab
        activeTabRef: this.hasFeature ? 'refFeatures' : 'refTrip',
        showServiceNode: false, // 显示服务说明
        showSoldOut: false, // 恢复预定通知弹窗
        priceExclude: [], // 不包含面板
        activeNotice: [1], // 注意事项折叠面板
        showServiceCop: false, //显示优惠卷
        couponList: [], //可用优惠卷列表
        couponDetails: [], //可用优惠卷列表-详情版
        isTabFixed: false,
        showDay: 'D1',
        // 显示电话弹窗
        showPhone: false,
        // 右上角更多现实
        showMore: false,
        // 邮箱或手机号
        account: '',
        isShareBtn: false, // 分享按钮是否显示
        shareListShow: false, // 是否显示分享列表
        shareDataInfo: {},
        referrerId: '',
        productId: '',
        ids: {},
        isVideoShow: false, // 是否显示视频
        goToBackPage:''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        console.log(4444444, to, from)
        vm.goToBackPage = from.fullPath
      })
    },
    computed: {
      ...mapGetters([
        'profile'
      ]),
      serviceNote() {
        return this.product && this.product.icons_tour || []
      },
      standartPrice() {
        let newData = [{
          name: this.$t('productDetailPage.priceSingle'),
          type: 'price_single',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceSinglePu'),
          type: 'price_single_pu',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceDouble'),
          type: 'price_double',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceTriple'),
          type: 'price_triple',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceQuad'),
          type: 'price_quad',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceKids'),
          type: 'price_kids',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceFive'),
          type: 'price_five',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceSix'),
          type: 'price_six',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceSeven'),
          type: 'price_seven',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceEight'),
          type: 'price_eight',
          price: ''
        },
        {
          name: this.$t('productDetailPage.priceAdult'),
          type: 'price_adult',
          price: ''
        },
        ]
        newData.forEach(item => {
          if (this.expense.standard_price && this.expense.standard_price[item.type] && this.expense.standard_price[item.type]) {
            item.price = this.expense.standard_price[item.type]
          }
        })
        return newData.filter(item => item.price)
      },
      hasFeature() {
        return this.product && this.product.feature_images && this.product.feature_images.length
      },
      tabList() {
        return [{
          id: 1,
          name: this.$t('productDetailPage.productFeature'),
          ref: 'refFeatures',
          isShow: this.hasFeature
        },
        {
          id: 2,
          name: this.itinerary.duration_days + this.$t('productDetailPage.dayTrip'),
          ref: 'refTrip',
          isShow: true
        },
        {
          id: 3,
          name: this.$t('costDetail'),
          ref: 'refCost',
          isShow: true
        },
        {
          id: 4,
          name: this.$t('productDetailPage.notice'),
          ref: 'refNotice',
          isShow: true
        },
        ]
      },
      operateTabbar() {
        return [{
          type: OPERATE_TYPE.ATTR,
          name: this.$t('productDetailPage.follow'),
          icon: this.product.is_favorite ? require('../../assets/imgs/product/star_active@2x.png') : require('../../assets/imgs/product/star@2x.png')
        },
        {
          type: OPERATE_TYPE.PHONE,
          name: this.$t('phoneConsult'),
          icon: require('../../assets/imgs/product/phone@2x.png')
        },
        {
          type: OPERATE_TYPE.ONLINE,
          name: this.$t('onlineConsult'),
          icon: require('../../assets/imgs/product/consult@2x.png')
        },
        ]
      },
      showDayList() {
        if (!this.itinerary) {
          return
        }
        let newData = (this.itinerary.items || []).map(item => this.$refs[`refContent${item.sort_order}`][0].offsetTop)
        return newData
      },
      topPrice() {
        let newData = []
        this.top_price.map(item => {
          if (item.days && item.days.length) {
            item.days.forEach(day => {
              newData.push({
                year: item.years,
                month: item.month,
                ...day
              })
            })
          }
        })
        return newData.slice(0, 5)
      }
    },
    watch: {
      isVideoShow(newValue, oldValue) {
        if (newValue) {
          console.log('播放')
          this.$refs.productVideo.play()
        } else {
          console.log('暂停')
          this.$refs.productVideo.pause()
        }
      }
    },
    watch: {
      $route(to, from) {
        console.log(to, from)
      }
    },
    async mounted() {
      console.log('product', this.product)
      this.init()
      this.$refs.refProductDetailPage.addEventListener("scroll", this.scrollFn);
      document.getElementsByTagName('title')[0].innerText = this.product.name;
    },
    beforeDestroy() {
      this.$refs.refProductDetailPage.removeEventListener('scroll', this.scrollFn)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      ...mapMutations({
        vxSaveReservePro: 'product/saveReservePro',
        vxToggleDialog: 'toggleDialog', // 是否显示弹窗
        vxSetDlgType: 'setDlgType', // 设置弹窗类型
      }),
      async init() {
        if (!(this.product && this.product.product_id)) {
          this.jumpTo('/')
        }
        // 是否有登录态
        await this.initProfileData()
        // 改用asyncData()
        // await this.getProductDetailData()
        // 返现逻辑
        await this.ashbackLogic()
        // 存储浏览记录
        await this.saveLocal();
        // 获取优惠卷列表
        await this.getcouponList()
      },
      // 获取profile-登录态
      async initProfileData() {
        setTimeout(() => {
          // console.log(4444, this.profile.is_agent, String(this.$route.query.productId).indexOf('-') <= 0)
          if (this.profile.is_agent && String(this.$route.query.productId).indexOf('-') <= 0) {
            this.$router.push({
              name: 'product-detail',
              query: {
                productId: String(this.$route.query.productId) + '-' + this.profile.customer_id
              }
            })
          }
        }, 50)
        // console.log(this.$route)
      },
      // 产品ID，session保存
      async ashbackLogic() {
        let query = String(this.$route.query.productId)
        let platform = this.$route.query.platform
        let viewStat = {}
        console.log(query)
        if (query.indexOf('-') >= 0) {
          this.productId = Number(query.split('-')[0])
          setSessionStore(SESSIONSTORE, query.split('-')[1])
          viewStat.referrer_id = query.split('-')[1]
          if (navigator.userAgent.indexOf('MicroMessenger') >= 0) {
            viewStat.platform = 'weixin'
            setSessionStore(PLATFORM, 'weixin')
            // alert('weixin')
          } else if (navigator.userAgent.indexOf('QBWebViewType') >= 0 || navigator.userAgent.indexOf('MQQBrowser') >= 0) {
            viewStat.platform = 'qq'
            setSessionStore(PLATFORM, 'qq')
            // alert('qq')
          } else if (platform) {
            viewStat.platform = platform
            setSessionStore(PLATFORM, platform)
          }
          await getViewStat(viewStat)
        } else {
          this.productId = Number(query) || null
        }
      },
      // async getProductDetailData() {
      //   this.loading = true
      //   const {code, data, msg} = await getProductDetail({
      //     product_id: this.productId,
      //   })
      //   console.log(code, data, msg)
      //   if (code === 0) {
      //     this.attributes = data.attributes
      //     this.attributes_override = data.attributes_override
      //     this.expense = data.expense
      //     this.itinerary = data.itinerary
      //     this.notice = data.notice
      //     this.product = data.product
      //     this.top_price = data.top_price
      //     this.transfer = data.transfer
      //   }
      //   document.title = this.product.name
      //   this.loading = false
      // },
      // 获取优惠卷列表
      async getcouponList() {
        const {
          code,
          data,
          msg
        } = await couponList({
          product_id: this.productId,
        })
        // console.log(code, data, msg)
        if (code === 0) {
          this.couponList = data
        }
        //模拟数据2
        // this.couponList = [
        //   "折扣9折",
        //   "现金100"
        // ]
      },
      // 获取优惠卷列表展开
      async getcoupondetail() {
        this.loading = true;
        const {
          code,
          data,
          msg
        } = await couponDetail({
          product_id: this.productId,
        })
        // console.log(code, data, msg)
        if (code === 0) {
          this.couponDetails = data
        }
        this.loading = false;

      },
      // 领取某张优惠卷
      async getcouponobj(id) {
        this.loading = true;
        const {
          code,
          data,
          msg
        } = await getcouponobj({
          product_id: this.productId,
          id: id
        })
        if (code === 0) {
          // this.showServiceCop=false;
          this.$toast(this.$t('productDetailPage.getSuccess'));
          this.getcoupondetail();
        } else {
          this.$toast(msg);
          this.getcoupondetail();
        }
        this.loading = false;
      },
      // 存储浏览记录
      saveLocal() {
        let browsList = getLocalStore('browsList') || []
        browsList.unshift(this.productId)
        let set = [...new Set(browsList)];
        // console.log(set)
        if (set.length >= 6) {
          set = set.slice(0, 6).map(Number)
        }
        setLocalStore('browsList', set)
      },
      // banner切换
      onBannerChange(index) {
        this.current = index;
      },
      // 跳转至注册页
      toRegist() {
        this.jumpTo('/login/regist')
      },
      /**
       * 年月日转周几
       * @params year
       * @params month
       * @params day
       */
      getWeek(year, month, day) {
        let date = `${year}/${month}/${day}`
        let week = new Date(date).getDay()
        switch (week) {
          case 0:
            return this.$t('weekend')
            break;
          case 1:
            return this.$t('monday')
            break;
          case 2:
            return this.$t('tuesday')
            break;
          case 3:
            return this.$t('wednesday')
            break;
          case 4:
            return this.$t('thursday')
            break;
          case 5:
            return this.$t('friday')
            break;
          case 6:
            return this.$t('saturday')
            break;
          default:
            // console.log(`${week} is not found`)
            break;
        }
      },
      onServerNode() {
        this.showServiceNode = true
      },
      onServerCop() {
        this.getcoupondetail();
        this.showServiceCop = true;
      },
      clickTab(tab) {
        // console.log('tab', tab)
        this.activeTab = tab.id
        this.activeTabRef = tab.ref
        clearInterval(this.timer)
        this.timer = setInterval(this.backFn, 20)
      },
      // 滚动到相应位置     
      backFn() {
        // 滚动到的元素(减去2个fixed的高度)
        let scrollTo = this.$refs[this.activeTabRef].offsetTop -
          this.$refs.refTabList.offsetHeight -
          this.$refs.refProdctDetailHeader.$el.offsetHeight
        // 已滚动的高度
        let scrollTop = this.$refs.refProductDetailPage.scrollTop
        // 能滚动的body的高度
        let scrollHeight = this.$refs.refProductDetailPage.scrollHeight
        // 视窗高度
        let clientHeight = this.$refs.refProductDetailPage.clientHeight
        // 能滚动到的高度
        let canSrollTo = scrollHeight - clientHeight
        // 这里向上取整是确保差距小于5的时候，ispeed为0
        let ispeed = Math.ceil((scrollTo - scrollTop) / 5)
        this.$refs.refProductDetailPage.scrollTop = scrollTop + ispeed
        //  console.log(this.activeTabRef, '需要滚动到：', scrollTo, '能滚到：', canSrollTo, '能滚的body高度：', scrollHeight, '窗口（100vh）：', clientHeight, scrollTop, ispeed)
        // 已滚动的高度===要到达的位置
        if (scrollTop === scrollTo) {
          clearInterval(this.timer)
        } else if (Math.abs(scrollTo - scrollTop) < 5) {
          // 容错处理
          this.$refs.refProductDetailPage.scrollTop = scrollTo
          clearInterval(this.timer)
        }
        // 是否已滚动到底
        if (this.$refs.refProductDetailPage.scrollTop === canSrollTo) {
          clearInterval(this.timer)
        }
      },
      onAdCustom() {
        this.jumpTo('/custom')
      },
      // 滚动函数     
      /**
       * @name: Casey.wu
       * @msg: 增加homeHeight用于获取元素相对于视窗的位置的高度，用于计算侧边栏是否显示
       * @param {type} 
       * @return: 
       * @LastEditTime: Do not Edit
       * @Date: 2019-10-08 14:08:48
       */      
      scrollFn() {
        const s1 = this.$refs.refProductDetailPage.scrollTop;
        const s1H = this.$refs.refProductDetailPage.offsetHeight;
        const allH = this.$refs.refProductDetail.offsetHeight;
        let tabListH = this.$refs.refTabList.offsetTop - this.$refs.refTabList.offsetHeight;
        let tabHeightH = this.$refs.refTabHeight.offsetTop - this.$refs.refTabList.offsetHeight;
        let homeHeight = this.$refs.refProductDetailPage.getBoundingClientRect().height
        // console.log(s1, tabListH, tabHeightH)
        if (s1 > 100) {
          this.isShareBtn = true
        } else {
          this.isShareBtn = false
        }
        if (s1 >= tabListH) {
          this.isTabFixed = true
        }
        if (s1 <= tabHeightH) {
          this.isTabFixed = false
        }
        /**
         * @name: Casey.wu
         * @msg: 控制侧边栏是否显示
         * @LastEditTime: Do not Edit
         * @Date: 2019-10-08 14:09:08
         */
        if (s1 > homeHeight) {
          this.$refs.driftAside.homeScrollShow()
        } else {
          this.$refs.driftAside.homeScrollHide()
        }
        // 判断方向
        // setTimeout(() => {
        //   const s2 = this.$refs.refProductDetailPage.scrollTop;
        //   const direct = s2 - s1;
        //   console.log("direct", direct);
        // }, 17);
        // D1-Dn变化
        const listLen = this.showDayList.length
        const showHeight = s1 + this.$refs.refTabList.offsetHeight + this.$refs.refProdctDetailHeader.$el.offsetHeight
        // 根据tabList的高度,修改选中的tab
        let refFeaturesH = this.$refs.refFeatures.offsetTop
        let refTripH = this.$refs.refTrip.offsetTop
        let refCostH = this.$refs.refCost.offsetTop
        let refNoticeH = this.$refs.refNotice.offsetTop
        // console.log('refFeaturesH', showHeight, refCostH)
        if (showHeight >= refFeaturesH) {
          this.activeTab = 1
        }
        if (showHeight >= refTripH) {
          this.activeTab = 2
        }
        if (showHeight >= refCostH) {
          this.activeTab = 3
        }
        // 到底部
        if (s1 + s1H === allH) {
          this.activeTab = 4
        }
        // console.log(this.activeTab, showHeight, refNoticeH)
        let idx = this.showDayList.findIndex(item => item > showHeight)
        // console.log('index：', idx)
        if (idx === 0) {
          this.showDay = `D1`
        } else if (idx > 0) {
          this.showDay = `D${idx}`
        } else if (idx === -1) {
          this.showDay = `D${listLen}`
        }
      },
      // 点击预览图片
      onImgSlide(data) {
        const index = data.arr.findIndex(item => item === data.item)
        ImagePreview({
          images: data.arr,
          startPosition: index,
        });
      },
      // 点击操作按钮
      onOperate(item) {
        switch (item.type) {
          case OPERATE_TYPE.ATTR:
            this.attentionProduct()
            break;
          case OPERATE_TYPE.PHONE:
            this.telCounsel()
            break;
          case OPERATE_TYPE.ONLINE:
            this.onlineCounsel()
            break;
          default:
            console.log(`${item.type} is not found`)
            break;
        }
      },
      // 关注与取关
      async attentionProduct() {
        if (this.product.is_favorite) {
          const {
            code,
            data,
            msg
          } = await delFavorite({
            product_id: this.product.product_id
          })
          if (code === 0) {
            this.$toast(this.$t('productDetailPage.takeOffSuc'))
            this.getProductDetailData()
          } else {
            this.$toast(this.$t('productDetailPage.takeOffFail'))
          }
        } else {
          const {
            code,
            data,
            msg
          } = await addFavorite({
            product_id: this.product.product_id
          })
          if (code === 0) {
            this.$toast(this.$t('productDetailPage.focusOnSuc'))
            this.getProductDetailData()
          } else {
            this.$toast(this.$t('productDetailPage.focusOnFail'))
          }
        }
      },
      onCopy(e) {
        this.$toast(this.$t('shareComp.copySuccess'))
      },
      // 复制失败
      onError(e) {
        this.$toast(this.$t('shareComp.copyFail'))
      },
      // 电话咨询
      telCounsel() {
        this.vxToggleDialog(true)
        this.vxSetDlgType(DLG_TYPE.PHONE)
      },
      // 在线咨询
      onlineCounsel() {
        let url = replaceServerUrl();
        window.open(url,"_self");
      },
      // 立即定制
      async btnReserve() {
        // 已售罄
        if (this.product.is_soldout) {
          this.showSoldOut = true
          return
        }
        // 暂存需要定制的商品信息
        await this.vxSaveReservePro({
          ...this.product
        })
        // 跳转至订单页面
        this.jumpTo('/date_trip')
      },
      // 期团选中日期跳转
      async onGroupPriceDate(data) {
        if (this.product.is_soldout) {
          this.showSoldOut = true
          return
        } else {
          // 暂存需要定制的商品信息
          await this.vxSaveReservePro({
            ...this.product
          })
          // 跳转至订单页面
          this.$router.push({
            path: '/date_trip',
            query: {
              year: data.year,
              month: data.month,
              day: data.day,
            }
          })
        }

      },
      // 更多期团
      onGroupPriceMore() {
        this.btnReserve()
      },
      // 显示右上角更多操作
      onHeaderRight() {
        this.showMore = !this.showMore
      },
      onHeaderLeft() {
        console.log(this.goToBackPage)
        if(this.goToBackPage == '/'){
          this.$router.push('/')
        } else {
          this.$router.go(-1)
        }
      },
      // 返回首页
      onHomePage() {
        this.jumpTo('/')
      },
      // 搜索页面
      onDest() {
        this.jumpTo('/search')
      },
      // 搜索页面
      onPersonal() {
        this.jumpTo('/personal')
      },
      // 收藏页面
      async onFollow() {
        if (!this.profile.customer_id) {
          this.$router.push({
            path: `/login?redirect=${this.$route.fullPath}`,
          })
        } else {
          this.jumpTo('/personal/follow')
        }
      },
      jumpTo(path) {
        this.$router.push({
          path
        })
      },
      // 预定
      async btnOrder() {
        const data = {
          productId: this.productId,
          account: this.account
        }
        console.log(data)
        const {
          code,
          msg
        } = await schedule(data)
        if (code === 0) {
          this.showSoldOut = false
        }
        this.$toast(msg)
      },
      // 分享
      async shareProductHandle() {
        if (!this.profile.customer_id) {
          this.$router.push({
            path: `/login?redirect=${this.$route.fullPath}`,
          })
        } else {
          let {
            product_id,
            name,
            default_price,
            special_price,
            images
          } = this.product
          let {
            face,
            customer_id,
            chinese_name,
            email,
            phone,
            last_name,
            first_name,
            nickname
          } = this.profile
          this.shareListShow = true
          this.ids = {
            product_id,
            customer_id
          }
          let faceImg = await getBase64(face)
          let productImg = await getBase64(images[0])
          let code = await getCode(`${window.location.origin}/product/detail?productId=${product_id}-${customer_id}`)
          this.shareDataInfo = {
            product_id,
            name,
            default_price,
            special_price,
            customer_id,
            chinese_name,
            email,
            phone,
            last_name,
            first_name,
            nickname,
            image: 'data:image/jpg;base64,' + productImg.data,
            face: 'data:image/jpg;base64,' + faceImg.data,
            code: code.data
          }
          console.log(this.shareDataInfo)
        }
      },
      // 视频播放
      playVideo() {
        this.isVideoShow = true
        this.$nextTick(() => {
          this.$refs.productVideo.play()
        }, 50)
      },
      // 暂停视频
      pausePlay() {
        this.$refs.productVideo.pause()
        this.isVideoShow = false
      },
      downloadApp() {
        try {
          _hmt.push(['_trackEvent', 'download', 'app', 'from mobile'])
        } catch (error) {
          console.log(error)
        }
        window.open('https://api.tourscool.com/api/tour/v1/download', '_blank')
      },
      /**
       * @name: Casey.wu
       * @msg: 返回顶部
       * @param {type} 
       * @return: 
       * @LastEditTime: Do not Edit
       * @Date: 2019-10-08 14:10:05
       */
      backTop() {
        let timer = setInterval(() => {
          let speed = Math.floor(-this.$refs.refProductDetailPage.scrollTop / 3)
          this.$refs.refProductDetailPage.scrollTop = this.$refs.refProductDetailPage.scrollTop + speed
          if (this.$refs.refProductDetailPage.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 17)
      },
    },
  }

</script>

<style lang="scss" scoped>
  @import "~/assets/style/product/detail.scss";
  .setelse {
    font-size: 24px;
    color: #989898;
    padding-bottom: 10px;
  }
  .showapp {
    width: 750px;
    height: 60px;
    background: rgba(254, 248, 236, 1);
    opacity: 1;
    color: #fba35a;
    font-size: 24px;
    margin-top: 20px;
    line-height: 60px;
    text-align: center;
    img {
      position: relative;
      top: 10px;
      width: 40px;
      height: 40px;
    }
  }
  .product-detail-page {
    .van-popup {
      width: 100vw;
      height: 100vh;
      font-size: 24px;
      margin-top: -2px;
    }

    .video {
      position: fixed;
      top: 88px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
    }

    .video-main {
      margin-top: 200px;
      font-size: 0;
      font-family: none;
      white-space: nowrap;
      overflow: hidden;
    }

    .video-div {
      overflow: hidden;
      position: relative !important;
      background: #000;
      max-height: 18rem;
    }

    video {
      width: 100%;
      height: 100%;
      background: #000;
    }

    .video-loading {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 24px;
        height: 24px;
        border: 2px solid #fff;
        border-radius: 24px;
        animation: videoloading 1s infinite linear;
        clip: rect(0 auto 12px 0);
      }
    }

    .play-btn {
      display: block;
      position: absolute;
      margin: -0.95rem 0 0 -0.95rem;
      top: 50%;
      left: 50%;

      &:after {
        display: block;
        content: "";
        width: 50px;
        height: 50px;
        background: url("../../assets/imgs/icon_video@2x.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-animation: playvideo 1.2s infinite;
        animation: playvideo 1.2s infinite;
        margin-top: -30%;
      }
    }
  }

  @keyframes videoloading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes playvideo {
    0%,
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }
  }
</style>
