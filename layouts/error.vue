<template>
  <div class="page">
    <div v-if="error.statusCode === 404" class="result-box">
<<<<<<< HEAD
      <img src="../assets/imgs/net_error_no_data_img@2x.png" alt="">
=======
      <img src="~/assets/imgs/net_error_no_data_img@2x.png" alt="">
>>>>>>> 修改baseURL
      <h2>已经搜肠刮肚了了，还是没有找到</h2>
      <h3>别紧张，您可以进行一下操作</h3>
      <nuxt-link to="/">
        返回首页
      </nuxt-link>
      <div @click="$router.go(-1)" class="link">
        返回上一步
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .page {
    background-color: #F5F4F9;
    min-height: 100vh;
    text-align: center;
    color: #9B9B9B;
    h2{
      font-size:32px;
      line-height: 60px;
    }
    h3{
      font-size:24px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    a,.link{
      font-size:24px;
      color: #399EF6;
      line-height: 50px;
    }
    .result-box{
      padding-top: 200px;
      img{
        width: 200px;
        margin-bottom: 10px;
      }
    }
  }
</style>
