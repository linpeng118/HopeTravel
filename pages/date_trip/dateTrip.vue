<!--价格日历组件-->
<template>
  <section>
    <div class="date-price">
      <ul class="date-head">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
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

  export default {
    props:{
      dateprice: Object,
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
          this.$emit('setcheckday',val);
        }
      }
    },
    mounted(){
      //初始化
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
  .date-head li:nth-child(6n):nth-child(2),.date-head li:nth-child(7n){
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
      font-size: 20px;
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
