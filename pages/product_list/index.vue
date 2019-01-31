<template>
  <section>
    <lay-header
      :searchKeyWords="searchKeyWords"
      :isSearch="isSearch"
      @onSearch="onSearch"
      @searchStart="searchStart"
      @query="queryChange"
      @leftClick="leftClick"
    ></lay-header>
    <div class="list-wrap">
      <div class="tabs-box">
        <van-tabs v-model="active" @click="changeTypeClick">
          <van-tab v-for="item in tagsList" :title="item.title" :key="item.type">
            <van-list v-model="prodLoading" :finished="prodFinished" finished-text="没有更多了" @load="onLoad">
              <template v-if="active !== 0">
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
              </template>
              <template v-if="productList.length">
                <van-cell v-for="item in productList" :key="item.product_id + Math.random()">
                  <product-list :data="item" @selectItem="selectProductDetail"></product-list>
                </van-cell>
              </template>
              <!--<div v-else>暂无数据</div>-->
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!--筛选排序-->
    <van-popup v-model="showFilter" position="right" :overlay="true" class="filter-select">
      <div class="filter-content">
        <div class="filter-list">
          <div class="filter-items" v-for="(item, key) in filterLists" :key="key">
            <div class="cell-list" @click="showMoreFilter(key, item)">
              <div class="left">{{showTitle(key)}}</div>
              <div class="right">
                <span class="text">{{selectNameShow(key)}}</span>
                <i class="van-icon van-icon-arrow" :ref="'filter' + key"></i>
              </div>
            </div>
            <div class="filter-tags" :ref="'tags' + key">
              <div class="item"
                   v-for="(city,index) in item.items"
                   :key="city.id + city.name"
                   :class="filterActive(city.id, key)"
                   @click="filterClick(city, key, index)" :ref="key + currentType">{{city.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="left" @click="resetFilter">重置</div>
        <div class="right" @click="againSearch">选好了</div>
      </div>
    </van-popup>

    <!--排序条件搜索-->
    <div class="sort-box" v-if="sortShow" @click.capture="sortChange">
      <sort-item :sortShow="sortShow" :sortResult="sortResult" @selectSort="selectSortItem"></sort-item>
    </div>
    <!--更多列表的选择-->
    <van-popup v-model="showList" position="right" :overlay="true" class="filter-select more-tag">
      <city-list :multiple="multipleTag" :showBar="true" :dataObj="moreLists" @selectItem="selectItem" ref="moreList" @back="moreListBack"></city-list>
    </van-popup>
    <drift-aside class="drift"></drift-aside>
  </section>
</template>

<script>
import LayHeader from '@/components/header/search'
import sortItem from '@/components/search/sortItem'
import ProductList from '@/components/list/productList'
import CityList from '@/components/list/cityList'
import {getProductList, getFilterList} from '@/api/products'
import DriftAside from '@/components/drift_aside'
export default {
  name: 'product_list',
  components: {
    LayHeader,
    ProductList,
    sortItem,
    CityList,
    DriftAside
  },
  data() {
    return {
      isSearch: false,
      searchKeyWords: this.$route.query.keyWords || null,
      criteria: {}, // 筛选条件数据
      prodPagination: {}, // 分页数据
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      productList: [], // 产品列表数据
      showFilter: false, // 显示筛选条件
      showList: false, // 更多列表的选择
      sortResult:{id:1, order: '', order_by: '', name: '默认排序'}, // 排序的选择条件
      sortShow: false,
      filterLists: {},
      startCity: [],
      active: this.$route.query.itemType === 3 ? 0: this.$route.query.itemType, // 当前搜索的type值
      filterResult: {
        product_type: this.$route.query.product_type || null,
        category: this.$route.query.category || null,
        span_city: this.$route.query.span_city || null,
        start_city: this.$route.query.start_city || null
      }, // 筛选的结果
      activeNames: ['1'],
      moreLists: {}, // 更多的列表
      moreListsTitle: '',
      sureSearchList: {
        start_city: [],
        stop_city: [],
        price: [],
        span_city: [],
        tag: [],
        duration: [],
        product_type: [],
        category: []
      },
      isFilterShow: false
    }
  },
  computed: {
    currentType() { // 当前的type类型
      let _arr = [3,1,2,4,5,6,7]
      return _arr[this.active]
    },
    multipleTag() {
      return this.moreLists.type !== 'start_city' && this.moreLists.type !== 'stop_city'
    }
  },
  watch: {
    searchKeyWords(newValue, oldValue) {
      this.productList = []
      this.prodPagination = {}
      console.log(this.prodFinished)
      if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
        this.prodFinished = false
      } else { // 如果为false则会触发onLoad
        this.onLoad()
      }
      // 筛选条件更新
      this.getFilterList()
    }
  },
  created() {
    this.sortTypes = [
      {id:1, order: '', order_by: '', name: '默认排序'},
      {id:2, order: 'asc', order_by: 'price', name: '价格从低到高'},
      {id:3, order: 'desc', order_by: 'price', name: '价格从高到底'},
      {id:4, order: '', order_by: 'sales', name: '最受欢迎'}
    ]
    this.tagsList = [
      {id:0,type: 3,title: '稀饭推荐'},
      {id:1,type: 1,title: '当地跟团'},
      {id:2,type: 2,title: '当地玩乐'},
      {id:3,type: 4,title: '门票演出'},
      {id:4,type: 5,title: '一日游'},
      {id:6,type: 7,title: '邮轮'}
    ]
    console.log(this.$route.query)
  },
  mounted() {
    // 初始化
    this.getFilterList()
  },
  methods: {
    // 返回上一级
    leftClick() {
      this.$router.go(-1)
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
    onSearch() {},
    searchStart() {},
    queryChange(value) {
      this.searchKeyWords = value
    },
    // 筛选条件
    filterSelect () {
      this.showFilter = !this.showFilter
    },
    // 显示隐藏排序列表
    sortChange() {
      this.sortShow = !this.sortShow
    },
    // 条件查询选择
    async selectSortItem (item) {
      this.sortResult = item
      let len = this.productList.length
      let total = this.prodPagination.total_record
      // 把下面控制列表的数据重置
      this.productList = []
      this.prodPagination = {}
      // this.prodLoading= false
      this.prodFinished= false
      if (len !== total) {
        console.log('进行onLoad')
        this.onLoad()
      } else {
        console.log('没有执行onLoad')
      }
    },
    // 初始化筛选列表
    async getFilterList() {
      const submitData = {
        type: this.currentType,
        keyword: this.searchKeyWords
      }
      let {code, data} = await getFilterList(submitData)
      if (code === 0) {
        this.filterLists = data
      }
    },
    // 滑动会请求数据
    async onLoad() {
      // 获取数据
      console.log('onload')
      console.log(this.filterResult)
      const submitData = {
        type: this.currentType,
        page: (this.prodPagination.page || 0) + 1,
        order_by: this.sortResult.order_by || null,
        order: this.sortResult.order || null,
        keyword: this.searchKeyWords,
        ...this.filterResult
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
    // 切换tab加载数据
    async changeTypeClick() {
      this.productList = []
      this.prodPagination = {}
      this.filterResult = {
        product_type: this.$route.query.product_type || null,
        category: this.$route.query.category || null,
        span_city: this.$route.query.span_city || null,
        start_city: this.$route.query.start_city || null
      }
      if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
        this.prodFinished = false
      } else { // 如果为false则会触发onLoad
        this.onLoad()
      }
      // 筛选列表更新
      this.getFilterList()
    },
    async againSearch () {
      this.prodPagination = {}
      this.productList = []
      if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
        this.prodFinished = false
      } else { // 如果为false则会触发onLoad
        this.onLoad()
      }
      console.log(this.prodPagination)
      // 关闭蒙层
      this.showFilter = false
    },
    // 选中筛选
    filterClick(item, key) {
      let index = this.sureSearchList[key].findIndex(list => (item.id === list.id))
      if(index >= 0) {
        this.sureSearchList[key].splice(index, 1)
      } else {
        if(key === 'span_city' || key === 'tag' || key === 'duration' || key === 'product_type'|| key === 'category') {
          this.sureSearchList[key].push(item) // 多选项
        } else if (key === 'start_city' || key === 'stop_city' || key === 'price'){
          this.sureSearchList[key] = [item] // 单选项
        }
      }
      console.log(this.sureSearchList)
      let id = item.id
      if(!this.filterResult[key]) {
        this.filterResult[key] = item.id + ''
      } else {
        this.filterResult[key] += ',' + id
      }
      // console.log(this.filterResult)
    },
    // 显示title
    showTitle(name) {
      let obj = {
        start_city: '出发城市',
        span_city: '途径景点',
        stop_city: '结束城市',
        duration: '行程天数',
        price: '价格预算',
        tag: '行程特色',
        product_type: '玩乐分类'
      }
      return obj[name]
    },
    // 显示更多的标签
    showMoreFilter(key, item) {
      let filterName = this.$refs['filter' + key][0].className
      let name = this.$refs['tags' + key][0].className
      if(item.items.length > 15) {
        let _obj = this._nomalLizePinyin(item.pinyin)
        this.showList = true
        _obj.title = this.showTitle(key)
        _obj.type = key
        this.moreLists = _obj
        console.log(this.moreLists)
        if(this.$refs['moreList']) {
          this.$refs['moreList'].activeList = []
        }
      } else {
        this.$refs['tags' + key][0].className = name.indexOf('all') >= 0 ? 'filter-tags': 'filter-tags all'
        this.$refs['filter' + key][0].className = filterName.indexOf('down')>= 0 ? 'van-icon van-icon-arrow': 'van-icon van-icon-arrow-down'
      }
    },
    // 更多列表返回
    moreListBack() {
      this.showList = false
    },
    selectItem(lists,type) { // 关闭更多选择层
      console.log(lists,type)
      this.sureSearchList[type] = lists
      this.showList = false
    },
    // 格式化拼音列表
    _nomalLizePinyin(data) {
      let len = data.length
      let obj = {}
      for(let i= 0; i<len; i++) {
        if(!obj[data[i].key]) {
          obj[data[i].key] = []
        }
        obj[data[i].key].push({...data[i]})
      }
      return obj
    },
    // 视觉判断tag是否选中
    filterActive(id,key) {
      let index = this.sureSearchList[key].findIndex(list => (id === list.id))
      return index >=0 ? 'active' : ''
    },
    // 展示显示的name
    selectNameShow(key) {
      let names = this.sureSearchList[key].map(item => {
        return item.name
      })
      return names.length > 3 ? names.splice(0,3).join(',') + '...' : names.join(',')
    },
    // 重置筛选条件
    resetFilter() {
      this.sureSearchList = {
        start_city: [],
        stop_city: [],
        price: [],
        span_city: [],
        tag: [],
        duration: [],
        product_type: [],
        category: []
      }
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
    &.van-popup--right{
      width: 650px;
      height: 100%;
      margin-top: 88px;
      background-color: transparent;
    }
    .filter-content{
      position: absolute;
      top:166px;
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
      max-height: 144px;
      overflow: hidden;
      &.all{
        max-height: none;
      }
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
    .cell-list{
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size:28px;
      height: 80px;
      color: #5E5E5E;
      .text{
        color: #399EF6;
      }
      i{
        vertical-align: middle;
      }
    }
    .bottom-btn{
      height:100px;
      position: absolute;
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
    .show-list{
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
    .van-hairline--top-bottom::after{
      border-color: #E4E4E4;
    }
  }
  .filter-content{
    .van-cell__value{
      color: #399EF6;
    }
  }
  .van-overlay{
    top: 254px !important;
  }
  .drift-wrap .van-overlay{
    top: 0 !important;
  }
</style>
