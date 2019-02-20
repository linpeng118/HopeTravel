<template>
  <div>
    <div class="header"
      v-if="!isApp">
      <van-nav-bar class="bar-shadow"
        title="取消和修改条例"
        @click-left="onClickLeft"
        left-arrow
        v-if="!isApp">
      </van-nav-bar>
    </div>
    <div class="advantage_wrap">
      <h2 class="fs-40 text-center">稀饭旅行取消和修改条例</h2>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p2">
          通常我们在收到您的全额团费后的2个工作日内，为您回复订单预订情况。订单一旦确认，取消或修改将会有费用产生。因部分产品具有特殊性，若产品详情页所列条例与此页面所列条例不一致，一律以产品详情页面信息为准。
        </p>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p1">
          一、取消条例
        </p>
        <p class="advantage_inner_p2">
          1.美国本土、阿拉斯加旅行团<br>
          出发日前30天或以上取消，退还总团费的90%；<br>
          出发日前15-29天取消，退还总团费的75%；<br>
          出发日前8-14天取消，退还总团费的50%；<br>
          出发日前7天内（含7天）取消，不退还任何费用。<br>
          2.夏威夷旅行团<br>
          出发日前15天或以上取消，收取两晚酒店罚金，其余团费全部退还；<br>
          出发日前8-14天取消，退还总团费的15%；<br>
          出发日前7天内（含7天）取消，不退还任何费用。<br>
          3.加拿大旅行团<br>
          a. 夏季行程取消条款请参照如下标准：<br>
          出发日前33天或以上取消，退还总团费的90%；<br>
          出发日前25-32天取消，退还总团费的70%；<br>
          出发日前18-24天取消，退还总团费的50%；<br>
          出发日前17天内（含17天）取消，不退还任何费用。<br>
          如果客人选择的升级酒店信息确认后，进行取消或修改，升级酒店费用将不作任何退款。<br>
          b. 其余时间段行程取消条款请参照如下标准：<br>
          出发日前33天或以上取消，退还总团费的80%；<br>
          出发日前25-32天取消，退还总团费的50%；<br>
          出发日前18-24天取消，退还总团费的25%；<br>
          出发日前17天内（含17天）取消，不退还任何费用。<br>
          4.邮轮旅行团（邮轮线路修改视同为取消）<br>
          出发日前80天或以上取消，退还全部团费；<br>
          出发日前57-79天取消，退还总团费的70%；<br>
          出发日前43-56天取消，退还总团费的50%；<br>
          出发日前22-42天取消，退还总团费的25%；<br>
          出发日前21天内（含21天）取消，不退还任何费用。<br>
          5.酒店取消<br>
          入住前7天内（含7天）取消，不退还任何费用；<br>
          入住前7天以上参照相对应地区行程取消条例。<br>
          6.门票、秀票、大巴票<br>
          门票、秀票、大巴票等票务产品订单一经确认，均不接受任何更改或取消。<br>
          7.已确认的行程，如果取消人数导致房间数减少，参照“取消”条例收取费用。<br>
        </p>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p1">
          二、修改条例
        </p>
        <p class="advantage_inner_p2">
          1.出发前7天以上信息修改，如：加订酒店、加订接送机服务、修改上车地点，出团日期等参团任何信息将收取修改费用，每次$30.00。<br>
          2.出发日前7天内（含7天）或行程开始后不接受任何信息修改（包括房型、旅游项目等）。
        </p>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p1">
          三、不可抗力导致的行程取消和修改：
        </p>
        <p class="advantage_inner_p2">
          1.旅行团的行程顺序可能会根据具体出团日期有所调整，但旅游景点的安排尽量会与计划保持一致。<br>
          2.为了保证您的旅途安全，在极少的特殊情况下，由于天气、交通、暴动和其它一些无法控制的原因，稀饭旅行网保留对行程更改、推迟和取消的权利。<br>
          3.由于设备及交通工具故障、罢工、疾病、失窃、走失、意外、事故、天气等不可抗力或其他您个人的原因造成您不能准时参团、行程改变、延迟或取消，稀饭旅行网将尽力协助您减少损失，但无法为您承担此部分费用。<br>
          4.购买旅游保险,是在因紧急医疗事故、签证申请失败、天气限制、航班取消或其他人为原因等取消或中断旅行时获得旅行费用补偿的可靠方式。我们强烈推荐您为旅行中可能出现的突发事故做好准备。<br>
          5.由于以上不可抗原因所导致行程延误或取消的额外费用，或者因此导致团员个人身体或生命有所损伤时由团员自行负责，本公司不做任何补偿，亦不承担任何法律责任。<br>
          6.稀饭旅行网不对任何由于您在旅行途中和第三方纠纷而引起的开销或损害负责，您不得因此而发表任何针对稀饭旅行网以及它的所有成员及附属机构的不实负面言论；<br>
          本公司保留此类事件追究相关人法律责任的权利。<br>
        </p>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p1">
          四、取消和修改的操作方式
        </p>
        <p class="advantage_inner_p2">
          取消或修改必须通过Email发送附有您亲笔签名的扫描或电子的申请表（点击下载：取消申请单/修改申请单）。<br>
          发送至EMAIL：service@tourscool.com<br>
          * 请在表单中完整填写以下内容：您的预订号码，预订人全名，电子邮件地址，出团日期，团的名称，信用卡或者其他方式交易时间（您预订产品的时间），交易金额，电话号码，简短阐述取消的原因。请注意处理取消和修改的时间是以收到您取消/修改申请表开始计算的。 ；<br>
        </p>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p1">
          5、退款说明：
        </p>
        <table border="0"
          cellpadding="0"
          cellspacing="0">
          <thead>
            <tr class="BeBold"
              style="background-color: #0478d5;color: white;">
              <td class="td1"
                width="20%">退款方式</td>
              <td class="td2"
                width="60%">退款所需资料</td>
              <td width="20%">退款到账时间</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>信用卡</td>
              <td>退至原支付账户</td>
              <td class="td3">15个工作日</td>
            </tr>
            <tr>
              <td>支票支付</td>
              <td>需和财务确认</td>
              <td class="td3"></td>
            </tr>
            <tr>
              <td>银行转账</td>
              <td>人姓名一致的姓名，开户银行银行账号，如退款账户名与原付款人不一致，需提供文字说明）</td>
              <td class="td3">15个工作日</td>
            </tr>
            <tr>
              <td>在线支付</td>
              <td>退至原支付账户（支付宝、微信等在线支付平台）</td>
              <td class="td3">15个工作日</td>
            </tr>
            <tr>
              <td>现金</td>
              <td>上门取款（提前与我们预约取款时间，凭原付款人有效身份证件及我司开据的收款收据至我司取款）/转账退款，（需邮寄收据至我司，并提供要求是与原付款人姓名一致的姓名，开户银行，银行账号）</td>
              <td class="td3">即时/5个工作日</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="advantage_inner borderDash">
        <p class="advantage_inner_p2">
          1.所有退还费用不计利息，退款货币与支付货币一致，人民币汇率按支付时汇率计算。<br>
          2.接到客人书面的退款申请核对无误后，财务将在5个工作日内为客人处理退款。<br>
          3.以上时间仅供参考，实际到账时间以银行处理进度为准。<br>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isApp: this.$route.query.platform,
      }
    },
    head() {
      return {
        title: '取消和修改条例'
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  /*开始*/
  .advantage_wrap {
    margin: 0 auto;
    padding-top: 0.79rem;
    padding-bottom: 1.5rem;
    overflow: hidden;
    width: 100%;
    max-width: 720px;
  }
  .advantage_inner {
    width: 90%;
    margin: 0 auto;
    padding: 0.3rem 0;
  }
  .advantage_inner_p1 {
    font-size: 0.28rem;
    color: #222222;
    line-height: 0.5rem;
    font-weight: bold;
  }
  .advantage_inner_p2 {
    font-size: 0.24rem;
    color: #666666;
    line-height: 0.42rem;
  }
  .borderDash {
    border-bottom: 1px dashed #f3f3f3;
  }
  .pay_fail_header {
    left: 50%;
    max-width: 720px;
    transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
  }
  html .footer_wrap_wrapper {
    left: 50%;
    max-width: 720px;
    transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
  }

  table {
    border-color: #666666;
    color: #666666;
    font-size: 0.24rem;
    border-right: 1px solid #666666;
    border-bottom: 1px solid #666666;
  }
  table thead td {
    padding: 0.1rem 0;
    text-align: center;
    border-top: 1px solid #666666;
    border-left: 1px solid #666666;
  }
  table tbody td {
    font-size: 0.22rem;
    text-align: center;
    padding: 0.05rem 0.1rem;
    border-top: 1px solid #666666;
    border-left: 1px solid #666666;
  }
  .advantage_inner_p3 {
    font-size: 0.24rem;
    margin: 0.1rem 0 0.2rem 0;
  }
  body .td1,
  body .td2 {
    width: 20%;
    text-align: center;
  }
  body .td4,
  body .td5 {
    width: 30%;
    text-align: center;
  }
  .td6 {
    text-align: center;
    line-height: 0.4rem;
  }
</style>