<template>
  <van-nav-bar class="login-header tours-no-bb"
    ref="loginHeader"
    :title="title"
    :z-index="999"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
    <van-icon class="right-wrap"
      slot="right">
      <div class="search">
        <div class="text">{{rightText}}</div>
      </div>
    </van-icon>
  </van-nav-bar>
</template>

<script>
  export default {
    components: {
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      },
      barSearch: {
        type: Boolean,
        default: false
      },
      redirect: {
        type: Boolean,
        default: false
      }
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
        if(this.redirect) {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
        // this.$emit('clickLeft')
      },
      onClickRight() {
        this.$emit('callOnRight')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #eee;
    background-color: transparent;
    transition: all 0.5s;
    .left-wrap {
      color: #404040;
      font-size: 32px;
    }
    .right-wrap {
      .search {
        width: 88px;
        height: 32px;
        background: rgba(75, 177, 245, 1);
        border-radius: 16px;
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
    }
  }
</style>
