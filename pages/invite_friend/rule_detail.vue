<template>
  <div class="invite-friend-wrap">
    <div class="banner">
      <img src="../../assets/imgs/invite/icon_gift@2x.png" alt="">
    </div>
    <div class="main-content">
      <div class="gift-box">
        <h2 class="title">活动规则</h2>
        <div v-html="ruleInfo.rules"></div>
        <div class="img-gift">
          <img src="../../assets/imgs/invite/box@2x.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPullNewRules} from '@/api/activity'
export default {
  name: 'rule_detail',
  head: {
    title: '活动规则'
  },
  data(){
    return{
      ruleInfo: {},
    }
  },
  async mounted(){
    this.init()
  },
  methods:{
    async init(){
      let {code,data = {}} = await getPullNewRules({
        type: 'invite'
      })
      if(code === 0) {
        this.ruleInfo = data
      }
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
      .gift-box {
        padding: 15px 40px;
        background-color: #ffffff;
        border-radius:32px;
        font-size:28px;
        line-height: 40px;
        h2.title{
          font-size:52px;
          font-weight:500;
          line-height:74px;
          text-align: center;
          margin-bottom: 40px;
          margin-top: 20px;
        }
        .img-gift{
          margin: 40px 0;
          text-align: center;
          img{
            width: 311px;
            height: 261px;
          }
        }
      }
    }
  }
</style>
