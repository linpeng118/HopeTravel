<template>
  <div class="page">
    <div class="result-box">
      <img src="~/assets/imgs/net_error_no_data_img@2x.png" alt="">
      <h2>已经搜肠刮肚了，还是没有找到</h2>
      <h3>别紧张，您可以进行一下操作</h3>
      <nuxt-link to="/all/ya">返回</nuxt-link>
      <!-- <nuxt-link to="/">
        返回首页
      </nuxt-link>
      <div @click="$router.go(-1)" class="link">
        返回上一步
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  asyncData({route, redirect}){
    let reg=/(\/)*/
    let path = route.fullPath.replace(reg, '/')
    redirect(path)
  },
  created(){
    console.log(2112121221, this.$route.fullPath)
  }
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
