<template>
  <div class="page-container">
    <!--<header-bar title="加入HopeTravel联盟"></header-bar>-->
    <div class="main-box">
      <div class="top-bg">
        <div class="pep-info">
          <div class="desc">
            <img :src="recommendInfo.face" alt="">
            <div>
              <h2 class="name">{{recommendInfo | getName}}</h2>
              <p>我加入了HopeTravel联盟，赚了不少钱了， 你也快来吧！</p>
            </div>
          </div>
          <div class="btn-accept" @click="acceptShare">
            接受邀请
          </div>
          <!--<nuxt-link tag="div" :to="`/personal/sale_union/friend_accept?referrer_id=${$route.query.referrer_id}`"></nuxt-link>-->
          <div class="agreement">
            <van-checkbox v-model="checked" checked-color="#FCAE26"></van-checkbox>
            <nuxt-link tag="span" to="/protocol/union">接受邀请并与HopeTravel旅行签约</nuxt-link>
          </div>
        </div>
      </div>
      <div class="img-show">
        <img src="../../../assets/imgs/union/share_case1.png" alt="" width="100%" style="margin-bottom: 8px;">
        <img src="../../../assets/imgs/union/share_case2.png" alt="" width="100%">
        <img src="../../../assets/imgs/union/share_case3.png" alt="" width="100%">
        <img src="../../../assets/imgs/union/share_case4.png" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {mapGetters} from 'vuex'
import {getProfile} from '@/api/sale_union'
export default {
  name: 'share_friends',
  components: {
    HeaderBar
  },
  validate({ params, query }) {
    return /^[0-9]*$/.test(query.referrer_id)
  },
  filters: {
    getName(value) {
      // console.log(value)
      if (value.chinese_name) {
        return value.chinese_name
      } else if(value.last_name && value.first_name){
        return value.last_name + value.first_name
      } else if(value.nickname){
        return value.nickname
      } else {
        return value.phone || value.email
      }
    }
  },
  data(){
    return {
      recommendInfo: {},
      checked: false
    }
  },
  computed:{
    ...mapGetters([
      'profile'
    ])
  },
  mounted(){
    this.getRecommendInfo()
  },
  methods: {
    async getRecommendInfo(){
      let {data,code} = await getProfile(this.$route.query.referrer_id)
      if(code === 0) {
        this.recommendInfo = data
      } else {
        this.recommendInfo = {}
      }
    },
    acceptShare() {
      if(!this.checked){
        this.$toast('请接受HopeTravel旅行邀约');
      } else {
        this.$router.push({
          name: 'personal-sale_union-friend_accept',
          query: {
            'referrer_id': this.$route.query.referrer_id
          }
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .main-box{
    background:linear-gradient(180deg,rgba(255,186,52,1) 0%,rgba(246,140,1,1) 100%);
    .top-bg{
      background: url('../../../assets/imgs/union/friend_bg.png') no-repeat;
      background-size: 100%;
      padding-top: 360px;
    }
    .pep-info{
      height:408px;
      background:#fff;
      box-shadow:0px 4px 4px rgba(217,217,217,0.14);
      border-radius:12px;
      padding: 0 45px 45px 45px;
      font-size:28px;
      margin: 0 46px;
      .desc{
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('../../../assets/imgs/union/yao_words.png') no-repeat right;
        background-size: 200px 200px;
        color: #5B5B5B;
        padding: 50px;
        & > div{
          flex: 1;
          padding-left: 20px;
          line-height: 40px;
        }
      }
      h2.name{
        height:46px;
        font-size:36px;
        line-height:46px;
        color: #FCAA23;
      }
      img{
        width:100px;
        height:100px;
        border-radius:50%;
      }
      .btn-accept{
        width:464px;
        height:80px;
        background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
        box-shadow:0px 6px 12px rgba(0,43,100,0.16);
        border-radius:12px;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        font-size:32px;
        line-height: 80px;
        margin-bottom: 20px;
        &:active{
          opacity: 0.8;
        }
      }
      .agreement{
        text-align: center;
        color: #9B9B9B;
        font-size:20px;
        & > div{
          display: inline-block;
          vertical-align: middle;
          padding-right: 10px;
        }
        span{
          vertical-align: middle;
        }
      }
    }
    .img-show{
      padding: 20px 45px;
      font-size: 0;
    }
  }
</style>
