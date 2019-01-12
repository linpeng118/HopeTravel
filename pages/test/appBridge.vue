<template>
  <section class="app-bridge">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <div class="btn"
      v-for="(item, index) in funcNames"
      :key="item">
      <!-- :class="{disabled:!testApi(item)}"
      @click="callAppBridgeFunc(item)" -->
      {{index}}.{{item}}
    </div>
    <!-- <mt-switch v-model="holdPage">
      {{holdPage ? 'new window' : 'replace window'}}
    </mt-switch> -->
    <div class="btn"
      v-for="(item, index) in jumpFuncNames"
      :key="item">
      <!-- :class="{disabled:!testApi(item)}"
      @click="callAppBridgeFunc(item)"> -->
      {{index + funcNames.length}}.{{item}}
    </div>
    <div class="btn"
      v-for="(item, index) in jumpFuncNamesTemp"
      :key="item">
      <!-- :class="{disabled:!appBridge.testApi(item,false)}"
      @click="callAppBridgeFunc(item)"> -->
      {{index + jumpFuncNames.length+funcNames.length}}.{{item}}
    </div>
  </section>
</template>

<script>
  import appBridge from '@/assets/js/appBridge.js'
  export default {
    components: {},
    data() {
      return {
        // 不需要传参也不需要返回值的方法列表
        funcNames: [
          'hideNavigationBar',
          'showNavigationBar',
        ],
        // 页面跳转方法列表
        jumpFuncNames: [
          'jumpToBlack',
          'jumpToProfile',
        ],
        // 新接口测试跳转方法列表
        jumpFuncNamesTemp: [
          'JSMessage_jumpToVerify_Temp',
          'JSMessage_jumpToVerifyPhoto_Temp',
        ],
        holdPage: true,
      }
    },
    methods: {
      async callAppBridgeFunc(funcName) {
        console.log('call', funcName)
        switch (funcName) {
          case 'openProfile':
            appBridge.openProfile(this.openid)
            break
          case 'callInAppPurchase':
            appBridge.callInAppPurchase('Luxy_Appstore_Subscription_VIP70Percent1Months')
            break
          case 'jumpToSendMessage':
            appBridge.jumpToSendMessage(this.openid, 'user name')
            break
          case 'getSessionKey': {
            const sessionKey = await appBridge.getSessionKey()
            console.log('sessionKey', sessionKey)
            break
          }
          case 'JSMessage_jumpToBuyCoins_Temp': {
            appBridge.jumpToBuyCoins(this.holdPage)
            break
          }
          default:
            if (this.jumpFuncNames.includes(funcName)) {
              appBridge[funcName](this.holdPage)
            } else {
              appBridge[funcName]()
            }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .app-bridge {
    padding: 20px 30px;
    min-height: 100vh;
    background-color: #eee;
    .btn {
      display: block;
      color: cornflowerblue;
      margin: 15px 0;
      padding: 20px;
      border-radius: 6px;
      border: 2px solid cornflowerblue;
      font-size: 16px;
      &.disabled {
        color: #f02b55;
      }
    }
  }
</style>

