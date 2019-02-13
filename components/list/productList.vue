<template>
  <div class="product-list">
    <div class="product-item" @click="selectDetail(data.product_id)">
      <div class="img-show">
        <img :src="data.image" alt="">
        <div class="tags" v-if="showTag">{{data.product_type | productTypeValue}}</div>
      </div>
      <div class="product-desc">
        <div class="title">
          {{data.name}}
        </div>
        <div class="tags-wrap">
          <span class="solid" v-if="data.self_support">自营</span>
          <span v-for="item in data.icons_show" :key="item" class="hollow color">{{item}}</span>
          <span v-for="(item,index) in iconTour" :key="index" class="hollow">
            <template v-if="index < 2">{{item.title}}</template>
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
      if (this.data.icons_tour.length > 2) {
        return this.data.icons_tour.slice(0,2)
      } else {
        return this.data.icons_tour
      }
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
      padding: 24px 0;
      .img-show{
        position:relative;
        width:182px;
        height:220px;
        border-radius:12px;
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
      }
      .product-desc{
        flex: 1;
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
          line-height: 32px;
          overflow: hidden;
          margin: 10px 0 40px;
          span{
            margin-right: 10px;
            display: inline-block;
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
            font-size:22px;
            border-radius:16px;
            border: 2px solid #989898;
            padding: 0 12px;
            &.color{
              color: #FB605D;
              border-color: #FB605D;
            }
          }
        }
        .product-price{
          font-size:22px;
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
        }
      }
    }
  }
</style>
