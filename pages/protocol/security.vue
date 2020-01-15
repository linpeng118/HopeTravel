<template>
  <div class="security-page">
    <div class="security out-layer-con"
      v-html="$t('html.security')">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'security',
    head() {
      return {
        title: '高风险项目'
      }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .security-page {
    .out-layer-con {
      position: relative;
      border-top: 2px solid #d8d8d8;
    }
    .security {
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
