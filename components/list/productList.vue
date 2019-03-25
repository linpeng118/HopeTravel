<template>
  <div class="product-list">
    <div class="product-item" @click="selectDetail(data.product_id)">
      <div class="img-show">
        <img :src="data.image" alt="">
        <div class="tags" v-if="showTag">{{data.product_type | productTypeValue}}</div>
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
          <span class="solid" v-if="data.self_support">自营</span>
          <span v-for="item in data.icons_show" :key="item" class="hollow color">{{item}}</span>
          <span v-for="(item,index) in data.icons_tour" :key="index" class="hollow">
            <!--<template v-if="index < 2">{{item.title}}</template>-->
            {{item.title}}
          </span>
        </div>
        <div class="product-price">
          <template v-if="!data.special_price">
            <span class="sale-price"><strong>{{data.default_price | showInt}}</strong>/起</span>
          </template>
          <template v-else>
            <span class="sale-price"><strong>{{data.special_price | showInt}}</strong>/起</span>
            <span class="default-price" style="text-decoration: line-through">原价：{{data.default_price | showInt}}</span>
          </template>
          <span v-for="(item,index) in data.coupons" class="setspecial" :key="index">
             <i v-if="item.full_with>0">满{{item.full_with}}</i>
             <i v-if="item.type=='cash'">{{item.minus_off}}</i>
             <i v-if="item.type=='minus'">减{{item.minus_off}}</i>
             <i v-if="item.type=='percent'">{{item.minus_off}}折</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productList',
  filters: {
    showInt(val) {
      return val.split('.')[0]
    },
    productTypeValue(val) {
      const type = [
        {type: 3,title: '精品小团'},
        {type: 1,title: '当地跟团'},
        {type: 2,title: '当地玩乐'},
        {type: 4,title: '门票演出'},
        {type: 5,title: '一日游'},
        {type: 6,title: '接驳服务'},
        {type: 7,title: '邮轮'},
      ]
      let target = type.find(item => {
        return item.type === val
      })
      return target.title
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
  computed: {
    iconTour() {
      return this.data.icons_tour
    }
  },
  methods: {
    selectDetail(productId) {
      this.$emit('selectItem', productId)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .product-list{
    .product-item{
      display: flex;
      display: -webkit-flex;
      padding: 24px 0;
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
        }
        .tags-wrap{
          height: 36px;
          overflow: hidden;
          margin: 10px 0 40px;
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
          .sale-price{
            color: #FB605D;
            margin-right: 10px;
            strong{
              font-size:40px;
            }
          }
          .default-price{
            color: #3A3A3A;
          }
        }
      }
    }
  }
  .setspecial{
    line-height: 22px;
    font-size: 11px;
    font-weight: 300;
    color:rgba(251,96,93,1);
    border: 1px solid rgba(251,96,93,1);
    padding: 10px;
    border-radius: 8px;
  }
</style>
