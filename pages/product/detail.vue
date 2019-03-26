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
          产品编号：{{product.code}}
        </div>
      </div>
      <!-- 产品 -->
      <div class="product">
        <!-- name -->
        <p class="name">
          <span class="prod-tag"
            v-if="product.self_support">自营</span>
          {{product.name}}
        </p>
        <!-- 价格 -->
        <div class="price-wrap">
          <span class="price fs-48 fw-800"
            :style="{'color': product.self_support ? '#EF9A1A' : '#fb605d'}">
            {{product.special_price ? product.special_price: product.default_price}}
            <span class="unit">&nbsp;起</span>
          </span>
          <span class="default-price">
            {{product.special_price ? product.default_price: ''}}
          </span>
        </div>
      </div>
      <!-- 特色 -->
      <div class="destination mt-24">
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
            <span class="title">出发地</span>
            <span class="addr">{{product.departure_city}}</span>
          </div>
          <div class="to">
            <img src="../../assets/imgs/product/to@2x.png"
              alt="from">
            <span class="title">结束地</span>
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
          团期价格
        </div>
        <div class="content mt-12">
          <div v-for="(item,index) in topPrice"
            :key="index"
            class="g-price-item"
            @click="onGroupPriceDate(item)">
            <p class="time">
              {{item.month}}/{{item.day}}&nbsp;{{getWeek(item.year, item.month, item.day)}}
            </p>
            <span class="price">
              {{item.price}}
            </span>
          </div>
          <div class="g-price-item more"
            @click="onGroupPriceMore">
            更多团期
          </div>
        </div>
      </div>
      <!-- 稀饭推荐 -->
      <div class="recommend mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/praise@2x.png"
            alt="icon">
          稀饭推荐
        </div>
        <div class="content mt-12"
          v-html="product.small_description"></div>
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
          <h3 class="header-title">行程概要</h3>
          <div class="header-content">
            <div class="item">
              <img src="../../assets/imgs/product/trip_1@2x.png"
                alt="trip">
              <p>{{itinerary.duration_days}}天行程</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_2@2x.png"
                alt="trip">
              <p>12个景点</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_3@2x.png"
                alt="trip">
              <p>中英双语</p>
            </div>
          </div>
        </div>
        <div class="content-wrap">
          <div class="content-title">行程详情</div>
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
                    alt="icon">&nbsp;概况
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
                    alt="icon">&nbsp;酒店
                </h3>
                <div class="body"
                  v-html="item.hotel"></div>
              </div>
              <!-- 餐食（contain_meal：1包含，2不包含） -->
              <div class="meals-wrap"
                v-if="item.meal.breakfast.contain_meal==1 || item.meal.lunch.contain_meal==1 || item.meal.dinner.contain_meal==1">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;餐食
                </h3>
                <div class="body">
                  <p class="breakfast"
                    v-if="item.meal.breakfast.contain_meal==1">
                    早餐：{{item.meal.breakfast.remark}}
                  </p>
                  <p class="lunch"
                    v-if="item.meal.lunch.contain_meal==1">
                    午饭：{{item.meal.lunch.remark}}
                  </p>
                  <p class="dinner"
                    v-if="item.meal.dinner.contain_meal==1">
                    晚饭：{{item.meal.dinner.remark}}
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
        <span>行程不满意？您还可以找</span>
        <span class="custom"
          @click="onAdCustom">稀饭旅行定制师</span>
      </div>
      <!-- 费用明细 -->
      <div class="cost"
        ref="refCost"
        v-show="product.product_entity_type || product.tour_category==='Unassigned'">
        <h1 class="title">
          费用明细
        </h1>
        <div class="group-price-desc">
          <h3 class="title-s">团费说明</h3>
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
          <h3 class="title-s">价格说明</h3>
          <div class="text"
            v-html="expense.price_notice"></div>
        </div>
        <div class="price-include">
          <h3 class="title-s">费用包含</h3>
          <div class="text"
            v-html="expense.package_include"></div>
        </div>
        <van-collapse v-model="priceExclude">
          <van-collapse-item title="费用不含"
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
              @click="btnReserve">{{product.is_soldout? '恢复预定通知' : '立即预定'}}</van-button>
          </div>
        </div>
      </div>
      <!-- 服务说明 -->
      <van-actionsheet v-model="showServiceNode"
        title="服务说明"
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
      <!-- 恢复预定通知 -->
      <van-actionsheet v-model="showSoldOut"
        title=" "
        class="sold-out">
        <div class="sold-out-content">
          <h3 class="title">该行程暂时未开放预订，请在下面输入您的E-mail地址或手机号码，当恢复预定时我们会发邮件或短信通知您！</h3>
          <p class="desc mt-30">邮件或手机号</p>
          <div class="account-wrap mt-30">
            <van-cell-group class="account-input">
              <van-field class="tours-input"
                v-model="account"
                placeholder="用户名 / 邮箱">
              </van-field>
            </van-cell-group>
            <van-button class="account-btn"
              slot="button"
              size="small"
              @click="btnOrder">提交</van-button>
          </div>
        </div>
      </van-actionsheet>
    </div>
    <!-- 加载态 -->
    <loading v-if="loading"></loading>
    <!-- 弹出咨询层 -->
    <!-- <van-popup class="show-consult"
      v-model="showConsult"
      position="bottom"
      :overlay="true">
      <iframe src="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226"
        frameborder="0"
        width="100%"
        height="100%"></iframe>
    </van-popup> -->
    <!-- 右上角更多操作 -->
    <transition name="fade">
      <div class="show-more"
        v-show="showMore">
        <div class="show-more-item"
          @click="onHomePage">
          <img src="~/assets/imgs/product/icon_home@2x.png"
            alt="">
          <span class="item-title">首页</span>
        </div>
        <div class="show-more-item"
          @click="onDest">
          <img src="~/assets/imgs/product/icon_pos@2x.png"
            alt="">
          <span class="item-title">目的地</span>
        </div>
        <div class="show-more-item"
          @click="onPersonal">
          <img src="~/assets/imgs/product/icon_person@2x.png"
            alt="">
          <span class="item-title">个人中心</span>
        </div>
        <div class="show-more-item"
          @click="onFollow">
          <img src="~/assets/imgs/product/icon_star@2x.png"
            alt="">
          <span class="item-title">我的收藏</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';
  import {throttle as _throttle} from 'lodash'
  import {ImagePreview} from 'vant';
  import ProductDetailHeader from '@/components/header/productDetail'
  import ProdDetailImgItem from '@/components/items/prodDetailImgItem'
  import Loading from '@/components/loading'
  import {getLocalStore, setLocalStore} from '@/assets/js/utils'
  import {OPERATE_TYPE} from '@/assets/js/consts'
  import {ENTITY_TYPE} from '@/assets/js/consts/products'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  import {getProductDetail, addFavorite, delFavorite, schedule} from '@/api/products'
  import {getProfile} from '@/api/profile'

  export default {
    layout: 'default',
    head: {
      title: '详情页面'
    },
    components: {
      ProductDetailHeader,
      ProdDetailImgItem,
      Loading,
    },
    async asyncData({$axios, query}) {
      let attributes,
        attributes_override,
        expense,
        itinerary,
        notice,
        product,
        top_price,
        transfer
      try {
        let {code, msg, data} = await $axios.$get(`/api/product/${query.productId}`, {
          headers: {
            'platform': 'app',
            'phoneType': 'iOS',
            'App-Version': '1.0.0'
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
        } else {
          console.log('error:', msg)
        }
      } catch (error) {
        console.log(error)
      }
      return {
        attributes,
        attributes_override,
        expense,
        itinerary,
        notice,
        product,
        top_price,
        transfer
      }
    },
    data() {
      return {
        ENTITY_TYPE,
        loading: false,
        productId: Number(this.$route.query.productId) || null,
        isTransparent: true, // 导航头是否透明
        current: 0, // 导航页数
        // bgFeat: require('../../assets/imgs/product/bg_features.png'),
        activeTab: 1, // 选中的tab
        activeTabRef: this.hasFeature ? 'refFeatures' : 'refTrip',
        showServiceNode: false, // 显示服务说明
        showSoldOut: false, // 恢复预定通知弹窗
        priceExclude: [], // 不包含面板
        activeNotice: [1], // 注意事项折叠面板
        // // 产品
        // product: {},
        // // 费用说明对象
        // expense: {},
        // // 注意事项
        // notice: [],
        // // 行程详情
        // itinerary: {},
        // attributes: [],
        // attributes_override: [],
        // transfer: [],
        // // 团期价格
        // top_price: [],
        isTabFixed: false,
        showDay: 'D1',
        // 显示电话弹窗
        showPhone: false,
        // 右上角更多现实
        showMore: false,
        // 邮箱或手机号
        account: '',
        timer: null,
      }
    },
    computed: {
      serviceNote() {
        return this.product && this.product.icons_tour || []
      },
      standartPrice() {
        let newData = [
          {name: '单人一间', type: 'price_single', price: ''},
          {name: '单人标配', type: 'price_single_pu', price: ''},
          {name: '双人一间', type: 'price_double', price: ''},
          {name: '三人一间', type: 'price_triple', price: ''},
          {name: '四人一间', type: 'price_quad', price: ''},
          {name: '小孩价格', type: 'price_kids', price: ''},
          {name: '五人一间', type: 'price_five', price: ''},
          {name: '六人一间', type: 'price_six', price: ''},
          {name: '七人一间', type: 'price_seven', price: ''},
          {name: '八人一间', type: 'price_eight', price: ''},
          {name: '成人价格', type: 'price_adult', price: ''},
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
        return [
          {id: 1, name: '产品特色', ref: 'refFeatures', isShow: this.hasFeature},
          {id: 2, name: this.itinerary.duration_days + '天行程', ref: 'refTrip', isShow: true},
          {id: 3, name: '费用明细', ref: 'refCost', isShow: true},
          {id: 4, name: '注意事项', ref: 'refNotice', isShow: true},
        ]
      },
      operateTabbar() {
        return [
          {type: OPERATE_TYPE.ATTR, name: '收藏', icon: this.product.is_favorite ? require('../../assets/imgs/product/star_active@2x.png') : require('../../assets/imgs/product/star@2x.png')},
          {type: OPERATE_TYPE.PHONE, name: '电话咨询', icon: require('../../assets/imgs/product/phone@2x.png')},
          {type: OPERATE_TYPE.ONLINE, name: '在线咨询', icon: require('../../assets/imgs/product/consult@2x.png')},
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
    mounted() {
      this.init()
      this.$refs.refProductDetailPage.addEventListener("scroll", _throttle(this.scrollFn, 200));
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
        // await this.getProductDetailData() // 改用asyncData
        if (!(this.product && this.product.product_id)) {
          this.jumpTo('/')
        }
        await this.saveLocal()
      },
      async getProductDetailData() {
        this.loading = true
        const {code, data, msg} = await getProductDetail({
          product_id: this.productId,
        })
        // console.log(code, data, msg)
        if (code === 0) {
          this.attributes = data.attributes
          this.attributes_override = data.attributes_override
          this.expense = data.expense
          this.itinerary = data.itinerary
          this.notice = data.notice
          this.product = data.product
          this.top_price = data.top_price
          this.transfer = data.transfer
        }
        document.title = this.product.name
        this.loading = false
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
            return '周末'
            break;
          case 1:
            return '周一'
            break;
          case 2:
            return '周二'
            break;
          case 3:
            return '周三'
            break;
          case 4:
            return '周四'
            break;
          case 5:
            return '周五'
            break;
          case 6:
            return '周六'
            break;
          default:
            // console.log(`${week} is not found`)
            break;
        }
      },
      onServerNode() {
        this.showServiceNode = true
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
        let scrollTo = this.$refs[this.activeTabRef].offsetTop
          - this.$refs.refTabList.offsetHeight
          - this.$refs.refProdctDetailHeader.$el.offsetHeight
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
      scrollFn() {
        try {
          const s1 = this.$refs.refProductDetailPage.scrollTop;
          const s1H = this.$refs.refProductDetailPage.offsetHeight;
          const allH = this.$refs.refProductDetail.offsetHeight;
          let tabListH = this.$refs.refTabList.offsetTop - this.$refs.refTabList.offsetHeight;
          let tabHeightH = this.$refs.refTabHeight.offsetTop - this.$refs.refTabList.offsetHeight;
          // console.log(s1, tabListH, tabHeightH)
          if (s1 > 0) {
            this.isTransparent = false
          } else {
            this.isTransparent = true
          }
          if (s1 >= tabListH) {
            this.isTabFixed = true
          }
          if (s1 <= tabHeightH) {
            this.isTabFixed = false
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
        } catch (error) {
          console.log(error)
        }
      },
      // 点击预览图片
      onImgSlide(data) {
        console.log(data)
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
          const {code, data, msg} = await delFavorite({
            product_id: this.product.product_id
          })
          if (code === 0) {
            this.$toast('取关成功')
            this.getProductDetailData()
          } else {
            this.$toast('取关失败')
          }
        } else {
          const {code, data, msg} = await addFavorite({
            product_id: this.product.product_id
          })
          if (code === 0) {
            this.$toast('关注成功')
            this.getProductDetailData()
          } else {
            this.$toast('关注失败')
          }
        }
      },
      // 电话咨询
      telCounsel() {
        this.vxToggleDialog(true)
        this.vxSetDlgType(DLG_TYPE.PHONE)
      },
      // 在线咨询
      onlineCounsel() {
        window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226'
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
      },
      // 更多期团
      onGroupPriceMore() {
        this.btnReserve()
      },
      // 显示右上角更多操作
      onHeaderRight() {
        this.showMore = !this.showMore
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
        const {code, msg, data} = await getProfile()
        console.log(code, msg)
        // console.log(this.product)
        if (code === 700) {
          console.log(this.$route.fullPath)
          this.$router.push({
            path: `/login?redirect=${this.$route.fullPath}`,
          })
        } else if (code === 401) {
          return
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
        const {code, msg} = await schedule(data)
        if (code === 0) {
          this.showSoldOut = false
        }
        this.$toast(msg)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/style/product/detail.scss";
</style>
