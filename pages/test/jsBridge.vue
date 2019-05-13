<template>
  <section class="app-bridge">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <div id="buttons"></div>
    <div id="log"></div>
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
          'argTest',
        ],
        // 有参数需要传递
        funcNamesNeedArg: [
          'noArgTest',
        ],
      }
    },
    computed: {
      ...mapState({
        vxDeviceType: state => state.deviceType
      })
    },
    beforeMount() {
      this.jsBridge = require('@/assets/js/jsBridge.js')
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
        console.log('方法名（无参）：', funcName, JSON.stringify(this.jsBridge))
        const res = await this.jsBridge[funcName]()
        // alert(res)
      },
      /**
       * 带参数请求app接口
       */
      async callArgFunc(funcName) {
        console.log('方法名（带参）', funcName)
        switch (funcName) {
          case 'jumpProductListView':
            //  1=当地跟团，2=当地玩乐，3=稀饭精品，4=门票演出，5=一日游，6=接驳服务，7=邮轮
            this.jsBridge[funcName]({
              'itemType': 1
            })
            break;
          case 'jumpProductDetailView':
            this.jsBridge[funcName]({
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

