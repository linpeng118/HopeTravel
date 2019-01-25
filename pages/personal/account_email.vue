<template>
    <div>
        <van-nav-bar title="验证邮箱号码" left-arrow @click-left="onClickLeft"/>
        <van-field
            v-model="email"
            placeholder="请输入邮箱地址"
        ></van-field>
        <van-field
            v-model="email"
            placeholder="请输入邮箱验证码"
        >
            <van-button class="btn" slot="button" size="small" type="primary">获取邮箱验证码</van-button>
        </van-field>

        <div class="btn_container">
            <button class="sure">验证</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
        email:"",//邮箱地址
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
   

  }
}
</script>
<style lang="scss" scoped>
    .btn{
        border-radius:8px;
    }
    .btn_container {
        margin-top:50px;
    text-align: center;
    .sure {
        width: 596px;
        height: 84px;
        background: rgba(57, 158, 246, 1);
        opacity: 1;
        border-radius: 10px;
        color:#fff;
        font:36px/84px "";
    }
    }
</style>