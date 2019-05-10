<template>
  <div class="invite-friend-wrap">
    <div class="banner">
      <img src="../../assets/imgs/invite/index_banner@2x.png" alt="">
    </div>
    <div class="main-content">
      <div class="msg-notice">
        <van-notice-bar background="#ffffff" color="#383838"
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
          left-icon="volume-o"
        />
      </div>
      <div class="coupons-list">
        <template v-for="(invite, index) in inviteLists">
          <div :key="invite.rule_coupon_id">
            <div class="title">
              <span>{{invite.hint}}</span>
              <img v-if="invite.rule_coupon_id == 2" src="../../assets/imgs/invite/icon_bag@2x.png" alt="">
              <img v-else src="../../assets/imgs/invite/icon_money@2x.png" alt="">
              {{invite.main_title}}
            </div>
            <coupons :item="invite" @showAll="showExplain" :typeOne="index == 1" :index="index"></coupons>
          </div>
        </template>
        <div class="invite-btn m-t">立即分享</div>
        <div class="create-poster">
          <img src="../../assets/imgs/invite/icon_img@2x.png" alt=""> 生成海报
        </div>
      </div>
      <div class="invite-list">
        <dl>
          <dt>已邀请</dt>
          <dt>获得奖励</dt>
        </dl>
        <ul class="user-list">
          <li v-for="(history,index) in historyLists" :key="index">
            <div class="left-u">
              <img :src="history.acceptor_avatar" alt="">
              <div>
                <p class="title">{{history.acceptor_name}} <van-tag color="#FDA500" round v-if="history.order_label">{{history.order_label}}</van-tag></p>
                <p class="time">{{history.created_at}}</p>
              </div>
            </div>
            <div class="right-i">
              <span :class="history.status ? '': 'color'">{{history.reward_label}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Coupons from '@/components/coupons'
import {inviteCoupons, inviteHistory} from '@/api/invite'
export default {
  name: 'invite_friend',
  components:{
    Coupons
  },
  data(){
    return{
      inviteLists: [],
      activityId: 0,
      historyLists: []
    }
  },
  async mounted(){
    await this.init()
    this.getHistoryList()
    window.addEventListener('scroll', this.scrollFn)
  },
  methods:{
    async init(){
      let {code, data} = await inviteCoupons()
      if(code === 0) {
        this.inviteLists = data.coupons || []
        this.activityId = data.activity_id || 0
      } else {
        this.inviteLists = []
        this.activityId = 0
      }
    },
    async getHistoryList(){
      let {code, data = []} = await inviteHistory(this.activityId)
      if(code === 0) {
        // this.historyLists = data
        this.historyLists = [
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 1,
            created_at: "2019-05-05",
            reward_label: "$1,000優惠券",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 1,
            created_at: "2019-05-05",
            reward_label: "$1,000優惠券",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "已被他人邀請",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 1,
            created_at: "2019-05-05",
            reward_label: "$0優惠券",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "已被他人邀請",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "已被他人邀請",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "已被他人邀請",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "已被他人邀請",
            order_label: ""
          },
          {
            acceptor_avatar: "https://img.tourscool.net/images/head.png",
            acceptor_name: "",
            status: 0,
            created_at: "2019-05-05",
            reward_label: "不是新用戶",
            order_label: ""
          }
        ]
      } else {
        this.historyLists = []
      }
    },
    showExplain(index){
      this.$set(this.inviteLists[index], 'isShow', !this.inviteLists[index].isShow)
    },
    scrollFn(){

    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .invite-friend-wrap{
    min-height: 100vh;
    background-color: #FDB300;
    padding-bottom: 20px;
    .banner{
      img{
        width: 100%;
      }
    }
    .main-content{
      padding: 0 32px;
      .msg-notice{
        height:60px;
        background:#fff;
        border-radius: 44px;
        padding: 0 22px;
        font-size:24px;
        overflow: hidden;
      }
      .coupons-list{
        padding: 18px 40px;
        margin-top: 20px;
        background-color: #ffffff;
        border-radius:32px;
        line-height: 60px;
        .title{
          color: #383838;
          font-size:28px;
          font-weight:bold;
          margin-top: 18px;
          span{
            float: right;
            color: #BEBEBE;
            font-weight: normal;
          }
          img{
            width: 57px;
            vertical-align: middle;
          }
        }
        .m-t{
          margin-top: 30px;
        }
        .create-poster{
          color: #656565;
          text-align: center;
          font-size:32px;
          margin-top: 10px;
          img{
            width: 27px;
            vertical-align: middle;
          }
        }
      }
      .invite-list{
        border-radius:32px;
        background-color: #fff;
        padding: 40px 56px;
        margin-top: 20px;
        dl{
          font-size:24px;
          line-height: 34px;
          display: flex;
          justify-content: space-around;
          color: #656565;
        }
        .user-list{
          padding-top: 44px;
          li{
            display: flex;
            justify-content: space-between;
            font-size:24px;
            padding-bottom: 28px;
            align-items: center;
          }
          .left-u{
            display: flex;
            .time{
              font-size:18px;
              color: #656565;
            }
          }
          .right-i{
            font-weight: bold;
            text-align: center;
            width: 50%;
            .color{
              color: #FF0000;
            }
          }
          img {
            width: 82px;
            height: 82px;
            margin-right: 16px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
