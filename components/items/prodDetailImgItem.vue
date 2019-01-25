<template>
  <div class="img-item wiper-container"
    ref="mySwiper"
    v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="item in proData"
        :key="item.id"
        @click="onItem(item)">
        <img :src="item"
          alt="img">
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

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
          spaceBetween: 10,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          // pagination: {
          //   el: '.swiper-pagination',
          // },
        },
      }
    },
    computed: {},
    mounted() {},
    methods: {
      onItem(item) {
        this.$emit('callOnSlide', {arr: this.proData, item})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 100%;
    .swiper-pagination {
      bottom: 0;
    }
    .swiper-slide {
      font-size: 38px;
      width: 320px !important;
      img {
        height: 220px;
        width: 320px;
      }
    }
  }
</style>
