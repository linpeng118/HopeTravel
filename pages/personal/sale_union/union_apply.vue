<template>
  <div>
    <header-bar title="加入稀饭联盟"></header-bar>
    <div style="padding-top: 46px;">
      <van-cell-group>
        <area-code-input class="phone"
                         :proAreaCode.sync="phoneForm.areaCode"
                         :proMobile.sync="phoneForm.phone" />
        <van-field class="auth-code tours-input"
                   v-model="phoneForm.smsCode"
                   center
                   clearable
                   placeholder="验证码">
          <van-button class="btn-get-code tours-button-noborder"
                      slot="button"
                      size="small"
                      :disabled="codeType === 2"
                      @click="getCode">{{getShowText}}</van-button>
        </van-field>
        <van-button class="btn-login tours-button"
                    size="large"
                    :loading="submiting"
                    @click="btnLogin">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import AreaCodeInput from '@/components/input/areaCode'
import HeaderBar from '@/components/header/sale_union'
import {getSmsCode, login} from '@/api/sale_union'
const TIME = 60 // 倒计时时间
export default {
  name: 'union_apply',
  components: {
    AreaCodeInput,HeaderBar
  },
  data() {
    return {
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      submiting: false, // 是否可提交
      codeType: 0, // 0开始, 1获取ing, 2重新获取
      countDownTime: TIME, // 倒计时时间
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
    }
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
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`
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
      if (!this.phoneForm.phone) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.phoneForm.smsCode) {
        this.$toast('请输入手机验证码')
        return
      }
      try {
        const {code, data, msg} = await login({
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          code: this.phoneForm.smsCode
        })
        if (code === 0) {
          console.log('加入成功')
        } else {
          console.log('加入失败')
          this.$toast(msg)
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
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>
