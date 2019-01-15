<template>
  <div class="img-item wiper-container"
    v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="item in proData"
        :key="item.url">
        <img :src="item.url"
          alt="img">
      </div>
    </div>
    <!-- 点 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    props: {
      proData: {
        type: Array,
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
          pagination: {
            el: '.swiper-pagination',
          },
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap(e) {
              // console.log('onTap', this);
              vm.$emit('selectItem', e.target.getAttribute('productId'))
            }
          }
        },
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
  .swiper-container {
    height: 375px;
    .swiper-pagination {
      bottom: 0;
    }
    .swiper-slide {
      font-size: 38px;
      width: 686px !important;
      img {
        height: 356px;
        width: 686px;
        border-radius: 12px;
      }
    }
  }
</style>
