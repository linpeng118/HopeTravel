<template>
  <div class="order-search-list">
    <van-nav-bar class="search-header tours-no-bb"
      title="查询结果"
      @click-left="toPersonal">
      <van-icon name="cross"
        slot="left" />
    </van-nav-bar>
    <template v-if="orderList.length">
      <div class="prodect-list"
        v-for="order in orderList"
        :key="order.order_id"
        @click="selectProduct(order)">
        <product-order-item :orderInfo="order" />
      </div>
    </template>
  </div>
</template>

<script>
  import productOrderItem from '@/components/items/productOrder'
  export default {
    components: {
      productOrderItem
    },
    data() {
      return {
        orderList: []
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .order-search-list {
    padding: 28px 32px;
  }
</style>