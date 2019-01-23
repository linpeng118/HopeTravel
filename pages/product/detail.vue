<template>
  <div class="product-detail-page"
    ref="refProductDetailPage">
    <product-detail-header :transparent="isTransparent"
      fixed />
    <div class="product-detail">
      <!-- banner -->
      <van-swipe class="banner"
        :autoplay="4000"
        indicator-color="white">
        <van-swipe-item v-for="image in product.images"
          :key="image">
          <div class="banner-img"
            :style="{background: `url(${image}) no-repeat 0 0/100% 100%`}"></div>
        </van-swipe-item>
        <div class="custom-indicator"
          slot="indicator">
          {{ current + 1 }}/4
        </div>
      </van-swipe>
      <!-- 产品 -->
      <div class="product">
        <!-- name -->
        <p class="name">
          {{product.name}}
        </p>
        <!-- 价格 -->
        <div class="price-wrap">
          <span class="price fs-48 fw-800">{{product.special_price ? product.special_price: product.default_price}}<span class="unit">&nbsp;起</span></span>
          <span class="default-price">{{product.special_price ? product.default_price: ''}}</span>
        </div>
      </div>
      <!-- 出发地结束地 -->
      <div class="destination mt-24">
        <div class="header"
          @click="onServerNode">
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            成团保障
          </div>
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            限时特价
          </div>
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            低价保证
          </div>
          <div class="item">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="city">
          <div class="from">
            <img src="../../assets/imgs/product/attention@2x.png"
              alt="from">
            <span class="title">出发地</span>
            <span class="addr">{{product.departure_city}}</span>
          </div>
          <div class="to">
            <img src="../../assets/imgs/product/attention@2x.png"
              alt="from">
            <span class="title">结束地</span>
            <span class="addr">{{product.end_city}}</span>
          </div>
        </div>
      </div>
      <van-actionsheet v-model="showServiceNode"
        title="服务说明">
        <p>一些内容</p>
      </van-actionsheet>
      <!-- 团期价格 -->
      <div class="group-price mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/price@2x.png"
            alt="icon">
          团期价格
        </div>
        <div class="content mt-12">
          <div class="item"
            v-for="(item,index) in top_price[0]&&top_price[0].days"
            :key="index">
            <p class="time">
              {{top_price[0].month}}/{{item.day}}&nbsp;{{getWeek(top_price[0].years, top_price[0].month, item.day)}}
            </p>
            <span class="price">
              {{item.price}}
            </span>
          </div>
          <div class="item more">
            更多团期
          </div>
        </div>
      </div>
      <!-- 稀饭推荐 -->
      <div class="recommend mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/price@2x.png"
            alt="icon">
          稀饭推荐
        </div>
        <div class="content mt-12">
          <ul>
            <li>提供买二送二优惠， 四人一房享受“买二</li>
            <li>三大接团点：唐人街，法拉盛，纽泽西</li>
            <li>畅游：美加两国8大名城</li>
            <li>三大接团点：唐人街，法拉盛，纽泽西</li>
            <li>畅游：美加两国8大名城</li>
          </ul>
        </div>
      </div>
      <!-- tab触发则滚动 -->
      <div class="tab-list mt-24">
        <div class="tab-item"
          v-for="tab in tabList"
          :key="tab.name"
          :class="{'active': activeTab===tab.id}"
          @click="clickTab(tab)">
          {{tab.name}}
        </div>
      </div>
      <!-- 产品特色 -->
      <div class="features"
        ref="refFeatures">
      </div>
      <!-- 行程概要 -->
      <div class="trip"
        ref="refTrip">
        <div class="header-wrap">
          <h3 class="header-title">行程概要</h3>
          <div class="header-content">
            <div class="item">
              <img src="../../assets/imgs/product/trip_1@2x.png"
                alt="trip">
              <p>3天行程</p>
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
            :key="item.product_itinerary_id">
            <div class="title-wrap">
              <span class="icon">D1</span>
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
                    <prod-detail-img-item :proData="attr.images" />
                  </div>
                  <div class="desc"
                    v-html="attr.content"></div>
                </div>
              </div>
              <!-- 酒店 -->
              <div class="hotel-wrap">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;酒店
                </h3>
                <div class="body"
                  v-html="item.hotel"></div>
              </div>
              <!-- 餐食 -->
              <div class="meals-wrap">
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
                    v-if="item.meal.breakfast.contain_meal==1">
                    午饭：{{item.meal.breakfast.remark}}
                  </p>
                  <p class="dinner"
                    v-if="item.meal.breakfast.contain_meal==1">
                    晚饭：{{item.meal.breakfast.remark}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- AD -->
      <div class="ad-custom">
        <span>行程不满意？您还可以找</span>
        <span class="custom"
          @click="onAdCustom">稀饭旅行定制师</span>
      </div>
      <!-- 费用明细 -->
      <div class="cost"
        ref="refCost">
        <h1 class="title">
          费用明细
        </h1>
        <div class="group-price-desc">
          <h3 class="title-s">团费说明</h3>
          <div class="price-item-wrap">
            <div class="price-item"
              v-for="item in 8"
              :key="item">
              <p class="num">双人一间</p>
              <p class="price">$456.98/人</p>
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
    </div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import ProductDetailHeader from '@/components/header/productDetail'
  import ProdDetailImgItem from '@/components/items/prodDetailImgItem'
  import Loading from '@/components/loading'
  import {getProductDetail} from '@/api/products'

  export default {
    components: {
      ProductDetailHeader,
      ProdDetailImgItem,
      Loading
    },
    data() {
      return {
        isTransparent: true, // 导航头是否透明
        current: 0, // 导航页数
        tabList: [
          {id: 1, name: '产品特色', ref: 'refFeatures'},
          {id: 2, name: '3天行程', ref: 'refTrip'},
          {id: 3, name: '费用明细', ref: 'refCost'},
          {id: 4, name: '注意事项', ref: 'refNotice'},
        ],
        activeTab: 1, // 选中的tab
        activeTabRef: 'refFeatures',
        showServiceNode: false, // 显示服务说明
        priceExclude: [], // 不包含面板
        activeNotice: [1], // 注意事项折叠面板
        loading: true,
        // 产品
        product: {},
        // 费用明细
        expense: {},
        // 注意事项
        notice: [],
        // 行程详情
        itinerary: {},
        attributes: [],
        attributes_override: [],
        transfer: [],
        // 团期价格
        top_price: []
      }
    },
    computed: {},
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        const {code, data, msg} = await getProductDetail({
          product_id: 1398,
        })
        console.log(code, data, msg)
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
        this.loading = false
      },
      // 跳转至注册页
      toRegist() {
        this.$router.push({
          path: '/login/regist'
        })
      },
      /**
       * 年月日转周几
       * @params year
       * @params month
       * @params day
       */
      getWeek(year, month, day) {
        const date = `${year}/${month}/${day}`
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
            console.log(`${week} is not found`)
            break;
        }
      },
      onServerNode() {
        this.showServiceNode = true
      },
      clickTab(tab) {
        console.log('tab', tab)
        this.activeTab = tab.id
        this.activeTabRef = tab.ref
        // TODO:滚动到相应位置
        clearInterval(this.timer)
        this.timer = setInterval(this.backFn, 20)
      },
      backFn() {
        let scrollTo = this.$refs[this.activeTabRef].offsetTop // 滚动到的元素
        let scrollTop = this.$refs.refProductDetailPage.scrollTop
        let scrollHeight = this.$refs.refProductDetailPage.scrollHeight // 能滚动的body的高度
        let clientHeight = this.$refs.refProductDetailPage.clientHeight // 视窗高度
        // console.log(this.activeTabRef, '需要滚动到：', scrollTo, '只能滚到：', scrollTop, '能滚的body高度：', scrollHeight, '窗口（100vh）：', clientHeight)
        // 这里向上取整是确保差距小于5的时候，ispeed为0
        let ispeed = Math.ceil((scrollTo - scrollTop) / 5)
        this.$refs.refProductDetailPage.scrollTop = scrollTop + ispeed
        // console.log(scrollTop === scrollTo)
        if (scrollTop === scrollTo) {
          clearInterval(this.timer)
        }
        // 是否已滚动到底
        if (scrollTop + clientHeight === scrollHeight) {
          clearInterval(this.timer)
        }
      },
      onAdCustom() {
        console.log('onAdCustom')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-page {
    height: 100vh;
    font-size: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .product-detail {
      background: #f2f2f2;
      padding-bottom: 144px;
      .banner {
        height: 434px;
        width: 100%;
        .banner-img {
          height: 434px;
          width: 100vw;
        }
        .custom-indicator {
          font-size: 20px;
        }
      }
      .product {
        padding: 20px 24px;
        height: 236px;
        background: #fff;
        .name {
          height: 138px;
          color: #3e3e3e;
          letter-spacing: 8px;
          font-size: 32px;
          font-family: Microsoft YaHei UI;
        }
        .price-wrap {
          margin-top: 2px;
          .price {
            color: #fb605d;
            .unit {
              font-size: 24px;
            }
          }
          .default-price {
            font-size: 24px;
            font-weight: 300;
            color: #989898;
            text-decoration: line-through;
          }
        }
      }
      .destination {
        height: 208px;
        background: #fff;
        padding: 0 32px;
        .header {
          height: 82px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e4e4e4;
          .item {
            font-size: 28px;
            font-weight: 300;
            color: rgba(91, 91, 91, 1);
            letter-spacing: 4px;
            img {
              vertical-align: middle;
              width: 28px;
              height: 28px;
            }
          }
        }
        .city {
          padding: 20px 0;
          .from,
          .to {
            img {
              width: 40px;
              height: 40px;
              vertical-align: top;
            }
            .title {
              height: 38px;
              font-size: 28px;
              font-weight: 400;
              line-height: 44px;
              font-family: Microsoft YaHei;
              color: rgba(0, 0, 0, 1);
              letter-spacing: 2px;
            }
            .addr {
              margin-left: 40px;
              font-size: 28px;
              font-family: Microsoft YaHei UI;
              font-weight: 300;
              line-height: 44px;
              color: rgba(91, 91, 91, 1);
              letter-spacing: 4px;
            }
          }
        }
      }
      // 公共部分
      .group-price,
      .recommend {
        padding: 20px 28px 20px 32px;
        background: #fff;
        .title {
          height: 40px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: rgba(62, 62, 62, 1);
          img {
            vertical-align: middle;
            height: 28px;
            width: 28px;
          }
        }
      }
      .group-price {
        // height: 272px;
        .content {
          .item {
            display: inline-block;
            margin: 10px 6px 0 0;
            width: 166px;
            height: 80px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            text-align: center;
            font-family: PingFang SC;
            overflow: hidden;
            &.more {
              color: #1592e6;
              font-size: 24px;
              line-height: 80px;
            }
            .time {
              font-size: 24px;
              font-weight: 400;
              line-height: 40px;
              color: rgba(62, 62, 62, 1);
              letter-spacing: 2px;
            }
            .price {
              font-size: 24px;
              font-weight: 400;
              color: rgba(251, 96, 93, 1);
              letter-spacing: 2px;
            }
          }
        }
      }
      .recommend {
        .content {
          padding: 0 34px;
          ul > li {
            list-style: disc;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 300;
            line-height: 40px;
            color: rgba(57, 158, 246, 1);
          }
        }
      }
      .tab-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        .tab-item {
          flex: 0 0 25%;
          text-align: center;
          height: 80px;
          line-height: 80px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(64, 64, 64, 1);
          &.active {
            border-bottom: 2px dashed #1592e6;
          }
        }
      }
      .features {
        height: 1520px;
        background: url("../../assets/imgs/product/bg_features.png") no-repeat 0 0/100%
          100%;
      }
      .trip {
        background: #fff;
        .header-wrap {
          padding: 34px 28px 0 32px;
          text-align: center;
          .header-title {
            height: 44px;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 44px;
            color: #191919;
          }
          .header-content {
            padding: 54px 0 28px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 2px solid #c9c9c9;
            .item {
              img {
                width: 60px;
                height: 60px;
              }
              p {
                margin-top: 12px;
                font-size: 24px;
                font-family: Microsoft YaHei UI;
                font-weight: 400;
                line-height: 44px;
                color: #191919;
              }
            }
          }
        }
        .content-wrap {
          .content-title {
            text-align: center;
            margin-top: 36px;
            height: 44px;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 44px;
            color: #191919;
          }
          .content {
            margin-top: 46px;
            padding-left: 30px;
            .title-wrap {
              .icon {
                padding: 4px 12px;
                text-align: center;
                background: #f48206;
                border-radius: 20px;
                font-size: 24px;
                color: #fff;
              }
              .title-s {
                margin-left: 16px;
                font-size: 28px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 40px;
                color: #191919;
              }
            }
            .detail {
              .summarize-wrap,
              .attractions-wrap,
              .hotel-wrap,
              .meals-wrap {
                .title {
                  height: 40px;
                  font-size: 28px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  line-height: 44px;
                  color: #191919;
                  img {
                    vertical-align: middle;
                    width: 28px;
                    height: 28px;
                  }
                }
              }
              .summarize-wrap,
              .attractions-wrap,
              .hotel-wrap {
                .body {
                  font-size: 24px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  line-height: 40px;
                  color: #5e5e5e;
                  position: relative;
                  &::before {
                    content: "";
                    position: absolute;
                    left: 14px;
                    top: 0;
                    width: 2px;
                    background: #8f8f8f;
                    height: 100%;
                  }
                }
              }
              .summarize-wrap {
                margin-top: 22px;
                .body {
                  padding: 12px 18px 24px 33px;
                }
              }
              .attractions-wrap {
                .body {
                  padding: 12px 0 24px 33px;
                  overflow: hidden;
                  .attr-imgs {
                    height: 220px;
                  }
                  .desc {
                    margin-top: 22px;
                    font-size: 24px;
                    font-family: PingFang SC;
                    font-weight: 300;
                    line-height: 40px;
                    color: #5e5e5e;
                  }
                }
              }
              .hotel-wrap {
                .body {
                  padding: 12px 18px 24px 33px;
                }
              }
              .meals-wrap {
                .body {
                  padding: 12px 18px 24px 33px;
                  font-size: 24px;
                  font-family: Microsoft YaHei UI;
                  font-weight: 400;
                  line-height: 40px;
                  color: #5e5e5e;
                  .breakfast {
                  }
                  .lunch {
                  }
                  .dinner {
                  }
                }
              }
            }
          }
        }
      }
      .ad-custom {
        padding: 20px 0;
        text-align: center;
        span {
          height: 34px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: rgba(193, 193, 193, 1);
          letter-spacing: 2px;
          &.custom {
            color: #399ef6;
          }
        }
      }
      .cost {
        background: #fff;
        .title {
          padding-top: 36px;
          text-align: center;
          font-size: 32px;
          font-weight: 400;
          line-height: 44px;
          color: #191919;
        }
        .group-price-desc,
        .price-desc,
        .price-include {
          margin: 0 auto;
          padding: 24px 0 28px;
          width: 686px;
          border-bottom: 2px solid #e4e4e4;
          .title-s {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 44px;
            color: #191919;
          }
          .text {
            font-size: 24px;
            font-weight: 300;
            line-height: 40px;
            color: #3e3e3e;
          }
        }
        .group-price-desc {
          margin: 56px auto 0;
          .price-item-wrap {
            padding: 0 8px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            flex-wrap: wrap;
            .price-item {
              margin-top: 20px;
              flex: 0 0 146px;
              width: 146px;
              text-align: center;
              position: relative;
              &:not(:nth-child(4)):not(:nth-child(8)) {
                &::after {
                  position: absolute;
                  right: -6px;
                  top: 8px;
                  content: "";
                  height: 60px;
                  width: 2px;
                  background: #e4e4e4;
                }
              }
              .num {
                font-size: 24px;
                font-weight: 400;
                line-height: 44px;
                color: #989898;
              }
              .price {
                font-size: 24px;
                font-weight: 400;
                line-height: 44px;
                color: rgba(251, 96, 93, 1);
              }
            }
          }
        }
      }
      .notice {
        font-family: Microsoft YaHei UI;
        font-weight: 400;
        .title {
          font-size: 28px;
          line-height: 44px;
          color: #191919;
        }
        .text {
          margin-top: 18px;
          font-size: 24px;
          line-height: 40px;
          color: #3e3e3e;
        }
        .tip {
          font-size: 20px;
          line-height: 36px;
          color: #bcbcbc;
        }
      }
    }
  }
</style>
