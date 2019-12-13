<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="$t('personalPage.feedback')"
        @click-left="onClickLeft"
        left-arrow
      >
      </van-nav-bar>
    </div>
    <div class="content-wrap">
      <textarea class="text-area" :placeholder="$t('personalPage.feedbackPlaceHold')" v-model="content"></textarea>
      <div class="btn-sure"><van-button block @click="submitContent">{{$t('submit')}}</van-button></div>
    </div>
  </div>
</template>

<script>
  import {submitContent} from '@/api/profile'
export default {
  name: 'submitContent',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    onClickLeft(){
      let href = window.location.href.slice(-1)
      if(href == '#'){
        this.$router.go(-2)
      } else {
        this.$router.go(-1)
      }
    },
    async submitContent() {
      console.log(this.content)
      let {code} = await submitContent()
      if(code === 0) {
        this.$dialog.alert({
          message: this.$t('operateSuc')
        }).then(() => {
          this.onClickLeft()
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .content-wrap{
    padding: 0 32px;
    .text-area{
      width: 100%;
      height:572px;
      padding: 10px;
      border:2px solid #D2D2D2;
      border-radius:12px;
      font-size:28px;
    }
  }
  .btn-sure{
    height: 140px;
    padding: 26px 78px;
    button{
      border-radius:8px;
      background-color: #399EF6;
      color: #fff;
    }
  }
</style>
