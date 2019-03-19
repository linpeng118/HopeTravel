<template>
  <div class="profile-detail">
    <header-bar title="我的收益"></header-bar>
    <div class="main-profit-wrap" style="padding-top: 46px;">
      <van-tabs v-model="currentTab" color="transparent">
        <van-tab>
          <div slot="title" class="profile-title">
            累计已赚
            <p class="price">$3176.05</p>
          </div>
          <div>
            <template v-for="list in lists">
              <profit-detail :item="list" :key="list.id"></profit-detail>
            </template>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title" class="profile-title">
            直接收益
            <p class="price">$3176.05</p>
          </div>
          <div>gdfgdfgdfgdfg</div>
        </van-tab>
        <van-tab>
          <div slot="title" class="profile-title">
            间接收益
            <p class="price">$3176.05</p>
          </div>
          <div>gdfgdfgdfgdfg</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import profitDetail from '@/components/list/profitList'
export default {
  name: 'profit_detail',
  components: {HeaderBar,profitDetail},
  data() {
    return {
      currentTab: 0,
      lists: [
        {
          id: 23256,
          title: '玩转美西经典小环 莫哈维...',
          price:'$254',
          status: 0,
          status_name: '待确认（用户未出行）',
          time: '2月15日',
        },
        {
          id: 23223,
          title: '玩转美西经典小环 莫哈维...',
          price:'$254',
          status: 0,
          status_name: '待确认（用户未出行）',
          time: '2月15日'
        },
        {
          id: 23234,
          title: '玩转美西经典小环 莫哈维...',
          price:'$254',
          status: 0,
          status_name: '待确认（用户未出行）',
          time: '2月15日'
        }
      ],
    }
  },
  methods: {
    onClickLeft(){}
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .main-profit-wrap{
    min-height: 100vh;
    background-color: #F5F4F9;
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
