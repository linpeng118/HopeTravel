<template>
  <div class="currency-wrap">
    <div class="header">
      <van-nav-bar class="bar-shadow"
        :title="$t('personalPage.switchMoney')"
        @click-left="onClickLeft"
        left-arrow>
      </van-nav-bar>
    </div>
    <div class="list">
      <van-radio-group v-model="radio">
        <van-radio v-for="item in currencyList"
          :key="item.type"
          :name="item.type"
          @click="radioChange(item.type)">
          <span>{{item.name}}</span>
          <span class="type">{{item.type}}</span>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
  // import {getCookieByKey, setCookieByKey} from '@/assets/js/utils'
  import {mapMutations, mapGetters} from 'vuex'
  
  export default {
    name: 'money',
    data() {
      return {
        currencyList: [
          {name: `$${this.$t('dollar')}`, type: 'USD'},
          // {name:'€欧元',type:'EUR'},
          // {name:'£英镑',type:'GBP'},
          // {name:'$加拿大元',type:'CAD'},
          // {name:'Yen日元',type:'JPY'},
          // {name:'捷克克朗',type:'CZK'},
          // {name:'$澳大利亚元',type:'AUD'},
          // {name:'R.兰特',type:'AZR'},
          // {name:'NT$台币',type:'TWD'},
          {name: `¥${this.$t('RMB')}`, type: 'CNY'},
          // {name:'$新西兰元',type:'NZD'},
        ],
        radio: ''
      }
    },
    computed: {
      ...mapGetters([
        'currency'
      ])
    },
    mounted() {
      // console.log(this.radio)
      this.radio = this.currency
      // alert(this.currency)
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
      // 存货币
      radioChange(name) {
        this.setCurrency(name)
        this.$toast(this.$t('operateSuc'))
        setTimeout(() => {
          this.onClickLeft()
        }, 500)
      },
      ...mapMutations([
        'setCurrency'
      ])
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .currency-wrap {
    .list {
      padding: 0 43px;
      font-size: 28px;
      border-top: 1px solid #dedede;
      .van-radio {
        padding: 32px 0;
        border-bottom: 1px solid #dedede;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .type {
          float: right;
        }
      }
    }
  }
</style>
<style>
  .currency-wrap .van-radio__label {
    flex: 1;
  }
</style>
