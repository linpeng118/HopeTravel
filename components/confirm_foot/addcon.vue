<template>
  <section>
    <div class="new-connect">
      <p class="connet-title">{{$t('selectTravlerPage.customerName')}}</p>
      <van-field
        v-model="userform.name_cn"
        :label="$t('chineseName')"
        :placeholder="$t('selectTravlerPage.plhdUserName')"
      />
      <van-field
        v-model="userform.first_name"
        required
        :label="$t('selectTravlerPage.englishLastName')"
        :placeholder="$t('selectTravlerPage.plhdEnFirstName')"
      />
      <van-field
        required
        v-model="userform.last_name"
        :label="$t('accountComp.englishName')"
        :placeholder="$t('selectTravlerPage.plhdEnlastName')"
      />
      <p class="connet-title">{{$t('selectTravlerPage.passportInformation')}}</p>
      <!-- <van-field
        :label="$t('typeOfId')"
        disabled
        :placeholder="$t('passport')"
      /> -->
      <van-field
        v-model="userform.passport"
        required
        clearable
        :label="$t('passportNumber')"
        icon="question-o"
        :placeholder="$t('selectTravlerPage.mustWithIdFit')"
        @click-icon="$toast($t('selectTravlerPage.mustWithIdFit'))"
      />
      <div class="van-cell van-field" @click="shownationality=true">
        <div class="van-cell__title van-field__label">
          <span>{{$t('selectTravlerPage.nationality')}}</span>
        </div>
        <div class="van-cell__value"><span>{{userform.nationality!=''?userform.location_info: $t('pleaseChoose')}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>


      </div>
      <p class="connet-title">{{$t('else')}}</p>
      <div class="van-cell van-field" @click="showdate=true">
        <div class="van-cell__title  van-field__label"><span>{{$t('selectTravlerPage.dateOfBirth')}}</span><!----></div>
        <div class="van-cell__value"><span>{{!userform.dob?$t('selectTravlerPage.selectDate'):userform.dob}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title  van-field__label"><span>{{$t('sex')}}</span></div>
        <div class="van-cell__value">
          <van-radio-group v-model="userform.gender" style="position: relative;">
            <van-radio style="width: 30%;float: left" name="f">{{$t('woman')}}</van-radio>
            <van-radio style="width: 30%" name="m">{{$t('man')}}</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <van-popup v-model="shownationality" position="right" style="width:100%;height: 100%;">
      <!-- <city-list :pageparent="'/personal/addContacts'"
                 :dataObj="moreLists"
                 @selectItem="selectItem"
                 ref="moreList"
                 @back="moreListBack"
                 @countryName="countryName" >
      </city-list> -->
      <newcity-list :pageparent="'/personal/addContacts'"
                 :dataObj="getCountryCode"
                 @selectItem="selectItem"
                 ref="moreList"
                 @back="moreListBack"
                 @countryName="countryName" >
      </newcity-list>
    </van-popup>
    <van-popup v-model="showdate" position="bottom" :overlay="true" style="width: 100%">
      <van-datetime-picker
        v-model="datedob"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="setval"
      />
    </van-popup>
  </section>
</template>

<script>
  // import {guojialist} from '@/api/contacts'
  import {guojialist,getLocationsCountry} from '@/api/contacts'
  import {setcontanct} from '@/api/contacts'
  import {delcontanct} from '@/api/contacts'
  import {addcontanct} from '@/api/contacts'
  import {getcontants} from '@/api/contacts'
  import {getcontant} from '@/api/contacts'
  // import CityList from '@/components/confirm_foot/cityList'
  // import TelCode from '@/components/confirm_foot/telcode'
  import NewcityList from '@/components/confirm_foot/newCityList'
  import NewtelCode from '@/components/confirm_foot/newTelCode'
  import {getquhao} from '@/api/contacts'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      // CityList,TelCode
      NewcityList,NewtelCode
    },
    props: ['ind'],
    data() {
      return {
        userform:{
         "name_cn":"",
         "first_name":"",
         "last_name":"",
         "gender":"",
         "dob":"",
         "passport":"",
         "nationality":'7',
         'location_info':this.$t('china'),//保存国家名字
       },
        shownationality: false,
        datedob:new Date('1990/01/01'),
        showdate:false,
        title:this.$t('selectTravlerPage.addTitle'),
        queryid:this.$route.query.id||0,
        adult:this.$route.query.adult||null,
        checker:this.$route.query.checker||[],
        pushpath:"",
        moreLists:{},
        showselqu:false,
        columns: [],
        minDate: new Date('1900/01/01'),
        maxDate: new Date(),

        countryList:{},//国家列表
      }
    },
    computed: {
      ...mapGetters([
        'getCountryCode'
      ])
    },
    watch:{
      'userform': {
        handler(newval){
          this.$emit('traveuser', {ind:this.ind-1, val:newval})
        },
        deep: true
      }

    },
    created(){
    },
    mounted(){
      if(this.queryid!=0){
        this.title= this.$t('selectTravlerPage.editTitle');
        this.getcontant();
      }
      // this.guojia();
      if(!this.getCountryCode['热门']||(this.getCountryCode['热门']&&this.getCountryCode['热门'].length==0)){
        this.gotCountry();
        this.gotQuhao();
      }
      
    },

    beforeRouteEnter(to, from, next) {
      next(vm=>{
        vm.pushpath=from.path;
        vm.getcontant();
        /* vm.gotCountry();
        vm.gotQuhao(); */
        next();
      })
    },
    methods: {
      ...mapMutations({
        vxSaveCountryCode: 'common/saveCountryCode'
      }),
      countryName(data){
        this.userform.nationality=data;
        this.shownationality=false
      },
      countryCode(data){
        this.userform.phone_country=data;
        this.showselqu=false
      },
      setval(val){
       this.userform.dob=this.sedate("yyyy-MM-dd",val);
       this.showdate=false;
      },
      sedate (fmt,date) {
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      },
      onClickLeft(){
        if(this.checker.length>0){
          this.$router.replace({
            path:this.pushpath,
            query:{
              checker:this.$route.query.checker||[],
              adult:this.$route.query.adult||null
            }
          })
        }
        else{
          let href = window.location.href.slice(-1)
          if(href == '#'){
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        }
      },
      async onClickRight() {
        if(  this.title==this.$t('selectTravlerPage.editTitle')){
          this.userform.phone=this.userform.phone_country+'-'+this.userform.phonex;
          let {data, code, msg} = await setcontanct(this.userform,this.queryid)
          if (code === 0) {
            this.$router.replace({
              path:this.pushpath,
              query:{
                checker:this.$route.query.checker||[],
                adult:this.adult||null
              }
            })
          }
          else {
            this.$dialog.alert({
              message: msg
            });
          }
        }
        else{
          this.userform.phone=this.userform.phone_country+'-'+this.userform.phonex;
          let {data, code, msg} = await addcontanct(this.userform);
          if (code === 0) {
            console.log(data)
            this.$router.replace({
              path:this.pushpath,
              query:{
                checker:this.$route.query.checker||[],
                adult:this.$route.query.adult||null
              }
            })
          }
          else {
            this.$dialog.alert({
              message: msg
            });
          }
        }
      },
      async getcontant() {
        let {data, code} = await getcontant(this.queryid)
        if (code === 0) {
         this.userform=data;
         for (let key in this.local_List) {
           
           if(this.local_List[key].id.toString() ==this.userform.nationality){
             
             this.userform.location_info = this.local_List[key].name;
             console.log(this.userform.location_info);
             
           }
         }
         for (let key in this.hot_List) {
          
           
           if(this.hot_List[key].id.toString()==this.userform.nationality){
             
             this.userform.location_info = this.hot_List[key].name;
             console.log(this.userform.location_info);
             
           }
         }
         if(this.userform.phone.indexOf('-')!=-1){
           var arr=this.userform.phone.split('-');
           this.userform.phonex=arr[1];
           this.userform.phone_country=arr[0];
         }
         else{
           this.userform.phonex=this.userform.phone;
           this.userform.phone_country='86';
         }
        }
        else {
        }
      },
      // async guojia(){
      //   let {data, code,msg,hot_country} = await guojialist()
      //   if (code === 0) {
      //     this._nomalLizePinyin(data,hot_country)
      //   }
      //   else {

      //   }

      // },
      //格式化拼音列表
      /* _nomalLizePinyin(data,hot) {
        let len = data.length;
        let len2 = hot.length;
        let obj = {
          '热门城市':[]
        };
        for(let i= 0; i<len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }
        this.moreLists=obj
      }, */

      selectItem(lists,type) { // 关闭更多选择层
        this.userform.nationality=lists[0].name;
        this.userform.location_info = lists[0].name;
        this.shownationality = false
      },
      selectCode(lists,type) { // 关闭更多选择层
        this.userform.phone_country=lists[0].telcode;
        this.showselqu = false
      },
      // 更多列表返回
      moreListBack() {
        this.shownationality = false
      },
      // 更多列表返回
      moreListBack2() {
        this.showselqu = false
      },
       //得到国家列表
      async gotCountry(){
        let {data, code,msg} = await getLocationsCountry()
       
        if (code === 0) {

          let hot_data = data.hot_data;
          let localList = data.list;
          this.local_List = data.list;
          this.hot_List = data.hot_data;
          console.log(this.local_List);
          ///api/locations&&/api/country/telcodes 数据合并
      //api/locations id name name_pinyin
      ///api/country/telcodes countryName tel_code
      //合并后格式为 id name name_pinyin tel_code
          for (let key in this.local_List) {
           this.basicTelList.map((val)=>{
             if(val.countryName == this.local_List[key].name){
               localList[key].tel_code = val.tel_code;
             }
           })
         }
         for (let key in this.hot_List) {
          
           this.basicTelList.map((val)=>{
             if(val.countryName == this.hot_List[key].name){
               hot_data[key].tel_code = val.tel_code;
             }
           })
         }
          console.log('合并测试数据',this.basicTelList);
          
         this.countryList = this._nomalLizePinyin(localList,hot_data);
          this.vxSaveCountryCode(this.countryList)
        console.log('this.countryList',this.countryList);
        }
        else {

        }

      },
      //得到区号所对应的列表
      async gotQuhao(){
        let {data, code,msg} = await  getquhao()
       
        if (code === 0) {
       
          this.basicTelList = data;
          
        }
        else {

        }

      },
      //格式化拼音列表
      _nomalLizePinyin(data,hot) {
        let len = data.length;
        

        console.log(data,hot);
      
        let len2 = hot.length;
        
          let obj = {
          '热门':[],
          // '列表':[]
        };
        let arr = {};
        for(let i= 0; i<len2; i++) {
          obj['热门'].push({...hot[i]})
        }
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].name_pinyin]) {
            obj[data[i].name_pinyin] = []
          }
          obj[data[i].name_pinyin].push({...data[i]})
                     
          }
          return obj;
      },
    },
  }
