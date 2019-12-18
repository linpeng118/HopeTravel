<template>
  <div>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 :title="$t('usecoupons')"
                 :z-index="999" @click-left="leftClick" >
      <van-icon class="left-wrap"
                name="arrow-left"
                slot="left" />
    </van-nav-bar>
    <div class="product-list">
      <p class="setcop">
         <span v-for="(item,ind) in coupons" :key="ind">
           {{item}}
         </span>
      </p>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="datax.length>0">
        <van-list v-model="isLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false">
          <template v-if="datax.length">
            <van-cell v-for="(data,ind) in datax" :key="ind">
              <div class="product-item" @click="selectDetail(data.product_id)" target="_blank">
                <div class="img-show">
                  <img :src="data.image" alt="">
                  <div class="tags2"v-if="data.is_soldout">
                    {{$t('saleOver')}}
                    <p v-if="showTag" >{{productTypeValue(data.product_type)}}</p>
                  </div>
                  <div class="tags" v-if="showTag&&!data.is_soldout">{{productTypeValue(data.product_type)}}</div>
                  <div class="special-icon">
                    <span v-for="(item,index) in data.special_icons" :class="item.type === 'special' ? 'color': ''" :key="index">{{item.title}}</span>
                    <!--<span>3折</span>-->
                  </div>
                </div>
                <div class="product-desc">
                  <div class="title">
                    {{data.name}}
                  </div>
                  <div class="tags-wrap">
                    <span class="solid" v-if="data.self_support">{{$t('selfSupport')}}</span>
                    <span v-for="item in data.icons_show" :key="item" class="hollow color">{{item}}</span>
                    <span v-for="(item,index) in data.icons_tour" :key="index" class="hollow">
            <!--<template v-if="index < 2">{{item.title}}</template>-->
            {{item.title}}
          </span>
                  </div>
                  <div class="product-price">
                    <template v-if="!data.special_price">
                      <span class="sale-price"><strong>{{data.default_price | showInt}}</strong>/{{$t('since')}}</span>
                    </template>
                    <template v-else>
                      <span class="sale-price"><strong>{{data.special_price | showInt}}</strong>/{{$t('since')}}</span><span class="default-price" style="text-decoration: line-through">{{$t('listComp.originalPrice')}}：{{data.default_price | showInt}}</span>
                    </template>
                    <span v-if="data.coupons&&data.coupons.length" class="setspecial">
               <i class="ileft"></i>
               <i class="icon">{{data.coupons[0]}}</i>
               <i class="iright"></i>
          </span>
                    <span v-if="data.coupons&&data.coupons.length>1" style="color:#fb605d">......</span>
                    <span class="share-p" v-if="isShowFx">{{$t('productDetailPage.shareMakes')}}{{data.agent_fee}}</span>
                    <p><span style="color: #989898" v-if="data.comment_score">{{data.comment_score}}分</span>&nbsp;
                      <span style="color: #989898" v-if="data.sales>0">{{data.sales}}人出行</span></p>
                  </div>
                </div>
              </div>
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
  export default {
    name: 'productList',
    filters: {
      showInt(val) {
        if(val){
          return val.split('.')[0]
        }

      },
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
      this.getpro()
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
      async getpro(id) {
        this.datax=[];
        let {code, data, coupons ,pagination} = await getProductCoup({
          page:1,
          coupon_id:this.objid
        })
        if (code === 0) {
          this.datax=data;
          this.coupons=coupons;
          this.pagination=pagination;
        }

      },

      // 滑动会请求数据
      async onLoad() {
        // 获取数据
        let that=this;
        let {code, data, coupons ,pagination} = await getProductCoup({
          page:that.pagination.page+1,
          coupon_id:this.objid
        })
        if (code === 0) {
          that.datax=data;
          that.datax.push(...data)
          that.coupons=coupons;
          that.pagination=pagination; that.isLoading = false
          // 数据全部加载完成
          if (!that.pagination.more) {
            that.prodFinished = true
          }

        }
      },
      // 返回上一级
      leftClick() {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      // 上拉刷新
      async onRefresh(){
        // 获取数据
        let that=this;
        that.datax=[];
        let {code, data, coupons ,pagination} = await getProductCoup({
          page:1,
          coupon_id:this.objid
        })
        if (code === 0) {
          that.datax=data;
          that.coupons=coupons;
          that.pagination=pagination;   // 加载状态结束
          that.isLoading = false
          // 数据全部加载完成
          if (!that.pagination.more) {
            that.prodFinished = true
          }

        }

      },


    }
  }
</script>

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
