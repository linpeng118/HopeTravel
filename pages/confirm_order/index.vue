<template>
  <section class="section0">
    <!--页头信息-->
    <section>
      <div class="confirm-title">
        <p>{{product.name}}</p>
        <p v-html="settitletip()"></p>
      </div>
    </section>
    <!--接送服务-->
    <section>
      <div class="confirm-item">
        <p class="item-title">接送时间和地点</p>
        <p class="item-con">
          <span>13:30 PMLas Vegas International Airport(拉斯维加斯国际机场LAS), 5757 Wayne Newton Blvd, Las Vegas, NV 89119</span>
          <span>
            $23212.20/人
          </span>
          <van-icon color="#404040" name="arrow" size="1.2em" />
        </p>

      </div>
    </section>
    <!--行程选择-->
    <section>
      <div class="confirm-item">
        <p class="item-title">行程选项</p>
        <p class="item-tip">1日游-大峡谷南峡豪华巴士团 午餐和直升机观光升级套餐峡谷南峡豪华巴士团 午餐和直升机观光升级套餐</p>
        <p class="item-con">
          <span>13:30 PMLas Vegas International Airport(拉斯维加斯国际机场LAS), 5757 Wayne Newton Blvd, Las Vegas, NV 89119</span>
          <span>
            $23212.20/人
          </span>
          <van-icon color="#404040" name="arrow" size="1.2em" />
        </p>
        <p class="item-tip">行程三选一</p>
        <p class="item-con">
          <span>13:30 PMLas Vegas International Airport(拉斯维加斯国际机场LAS), 5757 Wayne Newton Blvd, Las Vegas, NV 89119</span>
          <span>
            $23212.20/人
          </span>
          <van-icon color="#404040" name="arrow" size="1.2em" />
        </p>
      </div>
    </section>
    <!--游客信息-->
    <section>
      <div class="confirm-item">
        <p class="item-title">游客信息
        <span>务必确认填写信息与出游证件一致</span></p>
        <ul>
          <li class="user-item">
            <span>出行人1<i>张三</i></span>
            <span><i><van-icon name="edit" /></i></span>
          </li>
        </ul>
        <div class="btnbox">
          <button class="changeuser-btn">
            选择出行人
          </button>
        </div>
      </div>
    </section>
    <!--联系人信息-->
    <section>
      <div class="confirm-item">
        <p class="item-title">联系人信息</p>
        <van-field
          label="联系人"
          placeholder="填写联系人姓名"
        />
        <div data-v-0ea3802e="" class="van-cell van-field">
          <div class="van-cell__title">
            <span>手机号码</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body">
            <i class="setvan">+86<van-icon name="arrow" /></i>
            <input type="text" placeholder="必填，用于接收信息" class="van-field__control">
            </div>
          </div>
        </div>
        <van-field
          label="邮箱"
          placeholder="必填，用于接收电子客票"
        />
      </div>
    </section>
    <!--优惠信息-->
    <section>
      <div class="confirm-item">
        <p class="item-title">优惠信息</p>
        <p class="item-con">
         <span>
           <i class="seti">米粒</i>
           <i class="seti" style="color: #bbb">共有米粒574，本次可用500米粒抵用$5</i>
         </span>
           <van-switch
             v-model="checked"
             style="float: right"
             size="2em"
           />
        </p>
      </div>
    </section>
    <!--预定留言-->
    <section>
      <div class="confirm-item">
        <p class="item-title">预定留言</p>
        <p class="item-con">
          <van-field
            type="textarea"
            placeholder="选填，你可备注预定相关要求"
            rows="2"
            autosize
          />
        </p>
      </div>
    </section>
    <!--同意用户协议-->
    <section>
      <div class="confirm-item">
        <p class="item-con">
          <van-checkbox v-model="checked">我已阅读并接受<a style="color: #216BFF">《稀饭旅行用户服务条款》</a></van-checkbox>
        </p>
      </div>
    </section>
    <!--foot-->
    <section>
      <confirm-foot></confirm-foot>
    </section>
  </section>

</template>

