<template>
  <section class="app-bridge">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <h4>app调用web</h4>
    <van-button type="primary"
      @click="jsToJavaSpec">js发送给java指定接收</van-button>
    <div id="show">打印信息</div>
    <!-- app调用web -->
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
    head: {
      title: 'JsBridge'
    },
    data() {
      return {
        // app调用web
        appCallWebList: [
          'getSharedImage',
        ],
        // web调用app
        webCallAppList: [
          'getToken',
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
    },
    mounted() {
      // console.log('$jsBridge', this.jsBridge)
      this.init()
    },
    methods: {
      init() {
        // 注册方法给APP备用
        this.jsBridge.webRegisterHandler('getSharedImage', (res, callback) => {
          console.log(JSON.parse(res).name);
          // APP传入的回调函数，可传参数
          callback({test: 'callback success!!'})
        })
      },
      jsToJavaSpec() {
        var data = '发送数据给java指定接收';
        // alert(window.WebViewJavascriptBridge)
        // 指定接收参数 getToken 为方法名
        window.WebViewJavascriptBridge.callHandler(
          'getToken',
          {t: 12},
          function (responseData) {
            //处理java回传的数据
            document.getElementById("show").innerHTML = responseData;
          }
        );
      },
      /**
       * web调用app
       * @param {String} fnName 方法名
       */
      async webCallApp(fnName) {
        alert(window.WebViewJavascriptBridge)
        // console.log('app fn：', fnName)
        this.jsBridge.webCallHandler(fnName, {test: 123}, (responseData) => {
          console.log(responseData);
        })
      },
      /**
       * app调用web
       * @param {String} fnName 方法名
       */
      async appCallweb(fnName) {
        console.log('方法名', fnName)
        this.jsBridge.webRegisterHandler(fnName, (res) => {
          console.log('appCallweb: ', res);
        })
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

