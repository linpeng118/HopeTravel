<template>
  <div class="hot-item">
    <div class="hot-banner">
      <img :src="proData.src"
        alt="hot-img">
      <div class="hot-tags"
        :class="tagPos">
        <div class="tag"
          :class="`tag${item}`"
          v-for="item in proData.type"
          :key="item">
          <span v-if="item===1">自营</span>
          <span v-if="item===2">精选</span>
        </div>
      </div>
      <p class="title"
        v-if="isShowTitle">{{proData.title}}</p>
    </div>
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
          type: [],
          src: '',
          desc: ''
        })
      },
      isShowTitle: {
        type: Boolean,
        default: true,
      },
      tagPos: {
        type: String,
        default: 'top'
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
    .hot-banner {
      position: relative;
      height: 240px;
      img {
        width: 332px;
        height: 240px;
      }
      .hot-tags {
        position: absolute;
        left: 5px;
        &.top {
          top: 0px;
        }
        &.bottom {
          bottom: 0px;
        }
        .tag {
          display: inline-block;
          width: 60px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          border-radius: 6px;
        }
        .tag1 {
          background: #ef9a1a;
        }
        .tag2 {
          background: #fe423f;
        }
      }
      .title {
        position: absolute;
        bottom: 0;
        padding: 0 10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: rgba(0, 0, 0, 0.6);
        color: #f1f1f1;
        font-size: 10px;
      }
    }
    .desc {
      margin-top: 10px;
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