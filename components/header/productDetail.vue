<template>
  <van-nav-bar class="product-detail-header-neu" :class="isShowTitle ? 'bg': ''"
    ref="productDetailHeader"
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap-neu"
      :name="$route.query.sem == 1 ? 'wap-home-o':'arrow-left'"
      slot="left" />
    <van-icon class="right-wrap-neu"
      name="ellipsis"
      slot="right"/>
    <div slot="title" v-if="isShowTitle" class="title-top">
      <div class="item" :class="area == 'product'? 'active': ''">产品</div>
      <div class="item" v-if="review" :class="area == 'review'? 'active': ''">评价</div>
      <div class="item" :class="area == 'detail'? 'active': ''">详情</div>
    </div>
  </van-nav-bar>
</template>

<script>
  export default {
    props: {
      review: {
        type: Boolean,
        default: false
      },
      area: {
        type: String,
        default: 'product'
      }
    },
    data() {
      return {
        isShowTitle: false,
      }
    },
    computed: {
    },
    mounted(){
      document.addEventListener('scroll',(e) => {
        let scrolltopTemp = document.documentElement.scrollTop||document.body.scrollTop
        if(scrolltopTemp > 50) {
          this.isShowTitle = true
        } else {
          this.isShowTitle = false
        }
        
      })
    },
    methods: {
      onClickLeft() {
        // 返回上一页（打开新页面问题处理）
        // this.$router.go(-1);
        this.$emit('callOnLeft')
      },
      onClickRight() {
        this.$emit('callOnRight')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-header-neu {
    height: 88px;
    font-size: 32px;
    background-color: transparent;
    box-shadow: none !important;
    .left-wrap-neu,
    .right-wrap-neu {
      color: #fff !important;
    }
    &.bg{
      background-color: #fff;
      
      .left-wrap-neu,
      .right-wrap-neu {
        color: #404040 !important;
      }
    }
    .title-top{
      display: flex;
      .item{
        flex: 1;
        font-size: 24px;
      }
      .active{
        color: #00ABF9;
      }
    }
  }

</style>
<style>
.product-detail-header-neu.van-hairline--bottom::after{
  border-bottom-width: 0;
}
</style>
