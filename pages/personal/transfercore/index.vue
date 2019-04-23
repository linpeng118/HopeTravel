<template>
  <div class="page-container">
    <header-bar title="提现记录"></header-bar>
    <div style="padding-top: 46px;">
      <div to="/personal/transfercore/account_sure" class="withdraw-cnt-tit">
        <span @click="goToNextStep">
          <img src="../../../assets/imgs/union/icon_dollar.png" alt="">发起提现
        </span>
      </div>
      <van-list v-model="prodLoading" :finished="prodFinished" finished-text="没有更多了" @load="onLoad">
        <ul class="record-box" v-for="withdraw in withdrawList" :key="withdraw.request_time">
          <li>
            <p class="price">￥{{withdraw.amount}}</p>
            <p>{{withdraw.request_time}}</p>
          </li>
          <li style="text-align: right">
            <p :class="'color' + withdraw.status">{{withdraw.status_name}}</p>
            <p v-if="withdraw.status === 2">{{withdraw.note}}</p>
            <p v-else>{{withdraw.process_time}}</p>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {getWithdraw} from '@/api/sale_union'
import {payInfo} from '@/assets/js/mixins/getPayInfo'
import {isAgent} from '@/assets/js/mixins/isAgent'
export default {
  name: 'transfercore',
  components: {HeaderBar},
  filters: {
    // 0,待提现
    // 1,提现完成
    // 2,提现失败
  },
  mixins: [payInfo, isAgent],
  data(){
    return {
      withdrawList: [],
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      prodPagination: {}
    }
  },
  mounted(){
    // this.getWithdrawList()
  },
  methods: {
    goToNextStep(){
      if(this.payInfo.idcard_no && (this.payInfo.alipay_no || this.payInfo.weixin_no)) {
        this.$router.push({
          name: 'personal-transfercore-withdrawal',
          query: {
            type: this.payInfo.default
          }
        })
      } else {
        this.$router.push({
          name: 'personal-transfercore-verify_identity',
          params: this.payInfo
        })
      }
    },
    async onLoad(){
      // 获取数据
      console.log('onload')
      const params = {
        page: (this.prodPagination.page || 0) + 1
      }
      let res = await getWithdraw(params)
      if(res.code === 0) {
        this.withdrawList.push(...res.data.list)
        this.prodPagination = res.pagination
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background: #F5F4F9;
    min-height: 100vh;
  }
  .withdraw-cnt-tit{
    height:120px;
    background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
    box-shadow:0px 6px 12px rgba(0,43,100,0.16);
    text-align: center;
    font-size:28px;
    color: #fff;
    line-height: 120px;
    img{
      vertical-align: middle;
    }
  }
  .record-box{
    padding: 28px 24px;
    margin: 16px 15px 0 15px;
    background: #fff;
    border-radius: 12px;
    color: #9B9B9B;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      line-height: 40px;
    }
    .price{
      font-size: 32px;
      color: #3B3B3B;
      font-weight: bold;
    }
    .color0{
      color: #F99F45;
    }
    .color1{
      color: #9B9B9B;
    }
    .color2{
      color: #F53225;
    }
  }
</style>
