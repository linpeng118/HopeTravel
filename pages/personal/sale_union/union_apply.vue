<template>
  <div>
    <header-bar title="加入稀饭联盟"></header-bar>
    <div style="padding-top: 46px;" class="add-union">
      <div class="bg-top">
        <nuxt-link to="/personal/about_xf_union" class="know-info">点我了解稀饭联盟</nuxt-link>
      </div>
      <div class="login-box">
        <h2 class="title">填写手机号码</h2>
        <van-cell-group class="form-box">
          <van-row class="area-code-input"
                   type="flex"
                   align="center">
            <van-col class="area-code-wrap"
                     span="6"
                     @click.native="toggleAreaList">
              <span class="area-code">+ {{phoneForm.areaCode}}</span>
              <van-icon class="icon-arrow"
                        name="arrow" />
            </van-col>
            <van-col class="mobile-input"
                     v-show="!isShowList"
                     span="18">
              <template v-if="profile.phone">
                <van-field class="mobile"
                           :value="profile.phone | getPhone"
                           :disabled="!!profile.phone"
                           placeholder="手机号">
                </van-field>
              </template>
              <template v-else>
                <van-field class="mobile"
                           v-model="phoneForm.phone"
                           placeholder="手机号">
                </van-field>
              </template>
            </van-col>
            <van-col v-show="isShowList"
                     class="area-list"
                     span="18">
              <div class="area-item"
                   v-for="(area,index) in araeList"
                   :key="index"
                   @click="selectArea(area)">
                <div class="addr">{{area.addr}}</div>
                <div class="code">{{area.code}}</div>
              </div>
            </van-col>
          </van-row>
          <van-field class="auth-code tours-input"
                     v-model="phoneForm.smsCode"
                     center
                     label="验证码"
                     clearable
                     placeholder="填写验证码">
            <van-button class="btn-get-code tours-button-noborder"
                        slot="button"
                        size="small"
                        :disabled="codeType === 2"
                        @click="getCode">{{getShowText}}</van-button>
          </van-field>
          <div class="btn-login">
            <input type="button" @click="btnLogin" value="加入稀饭联盟">
          </div>
          <div class="agreement">
            <van-checkbox v-model="checked" checked-color="#FCAE26"></van-checkbox>
            <nuxt-link tag="span" to="/protocol/union">接受邀请并与稀饭旅行签约</nuxt-link>
          </div>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import AreaCodeInput from '@/components/input/areaCode'
