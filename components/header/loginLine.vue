<template>
  <div class="login-conf">
    <span>登录后享受更多优惠</span>
    <div @click="loginUser" class="btn">立即登录</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
   methods:{
      ...mapMutations({
        // 是否显示登录弹窗
        vxToggleLoginDlg: 'login/toggleDialog', 
      }),
      loginUser(){
        this.vxToggleLoginDlg(true)
      }
   }
}
</script>
<style lang="scss" scoped>
.login-conf{
  background: #C3E1FB;
  height: 88px;
  width: 100%;
  color: #399EF6;
  font-family:PingFang SC;
  line-height: 88px;
  padding:0 32px;
  font-size:32px;
  font-weight:300;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  .btn{
    margin-top: 12px;
    width:276px;
    height:64px;
    background:#399EF6;
    border-radius:16px;
    text-align: center;
    color: #fff;
    line-height: 64px;
    font-size:28px;
  }
}
</style>