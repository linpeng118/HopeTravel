<template>
  <div class="profile-detail">
    <header-bar title="我的收益"></header-bar>
    <div class="main-profit-wrap" style="padding-top: 46px;">
      <van-tabs v-model="currentTab" color="transparent">
        <van-tab v-for="tab in tabList" :key="tab.id">
          <div slot="title" class="profile-title">
            {{tab.name}}
            <p class="price" v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.currency}}{{showCurrentPrice(incomeReport.income, tab.id)}}</p>
          </div>
          <template v-if="currentTab === 0">
            <van-list v-model="prodLoading0" :finished="prodFinished0" finished-text="没有更多了" @load="onLoad">
              <template v-for="list in incomeLists0">
                <profit-detail :item="list" :key="list.id"></profit-detail>
              </template>
            </van-list>
          </template>
          <template v-else-if="currentTab === 1">
            <van-list v-model="prodLoading1" :finished="prodFinished1" finished-text="没有更多了" @load="onLoad">
              <template v-for="list in incomeLists1">
                <profit-detail :item="list" :key="list.id"></profit-detail>
              </template>
            </van-list>
          </template>
          <template v-else>
            <van-list v-model="prodLoading2" :finished="prodFinished2" finished-text="没有更多了" @load="onLoad">
              <template v-for="list in incomeLists2">
                <profit-detail :item="list" :key="list.id"></profit-detail>
              </template>
            </van-list>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import profitDetail from '@/components/list/profitList'
import {getIncomeReport} from '@/api/sale_union'
import {summaryReport} from '@/assets/js/mixins/incomeReport'
export default {
  name: 'profit_detail',
  components: {HeaderBar,profitDetail},
  mixins: [summaryReport],
  data() {
    return {
      currentTab: 0,
      incomeLists0: [],
      incomeLists1: [],
      incomeLists2: [],
      prodLoading0: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished0: false, // 是否已加载完成，加载完成后不再触发load事件
      prodLoading1: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished1: false, // 是否已加载完成，加载完成后不再触发load事件
      prodLoading2: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished2: false, // 是否已加载完成，加载完成后不再触发load事件
      prodPagination0: {},
      prodPagination1: {},
      prodPagination2: {},
      loading: {},
      finished:{},
    }
  },
  created(){
    this.tabList = [
      {id:0,name: '累计已赚'},
      {id:1,name: '直接收益'},
      {id:2,name: '间接收益'},
    ]
  },
  mounted(){
  },
  methods: {
    onClickLeft(){},
    async onLoad(){
      // console.log('onLoad : ', this.currentTab)
      let res = await getIncomeReport(this.currentTab)
      this['incomeLists' + this.currentTab].push(...res.data.list)
      this['prodPagination' + this.currentTab] = res.pagination
      this['prodLoading' + this.currentTab] = false
      if (!this['prodPagination' + this.currentTab].more) {
        this['prodFinished' + this.currentTab] = true
      }
    },
    showCurrentPrice(obj, id) {
      let arr = ['total_earn','income_one','income_two']
      return obj[arr[id]]
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .main-profit-wrap{
    min-height: 100vh;
    background-color: #F5F4F9;
    padding-bottom: 20px;
  }
  .profile-detail{
    .profile-title{
      height:160px;
      padding-top: 40px;
      background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
      color: #fff;
      font-size:26px;
      p.price{
        font-size:40px;
        font-weight: bold;
      }
    }
  }
</style>
<style>
  .profile-detail .van-tabs--line {
    padding-top: 160px;
  }
  .profile-detail .van-tabs--line .van-tabs__wrap{
    height: 160px;
  }
  .profile-detail .van-tabs__wrap{
    overflow: inherit;
  }
  .profile-detail .van-hairline--top-bottom::after{
    border-width: 0;
  }
  .profile-detail .van-tabs__nav--line{
    padding-bottom: 0;
  }
  .profile-detail .van-tab{
    padding: 0;
    line-height: inherit;
  }
  .profile-detail .van-tab--active .profile-title{
    background:linear-gradient(180deg,rgba(255,123,78,1) 0%,rgba(245,41,30,1) 100%);
    /*box-shadow: -6px 0 12px rgba(0,43,100,0.16);*/
  }
</style>
