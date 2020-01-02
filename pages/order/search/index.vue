<template>
  <div class="search-page">
    <!-- header -->
    <van-nav-bar class="search-header tours-no-bb"
      title="手机号查单"
      @click-left="onClickLeft">
      <van-icon name="arrow-left"
        slot="left" />
    </van-nav-bar>
    <!-- 查询面板 -->
    <div class="search-panel-wrap">
      <area-code-only :proAreaCode.sync="areaCode" />
      <div class="content">
        <van-cell-group>
          <van-field v-model="phone"
            placeholder="请输入手机号" />
          <van-row class="input-code"
            type="flex"
            justify="space-between">
            <van-col span="15">
              <van-field v-model="code"
                placeholder="请输入手机验证码" />
            </van-col>
            <van-col span="8">
              <van-button class="btn-code"
                :disabled="codeType===VERIFY_CODE.GETTING"
                @click="getCode"
                type="info">{{showText}}</van-button>
            </van-col>
          </van-row>
        </van-cell-group>
        <van-button class="btn-search"
          round
          @click="searchOrder">查询订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {VERIFY_CODE, SMS_SCENE} from '@/assets/js/consts'
  import AreaCodeOnly from '@/components/input/areaCodeOnly'
  import {getSmsCode} from '@/api/member'
  import {getOrderByPhone} from '@/api/order'
  import {setSessionStore} from '@/assets/js/utils'
  // 倒计时时间
  const TIME = 60

  export default {
    components: {
      AreaCodeOnly,
    },
    data() {
      return {
        VERIFY_CODE,
        // 区号与电话
        areaCode: '86',
        phone: '',
        // 验证码
        code: '',
        // 定时器
        timer: null,
        // 倒计时时间
        countDownTime: TIME,
        // 获取验证码/倒计时/重新获取
        codeType: VERIFY_CODE.START,
      }
    },
    computed: {
      showText() {
        if (this.codeType === VERIFY_CODE.START) {
          clearInterval(this.timer)
          return this.$t('getVerifyCode')
        } else if (this.codeType === VERIFY_CODE.GETTING) {
          return `${this.countDownTime} s`
        } else {
          clearInterval(this.timer)
          return this.$t('partcailComp.resetVerifyCode')
        }
      },
    },
    methods: {
      onClickLeft() {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      // 查询订单
      async searchOrder() {
        console.log('查询订单')
        if (!this.phone) {
          return
        }
        if (!this.code) {
          return
        }
        const {code, msg, data} = await getOrderByPhone({
          phone: `${this.areaCode}-${this.phone}`,
          code: this.code,
        })
        if (code === 0) {
          // 展示订单列表
          setSessionStore('searchOrderInfo', JSON.stringify(data))
          this.$router.push({
            name: 'order-search-list',
          })
        } else {
          this.$toast(msg)
        }
      },
      // 获取验证码
      async getCode() {
        // 如果手机号码不存在
        if (!this.phone) {
          this.$toast(this.$t('partcailComp.enterPhone'))
          return
        }
        
        
        try {
          const {code, msg} = await getSmsCode({
            phone: `${this.areaCode}-${this.phone}`,
            scene: SMS_SCENE.VALIDATE,
          })
          console.log(code,msg);
          
          console.log(8888,this.codeType,VERIFY_CODE.GETTING);
          
          if (code !== 0) {
            this.$toast(msg)
            this.codeType = VERIFY_CODE.START
            /* this.resetTimer() */
          }
          else{
        // 倒计时状态修改
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        console.log(9999,this.codeType);
            await this.countDown()
          }
           
        } catch (error) {
          console.log(error)
          this.codeType = VERIFY_CODE.START
        }
      },
      countDown() {
      this.timer = setInterval(() => {
        console.log(this.countDownTime)
        if (this.countDownTime <= 0) {
          this.codeType = VERIFY_CODE.AGAIN
          this.countDownTime = TIME
          // console.log('countDownTime', this.countDownTime)
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
    },
     
  }
</script>

<style lang="scss" scoped>
  .search-page {
    min-height: 100vh;
    background: #f5f4f9;
    .search-header {
      height: 88px;
      font-size: 32px;
      transition: all 0.5s;
      background-color: #fff;
    }
    .search-panel-wrap {
      margin: 28px auto;
      width: 686px;
      height: 490px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;

      .content {
        padding: 34px 24px;
        width: 100%;
        font-size: 0;
        text-align: center;
        .input-code {
          margin-top: 22px;
        }
        .btn-code {
          width: 100%;
          height: 68px;
          line-height: 42px;
          background: rgba(57, 158, 246, 1);
          border-radius: 12px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
        }
        .btn-search {
          margin-top: 66px;
          width: 464px;
          height: 72px;
          line-height: 42px;
          background: rgba(57, 158, 246, 1);
          border-radius: 36px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
<style lang="scss">
  .search-page {
    .van-cell {
      width: 100%;
      height: 68px;
      line-height: 68px;
      background: rgba(241, 241, 241, 1);
      opacity: 1;
      border-radius: 12px;
      border: 0;
      padding: 0 18px;
    }
    .van-hairline--top-bottom::after {
      border: 0px;
      border-width: 0px;
    }
  }
</style>
