<template>
  <section class="container">
    <h1 class="title">
      version 1.0
    </h1>
    <van-icon name="close" />
    <!-- 左对齐 -->
    <van-row type="flex">
      <van-col span="6">span: 6</van-col>
      <van-col span="6">span: 6</van-col>
      <van-col span="6">span: 6</van-col>
    </van-row>
    <!-- 居中 -->
    <van-row type="flex"
      justify="center">
      <van-col span="6">span: 6</van-col>
      <van-col span="6">span: 6</van-col>
      <van-col span="6">span: 6</van-col>
    </van-row>
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {

      }
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
  }
</style>