<script>

  import ConfirmFoot from '@/components/confirm_foot/foot.vue'

  export default {
    components: {
     ConfirmFoot
    },

    data() {
      return {
        countprice:{},//vuex里面的价格计算参数
        checked:true,

      }
    },
    computed:{
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
      //产品
      product(){
        return {
          "product_id":141,
          "default_price":"$238",
          "code":"US119",
          "product_entity_type":1,
          "product_type":1,
          "max_num_guest":4,
          "min_num_guest":9,
          "max_child_age":2,
          "sales":3,
          "self_support":1,
          "name":"(5天)【华盛顿出发美东豪华游】<纽约+费城+康宁玻璃中心+华盛顿特区+尼亚加拉大瀑布+波士顿>",
          "small_description":"★ 畅游名城：纽约，费城，华盛顿，尼加拉瓜大瀑布，波士顿。 ★ 震撼体验：多种角度欣赏尼亚加拉瀑布的风采，体验视觉与听觉的双震撼； ★ 独特文化：虽一眼看完的景物，却可以让人深深感受到背后的历史渊源，费城独立厅带你感受人们对民主和自由的向往； ★ 特色风味：波士顿当地龙虾卷+特制面包里的新英格兰蛤蜊巧达浓汤； ",
          "icons_show":[
            "限时",
            "满减"
          ],
          "icons_tour":[
            {
              "title":"买二送一",
              "content":"是指三人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title":"买二送二",
              "content":"是指四人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title":"畅销行程",
              "content":""
            },
            {
              "title":"低价保证",
              "content":""
            },
            {
              "title":"即时确认",
              "content":"该产品下单即可确认出行"
            }
          ],
          "images":[
            "http://www.24.tourscool.net/images/product/5b6176857cfd5_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5b6176857d077_600_338.png",
            "http://www.24.tourscool.net/images/product/5b6176857d228_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5b6176857d2a7_600_338.jpg"
          ],
          "departure_city":"华盛顿",
          "end_city":"纽约",
          "special_price":"",
          "feature_images":[
            "http://www.24.tourscool.net/images/product/5ba9aede9f341_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5ba9aede9ed93_600_338.jpg"
          ],
          "is_kids":true,
          "is_single_pu":true,
          "is_favorite":false,
          "duration_days":5
        }
      }
    },
    watch:{
      get_vuex_countprice(val){
        console.log('本地数据更新1次')
        this.countprice=val;
      },
    },
    mounted() {
      //获得价格日历数据
      this.getpricedate(this.product.product_id);
      //

    },

    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        // let {data, code} = await getdateTrip(id)
        // if(code === 0) {
        //   // this.pricedate = data;
        //   console.log(this.pricedate)
        // } else {
        //   // this.pricedate = []
        // }
      },
      //设置页头数据
      settitletip(){
        let date=new Date(this.countprice.departure_date).getTime();
        let date1=this.timeFormat(date);

        if(this.product.product_entity_type==1&&this.product.self_support==0){
          return date1+'  '+this.countprice.adult+'成人  '+this.countprice.child+'儿童  '+this.countprice.room_total+'房间  '
        }
        else{
          return date1+'  '+this.countprice.adult+'成人  '+this.countprice.child+'儿童  '
        }
      },
      timeFormat(timestamp){
        let time = new Date(timestamp);
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let date = time.getDate();
        return year+'年'+(month<10?'0'+month:month)+'月'+(date<10?'0'+date:date)+'日';
  }

    }
  }

</script>

<style scoped>

  .section0{
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
    padding: 20px 32px 200px 32px;
  }
  .confirm-title p:nth-child(1){
    width: 100%;
    font-size:24px;
    font-weight:700;
    line-height:32px;
    color:rgba(19,19,19,1);
    opacity:1;
  }
  .confirm-title p:nth-child(2){
    width: 100%;
    font-size:22px;
    line-height:60px;
    color:rgba(168,168,168,1);
    opacity:1;
  }
  .confirm-item{
    width: 100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 12px rgba(0,0,0,0.1);
    opacity:1;
    border-radius:8px;
    margin-bottom: 28px;
  }
  .item-title{
    width: 100%;
    padding: 0 24px;
    line-height: 70px;
    box-sizing: border-box;
    color:rgba(19,19,19,1);
    font-weight: bold;
    font-size: 24px;
    border-bottom: 2px solid #DEDEDE;
  }
  .item-con{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 24px;
    font-size: 24px;
  }
  .item-con span:nth-child(1){
    display: inline-block;
    width: 430px;
    font-size: 24px;
    color:rgba(19,19,19,1);
  }

  .item-con span:nth-child(2){
    width: 150px;
    font-size: 24px;
    display: inline-block;
    color: #FF9100;
  }
  .item-con i{
    top: 6px;
  }
  .item-tip{
    box-sizing: border-box;
    margin: 20px 24px 0 24px;
    padding-left: 20px;
    background:rgba(241,241,241,1);
    opacity:1;
    line-height: 48px;
    font-size:22px;
    color:rgba(142,142,142,1);
  }
  .user-item {
    border-bottom: 1px solid #DEDEDE;
    margin: 0 24px;
  }
  .user-item span:nth-child(1) {
    width: 500px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color:#191919;
  }
  .user-item span:nth-child(1) i{
    color: #9F9F9F;font-size: 24px;
    font-style: normal;
    padding-left: 20px;
  }
  .user-item span:nth-child(2) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    float: right;
    color: #399EF6;
  }
  .item-title>span{
    color: #989898;
    font-size: 20px;
    padding-left: 20px;
  }
  .changeuser-btn{
    width:464px;
    height:72px;
    background:rgba(57,158,246,1);
    opacity:1;
    line-height: 72px;
    font-size: 24px;
    color: #fff;
    margin: 28px 0;
    border-radius:8px;

  }
  .btnbox{
    text-align: center;
  }
  .setvan{
    width: 120px;
    display: inline-block;
    border-right:1px solid #dedede ;
    text-align: center;
    margin-right: 12px;
  }
  .setvan i{
    top:6px;
  }
  .seti{
    font-style: normal;
    display: block;
  }


</style>
