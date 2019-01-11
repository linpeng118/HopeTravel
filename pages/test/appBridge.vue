<template>
  <section class="app-bridge">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <h4>不需要传参给移动端</h4>
    <div class="btn"
      v-for="(item, index) in funcNames"
      :key="item"
      @click="callNoArgFunc(item)">
      {{index}}.{{item}}
    </div>
    <!-- <mt-switch v-model="holdPage">
      {{holdPage ? 'new window' : 'replace window'}}
    </mt-switch> -->
    <h4>需要传递给移动端</h4>
    <div class="btn"
      v-for="(item, index) in funcNamesNeedArg"
      :key="item"
      @click="callArgFunc(item)">
      {{index + funcNames.length}}.{{item}}
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
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
        // 有参数需要传递
        funcNamesNeedArg: [
          'jumpProductListView', // 跳转列表界面
        ],
        holdPage: true,
      }
    },
    computed: {
      ...mapState({
        vxDeviceType: state => state.deviceType
      })
    },
    methods: {
      /**
       * 无参数请求app接口
       */
      async callNoArgFunc(funcName) {
        console.log('方法名（无参）：', funcName, appBridge)
        appBridge[funcName]()
      },
      /**
       * 带参数请求app接口
       */
      async callArgFunc(funcName) {
        console.log('方法名（带参）', funcName)
        switch (funcName) {
          case 'jumpProductListView':
            appBridge[funcName]({'itemType': 1})
            break;
          default:
            console.log(`not found ${funcName}`)
            break;
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
      margin: 20px 0;
      padding: 20px;
      border-radius: 6px;
      border: 2px solid cornflowerblue;
      font-size: 40px;
      &.disabled {
        color: #f02b55;
      }
    }
  }
</style>

