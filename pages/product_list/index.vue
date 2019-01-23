<template>
  <section>
    <lay-header
      :searchKeyWords="searchKeyWords"
      :isSearch="isSearch"
      @onSearch="onSearch"
      @searchStart="searchStart"
      @query="queryChange"
    ></lay-header>
    <div class="list-wrap">
      <div class="tabs-box">
        <van-tabs>
          <van-tab v-for="item in tagsList" :title="item.title" :key="item.type">
            <van-list v-model="prodLoading" :finished="prodFinished" finished-text="没有更多了" @load="onLoad">
              <div class="filter-box">
                <div class="sort-left" @click="sortChange">
                  {{sortResult.name}}
                  <van-icon name="arrow-down" />
                </div>
                <div class="right" @click="filterSelect">
                  筛选
                  <van-icon name="filter-o" />
                </div>
              </div>
              <van-cell v-for="item in productList" :key="item.product_id + Math.random()">
                <product-list :data="item"></product-list>
              </van-cell>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!--筛选排序-->
    <van-popup v-model="showFilter" position="right" :overlay="true" class="filter-select" @click-overlay="clickOverlay">
      <!--<div class="shade-layer" @click="filterSelect"></div>-->
      <!--<filters :data="startCity" @filterClick="filterClick"></filters>-->
      <div class="filter-content">
        <div class="filter-list">
          <div class="filter-items" v-for="(item, key) in filterLists" :key="key">
            <van-cell :title="showTitle(key)" :value="item.desc" is-link />
            <div class="filter-tags">
              <div class="item"
                   v-for="(city,index) in item.items"
                   :key="city.id + city.name"
                   :class="city.active ? 'active': ''"
                   @click="filterClick(city, key, index)">{{city.name}}</div>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <div class="left">重置</div>
          <div class="right">选好了</div>
        </div>
      </div>
    </van-popup>

    <!--排序条件搜索-->
    <div class="sort-box" v-if="sortShow" @click.capture="sortChange">
      <sort-item :sortShow="sortShow" :sortResult="sortResult" @selectSort="selectSortItem"></sort-item>
    </div>
  </section>
</template>

