<template>
  <div class="product-detail-page"
    ref="refProductDetailPage">
    <product-detail-header rightText="注册"
      @callOnRigth="toRegist" />
    <div class="product-detail">
    </div>
  </div>
</template>

<script>
  import ProductDetailHeader from '@/components/header/productDetail'

  export default {
    components: {
      ProductDetailHeader,
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {
      // 跳转至注册页
      toRegist() {
        this.$router.push({
          path: '/login/regist'
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-page {
    height: 100vh;
    font-size: 0;
    background: #fff;
  }
</style>
