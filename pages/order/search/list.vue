<template>
  <div class="order-search-list">
    <van-nav-bar class="search-header tours-no-bb"
      title="查询结果"
      @click-left="toPersonal">
      <van-icon name="cross"
        slot="left" />
    </van-nav-bar>
    <div class="product-list">
      <template v-if="orderList&&orderList.length">
        <div class="prodect-item"
          v-for="order in orderList"
          :key="order.order_id"
          @click="toOrderDetail(order)">
          <!-- 订单 -->
          <product-order-item :orderInfo="order"
            :authCode="authCode" />
        </div>
      </template>
      <div class="no-more"
        v-else>
        <img src="~/assets/imgs/net_error_no_data_img@2x.png"
          alt="">
        <h2>已经搜肠刮肚了了，还是没有找到</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import productOrderItem from '@/components/items/productOrder'
  import {getSessionStore} from '@/assets/js/utils'

  export default {
    components: {
      productOrderItem
    },
    data() {
      return {
        orderList: [],
        token: '',
      }
    },
    mounted() {
      this.orderList = JSON.parse(getSessionStore('searchOrderInfo')).items
      this.authCode = JSON.parse(getSessionStore('searchOrderInfo')).auth_code
    },
    methods: {
      toOrderDetail(val) {
        this.$router.push({
          name: 'order-search-detail',
          query: {
            order_id: val.order_id
          }
        })
      },
      toPersonal() {
        this.$router.push({
          name: 'personal'
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order-search-list {
    background: #f5f4f9;
    min-height: 100vh;
    .product-list {
      padding: 28px 32px;
    }
    .prodect-item {
      margin-bottom: 24px;
    }
    .no-more {
      text-align: center;
      padding-top: 200px;
      color: #9b9b9b;
      img {
        width: 200px;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 32px;
        line-height: 60px;
      }
      h3 {
        font-size: 24px;
        line-height: 40px;
        margin-bottom: 10px;
      }
    }
  }
</style>