<script>
import LayHeader from '@/components/header/search'
import sortItem from '@/components/search/sortItem'
// import Filters from '@/components/search/filters'
import Filters from '@/components/search/filters1'
import ProductList from '@/components/list/productList'
import {getProductLists, getFilterList} from '@/api/products'
export default {
  name: 'product_list',
  components: {
    LayHeader,
    ProductList,
    sortItem,
    Filters
  },
  data() {
    return {
      isSearch: false,
      searchKeyWords: this.$route.query.keyWords || '',
      tagsList: [
        {type: 3,title: '稀饭推荐'},
        {type: 1,title: '当地跟团'},
        {type: 2,title: '当地玩乐'},
        {type: 4,title: '门票演出'},
        {type: 5,title: '一日游'},
        {type: 6,title: '接驳服务'},
        {type: 7,title: '邮轮'},
      ],
      criteria: {}, // 筛选条件数据
      prodPagination: {}, // 分页数据
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      productList: [], // 产品列表数据
      showFilter: false,
      sortResult:{id:1, order: '', order_by: '', name: '默认排序'}, // 排序的选择条件
      sortShow: false,
      filterLists: {},
      startCity: []
    }
  },
  created() {
    this.sortTypes = [
      {id:1, order: '', order_by: '', name: '默认排序'},
      {id:2, order: 'asc', order_by: 'price', name: '价格从低到高'},
      {id:3, order: 'desc', order_by: 'price', name: '价格从高到底'},
      {id:4, order: '', order_by: 'sales', name: '最受欢迎'}
    ]
  },
  mounted() {
    // 初始化
    this.getFilterList()
    // this.getData()
  },
  methods: {
    onSearch() {},
    searchStart() {},
    queryChange() {},
    // 筛选条件
    filterSelect () {
      this.showFilter = !this.showFilter
      // console.log('筛选条件')
    },
    // 显示隐藏排序列表
    sortChange() {
      this.sortShow = !this.sortShow
    },
    // 条件查询选择
    async selectSortItem (item) {
      this.sortResult = item
      // 把下面控制列表的数据重置
      this.productList = []
      this.prodPagination = {}
      this.prodLoading= false
      this.prodFinished= false
      this.onLoad()
    },
    // 初始化产品列表
    async getFilterList(obj) {
      const submitData = {
        type: 3
      }
      let {code, data} = await getFilterList(submitData)
      if (code === 0) {
        this.filterLists = data
        this.startCity = data.start_city.items
      }
    },
    // 滑动会请求数据
    async onLoad() {
      // 获取数据
      // this.getData()
      console.log('onload')
      const submitData = {
        type: 3,
        page: (this.prodPagination.page || 0) + 1,
        order_by: this.sortResult.order_by || null,
        order: this.sortResult.order || null,
      }
      const res = await getProductLists(submitData)
      this.productList.push(...res.data)
      this.prodPagination = res.pagination
      console.log(res.pagination)
      // 加载状态结束
      this.prodLoading = false;
      // 数据全部加载完成
      if (!this.prodPagination.more) {
        this.prodFinished = true;
      }
    },
    // 获取产品列表数据
    async getData(data) {
      const res = await getProductLists(data)
      this.productList.push(...res.data)
      this.prodPagination = res.pagination
    },
    // 关闭蒙层
    clickOverlay() {
      // console.log('蒙层')
    },
    // 选中筛选
    filterClick(item, key, index) {
      this.filterLists[key].items.forEach((filter) => {
        filter.active = false
        if(filter.id === item.id) {
          filter.active = true
          this.$set(this.filterLists[key].items, index, filter)
        }
      })
      this.filterLists[key].desc = item.name
    },
    // 序列化城市筛选数据
    _nomalLizeFilterData(data) {
      let obj = []
      obj[0] = {
        type: 'start_city',
        name: '出发城市',
        list: data.start_city.items
      }
      obj[1] = {
        type: 'stop_city',
        name: '结束城市',
        list: data.stop_city.items
      }
      obj[2] = {
        type: 'span_city',
        name: '途径景点',
        list: data.span_city.items
      }
      obj[3] = {
        type: 'tag',
        name: '行程特色',
        list: data.tag.items
      }
      obj[4] = {
        type: 'duration',
        name: '行程天数',
        list: data.duration.items
      }
      obj[5] = {
        type: 'prices',
        name: '价格预算',
        list: data.price.items
      }
      return obj
    },
    // 显示title
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
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .list-wrap{
    padding-top:88px;
    .filter-box{
      height: 88px;
      padding:26px 32px;
      display: flex;
      font-size: 26px;
      justify-content: space-between;
      border-bottom: 1px solid #E4E4E4;
      .sort-left{
        color: #EF9A1A;
        i{
          vertical-align: text-top;
        }
      }
      .right{
        i{
          vertical-align: text-top;
        }
      }
    }
  }
  .filter-select{
    /*.shade-layer{*/
      /*position: relative;*/
      /*top: 264px;*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*background:rgba(0,0,0,.45);*/
    /*}*/
    &.van-popup--right{
      width: 650px;
      height: 100%;
      margin-top: 88px;
      background-color: transparent;
    }
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
  }
</style>
<style type="text/scss" lang="scss">
  .list-wrap{
    .tabs-box{
      .van-tabs__line{
        height:4px;
        background-color: #EF9A1A;
      }
      .van-tab--active{
        color: #EF9A1A;
      }
      .van-tab__pane{

      }
    }
    .van-tabs--line{
      height: 88px;
      border-bottom: 2px solid #E4E4E4;
    }
  }
  .filter-content{
    .van-cell__value{
      color: #399EF6;
    }
  }
  .van-overlay{
    top: 264px !important;
  }
</style>
