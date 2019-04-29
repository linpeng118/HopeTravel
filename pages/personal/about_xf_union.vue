<template>
  <div class="union-page-container">
    <header-bar :title="$t('personalPage.unionInstructions')"></header-bar>
    <div style="padding-top: 46px">
      <div class="about-xf-union">
        <div v-html="$t('html.aboutXFUnion')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
export default {
  name: 'about_xf_union',
  components: {HeaderBar},
}
</script>

<style type="text/scss" lang="scss">
  .about-xf-union{
    margin: 20px 15px;
    background-color: #fff;
    border-radius:12px;
    box-shadow:0px 4px 4px rgba(217,217,217,0.14);
    color: #9B9B9B;
    padding: 20px;
    font-size:24px;
    h2.title{
      font-size:32px;
      color: #3C3C3C;
      margin: 10px 0;
    }
    h3.title{
      font-size:28px;
      color: #3C3C3C;
    }
    p{
      line-height: 40px;
      margin-bottom: 20px;
    }
  }
</style>
