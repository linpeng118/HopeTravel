<template>
  <div class="play-foreign">
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="title"
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
    <drift-aside class="drift"></drift-aside>
  </div>
</template>

<script>
import ProductList from '@/components/list/productList'
import {getProductList} from '@/api/products'
import DriftAside from '@/components/drift_aside'
export default {
  name: 'play_foreign',
  components: {
    ProductList,
    DriftAside
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
    title() {
      let tit = this.$route.query.itemType == 1 ? '-全部跟团' : '-全部玩乐'
      return this.keyword + tit
    }
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
  .play-foreign{
    .van-cell{
      padding: 0 15px;
    }
    .product-box{
      padding: 90px 15px 0 15px;
    }
  }
  .header{
    border-bottom: 1px solid #E4E4E4;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  .no-data{}
</style>
