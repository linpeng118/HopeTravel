<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
    fixed
    :zIndex="100"
  />
</template>

<script>
export default {
  name: 'sale_union',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>
