<template>
  <div class="hot-place">
    <div class="hot-item" v-for="image in lists.image" :key="image.keyword">
      <a class="img-box" :href="image.link">
        <img :src="image.image" alt="" />
        <div class="top-text">
          <p class="title">{{image.title}}</p>
          <p>{{image.keyword}}</p>
        </div>                      
      </a>
    </div>
    <div class="hot-item" v-for="text in lists.text" :key="text.keyword">
      <a class="text-box" :href="text.link">
        <p>{{text.title}}</p>
        <p class="gray">{{text.keyword}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "hot_place",
  props: {
    lists: {
      type: Object,
      default: null
    },
    isDesc: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.hot-place {
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0px 2px 12px rgba(57, 57, 57, 0.15);
  padding: 28px;
  border-radius: 20px;
  font-size: 24px;
  flex-wrap: wrap;
  .hot-item {
    width: 194px;
    .img-box {
      font-size: 20px;
      color: #fff;
      position: relative;
      display: block;
      &::before{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom:0;
        background-color: rgba(0,0,0,0.1);
        // content: '';
      }
    }
    .top-text {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    .title {
      font-size: 28px;
      margin-bottom: 20px;
    }
    img {
      width: 100%;
      height: 160px;
      background: #999;
      display: block;
      border-radius: 8px;
    }
    .text-box {
      margin-top: 20px;
      line-height: 34px;
      display: block;
      color: #2D2D2D;
      .gray {
        color: #aeaeae;
      }
    }
  }
}
</style>
