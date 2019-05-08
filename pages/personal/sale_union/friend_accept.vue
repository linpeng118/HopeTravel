<template>
  <div class="page-container">
    <header-bar title="账号验证"></header-bar>
    <div style="padding-top: 46px;" class="accept-box">
      <div class="login-box">
        <h2 class="title">手机号验证</h2>
        <van-cell-group>
          <area-code-input class="phone"
                           :proAreaCode.sync="phoneForm.areaCode"
                           :proMobile.sync="phoneForm.phone" />
          <van-field class="auth-code tours-input"
                     v-model="phoneForm.smsCode"
                     center
                     clearable
                     label="验证码"
                     placeholder="填写验证码">
            <van-button class="btn-get-code tours-button-noborder"
                        slot="button"
                        size="small"
                        @click="getCode">{{getShowText}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <div class="btn-accept" @click="registerUnion">完成</div>
    </div>
    <van-popup v-model="show">
      <div class="error-box">
        <van-icon name="cross" size="30px" color="#FD8D67" />
        <h2 class="title">加入失败...</h2>
        <p>oops,{{erroMsg}}</p>
        <!--<van-button plain @click="show=false">再试一试</van-button>-->
      </div>
    </van-popup>
  </div>
</template>

<script>
  import HeaderBar from '@/components/header/sale_union'
  import AreaCodeInput from '@/components/input/areaCode'
  import {getSmsCode, register} from '@/api/sale_union'
  import {SESSIONSTORE} from '@/assets/js/config'
  import {setSessionStore} from '@/assets/js/utils'
  // import {getProfile} from '@/api/profile'
  import {mapMutations} from 'vuex'
  const TIME = 60 // 倒计时时间
  export default {
  name: 'friend_accept',
  components: {
   HeaderBar,AreaCodeInput
  },
  validate({ params, query }) {
    return /^[0-9]*$/.test(query.referrer_id)
  },
  data() {
    return {
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      codeType: 0, // 0开始, 1获取ing, 2重新获取
      countDownTime: TIME, // 倒计时时间
      referrerId: this.$route.query.referrer_id || '',
      show: false,
      erroMsg: ''
    }
  },
  computed:{
    getShowText() {
      if (this.codeType === 0) {
        clearInterval(this.timer)
        return '获取验证码'
      } else if (this.codeType === 1) {
        return `${this.countDownTime} s`
      } else {
        clearInterval(this.timer)
        return '重新获取'
      }
    },
  },
  methods: {
    // 获取验证码
    async getCode() {
      if (!this.phoneForm.phone) {
        this.$toast('请输入手机号码')
        return
      }
      // 倒计时状态修改
      this.codeType = 1 // 正在请求数据
      try {
        const {code, msg} = await getSmsCode({
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          scene: 'acceptFriend'

        })
        if (code !== 0) {
          this.$toast(msg)
        }
        await this.countDown()
      } catch (error) {
        // console.log(error)
        this.codeType = 1
      }
    },
    // 提交成为联盟
    async registerUnion(){
      if (!this.phoneForm.phone) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.phoneForm.smsCode) {
        this.$toast('请输入手机验证码')
        return
      }
      try {
        const {code, data, msg} = await register({
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          code: this.phoneForm.smsCode,
          referrerId: this.referrerId
        })
        if (code === 0) {
          this.$toast.success('加入成功')
          setSessionStore(SESSIONSTORE, this.$route.query.referrer_id)
          this.vxSetToken(data.token)
          setTimeout(() => {
            this.$router.push({
              name: 'personal-sale_union'
            })
          }, 3000)
        } else if(code === 1) {
          this.show = true
          this.erroMsg = msg
        }
      } catch (error) {
        console.log(error)
      }
    },
    countDown() {
      this.timer = setInterval(() => {
        // console.log(this.countDownTime)
        if (this.countDownTime <= 0) {
          this.codeType = 0
          this.countDownTime = TIME
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
    ...mapMutations({
      vxSetToken: 'setToken'
    }),
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background-color: #F5F4F9;
    min-height: 100vh;
  }
  .accept-box{
    padding: 20px 15px;
    .login-box{
      margin-top: 20px;
      background: #fff;
      border-radius:12px;
      h2.title{
        padding: 30px 48px;
        font-size:24px;
      }
    }
    .area-code-input{
      margin-bottom: 20px;
      border: none;
      border-bottom: 2px solid #E1E1E1;
      border-radius: 0;
    }
    .tours-input.van-cell{
      border: none !important;
    }
    .tours-button-noborder.van-button--default{
      color: #FF7246;
    }
    .btn-accept{
      width:464px;
      height:80px;
      background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
      box-shadow:0px 6px 12px rgba(0,43,100,0.16);
      border-radius:12px;
      font-size:32px;
      line-height: 80px;
      color: #fff;
      margin: 50px auto;
      text-align: center;
      &:active{
        opacity: 0.8;
      }
    }
  }
  .error-box{
    width: 520px;
    height: 300px;
    padding: 30px;
    font-size:24px;
    text-align: center;
    color: #9B9B9B;
    line-height: 40px;
    .title{
      padding: 30px;
      font-size: 32px;
      font-weight: normal;
    }
    p{
      margin-bottom: 20px;
    }
  }
</style>
