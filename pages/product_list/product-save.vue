<template>
  <div>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 :title="$t('savetime')"
                 :z-index="999" @click-left="leftClick" >
      <van-icon class="left-wrap"
                name="arrow-left"
                slot="left" />
    </van-nav-bar>
    <div class="product-list product-listx">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="datax.length>0">
        <van-list v-model="isLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false">
          <template v-if="datax&&datax.length">
            <van-cell v-for="(datak,ind) in datax" :key="ind">
              <div class="count-down"
                   v-html="datak.time"></div>
              <saveitem :datay="datak"></saveitem>
            </van-cell>
          </template>
          <!--<div v-else>暂无数据</div>-->
        </van-list>


      </van-pull-refresh>

    </div>
  </div>

</template>

<script>
  import {getProductCoup} from '@/api/products'
  import saveitem from '@/components/items/saveitem'
  export default {
    name: 'productList',
    components: {
      saveitem
    },
    filters: {
      showInt(val) {
        if(val){
          return val.split('.')[0]
        }

      },
    },
    async asyncData({$axios, store}) {
      let indexData
      console.log(store.getters.currency)
      let {code, data} = await $axios.$get('/api/index/mobile', {
        headers: {
          'Language': store.getters.language,
          'Currency': store.getters.currency
        }
      })
      if (code === 0) {
        indexData = data
      }
      return {
        indexData
      }
    },
    data(){
      return {
        isShowFx: false,
        isLoading: false,
        datax:[],
        coupons:'',
        pagination:{
          page:1,
        },
        objid:this.$route.query.id||null,
        prodFinished:false,
        showTag:false,
      }
    },
    computed: {
      iconTour() {
        return this.data.icons_tour
      },
    },
    mounted(){
      this.getTime()
      this.datax = this.indexData[2].data
    },
    methods: {
      productTypeValue(val) {
        const type = [
          {type: 3,title: this.$t('tours.exquisiteGroup')},
          {type: 1,title: this.$t('tours.localGroup')},
          {type: 2,title: this.$t('tours.localPlay')},
          {type: 4,title: this.$t('tours.tickets')},
          {type: 5,title: this.$t('tours.aDayTrip')},
          {type: 6,title: this.$t('tours.connectionService')},
          {type: 7,title: this.$t('tours.cruise')},
        ]
        let target = type.find(item => {
          return item.type === val
        })
        return target.title
      },
      selectDetail(productId) {
        this.$router.push({
          name: 'product-detail',
          query: {
            productId
          }
        });
      },
      // 倒计时时间转化
      timeToData(maxtime) {
        let second = Math.floor(maxtime % 60);       //计算秒
        let minite = Math.floor((maxtime / 60) % 60); //计算分
        let hour = Math.floor((maxtime / 3600) % 24); //计算小时
        let day = Math.floor((maxtime / 3600) / 24);//计算天
        return `<span>${this.numChangeT(day)}</span>天<span>${this.numChangeT(hour)}</span>时<span>${this.numChangeT(minite)}</span>分<span>${this.numChangeT(second)}</span>秒`
        // return day+':'+this.numChangeT(hour)+':'+this.numChangeT(minite)+':'+this.numChangeT(second)
      },
      numChangeT(n) {
        return n < 10 ? '0' + n : '' + n
      },
      getTime() {
        setInterval(() => {
          this.datax.forEach(value => {
            var time = this.timeToData(value.special_end_date);
            if (typeof value.jishi == 'undefined') {
              this.$set(value, 'time', time);
            } else {
              value.time = time
            }
            if (value.special_end_date) {
              --value.special_end_date
            } else {
              value.special_end_date = 0
            }
          })
        }, 1000)
      },
      // 滑动会请求数据
      async onLoad() {
      },
      // 返回上一级
      leftClick() {
        this.$router.go(-1)
      },
      // 上拉刷新
      async onRefresh(){
      },
    }
  }
</script>
<style>
  .product-listx .count-down span {
    width: 40px;
    display: inline-block;
    background-color: rgba(255, 0, 0, 0.6);
    border-radius: 6px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 6px;
  }
</style>
<style type="text/scss" lang="scss" scoped>
  .product-list{
    .product-item{
      display: flex;
      display: -webkit-flex;
      padding: 10px 0;
      .img-show{
        position:relative;
        width:182px;
        height:220px;
        border-radius:12px;
        background-color: #d8d8d8;
        overflow: hidden;
        img{
          height: 100%;
        }
        .tags{
          width: 100%;
          line-height:36px;
          padding: 0 12px;
          position: absolute;
          bottom: 0;
          font-size:22px;
          font-weight:400;
          background-color: rgba(0,0,0,0.57);
          color: #fff;

        }
        .tags2{
          width: 100%;
          height: 100%;
          padding: 40% 12px;
          position: absolute;
          bottom: 0;
          font-size:22px;
          font-weight:400;
          text-align: center;
          background-color: rgba(0,0,0,0.57);
          color: #fff;
          p{
            text-align: left;
            padding-top: 50px;
          }
        }
        .special-icon{
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0;
          height:36px;
          border-radius:0 0 12px 0px;
          overflow: hidden;
          span{
            font-size:22px;
            color: #fff;
            background-color: #399EF6;
            display: inline-block;
            width: 58px;
            text-align: center;
            line-height: 36px;
            &.color{
              background-color: #FF0000;
            }
          }
        }
      }
      .product-desc{
        flex: 1;
        -webkit-flex: 1;
        padding-left: 26px;
        .title{
          font-size: 30px;
          font-weight:400;
          line-height:44px;
          height: 88px;
          overflow: hidden;
          color: #3e3e3e;
        }
        .tags-wrap{
          height: 36px;
          overflow: hidden;
          margin: 10px 0 10px;
          font-size: 0;
          span{
            margin-right: 10px;
            display: inline-block;
            line-height: 32px !important;
          }
          .solid{
            padding: 0 4px;
            background-color: #EF9A1A;
            color: #fff;
            font-size:24px;
            color: #fff;
            border-radius:6px;
          }
          .hollow{
            color: #3A3A3A;
            font-size: 22px;
            border-radius:16px;
            border: 2px solid #989898;
            padding: 0 12px;
            margin-bottom: 5px;
            &.color{
              color: #FB605D;
              border-color: #FB605D;
            }
          }
        }
        .product-price{
          font-size:22px;
          .share-transF{
            margin-top: -15px;
            line-height: 40px;
          }
          .sale-price{
            color: #EF9A1A;
            margin-right: 10px;
            strong{
              font-size:40px;
            }
          }
          .default-price{
            color: #3A3A3A;
          }
          .share-p{
            color: #FF7246;
          }

        }
      }
    }
  }
  .setcop{
    width:750px;
    height:88px;
    background:rgba(254,248,236,1);
    opacity:1;
    line-height: 88px;
    text-align: center;
    font-size: 24px;
    color: #FBA35A;
  }
  .setspecial{
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
    font-weight: 300;
    color:rgba(251,96,93,1);
    position: relative;
    overflow: hidden;
    padding: 2px 0 0 0 ;
    top: 15px;
  }
  .ileft{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #fff;
    position: absolute;
    border: 2px solid rgba(251,96,93,1);
    margin-top: 15px;
    margin-left: -7px;
  }
  .iright{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #fff;
    position: absolute;
    border: 2px solid rgba(251,96,93,1);
    margin-top: -28px;
    margin-left:calc(100% - 7px);
  }
  .icon{
    border: 2px solid rgba(251,96,93,1);
    padding: 10px 14px 10px 10px;
    line-height: 20px;
    border-radius: 8px;
    display: inline-block;
  }
</style>
