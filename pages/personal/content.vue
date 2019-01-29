<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        title="意见反馈"
        @click-left="onClickLeft"
        left-arrow
      >
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitContent',
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>
