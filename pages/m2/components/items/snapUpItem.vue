<template>
  <div class="snap-up-item">
    <div class="banner">
      <img :src="proData.src"
        alt="banner">
      <div class="time-wrap"
        v-if="isShowTime">
        <div class="text">
          抢购中
        </div>
        <span class="time">
          <span>0</span>
          <span>0</span>
          <span class="colon">:</span>
          <span>2</span>
          <span>3</span>
          <span class="colon">:</span>
          <span>5</span>
          <span>6</span>
        </span>
        <div class="collect" @click="OnCollect(proData)">
          <img v-if="isCollect"
            src="../../../../assets/image/star_active@2x.png"
            alt="">
          <img v-else
            src="../../../../assets/image/star@2x.png"
            alt="">
        </div>
      </div>
      <div class="title"
        v-if="isShowTitle">
        {{proData.title}}
      </div>
    </div>
    <div class="desc">
      <div class="tags-wrap"
        :class="tagPos">
        <div class="tag"
          :class="`tag${item}`"
          v-for="item in proData.type"
          :key="item">
          <span v-if="item===1">自营</span>
          <span v-if="item===2">精选</span>
        </div>
      </div>
      <span>{{proData.desc}}</span>
    </div>
    <div class="price-wrap">
      <span class="price">${{proData.price}}</span>
      <span class="unit">/起&emsp;</span>
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
      isShowTime: {
        type: Boolean,
        default: true,
      },
      isShowTitle: {
        type: Boolean,
        default: false,
      },
      isCollect: {
        type: Boolean,
        default: false,
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
    methods: {
      OnCollect(val) {
        this.$emit('callCollect', val)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .snap-up-item {
    // width: 100%;
    width: 686px;
    height: 554px;
    .banner {
      position: relative;
      height: 368px;
      img {
        width: 100%;
        height: 368px;
      }
      .title {
        position: absolute;
        bottom: 0;
        padding: 0 10px;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background: rgba(0, 0, 0, 0.6);
        color: #f1f1f1;
        font-size: 20px;
        border-radius: 0 0 6px 6px;
      }
      .time-wrap {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .text {
          flex: 0 0 96px;
          width: 96px;
          height: 48px;
          line-height: 48px;
          font-size: 24px;
          color: rgba(255, 255, 255, 1);
          background: #ff0000;
          text-align: center;
          border-radius: 6px 0 0 0;
        }
        .time {
          flex: 1;
          font-size: 0;
          margin-top: 6px;
          span:not(.colon) {
            display: inline-block;
            color: rgba(255, 255, 255, 1);
            background: rgba(0, 0, 0, 0.6);
            width: 28px;
            height: 40px;
            line-height: 40px;
            font-size: 26px;
            text-align: center;
            font-size: 24px;
            border-radius: 6px;
          }
          .colon {
            padding: 0 5px;
            color: rgba(255, 255, 255, 1);
            font-size: 24px;
          }
        }
        .collect {
          flex: 0 0 60px;
          padding: 10px;
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    .desc {
      margin-top: 10px;
      font-size: 32px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .tags-wrap {
        display: inline-block;
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
    }
    .price-wrap {
      margin-top: 12px;
      font-size: 0;
      .price {
        font-size: 50px;
        color: #ff0000;
      }
      .unit {
        font-size: 24px;
        color: #ff0000;
      }
      .ori-price {
        font-size: 24px;
        color: #9a9a9a;
        text-decoration: line-through;
      }
    }
  }
</style>