import HeaderBar from '@/components/header/sale_union'
import {getSmsCode, login} from '@/api/sale_union'
import {getCountryTelcodes} from '@/api'
import {mapGetters,mapMutations} from 'vuex'
const TIME = 60 // 倒计时时间
export default {
  name: 'union_apply',
  components: {
    AreaCodeInput,HeaderBar
  },
  filters:{
    getPhone(phone){
      return phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
    }
  },
  data() {
    return {
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      isShowList: false, // 是否显示列表
      codeType: 0, // 0开始, 1获取ing, 2重新获取
      countDownTime: TIME, // 倒计时时间
      araeList: [],
      checked: false
    }
  },
  computed: {
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
    ...mapGetters([
      'profile'
    ])
  },
  async mounted() {
    this.init()
    if(JSON.stringify(this.profile) === '{}'){
      this.$router.push({
        path: '/login?redirect=/personal/sale_union/union_apply'
      })
    }
  },
  methods: {
    async init() {
      const {code, data, msg} = await getCountryTelcodes()
      if (code === 0) {
        this.araeList = data.map(item => ({
          code: item.tel_code,
          addr: item.countryName,
        }))
      } else {
        this.$toast(msg)
      }
    },
    toggleAreaList() {
      this.isShowList = !this.isShowList
    },
    selectArea(area) {
      this.phoneForm.areaCode = area.code
      this.toggleAreaList()
    },
     // 获取验证码
    async getCode() {
      // 倒计时状态修改
      this.codeType = 1 // 正在请求数据
      try {
        const {code, msg} = await getSmsCode({
          phone: `${this.phoneForm.areaCode}-${this.profile.phone || this.phoneForm.phone}`
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
    async btnLogin() {
      if (!this.checked) {
        this.$toast('请接受稀饭旅行邀约')
        return
      }
      if (!this.phoneForm.phone && !this.profile.phone) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.phoneForm.phone && !this.profile.phone) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.phoneForm.smsCode) {
        this.$toast('请输入手机验证码')
        return
      }
      try {
        const {code, data, msg} = await login({
          phone: `${this.phoneForm.areaCode}-${this.profile.phone || this.phoneForm.phone}`,
          code: this.phoneForm.smsCode
        })
        if (code === 0) {
          this.$dialog.alert({
            message: '加入成功,跟着稀饭一起挣钱吧！'
          }).then(() => {
            this.$router.push({
              name: 'personal-sale_union'
            })
          })
        } else if(code === 1) {
          this.$dialog.alert({
            message: msg
          })
        }
      } catch (error) {
        // console.log(error)
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
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .add-union{
    height: 100vh;
    background:linear-gradient(180deg,rgba(255,186,52,1) 0%,rgba(246,140,1,1) 100%);
    .login-box{
      margin: 0 46px 0 46px;
      background-color: #fff;
      border-radius:12px;
      overflow: hidden;
      margin-top: -30px;
      h2.title{
        font-size:32px;
        color: #3B3B3B;
        height: 110px;
        line-height: 110px;
        text-align: center;
        border-bottom: 1px solid #E1E1E1;
      }
      .form-box{
        padding: 20px 30px;
      }
      .btn-login{
        width:464px;
        height:80px;
        margin: 0 auto;
        input{
          background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
          box-shadow:0px 6px 12px rgba(0,43,100,0.16);
          border-radius:12px;
          border: none;
          font-size:32px;
          line-height:40px;
          display: block;
          width: 100%;
          width:464px;
          height:80px;
          color: #fff;
          &:active{
            opacity: 0.9;
          }
          &:focus{
          outline: none;
          }
        }
      }
      .agreement{
        text-align: center;
        color: #9B9B9B;
        font-size:20px;
        margin-top: 10px;
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
    .bg-top{
      background: url("../../../assets/imgs/union/add_union_bg.png") no-repeat;
      background-size: 100%;
      height: 530px;
      padding-top: 380px;
      padding-left: 68px;
    }
    .know-info{
      width:220px;
      height:40px;
      background:rgba(255,114,70,1);
      border-radius:40px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      display: inline-block;
      line-height: 40px;
    }
  }
  .area-code-input {
    // overflow: hidden;
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(196, 196, 196, 1);
    border-radius: 10px;
    position: relative;
    .area-code-wrap {
      padding-left: 20px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      max-width: 140px;
      position: relative;
      .area-code {
        font-size: 32px;
        color: #555;
        overflow: hidden;
      }
      .icon-arrow {
        margin-left: 10px;
        font-size: 24px;
        color: #555;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        height: 60px;
        width: 2px;
        background: #c4c4c4;
      }
    }
    .mobile-input {
      .mobile {
        padding: 0 15px;
      }
    }
    .area-list {
      position: absolute;
      right: -2px;
      top: 0;
      z-index: 999;
      background: #fff;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
      padding: 0 36px;
      width: 458px;
      max-height: 375px;
      overflow: scroll;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        top: 80px;
        width: 2px;
        height: 100%;
      }
      .area-item {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 2px solid #c4c4c4;
        font-size: 28px;
        color: rgba(85, 85, 85, 1);
      }
    }
  }
</style>
<style>
  .add-union .area-code-input{
    border: none;
    border-bottom: 2px solid #E1E1E1;
    margin-bottom: 20px;
  }
  .add-union .tours-input.van-cell{
    border: none !important;
    border-bottom: 2px solid #E1E1E1 !important;
    margin-bottom: 40px;
  }
  .add-union .tours-button-noborder.van-button--default{
    color: #FF7246;
  }
</style>
