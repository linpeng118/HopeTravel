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
      v-for="(item, idx) in funcNamesNeedArg"
      :key="item"
      @click="callArgFunc(item)">
      {{idx + funcNames.length}}.{{item}}
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
        funcNames: [
          'hideNavigationBar',
          'showNavigationBar',
          'jumpToLoginView', // 跳转登录界面
          'jumpSearchView', // 搜索界面
          'jumpDestinationView', // 目的地界面
          'backPreviousView', // 返回上一个界面(对web而言就是返回app首页)
          'getLocalStorage' // 最近浏览数据
        ],
        // 有参数需要传递
        funcNamesNeedArg: [
          'jumpProductListView', // 跳转列表界面
          'jumpProductDetailView', // 详情页面
        ],
        holdPage: true,
      }
    },
    computed: {
      ...mapState({
        vxDeviceType: state => state.deviceType
      })
    },
    beforeMount() {
      this.appBridge = require('@/assets/js/appBridge.js')
      // test方法
      window.test = (params) => {
        console.log('test')
        alert(params)
      }
    },
    mounted() {
      // test()
    },
    methods: {
      /**
       * 无参数请求app接口
       */
      async callNoArgFunc(funcName) {
        console.log('方法名（无参）：', funcName, this.appBridge)
        const res = await this.appBridge[funcName]()
        // alert(res)
      },
      /**
       * 带参数请求app接口
       */
      async callArgFunc(funcName) {
        ('方法名（带参）', funcName)
        switch (funcName) {
          case 'jumpProductListView':
            //  1=当地跟团，2=当地玩乐，3=稀饭精品，4=门票演出，5=一日游，6=接驳服务，7=邮轮
            this.appBridge[funcName]({
              'itemType': 1
            })
            break;
          case 'jumpProductDetailView':
            this.appBridge[funcName]({
              'productID': 958
            })
            break;
          default:
            (`not found ${funcName}`)
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

