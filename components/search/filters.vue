<template>
  <div class="filter-content">
    <div class="filter-list">
      <div class="filter-items" v-for="(item, key) in data" :key="key">
        <van-cell :title="showTitle(key)" :value="item.desc" is-link />
        <div class="filter-tags">
          <div class="item"
               v-for="city in item.items"
               :key="city.id + city.name"
               :class="city.active ? 'active': ''"
               @click="clickFilterItem(city, key)">{{city.name}}</div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="left">重置</div>
      <div class="right">选好了</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filters',
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // showFilter: true
    }
  },
  watch: {

  },
  updated() {
    console.log('数据更新')
  },
  methods: {
    clickFilterItem(item, key) {
      this.$emit('filterClick', item, key)
    },
    showTitle(name) {
      let obj = {
        start_city: '出发城市',
        span_city: '途径景点',
        stop_city: '结束城市',
        duration: '行程天数',
        price: '价格预算',
        tag: '行程特色'
      }
      return obj[name]
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>

</style>
