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
    },
    controlJump:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickLeft() {
      if(this.controlJump) {
        this.$emit('leftJump')
      } else {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>
