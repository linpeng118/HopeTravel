<template>
  <div class="union-page-container">
    <header-bar :title="type"></header-bar>
    <div style="padding-top: 46px">
      <div class="verify-box">
        <van-cell-group>
          <van-field
            v-model="fillInfo.userName"
            placeholder="填写姓名"
            label="姓名"
          />
          <van-field
            v-model="fillInfo.cardId"
            placeholder="填写身份证号"
            label="身份证号"
          />
          <van-field
            v-model="fillInfo.cardId"
            :placeholder="'填写'+type+'账号'"
            :label="type+'账号'"
          />
        </van-cell-group>
      </div>
      <div class="verify-box" v-if="$route.query.again">
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
import {mapGetters} from 'vuex'
export default {
  name: 'withdrawal',
  components: {HeaderBar},
  filters: {
    hidePhone(tel){
      return tel.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
    }
  },
  data(){
    return {
      type: this.$route.query.type === 'wx' ? '微信' : '支付宝',
      fillInfo: {
        userName:'',
        cardId: ''
      }
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
    ...mapGetters([
      'profile'
    ])
  },
  mounted(){
    console.log(this.profile)
    if (!this.profile.phone) {
      let url = this.$route.query
      console.log(url)
      this.$router.push({
        path: '/login?redirect=personal/transfercore/account_sure?' + url
      })
    }
  },
  methods:{
    submitValidate() {

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
