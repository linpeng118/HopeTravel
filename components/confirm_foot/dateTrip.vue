<!--价格日历组件-->
<template>
  <section>
    <div class="date-price">
      <ul class="date-head">
        <li>{{$t('confirmFootComp.mondayS')}}</li>
        <li>{{$t('confirmFootComp.tuesdayS')}}</li>
        <li>{{$t('confirmFootComp.wednesdayS')}}</li>
        <li>{{$t('confirmFootComp.thursdayS')}}</li>
        <li>{{$t('confirmFootComp.fridayS')}}</li>
        <li>{{$t('confirmFootComp.saturdayS')}}</li>
        <li>{{$t('day')}}</li>
      </ul>
      <ul class="date-con">
        <template v-for="(item,ind) in dayprice">
          <li :key="ind" v-if="item.price!=''&&item.status&&!item.is_soldout" @click="checkday=item.day" :class="checkday==item.day?'activebg':''" >
            <span style="color: #ff0000">{{item.day||''}}</span>
            <template v-if="item.is_special">
              <span style="color:#ff0000" v-html="item.price?fiterPri(item.price):''"></span>
            </template>

            <template v-else>
              <span v-html="item.price?fiterPri(item.price):''"></span>
            </template>
          </li>
          <li :key="ind" v-else disabled>
            <template v-if="item.is_soldout">
              <span style="color: #C9C9C9">{{item.day}}</span>
              <span style="color: #C9C9C9">{{$t('saleOver')}}</span>
            </template>
            <template v-else>
              <span style="color: #C9C9C9">{{item.day||''}}</span>
              <span style="color: #C9C9C9" v-html="item.price?fiterPri(item.price):''"></span>
            </template>

          </li>
        </template>

      </ul>
    </div>
  </section>
</template>

<script>

  export default {
    props:{
      dateprice: Object,
      checkdayx: String,
    },

    data() {
      return {
        //需要渲染的月份数据fitle以后
        dayprice:[],
        checkday:'',
      }
    },
    watch:{
      'dateprice'(val){
        this.mGetDate(val.years,val.month);
      },
      'checkday'(val){
        if(val!=''){
          this.$emit('setcheckday',val+'');
        }
      }
    },
    mounted(){
      //初始化
      this.$store.commit("pricelist",{});
      this.$store.commit("countprice",{});
      this.mGetDate(this.dateprice.years,this.dateprice.month);

    },
    methods: {
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
            if(i<(weeks==0?7:weeks)-1||i>=(len+(weeks==0?6:weeks-1))){
              obj={
                "day":'',
                "price":'',
                "status":''
             }
            }
            else{
              var elsearr=that.dateprice.days;
              obj={
                "day":i-(weeks==0?6:weeks-1)+1,
                "price":'',
                "status":''
              }
              for(let j=0;j<elsearr.length;j++){
                if(elsearr[j].day==i-(weeks==0?6:weeks-1)+1){
                  obj=elsearr[j];
                }
              }
            }
            objarr.push(obj);
        }
        this.dayprice=objarr;
        // 重置已选日期
        this.checkday='';
        if(this.checkdayx!=''){
          this.checkday=this.checkdayx;
        }
      },
      fiterPri(x){
          return x
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
    font-size: 24px;
  }
  .date-head li:nth-child(1),.date-head li:nth-child(7n){
    color: #FF0000;
  }
  .date-con{
    width: 750px;
    padding: 20px 25px 20px 25px;
    font-size: 28px;
  }
  .date-con li{
    width: 100px;
    float: left;
    height: 118px;
    text-align: center;
    padding-top: 15px;
    margin-bottom: 25px;
  }

  .date-con>li>span:nth-child(1){
    width: 100px;
    display: inline-block;
    height: 45px;
    line-height: 45px;
  }
  .date-con>li>span:nth-child(2){
      width: 100px;
      display: inline-block;
      height: 36px;
      line-height: 36px;
      font-size: 24px;
    }
  .activebg{
    background-color: #399EF6;
    border-radius:6px ;
    color: #fff!important;
  }
  .activebg span{
    color: #fff!important;
  }





</style>
