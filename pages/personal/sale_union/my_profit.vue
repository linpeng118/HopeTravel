<template>
  <div class="page-container">
    <header-bar title="我的收益"></header-bar>
    <div style="padding-top: 46px;">
      <van-notice-bar :scrollable="false" mode="closeable" class="fixed-bar" style="top: 46px;" background="#FFE3A1" color="#C5601C" v-if="newList.length">
        新收益：{{newList[0]}}
      </van-notice-bar>
      <div class="income-detail">
        <!--<div class="top">-->
          <!--<img src="../../../assets/imgs/union/icon_user_gold.png" alt="">-->
          <!--<p><strong>黄金会员</strong> 收益提升10%</p>-->
        <!--</div>-->
        <div class="fortune-center">
          <p class="price" v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.currency}}{{incomeReport.income.total_income}}</p>
          <!--<nuxt-link to="/personal/transfercore" tag="p">我的收益，去提现 <van-icon name="arrow" /></nuxt-link>-->
        </div>
        <van-row class="rich-info">
          <van-col span="8">
            <nuxt-link to="/personal/sale_union/profit_detail" tag="div" class="item">
              <p>累计已赚</p>
              <p v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.currency}}{{incomeReport.income.total_earn}}</p>
            </nuxt-link>
          </van-col>
          <van-col span="8">
            <nuxt-link to="/personal/sale_union/profit_detail" tag="div" class="item">
              <p>直接收益<van-icon name="question-o" /></p>
              <p v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.currency}}{{incomeReport.income.income_one}}</p>
            </nuxt-link>
          </van-col>
          <van-col span="8">
            <nuxt-link to="/personal/sale_union/profit_detail" tag="div" class="item">
              <p>间接收益<van-icon name="question-o" /></p>
              <p v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.currency}}{{incomeReport.income.income_two}}</p>
            </nuxt-link>
          </van-col>
        </van-row>
      </div>
      <div class="main-layout">
        <!--统计-->
        <div class="count-item">
          <div class="detail" @click="goToPathShare('friend')">
            <img src="../../../assets/imgs/union/icon_union@2x.png" alt="">
            <div class="desc">
              <p class="name">稀饭盟友</p>
              <p v-if="JSON.stringify(incomeReport) !== '{}'">产生{{incomeReport.friend.order}}个订单，帮我赚取了{{incomeReport.currency}}{{incomeReport.friend.income}}</p>
            </div>
            <div class="right">
              <span class="num" v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.friend.friend}}</span> 人
            </div>
          </div>
          <div class="link-btn" @click="goToPathShare('shareFriends')">邀请朋友加入，有钱大家一起赚</div>
        </div>
        <div class="count-item">
          <div class="detail" @click="goToPathShare('week')">
            <img src="../../../assets/imgs/union/icon_share_big@2x.png" alt="">
            <div class="desc">
              <p class="name">本周分享效果</p>
              <p v-if="JSON.stringify(incomeReport) !== '{}'">{{incomeReport.share.view}}个浏览，产生了{{incomeReport.share.order}}个订单</p>
            </div>
            <div class="right" v-if="JSON.stringify(incomeReport) !== '{}'">
              <span class="num">{{incomeReport.share.share}}</span> 个
            </div>
          </div>
          <div class="link-btn" @click="goToPathShare('index')">越分享越有钱，分享永不止步</div>

        </div>
        <!--教学-->
        <van-cell is-link to="/personal/sale_union/study_union" class="item-link">
          <template slot="icon">
            <img class="icon-size" src="../../../assets/imgs/union/icon_study@2x.png" width="42" height="42">
          </template>
          <template slot="title">
            <div class="title">
              联盟教学 <span>缺少分销联盟赶快联系我</span>
            </div>
          </template>
        </van-cell>
        <van-cell is-link to="/personal/about_xf_union" class="item-link">
          <template slot="icon">
            <img class="icon-size" src="../../../assets/imgs/union/icon_about@2x.png" width="42" height="42">
          </template>
          <template slot="title">
            <div class="title">
              关于联盟
            </div>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {shareReport} from '@/assets/js/mixins/shareReport'
