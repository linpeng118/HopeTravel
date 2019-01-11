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
      :key="item"
      @click="callAppBridgeFunc(item)">
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
  </section>
</template>

<script>
  // import appBridge from '@/assets/js/appBridge.js'

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
          'jumpProductListView', // 跳转列表界面
        ],
        holdPage: true,
      }
    },
    methods: {
      async callAppBridgeFunc(funcName) {
        console.log('call', funcName)
        switch (funcName) {
          // case 'jumpToSendMessage':
          //   appBridge.jumpToSendMessage(this.openid, 'user name')
          //   break
          case 'getSessionKey': {
            const sessionKey = await appBridge.getSessionKey()
            console.log('sessionKey', sessionKey)
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
      font-size: 32px;
      &.disabled {
        color: #f02b55;
      }
    }
  }
</style>

