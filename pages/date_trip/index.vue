<template>
  <section class="section0">
    <section class="section1">
      <!--日历head-->
      <ul class="trip-head">
        <template v-for="(item,ind) in pricedate">
          <li @click="setMonth(item.month,ind)" :key="ind" class="trip-head-con" :class="item.month==activeMonth?'active-head-con':''">{{item.month}}月</li>
        </template>
      </ul>
      <date-trip :dateprice="datedata" @setcheckday="setcheckday"></date-trip>
      <!--日历foot-->
      <p class="trip-tip">
        <span v-show="showsday!=''">{{showsday}}出发 - {{showeday}}返回</span>
        <span>最少{{product.min_num_guest}}人成团</span>
      </p>
    </section>
    <!--选择房间-->
    <section style="padding-bottom: 90px;" v-if="product.product_entity_type==1&&product.self_support==0">
      <ul class="checkroom">
        <template v-for="(item,ind) in rooms">
          <li :key="ind" class="checkitem">
            <p class="checkitem_title">房间 {{ind}}</p>
            <p class="checkitem_con">
              <span>成人</span>
              <span>
              <van-stepper
                integer
                v-model="item.adult"
                :min="1"
                :max="product.max_num_guest-item.child"
              />
            </span>
            </p>
            <p v-if="product.is_kids" class="checkitem_con">
              <span>儿童 <i v-if="product.max_child_age!=-1">&nbsp;0-{{product.max_child_age}}周岁</i></span>
              <span>
              <van-stepper
                integer
                :min="0"
                v-model="item.child"
                :max="product.max_num_guest-item.adult"
              />
            </span>
            </p>
            <van-checkbox class="checkitem-btn" v-if="product.is_single_pu&&item.adult==1&&item.child==0" v-model="item.pair"><span style="color:#399EF6;">接受单人配房</span></van-checkbox>
          </li>
        </template>

      </ul>
      <div class="addroom-btn"><van-icon name="plus" />添加房间</div>

    </section>
    <!--选择人数-->
    <section v-else>
      <div class="checkperson">
        <li class="checkitem"></li>
      </div>
    </section>
    <!--footer-->
    <section>

    </section>
  </section>

</template>

