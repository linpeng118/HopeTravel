<template>
  <van-nav-bar class="login-header tours-no-bb"
    ref="loginHeader"
    :fixed="fixed"
    :class="{'transparent': transparent}"
    :title="title"
    :z-index="999"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
  </van-nav-bar>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      transparent: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isFixed: true,
      }
    },
    computed: {
    },
    methods: {
      onClickLeft() {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      onClickRight() {
        this.$emit('callOnRigth')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-header {
    height: 88px;
    font-size: 32px;
    transition: all 0.5s;
    background-color: #fff;
    .left-wrap {
      /*color: #404040;*/
      /*font-size: 32px;*/
      /*padding: 16px;*/
    }
    &.transparent {
      background-color: transparent;
      color: #fff;
      .left-wrap {
        color: #fff !important;
        /*font-size: 32px;*/
      }
    }
  }
</style>
