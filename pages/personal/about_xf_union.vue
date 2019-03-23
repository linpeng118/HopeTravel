<template>
  <div class="union-page-container">
    <header-bar title="稀饭联盟说明"></header-bar>
    <div style="padding-top: 46px">
      <div class="text-box">
        <h2 class="title">1.什么是稀饭联盟？</h2>
        <p>旧金山（San Francisco），又译“三藩市”、“圣弗朗西斯科”，美
          国加利福尼亚州太平洋沿岸的港口城市，
          是世界著名旅游胜地加州人口第四大城市 [1-3]  。旧金山临近世
          界著名高新技术产业区硅谷，是世界最重要的高新技术研发基地
          和美国西部最重要的</p>
        <h2 class="title">2.我什么要加入稀饭联盟？</h2>
        <p>旧金山（San Francisco），又译“三藩市”、“圣弗朗西斯科”，美
          国加利福尼亚州太平洋沿岸的港口城市，
          是世界著名旅游胜地加州人口第四大城市 [1-3]  。旧金山临近世
          界著名高新技术产业区硅谷，是世界最重要的高新技术研发基地
          和美国西部最重要的</p>
        <h2 class="title">3.案例</h2>
        <p>旧金山（San Francisco），又译“三藩市”、“圣弗朗西斯科”，美
          国加利福尼亚州太平洋沿岸的港口城市，
          是世界著名旅游胜地加州人口第四大城市 [1-3]  。旧金山临近世
          界著名高新技术产业区硅谷，是世界最重要的高新技术研发基地
          和美国西部最重要的</p>
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

<style type="text/scss" lang="scss" scoped>
  .text-box{
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
    p{
      line-height: 40px;
      margin-bottom: 30px;
    }
  }
</style>
