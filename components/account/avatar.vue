<template>
  <div class="card vue-avatar-cropper-demo text-center">
    <div class="header">
      <van-nav-bar class="bar-shadow"
        :title="$t('accountComp.avatarTitle')"
        @click-left="onClickLeft"
        @click-right="saveProfile"
        left-arrow>
        <span class="header-btn"
          slot="right">{{$t('save')}}</span>
      </van-nav-bar>
    </div>
    <div class="imgShow">
      <vue-cropper ref="cropper"
        :img="avatar"
        :info="true"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"></vue-cropper>
    </div>
    <div></div>
  </div>
</template>

<script>
  import {saveProfile} from '@/api/member'
  import {getCookieByKey} from '@/assets/js/utils'
  import {
    TOKEN,
  } from '@/assets/js/config'
  import axios from 'axios'

  export default {
    props: {
      avatar: {
        type: String,
        default: ''
      },
      nickname: {
        type: String,
        default: 'avatar'
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
      saveProfile() {
        this.$refs.cropper.getCropBlob((image) => {
          let fmData = new FormData()
          fmData.append('uploadFile', image, this.nickname + Math.random() + 'avatar.jpg')
          // fmData.append('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2IiwiZ2lkIjoiMSIsImV4cCI6MTU0OTMzMDUwM30.lXnR3iGDgZ8ziaxw0sBX9_wF4xdD6d1ULLMe4Xaf6ko')
          axios({
            url: `https://assets.tourscool.com/upload.php?t=${+new Date()}`,
            method: 'post',
            data: fmData,
            headers: {
              'Authorization': getCookieByKey(TOKEN) || ''
            }
          }).then(({data}) => {
            if (data.code === 0) {
              this.$emit('uploadAvatar', data.data.url)
            }
          })

        })

      },
      realTime(data) {
        this.previews = data
        console.log(this.previews)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .imgShow {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      width: 10%;
      height: 10%;
    }
    .vue-cropper {
      background-image: none;
    }
  }
  .header-btn {
    color: #fff;
    width: 92px;
    height: 36px;
    background: rgba(57, 158, 246, 1);
    border-radius: 18px;
    font-size: 22px;
    padding: 2px 20px;
  }
</style>
