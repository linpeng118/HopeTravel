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
            <van-list
              v-model="prodLoading"
              :finished="prodFinished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="filter-box">
                <div class="sort-left" @click="clickBtn">
                  默认排序
                  <van-icon name="arrow-down" />
                </div>
                <div class="right" @click="clickBtn">
                  筛选
                  <van-icon name="filter-o" />
                </div>
              </div>
              <van-cell
                        v-for="item in productList"
                        :key="item.product_id"
                        >
                <product-list :data="item"></product-list>
              </van-cell>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
      <van-popup v-model="show" position="right" :overlay="false">
        <div style="">
          sdfsdfsd
        </div>
      </van-popup>
    </div>
    <div class="sort-box">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell v-for="item in sortTypes" :key="item.id" :title="item.name" :class="radio === item.id ? 'active' : ''" clickable @click="sortChange(item.id)">
            <van-icon slot="right-icon" name="success" class="custom-icon" v-if="radio === item.id" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </section>
</template>

<script>
import LayHeader from '@/components/header/search'
import ProductList from '@/components/list/productList'
import {getProductLists} from '@/api/products'
export default {
  name: 'product_list',
  components: {
    LayHeader,
    ProductList
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
      productList: [], //测试
      show: false,
      radio: 1
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
    // this.getProductList()
  },
  methods: {
    onSearch() {},
    searchStart() {},
    queryChange() {},
    clickBtn() {
      // this.show = true
    },
    // 条件查询
    sortChange (name) {
      console.log(name)
    },
    // 初始化产品列表
    async getProductList(obj) {
      const submitData = {
        type: 3
      }
      let {code, data, pagination} = await getProductLists(submitData)
      if (code === 0) {
        this.productList = data
        this.prodPagination = pagination
      }
    },
    // 滑动会请求数据
    async onLoad() {
      // 获取数据
      const submitData = {
        type: 3,
        page: (this.prodPagination.page || 0) + 1
      }
      const res = await getProductLists(submitData)
      this.productList.push(...res.data)
      this.prodPagination = res.pagination
      console.log(this.prodPagination)
      // 加载状态结束
      this.prodLoading = false;
      // 数据全部加载完成
      if (!this.prodPagination.more) {
        this.prodFinished = true;
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
      }
    }
  }
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
</style>
