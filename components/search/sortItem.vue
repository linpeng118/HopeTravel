<template>
  <div class="sort-box" v-if="sortShow">
    <van-radio-group v-model="sortResult.id">
      <van-cell-group>
        <van-cell v-for="item in sortTypes" :key="item.id" :title="item.name" :class="sortResult.id === item.id ? 'active' : ''" clickable @click="selectSortItem(item)">
          <van-icon slot="right-icon" name="success" class="custom-icon" v-if="sortResult.id === item.id" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: 'sortItem',
  props: {
    sortShow: {
      type: Boolean,
      default: false
    },
    sortResult: {
      type: Object,
      default: null
    }
  },
  created() {
    this.sortTypes = [
      {id:1, order: '', order_by: '', name: this.$t('productListPage.sortDefault')},
      {id:2, order: 'asc', order_by: 'price', name: this.$t('productListPage.sortPriceLowToHigh')},
      {id:3, order: 'desc', order_by: 'price', name: this.$t('productListPage.sortPriceHighToLow')},
      {id:4, order: '', order_by: 'sales', name: this.$t('productListPage.sortPopular')}
    ]
  },
  methods: {
    selectSortItem(item) {
      this.$emit('selectSort', item)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .sort-box{
    width: 100%;
    position: fixed;
    top:264px;
    bottom: 0;
    background:rgba(0,0,0,.45);
    font-size:28px;
    .active{
      color: #EF9A1A;
    }
  }
</style>
