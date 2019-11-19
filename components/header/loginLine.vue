<template>
  <div class="login-conf">
    <div @click="loginUser" size="mini">默认按钮</div>
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
  position: fixed;
  top:88px;
  background: #1989fa;
  height: 60px;
  width: 100%;
  font-size: 24px;
  color: #fff;
  line-height: 60px;
  padding:0 32px;
}
</style>