<script>
  import dateTrip from './dateTrip'
  import {getdateTrip} from '@/api/date_trip'
  export default {
    components: {
      dateTrip,
    },
    data() {
      return {
        //产品
        product: {
          "product_id":141,
          "default_price":"$238",
          "code":"US119",
          "product_entity_type":1,
          "product_type":1,
          "max_num_guest":4,
          "min_num_guest":1,
          "max_child_age":2,
          "sales":3,
          "self_support":0,
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
        },
        //价格日历数据
        pricedate:[
          {
            "years":"2018",
            "month":"12",
            "days":[
              {
                "day":23,
                "price":"$798.4",
                "is_special":1,
                "status":true
              },
              {
                "day":25,
                "price":"$798.4",
                "is_special":1,
                "is_soldout":1,
                "status":true
              },
              {
                "day":28,
                "price":"$998",
                "is_override":1,
                "status":true
              },
              {
                "day":29,
                "price":"$998",
                "remaining":3,
                "status":true
              },
              {
                "day":30,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"1",
            "days":[
              {
                "day":12,
                "price":"$998",
                "status":true
              },
              {
                "day":19,
                "price":"$998",
                "status":true
              },
              {
                "day":26,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"2",
            "days":[
              {
                "day":1,
                "price":"$998",
                "status":true
              },
              {
                "day":2,
                "price":"$998",
                "status":true
              },
              {
                "day":3,
                "price":"$998",
                "status":true
              },
              {
                "day":5,
                "price":"$998",
                "status":true
              },
              {
                "day":7,
                "price":"$998",
                "status":true
              },
              {
                "day":16,
                "price":"$998",
                "status":true
              },
              {
                "day":23,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"3",
            "days":[
              {
                "day":2,
                "price":"$998",
                "status":true
              }
            ]
          }
        ],
        //选中的月份
        activeMonth:0,
        //选中的日期
        checkday:'',
        //子日历组件的数据
        datedata:{},
        showsday:'',
        showeday:'',
        //房间信息
        rooms:[
          { adult:1,
            child:0,
            pair:false	}
        ],

    }
    },
    created() {
      this.getpricedate(this.product.product_id);
      //初始化选择第一个月份
      this.datedata=this.pricedate[0];
      this.activeMonth=this.pricedate[0].month;
    },
    mounted(){

    },
    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        let {data, code} = await getdateTrip(id)
        if(code === 0) {
          // this.pricedate = data;
          console.log(this.pricedate)
        } else {
          // this.pricedate = []
        }
      },
      setMonth(val,ind){
        this.activeMonth=val;
        this.datedata=this.pricedate[ind];
        this.checkday='';
        this.showsday='';
        this.showeday=''
      },
      setcheckday(val){
        this.checkday=val;
        this.setdate();
      },
      // 得到某日期后几天
      setdate(){
        let sday1=new Date(parseInt(this.datedata.years)+'-'+parseInt(this.datedata.month)+'-'+parseInt(this.checkday));
        let day1en=sday1.getTime()+(this.product.duration_days)*24*60*60*1000;
        let eday1=new Date(day1en);
        let sday2=(sday1.getMonth() +1)+'月'+(sday1.getDate())+'日';
        let eday2=(eday1.getMonth() +1)+'月'+(eday1.getDate())+'日';
        this.showsday=sday2;
        this.showeday=eday2;
      },
  }
  }

</script>

<style scoped>
  .trip-head{
    width: 100%;
    height: 108px;
    padding: 0 25px;
  }
  .trip-head-con{
    text-align: center;
    font-size: 28px;
    line-height: 104px;
    display: inline-block;
    float: left;
    width: 116.5px;
    box-sizing: border-box;
    border-bottom: 4px solid #fff;
    color:#191919
  }
  .active-head-con{
    border-bottom: 4px solid #399EF6!important;
  }
  .trip-tip{
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: inline-block;
    padding: 0 25px;
  }
  .trip-tip span:nth-child(1){
    float: left;
    display: inline-block;
    width: 50%;
    text-align: left;
    color: #434343;
  }
  .trip-tip span:nth-child(2){
    float: right;
    display: inline-block;
    width: 40%;
    text-align: right;
    color: #FB6865;
  }
  .section0{
    background-color: #f3f3f3;
  }
  .section1{
    background-color: #fff;
    box-shadow:0px 0px 12px rgba(0,0,0,0.1);
  }
  .checkroom,checkperson{
    padding: 0 32px;
    margin-bottom: 30px;
  }
  .checkitem{
    width:686px;
    padding: 20px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 12px rgba(0,0,0,0.1);
    opacity:1;
    border-radius:8px;
    margin-top: 20px;
  }
  .addroom-btn{
    width:240px;
    height:60px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:8px;
    text-align: center;
    color: #191919;
    line-height: 60px;
    font-size: 24px;
    margin-left: 255px;
  }
  .checkitem_title{
    font-size: 30px;
    height: 70px;
    line-height: 70px;
    color: #191919;
    border-bottom: 3px solid #e4e4e4;
  }
  .checkitem_con{
    width: 100%;
    height: 80px;
  }
  .checkitem_con span:nth-child(1){
    width: 40%;
    float: left;
    text-align: left;
    color: #191919;
    font-size: 28px;
    line-height: 80px;

  }
  .checkitem_con span:nth-child(1) i{
    color: #b2b2b2;
    font-size: 22px;
  }
  .checkitem_con span:nth-child(2){
    width: 60%;
    margin-top: 15px;
    float: right;
    text-align: right;
  }
  .checkitem-btn{
    font-size: 24px;
    width: 100%;
    text-align: left;
    height: 60px;
    line-height: 60px;
  }

</style>
