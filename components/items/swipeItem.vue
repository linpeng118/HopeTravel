<template>
  <div class="part-show-item">
    <h1 class="title">{{proData.name}}</h1>
    <div class="swiper-container"
      v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="cItem in proData.list"
          :key="cItem.product_id">
          <hot-item :proData="cItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HotItem from '../../components/items/hotItem'

  export default {
    components: {
      HotItem
    },
    props: {
      proData: {
        type: Object,
      },
    },
    data() {
      const vm = this
      return {
        swiperOption: {
          slidesPerView: 'auto',
          slidesOffsetBefore: 16,
          spaceBetween: 10,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap(e) {
              // console.log('onTap', this);
              vm.$emit('selectItem', e.target.getAttribute('productId'))
            }
          }
        }
      }
    },
    computed: {},
    mounted() {
      console.log(this.proData)
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .part-show-item {
    .title {
      padding-left: 32px;
      height: 54px;
      font-size: 40px;
      color: #131313;
      font-weight: 400;
    }
    .swiper-container {
      margin-top: 28px;
      .swiper-slide {
        font-size: 38px;
        width: 332px !important;
      }
    }
  }
</style>
