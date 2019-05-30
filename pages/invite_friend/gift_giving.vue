<template>
  <div class="invite-friend-wrap">
    <div class="banner">
      <img src="../../assets/imgs/invite/icon_gift@2x.png" alt="">
    </div>
    <div class="main-content">
      <div class="gift-box">
        <div class="name-show">
          <img :src="profile.face" alt="">
          <p>{{profile | getName}}</p>
          <p>分享给你的旅行大礼包</p>
        </div>
        <div class="img-gift">
          <img src="../../assets/imgs/invite/box@2x.png" alt="">
        </div>
        <div class="result-box">
          <area-code-default :proPhone.sync="phone" :proAreaCode="areaCode" v-if="submitRes"></area-code-default>
          <p v-else>{{resultStr}}</p>
          <a class="invite-btn" :href="downUrl" v-if="receiveStatus === 0">{{btnString}}</a>
          <van-button v-else round block class="invite-btn" @click="getWish">{{btnString}}</van-button>
          <p class="get-ok" v-if="getOk">小主可前往稀饭个人中心查看优惠券</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProfile} from '@/api/sale_union'
import {acceptExternal} from '@/api/invite'
import areaCodeDefault from '@/components/input/areaCodeDefault'
import {RECEIVE_TYPE} from '@/assets/js/consts/activity'
export default {
  name: 'gift_giving',
  components:{
    areaCodeDefault
  },
  filters:{
    getName(profile){
      if(profile.nickname){
        return profile.nickname
      } else if(profile.first_name || profile.last_name){
        return profile.first_name + profile.last_name
      } else if(profile.phone) {
        return profile.phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
      } else if(profile.email){
        let str = profile.split('.')[1]
        return `${profile.substring(0,4)}****.${str}`
      }
    }
  },
  head(){
    return{
      title:'稀饭大礼相送'
    }
  },
  data(){
    return{
      profile: {},
      // 区号与电话
      areaCode: '86',
      phone:'',
      btnString:'收下心意',
      resultStr: '',
      submitRes: true,
      // 领取状态
      receiveStatus: RECEIVE_TYPE.default,
      getOk: false
    }
  },
  asyncData({query}){
    let _obj = {}
    let _arr = query.search.split('/')
    for(let i=0,len= _arr.length;i<len;i++){
      _obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
    }
    return {
      queryPath:_obj
    }
  },
  validate({query}) { // 判断路由是否正确
    let _obj = {}
    let _arr = query.search.split('/')
    for(let i=0,len= _arr.length;i<len;i++){
      _obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
    }
    return /^[0-9]*$/.test(_obj.referrer) && /^[0-9]*$/.test(_obj.rule) && /^[0-9]*$/.test(_obj.activity)
  },
  async mounted(){

    this.init()
    //
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      this.downUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.zmcs.tourscool'
    } else if (u.indexOf('iPhone') > -1) {
      this.downUrl = 'https://itunes.apple.com/cn/app/稀饭旅行/id1449120712?mt=8'
    }
  },
  methods:{
    async init(){
      let {code,data = {}} = await getProfile(this.queryPath.referrer)
      if(code === 0) {
        this.profile = data
      } else {
        this.profile = {}
      }
    },
    async getWish(){
      this.$router.push({
        path: '/invite_friend/activity_over'
      })
      if(this.submitRes) {
        if(!/^[0-9]*$/.test(this.phone) || !this.phone) {
          this.$toast.fail('手机号码不正确')
          return false
        }
        let params = {
          phone: `${this.areaCode}-${this.phone}`,
          customer: this.queryPath.referrer,
          rule: this.queryPath.rule,
          activity: this.queryPath.activity
        }
        let {code,msg} = await acceptExternal(params)
        this.resultStr = msg
        this.submitRes = false
        this.btnString = '打开稀饭APP'
        this.receiveStatus = code
        if(code === RECEIVE_TYPE.old) {
          this.btnString = '重新输入'
        }
        if(code === 0) {
          this.getOk = true
        }
        if(code === 1) {
          this.submitRes = true
          this.resultStr = ''
          this.btnString = '收下心意'
          this.receiveStatus = RECEIVE_TYPE.default
          this.getOk = false
          this.phone = ''
          this.$toast.fail('出错啦')
        }
        if(code === RECEIVE_TYPE.end) {
          this.$router.push({
            path: '/activity/pull_new/over'
          })
        }
      } else if(this.receiveStatus === RECEIVE_TYPE.old) {
        this.submitRes = true
        this.resultStr = ''
        this.btnString = '收下心意'
        this.receiveStatus = RECEIVE_TYPE.default
        this.getOk = false
        this.phone = ''
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
      .gift-box{
        padding: 15px 24px;
        padding-bottom: 50px;
        background-color: #ffffff;
        border-radius:32px;
        .name-show{
          text-align: center;
          p{
            font-size:24px;
            line-height: 34px;
          }
          img {
           height: 82px;
           width: 82px;
           border-radius: 50%;
          }
        }
        .img-gift{
           margin-top: 50px;
           margin-bottom: 50px;
           text-align: center;
          img{
           width: 270px;
          }
        }
        .result-box{
          font-size:28px;
          line-height:34px;
          text-align: center;
        }
        .get-ok{
          color: #B2B2B2;
          font-size:24px;
          line-height:34px;
          text-align: center;
          margin-top: 20px;
        }
      }
      .invite-btn{
        display: block;
        margin-top: 40px;
        width: 100%;
        height: 78px;
        line-height: 78px;
        font-size: 36px;
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
