<template>
  <section class="container">
    <h1 class="title">
      test1
    </h1>
    <div class="swiper-wrap">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1111</mt-swipe-item>
        <mt-swipe-item>2222</mt-swipe-item>
        <mt-swipe-item>3333</mt-swipe-item>
      </mt-swipe>
    </div>
  </section>
</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui';
  export default {
    components: {
      Swipe, SwipeItem
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }
  .swiper-wrap {
    width: 100%;
    height: 200px;
    background-color: red;
  }
  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
