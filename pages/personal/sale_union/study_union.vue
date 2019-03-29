<template>
  <div class="page-container">
    <header-bar title="稀饭小哥哥"></header-bar>
    <div style="padding-top: 46px;" class="bg-gradient">
      <div class="top-slg-b">
        <div class="share-code">
          <h2 class="title">稀饭小哥哥</h2>
          <div>
            <img src="../../../assets/imgs/xifantours_code.jpg" alt="">
          </div>
          <p style="color: #FEC049">xifantours</p>
          <div class="copy-btn"
               v-clipboard:copy="'xifantours'"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError"
          >复制</div>
          <p style="color: #9B9B9B">微信添加验证：联盟</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
export default {
  name: 'study_union',
  components: {
    HeaderBar
  },
  methods: {
    onCopy(e) {
      this.$toast("复制成功")
    },
    // 复制失败
    onError(e) {
      this.$toast("复制失败")
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background:linear-gradient(180deg,rgba(255,186,52,1) 0%,rgba(246,140,1,1) 100%);
    min-height: 100vh;
  }
  .bg-gradient{
    .top-slg-b{
      background: url("../../../assets/imgs/union/study_bg.png") no-repeat;
      background-size: 100%;
      padding-top: 330px;
    }
    .share-code{
      background: #fff;
      margin: 0 45px;
      padding-bottom: 30px;
      border-radius:12px;
      text-align: center;
      overflow: hidden;
      font-size: 24px;
      .title{
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #E1E1E1;
        font-size: 32px;
      }
      img {
        width: 240px;
        margin-top: 20px;
      }
      .copy-btn{
        width:464px;
        height:80px;
        background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
        box-shadow:0px 6px 12px rgba(0,43,100,0.16);
        border-radius:12px;
        margin: 20px auto;
        text-align: center;
        color: #fff;
        line-height: 80px;
        font-size:32px;
        &:active{
          opacity: 0.8;
        }
      }
    }
  }
</style>