</script>
<style>
  .new-connect .van-cell{
    box-sizing: border-box!important;
    text-align: right;
  }
  .new-connect .van-cell .van-cell__title{
    padding-right: 30px;
    box-sizing: border-box!important;
  }
  .new-connect .van-cell--required .van-cell__title::before {
    content: '* ';
    color: #f44;
    font-size: 20px;
    font-weight: bold;
    width: 14px;
  }
  .new-connect .van-cell--required::before {
    color: #fff!important;
  }
  .new-connect .van-radio__input{
    height: auto;
  }
</style>
<style lang="scss" scoped>

 .new-connect{
   padding: 24px 32px;
 }
 .connet-title{
   line-height: 48px;
   background:rgba(241,241,241,1);
   padding-left: 20px;
   color: #5e5e5e;
   font-size: 24px;
  }
  .setcheckbox{
    padding: 20px 30px;
    font-size: 24px;
    box-sizing: border-box;
  }
 .login-header {
   height: 88px;
   font-size: 32px;
   color: #191919;
   background-color: #fff;
   box-shadow:0px 4px 12px rgba(0,0,0,0.14);
   border-bottom:1px solid rgb(238, 238, 238);
   transition: all 0.5s;
   .right-wrap {
     .search {
       width:92px;
       font-size: 24px;
       height:36px;
       background:rgba(57,158,246,1);
       opacity:1;
       color: #fff;
       line-height: 32px;
       border-radius:18px;
     }
   }
 }
   .deluser{
     width:686px;
     height:80px;
     background:rgba(251,96,93,1);
     opacity:1;
     border-radius:8px;
     font-size:32px;
     line-height: 80px;
     color: #fff;
     text-align: center;
     margin-top: 30px;

   }
 .setvan {
   width: 160px;
   display: inline-block;
   border-right: 1px solid #dedede;
   text-align: center;
   margin-right: 12px;
 }

 .setvan i {
   top: 6px;
 }
 .elseicon{
   font-size: 42px;
   color: #399EF6;
   position: relative;
   top: 8px;
 }
  .elsespan{
    font-size: 28px;
    color: #399EF6;
  }

</style>
