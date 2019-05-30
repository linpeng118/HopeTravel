<template>
  <div class="invite-friend-wrap">
    <div class="banner">
      <img src="../../assets/imgs/invite/index_banner@2x.png"
        alt="">
    </div>
    <div class="main-content">
      <!--<div class="msg-notice">-->
      <!--<van-notice-bar background="#ffffff" color="#383838"-->
      <!--text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"-->
      <!--left-icon="volume-o"-->
      <!--/>-->
      <!--</div>-->
      <div class="coupons-list">
        <template v-for="(invite, index) in inviteLists">
          <div :key="invite.rule_coupon_id">
            <div class="title">
              <span>{{invite.hint}}</span>
              <img v-if="invite.rule_coupon_id == 2"
                src="../../assets/imgs/invite/icon_bag@2x.png"
                alt="">
              <img v-else
                src="../../assets/imgs/invite/icon_money@2x.png"
                alt="">
              {{invite.main_title}}
            </div>
            <coupons :item="invite"
              @showAll="showExplain"
              :typeOne="index == 1"
              :index="index"></coupons>
          </div>
        </template>
        <div class="m-t">
          <van-button round
            block
            class="invite-btn"
            @click="share('on')">立即分享</van-button>
        </div>
        <div class="create-poster"
          @click="share('poster')">
          <img src="../../assets/imgs/invite/icon_img@2x.png"
            alt=""> 生成海报
        </div>
      </div>
      <div class="invite-list">
        <dl>
          <dt>已邀请</dt>
          <dt>获得奖励</dt>
        </dl>
        <van-list v-if="token"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getHistoryList">
          <ul class="user-list">
            <li v-for="(history,index) in historyLists"
              :key="index">
              <div class="left-u">
                <img :src="history.acceptor_avatar"
                  alt="">
                <div>
                  <p class="title">{{history.acceptor_name | getName}} <van-tag color="#FDA500"
                      round
                      v-if="history.order_label">{{history.order_label}}</van-tag>
                  </p>
                  <p class="time">{{history.created_at}}</p>
                </div>
              </div>
              <div class="right-i">
                <span :class="history.status ? '': 'color'">{{history.reward_label}}</span>
              </div>
            </li>
          </ul>
        </van-list>
        <div v-if="isShowDrift">
          <van-button round
            block
            class="invite-btn">立即分享</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Coupons from '@/components/coupons'
  import {inviteCoupons, inviteHistory} from '@/api/invite'
  import {mapMutations, mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'invite_friend',
    components: {
      Coupons
    },
    head: {
      title: '稀饭大礼相送'
    },
    filters: {
      getName(name) {
        if (name.indexOf('@') >= 0) {
          let str = name.split('.')[1]
          return `${name.substring(0, 4)}****.${str}`
        } else if (/^[0-9]*$/.test(name)) {
          return name.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
        }
        return name
      }
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        appVersion: this.$route.query.app_version,
        appLanguage: this.$route.query.language,
        appCurrency: this.$route.query.currency,
        appPhoneType: this.$route.query.phone_type,
        inviteLists: [],
        activityId: 0,
        historyLists: [],
        scrollTop: 0, // 滚动的距离
        isShowDrift: false, // 是否显示
        acceptorRuleId: '',
        inviterId: '',
        loading: false,
        finished: false,
        prodPagination: {}
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    async beforeMount() {
      // 判断是否APP
      if (this.isApp) {
        this.jsBridge = require("@/assets/js/jsBridge").default;
        this.vxSetPlatform(this.isApp)
        this.vxSetLanguage(this.appLanguage)
        this.vxSetCurrency(this.appCurrency)
        this.vxSetPhoneType(this.appPhoneType)
        this.vxSetAppVersion(this.appVersion)
        console.log(this.appLanguage, this.appCurrency, this.appPhoneType, this.appVersion);
        // 获取到APP的token后请求列表
        await this.jsBridge.webRegisterHandler('obtainUserToken', (token, callback) => {
          if (token) {
            // 设置token
            this.vxChangeTokens(token)
            // 获取优惠卷列表
            this.getInviteCoupons()
          }
          callback('obtainUserToken success!')
        })
      }
    },
    async mounted() {
      window.addEventListener('scroll', this.scrollFn)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      ...mapMutations({
        // 改变token
        vxChangeTokens: 'setToken',
        // 设置语言
        vxSetLanguage: 'setLanguage',
        // 设置货币
        vxSetCurrency: 'setCurrency',
        // 设置机型
        vxSetPhoneType: "setPhoneType",
        // 设置版本
        vxSetAppVersion: "setAppVersion",
        // 设置平台
        vxSetPlatform: "setPlatform"
      }),
      // 获取优惠卷列表
      async getInviteCoupons() {
        try {
          let {code, data} = await inviteCoupons()
          if (code === 0) {
            this.inviteLists = data.coupons || []
            this.activityId = data.activity_id || 0
            this.acceptorRuleId = data.acceptor_rule_id || 0
            this.inviterId = data.inviter_id || 0
          } else {
            this.inviteLists = []
            this.activityId = 0
            this.acceptorRuleId = 0
            this.inviterId = 0
          }
        } catch (error) {
          console.log(error)
        }
      },
      async getHistoryList() {
        try {
          let submitData = {
            page: (this.prodPagination.page || 0) + 1,
            id: this.activityId || 23
          }
          inviteHistory(submitData).then(res => {
            if(res.code == 0) {
              let _obj = {}
              if(this.appPhoneType == 'android') {
                _obj.data = res.data.list
                _obj.pagination = res.data.pagination
              } else {
                _obj = res
              }
              this.historyLists.push(..._obj.data)
              this.prodPagination = _obj.pagination
              // 加载状态结束
              this.loading = false
              // 数据全部加载完成
              if (!this.prodPagination.more) {
                this.finished = true
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      },
      showExplain(index) {
        this.$set(this.inviteLists[index], 'isShow', !this.inviteLists[index].isShow)
      },
      share(type) {
        if (this.isApp) {
          try {
            let data = {
              price: this.inviteLists[0].minus_label.substring(1),
              inviterId: this.inviterId,
              type: type == 'poster' ? 1 : 2,
              url: `${window.location.origin}/invite_friend/gift_giving?search=platform=app/rule=${this.acceptorRuleId}/activity=${this.activityId}/referrer=${this.inviterId}`,
              localUrl: `${window.location.origin}/invite_friend/share_poster?search=platform=app/rule=${this.acceptorRuleId}/activity=${this.activityId}/referrer=${this.inviterId}`,
            }
            this.jsBridge.webCallHandler('jumpSharedView', data)
          } catch (error) {
            console.log(error)
          }
        }
      },
      scrollFn() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let height = document.body.clientHeight
        this.scrollTop = scrollTop
        console.log(scrollTop, height)
        if (this.scrollTop > height) {
          this.isShowDrift = true
        } else {
          this.isShowDrift = false
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .invite-friend-wrap {
    min-height: 100vh;
    background-color: #fdb300;
    padding-bottom: 20px;
    .banner {
      img {
        width: 100%;
      }
    }
    .main-content {
      padding: 0 32px;
      .msg-notice {
        height: 60px;
        background: #fff;
        border-radius: 44px;
        padding: 0 22px;
        font-size: 24px;
        overflow: hidden;
      }
      .coupons-list {
        padding: 18px 40px;
        background-color: #ffffff;
        border-radius: 32px;
        line-height: 60px;
        .title {
          color: #383838;
          font-size: 28px;
          font-weight: bold;
          margin-top: 18px;
          span {
            float: right;
            color: #bebebe;
            font-weight: normal;
          }
          img {
            width: 57px;
            vertical-align: middle;
          }
        }
        .m-t {
          margin-top: 30px;
        }
        .create-poster {
          color: #656565;
          text-align: center;
          font-size: 32px;
          margin-top: 10px;
          img {
            width: 27px;
            vertical-align: middle;
          }
        }
      }
      .invite-list {
        border-radius: 32px;
        background-color: #fff;
        padding: 40px 56px;
        margin-top: 20px;
        dl {
          font-size: 24px;
          line-height: 34px;
          display: flex;
          justify-content: space-around;
          color: #656565;
        }
        .user-list {
          padding-top: 44px;
          li {
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            padding-bottom: 28px;
            align-items: center;
          }
          .left-u {
            display: flex;
            line-height: 40px;
            .time {
              font-size: 18px;
              color: #656565;
            }
          }
          .right-i {
            font-weight: bold;
            text-align: center;
            width: 50%;
            .color {
              color: #ff0000;
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
      .invite-btn {
        margin-top: 72px;
        width: 100%;
        height: 78px;
        font-size: 36px;
        line-height: 50px;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          90deg,
          rgba(253, 179, 0, 1) 0%,
          rgba(253, 165, 0, 1) 100%
        );
        box-shadow: 0px 4px 12px rgba(165, 69, 10, 0.16);
        border-radius: 44px;
      }
    }
  }
</style>
