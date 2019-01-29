<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="keyword + '-全部玩乐'"
        @click-left="onClickLeft"
        left-arrow
      >
      </van-nav-bar>
    </div>
    <div class="product-box">
      <van-list v-model="prodLoading" :finished="prodFinished" finished-text="没有更多数据了" @load="onLoad">
        <van-cell v-for="item in productList" :key="item.product_id + Math.random()">
          <product-list :data="item" @selectItem="selectProductDetail"></product-list>
        </van-cell>
        <!--<div v-else>暂无数据</div>-->
      </van-list>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/list/productList'
import {getProductList} from '@/api/products'
export default {
  name: 'play_foreign',
  components: {
    ProductList
  },
  data() {
    return {
      keyword: decodeURIComponent(this.$route.query.keyword) || '',
      productList: [],
      prodPagination: {}, // 分页数据
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
    }
  },
  computed: {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async onLoad() {
      console.log('onload')
      const submitData = {
        type: this.$route.query.itemType,
        page: (this.prodPagination.page || 0) + 1,
        keyword: this.keyword,
        product_type: this.$route.query.product_type || ''
      }
      const res = await getProductList(submitData)
      this.productList.push(...res.data)
      this.prodPagination = res.pagination
      // 加载状态结束
      this.prodLoading = false
      // 数据全部加载完成
      if (!this.prodPagination.more) {
        this.prodFinished = true;
      }
    },
    // 跳转到详情页面
    selectProductDetail(productId) {
      this.$router.push({
        name: 'product-detail',
        query: {
          productId
        }
      })
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .header{
    border-bottom: 2px solid #E4E4E4;
  }
  .no-data{}
</style>
