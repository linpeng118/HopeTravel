<template>
  <div class="filter-content">
    <div class="filter-list">
      <div class="filter-items">
        <van-cell title="showTitle(key)" is-link />
        <div class="filter-tags">
          <div class="item"
               v-for="(city,index) in data"
               :key="city.id + city.name"
               :class="city.active ? 'active': ''"
               @click="clickFilterItem(city, index)">{{city.name}}</div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="left">重置</div>
      <div class="right">选好了w</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filters',
  props: {
    data: {
      type: Array,
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
    console.log('子数据更新')
  },
  methods: {
    clickFilterItem(item, index) {
      this.$emit('filterClick', item, index)
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
    .filter-content{
      position: absolute;
      top:176px;
      bottom: 88px;
      left: 0;
      right: 0;
      background-color: #fff;
      padding-bottom:100px;
      overflow-y: auto;
    }
    .shade-layer{
      position: relative;
      top: 264px;
      width: 100%;
      height: calc(100% - 264px);
      background:rgba(0,0,0,.45);
    }
    .filter-tags{
      display: flex;
      flex-wrap: wrap;
      padding: 0 32px;
      height: 144px;
      overflow: hidden;
      .item{
        width:186px;
        height:60px;
        margin:0 12px 12px 0;
        line-height: 60px;
        border-radius:8px;
        font-size:24px;
        text-align: center;
        background-color: #F1F1F1;
        color: #2D2D2D;
        &:nth-child(3n+3) {
          margin-right: 0;
        }
        &.active{
          background-color: #399EF6;
          color: #fff;
        }
      }
    }
    .bottom-btn{
      height:100px;
      position: fixed;
      bottom: 88px;
      left: 0;
      right: 0;
      background-color: #fff;
      display: flex;
      box-shadow:0px -1px 10px rgba(0,0,0,0.16);
      .left,.right{
        width: 50%;
        line-height: 100px;
        font-size:32px;
        text-align: center;
        color: #191919;
      }
      .right{
        background-color: #399EF6;
        color: #fff;
      }
    }
</style>