import {summaryReport} from '@/assets/js/mixins/incomeReport'
import {getNewIncome} from '@/api/sale_union'
export default {
  name: 'my_profit',
  components: {HeaderBar},
  mixins: [summaryReport],
  data(){
    return {
      newList: []
    }
  },
  mounted(){
    this.getNewsList()
  },
  methods: {
    onClickLeft() {},
    goToPathShare(value) {
      if(value === 'week') {
        this.$router.push({
          path: '/personal/sale_union/my_share'
        })
      } else if(value === 'friend') {
        this.$router.push({
          path: '/personal/sale_union/my_union'
        })
      } else if(value === 'shareFriends') {
        this.$router.push({
          path: '/personal/sale_union/invite_friends'
        })
      } else {
        this.$router.push({
          path: '/personal/sale_union'
        })
      }
    },
    // 获得新闻信息
    async getNewsList(){
      let {code, data} = await getNewIncome()
      if(code === 0) {
        this.newList = data
      } else {
        this.newList = []
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background-color: #F5F4F9;
    min-height: 100vh;
  }
  .income-detail{
    height:280px;
    padding: 20px 36px;
    background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
    box-shadow:0px 6px 12px rgba(0,43,100,0.16);
    color: #fff;
    font-size:24px;
    .top{
      font-size:22px;
      p{
        display: inline-block;
      }
      strong{
        display: block;
      }
      img{
        /*vertical-align: middle;*/
      }
    }
    .fortune-center{
      margin-bottom: 40px;
      text-align: center;
      padding-top: 50px;
      .price{
        height: 66px;
        line-height: 66px;
        font-size:52px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      i{
        vertical-align: text-bottom;
      }
    }
    .rich-info{
      line-height: 36px;
      position: relative;
      &:after{
        width: 2px;
        height: 40px;
        background-color: #fff;
        position: absolute;
        content: '';
        right: 0;
        top: 14px;
      }
      & > div{
        text-align: center;
        position: relative;
        &:after{
          width: 2px;
          height: 40px;
          background-color: #fff;
          position: absolute;
          content: '';
          left: 0;
          top: 14px;
        }
      }
      a{
        color: #fff;
      }
      i{

      }
    }
  }
  .main-layout{
    padding: 0 14px;
    .item-link{
      height:136px;
      padding: 28px 34px;
      box-shadow:0px 4px 4px rgba(217,217,217,0.14);
      border-radius:12px;
      margin-top: 20px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      .title{
        margin-left: 24px;
        font-size: 32px;
        color: #5B5B5B;
        span{
          float: right;
          color: #FF7246;
          font-size:20px;
        }
      }
    }
    .count-item{
      box-shadow:0px 4px 4px rgba(217,217,217,0.14);
      border-radius:12px;
      margin-top: 20px;
      background-color: #FFFFFF;
      .detail{
        display: flex;
        align-items: center;
        font-size:20px;
        padding: 30px 34px;
        color: #5B5B5B;
        .desc{
          flex: 1;
          padding-left: 25px;
          .name{
            height: 40px;
            line-height: 40px;
            font-size:32px;
            font-weight:400;
          }
        }
        .right{
          width: 140px;
          text-align: right;
          .num{
            font-size:52px;
            font-weight: bold;
          }
        }
        img{
          width: 84px;
          height: 84px;
        }
      }
      .link-btn{
        height: 82px;
        line-height: 82px;
        text-align: center;
        color: #FF7246;
        border-top: 1px solid #f4f4f4;
        font-size: 24px;
      }
    }
  }
  .fixed-bar{
    position: fixed;
    left: 0;
    right: 0;
    height:52px;
    line-height: 52px;
    font-size: 24px;

  }
</style>
