<template>
  <van-nav-bar class="date-trap-header tours-no-bb"
               ref="loginHeader"
               :title="title"
               :z-index="999"
               @click-left="onClickLeft"
              >
    <van-icon class="left-wrap"
              name="arrow-left"
              slot="left" />
    <van-icon class="right-wrap"
              slot="right">
      <div class="search">
        <div class="text"></div>
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
      barSearch: {
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
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .date-trap-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom:1px solid rgb(238, 238, 238);
    transition: all 0.5s;
    .left-wrap {
      /*color: #404040;*/
      /*font-size: 32px;*/
      /*padding: 16px;*/
    }
    .right-wrap {
      .search {
        height: 32px;
        color: #399EF6;
        text-align: center;
        font-size: 24px;
      }
    }
  }
</style>
