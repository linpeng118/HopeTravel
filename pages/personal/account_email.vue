<template>
  <div class="card vue-avatar-cropper-demo text-center">
    <van-uploader :after-read="onRead">
      <van-icon name="photograph" />
    </van-uploader>
    <div v-if="imgShow" class="imgShow">
      <vue-cropper
        ref="cropper"
        :img="option.img"
      ></vue-cropper>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: '',
        imgShow: false,
        option: {

        }
      }
    },
    methods: {
      onRead(file) {
        console.log(file)
        this.imgShow = true
        this.option.img = file.content
      }
    }
  }
</script>

<style lang="scss" scoped>
  .imgShow{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
