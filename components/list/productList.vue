<template>
  <div class="product-list">
    <div class="product-item" @click="selectDetail(data.product_id)">
      <div class="img-show">
        <div class="img-bg" v-lazy:background-image="data.is_video ? data.video_image : data.image"></div>
        <div class="tags2" v-if="data.is_soldout">
          {{$t('saleOver')}}
        </div>
        <div class="tags">{{data.sub_type}}</div>
        <div class="dep-city" v-if="data.departure_city">{{data.departure_city | departureCity}}</div>
        <div class="show-video" v-if="data.is_video">
          <van-icon name="play-circle-o" color="#fff" size="30" />
        </div>
      </div>
      <div class="product-desc">
        <div class="title-wrap">
          <div class="one-c">
            <span class="self-s" v-if="data.self_support">{{$t('selfSupport')}}</span>
            <span>{{data.name_short || data.name}}</span>
          </div>
          <div v-if="data.name_short" class="van-ellipsis main-title">
            {{data.name}}
          </div>
        </div>
        <div class="tags-wrap" v-if="data.icons_show.length || data.icons_tour.length">
          <span v-for="item in data.icons_show" :key="item" class="hollow">{{item}}</span>
          <span v-for="(item,index) in data.icons_tour" :key="index" class="hollow">
            {{item.title}}
          </span>
        </div>
        <div class="coupons-special" v-if="data.special_icons.length || data.coupons.length">
          <span v-for="(item,index) in data.special_icons" :key="item.title + index + item.title" class="coupons">
            {{item.title}}
          </span>
          <span v-for="(item,index) in data.coupons" :key="item + index" class="special">
            {{item}}
          </span>
        </div>
        <div class="product-price-share">
          <div class="share-p">
            <span class="score" v-if="data.comment_score != '0.0'">
               {{data.comment_score}}分
            </span>
            <span class="gray-w" v-if="data.sales">
              {{data.sales}}人出行
            </span>
          </div>
          <div class="sale-price">
            <span>{{data.special_price || data.default_price}}</span>起
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getProfile} from '@/api/profile'
import { mapGetters} from 'vuex'

export default {
  name: 'productList',
  filters: {
    showInt(val) {
      return val.split('.')[0]
    },
    departureCity(value) {
      let _arr = value.split('/')
      let len = _arr.length
      if(len > 1) {
        return `${_arr[0]}等${len}地出发`
      }
      return `${value}出发`
    }
  },
  props: {
    data: {
      type: Object,
      default:() => ({
        product_id: '',
        image: '',
        self_support: '',
        name: '',
        icons_show: {}
      })
    },
    showTag: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      isShowFx: false
    }
  },
  computed: {
    iconTour() {
      return this.data.icons_tour
    },
    ...mapGetters([
      'profile'
    ])
  },
  mounted(){
    this.getProfile()
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
      this.$emit('selectItem', productId)
    },
    getProfile() {
      if(this.profile && this.profile.is_agent){
        this.isShowFx = true
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.product-list{
  background: #fff;
  padding: 20px;
  border-radius:20px;
  .product-item{
    display: flex;
    .img-show{
      position:relative;
      width:200px;
      border-radius:20px;
      overflow: hidden;
      .img-bg{
        width:100%;
        height:100%;
        overflow:hidden;
        background-size: cover;
        background-color: #d3d3d3;
      }
      .tags{
        line-height:40px;
        padding: 0 10px;
        position: absolute;
        top: 0;
        left: 0;
        font-size:20px;
        font-weight:400;
        background-color: #3ED68F;
        color: #fff;
        border-radius:20px 0px 20px 0px;
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
        background-color: rgba(0,0,0,0.45);
        color: #fff;
        p{
          text-align: left;
          padding-top: 50px;
        }
      }
      .dep-city{
        position: absolute;
        bottom: 0;
        left: 0;
        height:40px;
        border-radius:0px 20px 0px 20px;
        background:rgba(0,0,0,0.2);
        font-size:20px;
        color: #fff;
        padding: 0 10px;
        line-height: 40px;
      }
      .show-video{
        position: absolute;
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .product-desc{
      width: 446px;
      box-sizing: border-box;
      padding-left: 10px;
      position: relative;
      .title-wrap{
        font-size: 24px;
        margin-bottom: 6px;
        .one-c{
          max-height: 88px;
          width: 100%;
          font-size: 30px;
          font-weight: bold;
          line-height: 44px;
          overflow: hidden;
          color: #2d2d2d;
        }
        .main-title{
          margin-top: 6px;
        }
        .self-s{
          background: #FFCB3C;
          height: 32px;
          line-height: 32px;
          color: #fff;
          padding: 0 10px;
          border-radius: 30px;
          font-weight: normal;
          font-size: 20px;
          display: inline-block;
          vertical-align: text-bottom;
        }
      }
      .tags-wrap{
        max-height: 36px;
        overflow: hidden;
        margin-top: 8px;
        font-size: 0;
        span{
          margin-right: 10px;
          display: inline-block;
          line-height: 32px;
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
          color: #00ABF9;
          font-size: 20px;
          border-radius:16px;
          padding: 0 12px;
          margin-bottom: 5px;
          background-color: #F2F7F9;
          line-height: 36px;
          display: inline-block;
          &.color{
            color: #FB605D;
            border-color: #FB605D;
          }
        }
      }
      .coupons-special{
        font-size: 20px;
        height: 36px;
        line-height: 34px;
        width: 100%;
        overflow: hidden;
        margin-top: 6px;
        span{
          display: inline-block;
          border-radius: 8px;
          padding: 0 6px;
          margin-right: 6px;
          margin-bottom: 10px;
        }
        .coupons{
          color: #FEC133;
          border:1px solid #FEC133;
        }
        .special{
          color: #F55E2F;
          border:1px solid #F55E2F;
        }
      }
      .product-price-share{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .share-p{
          font-size:24px;
          .score{
            color: #FEC133
          }
          .gray-w{
            color: #AEAEAE;
            margin-left: 10px;
          }
        }
        .sale-price{
          color: #AEAEAE;
          font-size:24px;
          span{
            font-size:36px;
            color: #F55E2F;
            font-weight:400;
          }
          
        }
      }
    }
  }
}
</style>
