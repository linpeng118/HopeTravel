<template>
  <div class="card vue-avatar-cropper-demo text-center">
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="$t('personalPage.myAccount')"
        @click-left="onClickLeft"
        @click-right="saveProfile"
        left-arrow
      >
        <span class="header-btn" slot="right">{{$t('save')}}</span>
      </van-nav-bar>
    </div>
    <vue-cropper ref="cropper"
                 :img="img"
                 :info="true"
                 :full="option.full"
                 :can-move="option.canMove"
                 :can-move-box="option.canMoveBox"
                 :fixed-box="option.fixedBox"
                 :original="option.original"
                 :auto-crop="option.autoCrop"
                 :auto-crop-width="option.autoCropWidth"
                 :auto-crop-height="option.autoCropHeight"
                 :center-box="option.centerBox"
    ></vue-cropper>
    <div></div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      img: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        imgShow: false,
        option: {
          full: true,
          canMove: true,
          fixedBox: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 210,
          autoCropHeight: 210,
          centerBox: false,
          high: true
        },
        previews: {},
      }
    },
    methods: {
      onClickLeft() {
        this.$emit('closeNameLayer')
      },
      startCrop() {
        this.$refs.cropper.getCropBlob((data) => {
          // console.log(data)
          let fmData = new FormData()
          fmData.append('uploadFile', data, 'avatar.jpg')
          fmData.append('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2IiwiZ2lkIjoiMSIsImV4cCI6MTU0OTMzMDUwM30.lXnR3iGDgZ8ziaxw0sBX9_wF4xdD6d1ULLMe4Xaf6ko')

          axios({
            url:'http://assets.tourscool.com/upload.php',
            method: 'post',
            data: fmData
          }).then(res => {
            // console.log(res)
          })
        })

      },
      realTime(data) {
        this.previews = data
        // console.log(this.previews)
      },
      saveProfile(){}
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
      width: 10%;
      height: 10%;
    }
    .vue-cropper{
      background-image: none;
    }
  }
</style>
