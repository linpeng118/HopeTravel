<template>
  <div class="union-page-container">
    <header-bar :title="type"></header-bar>
    <div style="padding-top: 46px">
      <div class="verify-box">
        <van-cell-group>
          <van-field
            :value="fillInfo.userName"
            label="姓名"
            disabled
          />
          <van-field
            :value="fillInfo.cardId | hideCard"
            label="身份证号"
            disabled
          />
          <van-field
            v-model="accountNum"
            :placeholder="'填写'+type+'账号'"
            :label="type+'账号'"
          />
        </van-cell-group>
      </div>
      <div class="verify-box" v-if="isAgain">
        <van-cell-group>
          <van-field
            v-if="profile.phone"
            :value="profile.phone | hidePhone"
            disabled
            placeholder="填写电话号码"
            label="电话号码"
          />
          <van-field v-else
                     v-model="fillInfo.phone"
                     placeholder="填写电话号码"
                     label="电话号码"
          />
          <van-field
            v-model="fillInfo.smsCode"
            center
            clearable
            label="验证码"
            placeholder="填写验证码"
          >
            <van-button slot="button" plain size="small" @click="getCode">{{getShowText}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <div class="union-btn-submit" @click="submitValidate">提交提现申请</div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {payInfo} from '@/assets/js/mixins/getPayInfo'
import {isAgent} from '@/assets/js/mixins/isAgent'
import {setPayAccount, getPayInfo} from '@/api/sale_union'
import {mapMutations} from 'vuex'
export default {
  name: 'withdrawal',
  components: {HeaderBar},
  filters: {
    hidePhone(tel){
      return tel.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
    },
    hideCard(tel){
      return tel.replace(/^(\d{3})\d{10}(\d+)/,"$1****$2")
    }
  },
  mixins: [payInfo, isAgent],
  data(){
    return {
      type: this.$route.query.type === 'weixin' ? '微信' : '支付宝',
      accountNum: '',
      isAgain: this.$route.query.again
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
    }
  },
  mounted(){
    this.fillInfo = {
      userName: this.payInfo.chinese_name || '',
      cardId: this.payInfo.idcard_no || '',
      smsCode: '',
    }
  },
  methods:{
    async submitValidate() {
      if(!this.accountNum){
        this.$toast.fail('账户信息为空')
        return false
      }
      let params = {
        number: this.accountNum,
        type: this.$route.query.type,
      }
      if(this.isAgain) {
        params.account = this.profile.phone
        params.code = this.fillInfo.smsCode
      }
      let {code, msg} = await setPayAccount(params)
      if(code === 0) {
        this.$toast.success('提交成功')
        this.getPayDetail()
        setTimeout(() => {
          if(this.isAgain) {
            // 如果是修改则跳转到提现页面
            this.$router.push({
              name: 'personal-transfercore-withdrawal',
              query:{
                type: this.$route.query.type
              }
            })
          } else {
            this.$router.push({
              name: 'personal-transfercore'
            })
          }
        }, 3000)
      } else {
        this.$toast.fail(msg)
      }
    },
    // 获取验证码
    async getCode() {
      // 倒计时状态修改
      this.codeType = 1 // 正在请求数据
      try {
        const {code, msg} = await getSmsCode({
          phone: this.profile.phone
        })
        if (code !== 0) {
          this.$toast(msg)
        }
        await this.countDown()
      } catch (error) {
        this.codeType = 1
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
    async getPayDetail() {
      let {code,data} = await getPayInfo()
      let _obj = {}
      if(code === 0) {
        _obj= data
      }
      this.vxSetPayInfo(_obj)
    },
    ...mapMutations({
      vxSetPayInfo: 'saleUnion/setPayInfo'
    })
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .verify-box{
    border-radius:12px;
    margin: 15px 15px 0 15px;
    background-color: #fff;
  }
</style>
