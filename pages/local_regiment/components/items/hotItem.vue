<template>
  <div class="hot-item">
    <img class="img"
      :src="proData.src"
      alt="hot-img">
    <p class="desc">{{proData.desc}}</p>
    <div class="price-wrap">
      <span class="price">${{proData.price}}</span>
      <span class="ori-price">${{proData.price}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      proData: {
        type: Object,
        require: true,
        default: () => ({
          src: '',
          desc: ''
        })
      }
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .hot-item {
    width: 332px;
    height: 100%;
    .img {
      width: 332px;
      height: 240px;
    }
    .desc {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price-wrap {
      .price {
        color: #ff0000;
      }
      .ori-price {
        font-size: 12px;
        color: #9a9a9a;
        text-decoration: line-through;
      }
    }
  }
</style>