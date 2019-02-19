<template>
  <div>
    <div class="header" v-if="!isApp">
      <van-nav-bar
        class="bar-shadow"
        title="关于我们"
        @click-left="onClickLeft"
        left-arrow
      >
      </van-nav-bar>
    </div>
    <div class="weituo out-layer-con">
      <h2 class="title" v-if="isApp">关于我们</h2>
      <p><strong>公司简介</strong></p>
      <p class="border">稀饭旅行，为中美创世旗下旅游品牌。中国总部位于成都，美国总部位于休斯顿，是一家领先行业的在线目的地旅行预定网站。服务范围覆盖美洲、欧洲、澳州、亚洲等全球六大洲的300多个目的地，与全球各大洲上百个国家和地区的境外接待机构及产品供应商建立了合作关系，并在北京、东京、洛杉矶、纽约等多地设立分公司以及办事处，已成功服务累计超过10万人次出游。夯实的项目经验，广泛的资源开发渠道，雄厚的资金实力，为用户的旅程提供更完善、更丰富、更专业的出行帮助。</p>
      <p><strong>我们的态度</strong></p>
      <p>稀饭旅行，取自谐音「喜欢旅行」</p>

      <p>意在陪伴喜欢旅行的人</p>

      <p>走遍世界每个角落</p>

      <p>有你，热爱万般色彩的灵魂</p>

      <p>有我，专业贴心的旅行伴侣</p>

      <p>游世界，去享受星辰大海的美妙</p>

      <p class="border">更舒心的出境游，从稀饭旅行开始</p>
      <p><strong>稀饭成长</strong></p>
      <p><strong>2016年</strong></p>
      <p>8月·与中国国航、东方航空、美联航、卡塔尔航空、泰国皇家航空等各境内外航空公司达成紧密合作，长期拥有固定机位；</p>
      <p>11月·覆盖全球旅行线路1000+条；</p>
      <p><strong>2017年</strong></p>
      <p>1月·稀饭旅行创立于中国成都，为中国区总部；</p>
      <p>4月·公司品牌升级，成立日本东京分公司；</p>
      <p>5月·全球线路覆盖至非洲、南美等目的地；</p>
      <p>6月·针对个性化出游，提供境外自驾游服务，并与境外多家优质租车企业达成长期合作；</p>
      <p>9月·推出高端私人定制旅程服务；</p>
      <p><strong>2018年</strong></p>
      <p>1月·稀饭旅行创立高端度假屋营运品牌禾陶屋，度假别墅超过200栋；</p>
      <p>4月·旗下度假屋品牌禾陶屋布局全国业务，境内范围覆盖成都、北京、三亚等多地热门城市；</p>
      <p>5月·公司荣获成都旅游协会副会长单位；</p>
      <p>6月·稀饭旅行在美国休斯顿设立美国总部；</p>
      <p>7月·稀饭旅行在美国纽约、洛杉矶分别设立境外办事处；</p>
      <p class="border">8月·稀饭旅行全新版本网站上线；</p>
      <p><strong>核心竞争力</strong></p>
      <p><strong>品质保障：</strong>覆盖全球1000+精品旅游线路，费用100%透明无隐藏消费。</p>

      <p><strong>安全保障：</strong>全网SSL加密，支付无忧。数据信息多层保护，账户安全更放心。</p>

      <p><strong>高额保险：</strong>高额境外旅行保险，保障安全出行安心。</p>

      <p><strong>24小时客服：</strong>7*24小时全天候在线中、英文双语客服，365天无休零时差贴心服务。</p>

      <p class="border"><strong>专业团队：</strong>跨国团队协作，于中国、美国、日本内多城设立分公司以及办事处。高学历海归团队拥有丰富境外游经验，追求极致的旅行服务。</p>
      <p><strong>稀饭业务</strong></p>
      <p><strong>目的地跟团</strong></p>
      <p>稀饭旅行与当地最优质的华人地接社等紧密合作，中英双语服务，所有目的地旅行线路都经专业人士甄选测评, 提供目的地城市的半日游、一日游、多日游等丰富的高性价比旅游产品，是省心舒适出境游的不二选择。</p>

      <p><strong>精品小团</strong></p>
      <p>稀饭旅行旗下专业旅行策划师精心设计小团路线，给用户更加特色的行程体验，舒适出行的同时保证高性价比。精品小团，以一单一团、一团一导为标配服务核心，配备高级商务专车，为您提供7*24小时管家式的客服服务、免费接送机服务等，让您的出行更加安心。</p>
      <p><strong>目的地玩乐</strong></p>
      <p>稀饭旅行和当地旅行产品供应商深入合作，提供精选目的地不可错过的景点门票、演出秀票、商场购物、户外探险、主题公园等优质玩乐项目，给你最特色的当地体验。</p>
      <p><strong>自由行</strong></p>
      <p>用户可自由组合机票+酒店+门票等项目，随心任意搭配做主行程。稀饭旅行为您提供旅行签证、酒店、机票、游轮等在线预订服务，实时低价保障，开启您性价比最优的自由之旅。</p>
      <p><strong>私人定制</strong></p>
      <p>一对一资深定制师细心策划，私人定制行程自由随心，分项透明报价，自由选择消费。多样旅行主题，弹性自由的旅行节奏，体验风景俱佳的景色，纵享舌尖上的美味，7*24小时管家式的服务，配备中英文导游，让您出行无忧。</p>
      <p><strong>度假之旅</strong></p>
      <p>禾陶屋是稀饭旅行旗下综合性高端度假屋营运品牌，境内覆盖成都、三亚、杭州等多地热门城市，境外度假屋业务也在积极筹建之中。为您提供商务聚会、家庭出游、亲子娱乐、团建会议、养生度假等多元选择服务。全程入住指引，7*24小时管家服务，当地景区玩乐，品尝当地美食，特色温泉体验等。在YOU成都最美民宿评选活动中，禾陶屋荣登第一名。</p>
      <p><strong>自驾出游</strong></p>
      <p class="border">稀饭旅行金牌自驾游定制师专业打造精选路线，给您独特的境外落地自驾旅行体验。7*24小时管家式服务，让您出行无忧。免去繁琐手续，配备专业的国际自驾向导，提供高额旅游意外险，完全区别于传统旅行，给您更深层次的自由追逐。</p>
      <p><strong>联系稀饭</strong></p>
      <p>服务热线 7*24全天候客服</p>
      <p>中国服务热线：400-118-1388</p>
      <p>美国服务热线：888-933-0336</p>
      <p>日本服务热线：+813-5545-5311</p>
      <p><strong>在线洽谈</strong></p>

      <p>客服服务：service@tourscool.com</p>
      <p>市场合作：marketing@tourscool.com</p>
      <p>产品合作：provider@tourscool.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'weituo',
  head() {
    return {
      title: '关于我们'
    }
  },
  data() {
    return {
      isApp: this.$route.query.platform,
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
  .header{
    border-bottom:2px solid #DEDEDE;
  }
  .out-layer-con{
    position: relative;
  }
  .weituo{
    font-size: 28px;
    line-height: 44px;
    padding: 32px;
    h2.title{
      text-align: center;
      font-size: 34px;
      padding: 20px 0;
    }
    .p-left-20{
      padding-left: 60px;
    }
    p{
      margin: 10px 0;
      img{
        width: 100%;
      }
      &.border{
        border-bottom: 1px solid #DEDEDE;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
    }
    .txt-index{
      text-indent: 30px;
    }
  }
</style>
