<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar :title="$t('personalPage.myOrder')"
        left-arrow
        @click-left="onClickLeft" />
    </div>
    <div class="tab">
      <van-tabs @click="onClick"
        v-model="active">
        <van-tab v-for="title in orderTile"
          :key="title.id"
          :title="title.title"
          class="layout">
          <loading v-if="firstEnter"></loading>
          <div class="no-data"
            v-if="!firstEnter && !orderList.length">{{$t('noData')}}</div>
          <!-- 产品 -->
          <template v-if="orderList.length">
            <div class="prodect"
              v-for="order in orderList"
              :key="order.order_id"
              @click="selectProduct(order)">
              <div class="header clearfix">
                <span class="fl">{{$t('personalPage.orderNumber')}}： {{order.order_id}}</span>
                <i class="fr">{{$t('productDetailPage.productId')}}：{{order.product_id}}</i>
              </div>
              <div class="content">
                <div class="pro-pic">
                  <img :src="order.image"
                    alt>
                </div>
                <div class="pro-content">
                  <span class="short-name">{{order.name_short}}</span>
                  <span
                    :class="order.name_short?'title-wrap-line1':'title-wrap-line2'">
                    {{order.product_name}}
                  </span>
                  <span class="departure_date">{{$t('personalPage.travelDate')}}:{{order.product_departure_date.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="footer clearfix">
                <div class="fl left-f">
                  <span>{{$t('personalPage.totalPrice')}}：</span>
                  <strong>￥{{order.cny_price}}</strong>
                </div>
                <div class="fr right-f"
                  v-if="order.status">
                  <span class="tip"
                    v-if="order.status.code==2 && order.product_comment_status==0">评价最高送500米粒</span>
                  <button :class="getPayClassName(order.status)"
                    v-if="order.status.code!=2">{{order.status.name}}</button>
                  <button class="un-go"
                    v-if="order.status.code==2 && order.product_comment_status==0"
                    @click.stop="linkToCreate(order)">去评价</button>
                  <button class="un-go"
                    v-if="order.status.code==2 && order.product_comment_status==900003"
                    @click.stop="linkToCreate(order)">去追评</button>
                  <button class="other-state"
                    v-if="order.status.code==2 && order.product_comment_status==900004">已评价</button>
                </div>
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import {getOrderList} from '@/api/order'
  import Loading from '@/components/loading/list'
  export default {
    name: 'component_name',
    components: {
      Loading,
    },
    data() {
      return {
        status: this.$route.query.status || null,
        active: 0,
        userId: this.$route.query.userId,
        orderList: [],
        firstEnter: true,
      }
    },
    created() {
      this.orderTile = [
        {
          status: '',
          title: '全部订单',
          id: 0,
        },
        {
          status: 'unpaid',
          title: '待付款',
          id: 1,
        },
        {
          status: 'wait',
          title: '待出行',
          id: 2,
        },
        {
          status: 'comment',
          title: '待评价',
          id: 3,
        },
      ]
    },
    mounted() {
      let _obj = {
        null: 0,
        unpaid: 1,
        wait: 2,
        comment: 3,
      }
      this.active = _obj[this.status]
      this.getOrderData(this.status)
    },
    methods: {
      onClickLeft() {
        this.$router.push({
          path: '/personal',
        })
      },
      onClick(index) {
        this.firstEnter = true
        let _arr = [null, 'unpaid', 'wait', 'comment']
        this.getOrderData(_arr[index])
      },
      async getOrderData(status) {
        let {code, data} = await getOrderList(status)
        if (code === 0) {
          this.firstEnter = false

          //更改路由query
          let query = this.$router.history.current.query,
            path = this.$router.history.current.path

          let newQuery = JSON.parse(JSON.stringify(query))
          newQuery.status = status
          this.$router.replace({
            path,
            query: newQuery,
          })
          this.orderList = data || []
        }
      },
      getPayClassName(status) {
        let _arr = ['go-pay', 'un-go', 'other-state', 'other-state']
        return status ? _arr[status.code] : 0
      },
      selectProduct(order) {
        this.$router.push({
          path: '/personal/order_des',
          query: {
            order_id: order.order_id,
          },
        })
      },
      /*跳转至发布评论*/
      linkToCreate(item) {
        let query = {
          comment_id: item.comment_id,
          template: item.template,
          order_product_id: item.order_product_id,
          order_id: item.order_id,
          product_id: item.product_id,
          score: item.score || 0,
          image: item.image,
        }
        this.$router.push({
          path: '/comment/create',
          query,
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    .tab {
      .layout {
        padding: 24px;

        /*height: 100vh;*/
        .prodect {
          width: 686px;
          height: 342px;
          background: #fff;
          border-radius: 8px;
          margin-bottom: 24px;
          padding-bottom: 20px;

          .header {
            height: 72px;
            font: 22px/34px '';
            border-bottom: 1px solid #f1f1f1;
            padding: 0 32px;

            span {
              color: #399ef6;
              font: 22px/72px '';
            }

            i {
              font: 22px/72px '';
              color: #5e5e5e;
            }
          }

          .content {
            font: 24px/32px '';
            padding: 20px 32px;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;

            .pro-pic {
              margin-right: 26px;
              width: 208px;
              height: 144px;
              background: #ddd;

              img {
                width: 208px !important;
                height: 144px !important;
              }
            }

            .pro-content {
              width: 383px;
              text-align: justify;
              font-size: 0;
              color: #191919;
              position: relative;
              .short-name {
                font-size: 32px;
                font-weight: bold;
                line-height: 44px;
                color: rgba(45, 45, 45, 1);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .title-wrap-line1 {
                display: block;
                overflow: hidden;
                box-sizing: content-box;
                font-size: 28px;
                font-weight: 400;
                line-height: 40px;
                color: rgba(45, 45, 45, 1);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .title-wrap-line2 {
                display: block;
                overflow: hidden;
                box-sizing: content-box;
                font-size: 28px;
                font-weight: 400;
                line-height: 40px;
                color: rgba(45, 45, 45, 1);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .departure_date {
                position: absolute;
                bottom: 0;
                display: block;
                color: #989898;
                font: 24px/24px '';
                margin-top: 20px;
              }
            }
          }

          .footer {
            padding: 0 32px;
            height: 84px;

            .left-f {
              span {
                width: 60px;
                height: 28px;
                font-size: 20px;
                font-weight: 400;
                line-height: 84px;
                color: rgba(152, 152, 152, 1);
                opacity: 1;
              }

              strong {
                width: 136px;
                height: 44px;
                font-size: 32px;
                font-weight: 400;
                line-height: 32px;
                color: rgba(255, 84, 84, 1);
                opacity: 1;
              }
            }

            .right-f {
              .go-pay,
              .other-state,
              .un-go {
                width: 120px;
                height: 44px;
                border-radius: 22px;
                font-size: 24px;
                font-weight: 400;
                line-height: 34px;
                color: rgba(255, 255, 255, 1);
                margin-top: 20px;
              }

              .go-pay {
                background: rgba(255, 84, 84, 1);
              }

              .other-state {
                background: rgba(152, 152, 152, 1);
              }

              .un-go {
                background: #399ef6;
              }

              .tip {
                font-size: 16px;
                color: #ff5454;
              }
            }
          }
        }
      }

      .no-data {
        position: fixed;
        top: 180px;
        left: 0;
        bottom: 0;
        right: 0;
        padding-top: 50px;
        text-align: center;
        color: #aaa;
        font-size: 28px;
        background: #fff;
      }
    }
  }
</style>
