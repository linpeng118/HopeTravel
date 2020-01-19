<template>
  <div class="privacy-page">
    <div class="weituo out-layer-con"
         v-html="$t('html.uploadUser')"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload_user',
  head() {
    return {
      title: '用户上传协议'
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>
  .privacy-page {
    .out-layer-con {
      position: relative;
      border-top: 2px solid #d8d8d8;
    }
    .weituo {
      font-size: 28px;
      line-height: 34px;
      padding: 32px;
      h2.title {
        text-align: center;
        font-size: 34px;
        padding: 20px 0;
      }
      .p-left-20 {
        padding-left: 60px;
      }
      p {
        margin: 10px 0;
        img {
          width: 100%;
        }
      }
      .txt-index {
        text-indent: 30px;
      }
    }
  }
</style>
