<!--价格日历组件-->
<template>
  <section>
    <div class="date-price">
      <ul class="date-head">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul class="date-con">
        <template v-for="(item,ind) in dayprice">
          <li :key="ind" v-if="item.price!=''&&item.status" @click="checkday=item.day" :class="checkday==item.day?'activebg':''" >
            <span >{{item.day||''}}</span>
            <template v-if="item.is_special">
              <span style="color:#FB6865">{{item.price||''}}</span>
            </template>
            <template v-else>
              <span >{{item.price||''}}</span>
            </template>
          </li>
          <li :key="ind" v-else disabled>
            <span style="color: #C9C9C9">{{item.day||''}}</span>
            <span style="color: #C9C9C9">{{item.price||''}}</span>
          </li>
        </template>

      </ul>
    </div>
  </section>
</template>

<script>

  import {getdateTrip} from '@/api/date_trip'

  export default {

    props:{
      product: Object,
    },

    async asyncData({product, $axios}) {
      let {data, code} = await getdateTrip($axios, product.product_id)
      if(code === 0) {
        console.log(data)
        return {
          priceData1: data,
        }
      } else {
        return {
          priceData1: {},
        }
      }
    },


    data() {
      return {
        //需要渲染的月份数据
        priceData:
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
                "status":true
              },
              {
                "day":28,
                "price":"$998",
                "status":true
              },
              {
                "day":29,
                "price":"$998",
                "status":true
              },
              {
                "day":30,
                "price":"$998",
                "status":true
              }
            ]
          },
        dayprice:[],
        checkday:'',
      }
    },
    created() {
      this.mGetDate(this.priceData.years,this.priceData.month)
    },
    mounted(){

    },
    methods: {
      //得到价格日历
      getpeicedata(){

      },
      mGetDate(year, month){
        let that=this;
        let objarr=[];
        let d = new Date(year,month,0);
        let len=d.getDate();
        let weeks=new Date(year,month-1,1).getDay();
        let weeke=new Date(year,month-1,len).getDay();
        let alllen=len+(weeks==0?6:weeks-1)+(weeke==0?0:7-weeke);
        for(let i=0;i<alllen;i++){
            let obj={};
            if(i<(weeks==0?7:weeks)||i>=(len+(weeks==0?6:weeks-1))){
              obj={
                "day":'',
                "price":'',
                "status":''
             }
            }
            else{
              var elsearr=that.priceData.days;
              obj={
                "day":i-(weeks==0?6:weeks-1),
                "price":'',
                "status":''
              }
              for(let j=0;j<elsearr.length;j++){
                if(elsearr[j].day==i-(weeks==0?6:weeks-1)){
                  obj=elsearr[j];
                  console.log(i-(weeks==0?6:weeks-1));
                }
              }
            }
            objarr.push(obj);
        }
        this.dayprice=objarr;
      }
    }


  }

</script>

<style scoped>
  .date-price{
    box-sizing: border-box;
    width: 750px;
  }
  .date-head{
    width: 750px;
    height:60px;
    background-color: #ebebeb;
    box-sizing: border-box;
    padding: 0 25px;
    font-size: 24px;
  }
  .date-head li{
    width: 100px;
    float: left;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #434343;
  }
  .date-head li:nth-child(6n+1){
    color: #399EF6;
  }
  .date-con{
    width: 750px;
    padding: 20px 25px;
    font-size: 28px;
  }
  .date-con li{
    width: 100px;
    float: left;
    height: 120px;
    text-align: center;
  }

  .date-con>li>span:nth-child(1){
    width: 100px;
    display: inline-block;
    height: 60px;
    line-height: 60px;
  }
  .date-con>li>span:nth-child(2){
      width: 100px;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
    }
  .activebg{
    background-color: #399EF6;
    color: #fff!important;
  }
  .activebg span{
    color: #fff!important;
  }





</style>
