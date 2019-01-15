<template>
  <div class="result-wrap">
    <lay-header :title="title" :classBg="true"></lay-header>
    <div class="result-main">
      <van-icon :name="status.name" :color="status.color" size="2rem" />
      <h2>{{describe}}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
export default {
  components: {
    LayHeader
  },
  props: {
    title: { // 显示的title
      type: String,
      default: ''
    },
    status: {
      type: Object,
      default: null
    },
    describe: {
      type: String,
      default: ''
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>
  .result-wrap{
    position: fixed;
    top:88px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .result-main{
      width: 464px;
      margin: 0 auto;
      padding-top:180px;
      text-align: center;
      h2{
        font-size:40px;
        font-weight:400;
        color:#3E3E3E;
      }
    }
  }
</style>
