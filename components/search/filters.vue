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
      <div class="left">{{$t('reset')}}</div>
      <div class="right">{{$t('chosen')}}</div>
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
        start_city: this.$t('searchComp.startCity'),
        span_city: this.$t('searchComp.spanCity'),
        stop_city: this.$t('searchComp.endCity'),
        duration: this.$t('searchComp.duration'),
        price: this.$t('searchComp.priceBudget'),
        tag: this.$t('searchComp.characteristic')
      }
      return obj[name]
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>

</style>
