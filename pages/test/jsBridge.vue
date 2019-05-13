<template>
  <section class="app-bridge">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <!-- app调用web -->
    <h4>app调用web</h4>
    <div class="btn"
      v-for="(webFn, idx) in appCallWebList"
      :key="webFn"
      @click="appCallWeb(webFn)">
      {{idx}}.{{webFn}}
    </div>
    <!-- web调用app -->
    <h4>web调用app</h4>
    <div class="btn"
      v-for="(appFn, index) in webCallAppList"
      :key="appFn"
      @click="webCallApp(appFn)">
      {{index}}.{{appFn}}
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        // 不需要传参也不需要返回值的方法列表
        webCallAppList: [
          'getToken',
        ],
        // 有参数需要传递
        appCallWebList: [
          'getSharedImage',
        ],
      }
    },
    computed: {
      ...mapState({
        vxDeviceType: state => state.deviceType
      })
    },
    beforeMount() {
      this.jsBridge = require('@/assets/js/jsBridge.js').default
      // test方法
      window.test = (test) => {
        alert(test)
      }
    },
    mounted() {
      // test()
      console.log('$jsBridge', this.jsBridge)
      this.jsBridge.registerHandler('getSharedImage', (res) => {
        console.log(res);
      })
    },
    methods: {
      /**
       * web调用app
       * @param {String} fnName 方法名
       */
      async webCallApp(fnName) {
        this.jsBridge.callHandler(fnName, {'data': 123}, (res) => {
          console.log(111, res);
        })
      },
      /**
       * app调用web
       * @param {String} fnName 方法名
       */
      async appCallweb(fnName) {
        console.log('方法名（带参）', fnName)
        switch (fnName) {
          case 'jumpProductListView':
            //  1=当地跟团，2=当地玩乐，3=稀饭精品，4=门票演出，5=一日游，6=接驳服务，7=邮轮
            this.jsBridge[fnName]({
              'itemType': 1
            })
            break;
          case 'jumpProductDetailView':
            this.jsBridge[fnName]({
              'productID': 958
            })
            break;
          default:
            (`not found ${fnName}`)
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

