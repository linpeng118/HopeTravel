<template>
  <div v-if="datay">
    <div class="product-item" @click="selectDetail(datay.product_id)" target="_blank">
      <div class="img-show">
        <img :src="datay.image" alt="">
      </div>
      <div class="product-desc">
        <div class="title">
          {{datay.name}}
        </div>
        <p><span style="color: #989898" v-if="datay.comment_score">{{datay.comment_score}}分</span>&nbsp;
          <span style="color: #989898">{{datay.sales}}人出行</span></p>
        <div class="product-price">
          <template v-if="!datay.special_price">
            <span class="sale-price"><strong>{{datay.default_price | showInt}}</strong>/{{$t('since')}}</span>
          </template>
          <template v-else>
            <span class="sale-price"><strong>{{datay.special_price | showInt}}</strong>/{{$t('since')}}</span><span class="default-price" style="text-decoration: line-through">{{$t('listComp.originalPrice')}}：{{datay.default_price | showInt}}</span>
          </template>
          <span v-if="datay.coupons&&datay.coupons.length" class="setspecial">
               <i class="ileft"></i>
               <i class="icon">{{datay.coupons[0]}}</i>
               <i class="iright"></i>
          </span>
          <span v-if="datay.coupons&&datay.coupons.length>1" style="color:#fb605d">......</span>

        </div>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    filters: {
      showInt(val) {
        if(val){
          return val.split('.')[0]
        }

      },
    },
    props: {
      datay: {
        type: Object,
        default:null
      },
    },
    data() {
      return {

      }

    },
    computed: {},
    mounted() {

    },
    methods: {
      selectDetail(productId) {
        this.$router.push({
          name: 'product-detail',
          query: {
            productId
          }
        });
      },
    },
  }
</script>
<style type="text/scss" lang="scss" scoped>
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
