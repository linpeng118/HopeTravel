<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 :title="title"
                 :z-index="999"
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <van-icon class="left-wrap" name="arrow-left" slot="left" />
      <van-icon class="right-wrap" slot="right">
        <div class="search">
          <div class="text">{{$t('save')}}</div>
        </div>
      </van-icon>
    </van-nav-bar>
    <div class="new-connect">
      <p class="connet-title">{{$t('selectTravlerPage.customerName')}}</p>
      <van-field
        v-model="userform.name_cn"
        :label="$t('chineseName')"
        :placeholder="$t('selectTravlerPage.plhdUserName')"
      />
      <van-field
        v-model="userform.firstname"
        required
        :label="$t('selectTravlerPage.englishLastName')"
        :placeholder="$t('selectTravlerPage.plhdEnFirstName')"
      />
      <van-field
        required
        v-model="userform.lastname"
        :label="$t('accountComp.englishName')"
        :placeholder="$t('selectTravlerPage.plhdEnlastName')"
      />
      <p class="connet-title">{{$t('selectTravlerPage.passportInformation')}}</p>
      <van-field
        v-model="userform.passport"
        required
        clearable
        :label="$t('passportNumber')"
        icon="question-o"
        :placeholder="$t('selectTravlerPage.mustWithIdFit')"
        right-icon="question-o"
        @click-right-icon="$toast($t('selectTravlerPage.mustWithIdFit'))"
      />
      <div class="van-cell van-field" @click="shownationality=true">
        <div class="van-cell__title van-field__label">
          <span>{{$t('selectTravlerPage.nationality')}}</span>
        </div>
        <div class="van-cell__value">
          <span>{{userform.nationality?userform.location_info: $t('pleaseChoose')}}</span>
        </div>
        <div style="margin-top: -4px">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </div>
      <p class="connet-title">{{$t('contact')}}</p>
      <div class="van-cell van-field" required>
        <div class="van-cell__title van-field__label">
          <span>{{$t('telephone')}}</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <i class="setvan" @click="showselqu=true">+{{userform.phone_country}}<van-icon name="arrow" /></i>
            <input type="text" v-model="userform.phonex" :placeholder="$t('selectTravlerPage.plndAreaSelect')" class="van-field__control">
            <!-- <van-field
              required="true"
              v-model="userform.phonex"
              :placeholder="$t('selectTravlerPage.plndAreaSelect')"
              class="van-field__control"
            /> -->
          </div>
        </div>
      </div>
      <van-field
        v-model="userform.email"
        :label="$t('email')"
        type="email"
      />
      <p class="connet-title">{{$t('else')}}</p>
      <div class="van-cell van-field" @click="showdate=true">
        <div class="van-cell__title van-field__label"><span>{{$t('selectTravlerPage.dateOfBirth')}}</span></div>
        <div class="van-cell__value"><span>{{!userform.dob?$t('selectTravlerPage.selectDate'):userform.dob}}</span></div>
        <div style="margin-top: -4px">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </div>

      <van-row class="setcheckbox">
        <van-col span="5" style="text-align: right">{{$t('sex')}}</van-col>
        <van-col span="3" style="text-align: right">&nbsp;</van-col>
        <van-col span="16">
          <van-radio-group v-model="userform.gender">
            <van-radio style="width: 30%;float: left" name="f">{{$t('woman')}}</van-radio>
            <van-radio style="width: 30%" name="m">{{$t('man')}}</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-cell-group>
      </van-cell-group>
      <!-- <div class="van-cell-group van-hairline--top-bottom">
        <div class="van-cell van-cell--center van-cell--borderless van-switch-cell van-field">
          <div class="van-cell__title van-field__label"><span>{{$t('selectTravlerPage.isSelf')}}</span></div>
          <div class="van-cell__value">
            <van-switch-cell v-model="userform.isuser"/>
          </div>
        </div>
      </div> -->
      <van-cell-group v-if="queryid!=0">
        <p @click="delconfirm()" style="float: right"><van-icon name="delete" class="elseicon" color="#399EF6;"/>&nbsp;<span class="elsespan">{{$t('delete')}}</span></p>
      </van-cell-group>
    </div>
    <van-popup v-model="shownationality" position="right" style="width:100%;height: 100%;">
      <newcity-list :pageparent="'/personal/addContacts'"
                 :dataObj="countryList"
                 @selectItem="selectItem"
                 ref="moreList"
                 @back="moreListBack"
                 @countryName="countryName" >
      </newcity-list>
    </van-popup>
    <van-popup v-model="showselqu" position="right" style="width:100%;height: 100%;">
      <newtel-code :pageparent="'/personal/addContacts'"
                 :dataObj="countryList"
                 @selectCode="selectCode"
                 ref="moreList2"
                 @back="moreListBack2"
                 @countryCode="countryCode" >
      </newtel-code>
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
  import {guojialist,getLocationsCountry} from '@/api/contacts'
  import {setcontanct} from '@/api/contacts'
  import {delcontanct} from '@/api/contacts'
  import {addcontanct} from '@/api/contacts'
  import {getcontants} from '@/api/contacts'
  import {getcontant} from '@/api/contacts'
  import NewcityList from '@/components/confirm_foot/newCityList'
  import NewtelCode from '@/components/confirm_foot/newTelCode'
  import {getquhao} from '@/api/contacts'
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    components: {
      NewcityList,NewtelCode
    },
    data() {
      return {
        userform:{
         "name_cn":"",
         "firstname":"",
         "lastname":"",
         "gender":"",
         "phonex":"",
         "dob":"",
         "email":"",
         "passport":"",
         "nationality":'7',//保存国家的id
         "six":0,
         "phone_country":'86',
         "identity":null,
         "isuser":false,
         'location_info':this.$t('china'),//保存国家名字
       },
        local_List:[],//保存国家的数据列表,做缓存
        hot_List:[],//保存热门地区的数据列表,做缓存
        shownationality: false,
        datedob:new Date('1990/01/01'),
        showdate:false,
        title:this.$t('selectTravlerPage.addTitle'),
        queryid:this.$route.query.id||0,
        adult:this.$route.query.adult||null,
        checker:this.$route.query.checker||[],
        pushpath:"",
        countryList:{},//国家列表
        telList:{},//区号列表
        basicTelList:[],//合并国家和区号的缓存列表
        showselqu:false,
        columns: [],
        minDate: new Date('1900/01/01'),
        maxDate: new Date(),
        // nationalityIdPc:0,//传到pc的国家id
        // nationalityNamePc:''//国籍名字
      }
    },
    computed: {
      /* ...mapGetters([
      'national'
    ]) */
    },
    created(){
    },
    mounted(){
      if(this.queryid!=0){
        this.title= this.$t('selectTravlerPage.editTitle');
         this.getcontant();
      }
       this.gotCountry();
       this.gotQuhao();
      /* this.getqu(); */
      /* if(this.national){
        this.location_info = this.national;
      } */
    },

    beforeRouteEnter(to, from, next) {
      console.log(from)
      
      next(vm=>{
        vm.pushpath=from.path;
        vm.getcontant();
      vm.gotCountry();
      vm.gotQuhao();
        next();
      })
    },
    methods: {
     /*  ...mapMutations({
      vxSaveNational: 'profile/saveNational'
    }), */
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
              adult:this.$route.query.adult||null,
              isLogin:this.$route.query.isLogin||null
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
            console.log('setcontanct',data,msg);
            this.$router.replace({
              path:this.pushpath,
              query:{
                checker:this.$route.query.checker||[],
                adult:this.adult||null,
                isLogin:this.$route.query.isLogin||null,
                type: this.$route.query.type || '',
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
            console.log('addcontanct',data,this.$route.query)
            this.$router.replace({
              path:this.pushpath,
              query:{
                checker:this.$route.query.checker||[],
                adult:this.$route.query.adult||null,
                isLogin:this.$route.query.isLogin||null,
                 type: this.$route.query.type || '',
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
         console.log('userform.nationality',this.userform);
         console.log('this.local_List',this.local_List);
         console.log('this.hot_List',this.hot_List);
         
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
         /* this.local_List.map((val)=>{
            if(val.id === this.userform.nationality){
              this.location_info = val.name;
            }
         }) */
         
        }
        else {
        }
      },
      delconfirm(){
        var this_=this;
        this.$dialog.confirm({
          title: this.$t('selectTravlerPage.deleteContact'),
          message: this.$t('selectTravlerPage.sureDeleteContact')
        }).then(() => {
          this_.deluser();
        }).catch(() => {

        });
      },
      async deluser(){
        let {data,code,msg} = await delcontanct(this.queryid)
        if (code === 0) {
          this.$toast(this.$t('operateSuc'))
          let href = window.location.href.slice(-1)
          if(href == '#'){
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        }
        else {
          this.$toast(msg)
        }

      },
      //得到国家列表
      async gotCountry(){
        let {data, code,msg} = await getLocationsCountry()
       
        if (code === 0) {

          /* for (let key in this.local_List) {
           
           if(this.local_List[key].id==this.userform.nationality){
             
             this.userform.location_info = this.local_List[key].name;
             console.log(this.userform.location_info);
             
           }
         }
         for (let key in this.hot_List) {
          
           
           if(this.hot_List[key].id==this.userform.nationality){
             
             this.userform.location_info = this.hot_List[key].name;
             console.log(this.userform.location_info);
             
           }
         } */

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
          
        console.log('this.countryList',this.countryList);
        }
        else {

        }

      },
      // 得到区号
      /* async getqu() {
        let {data, code, msg} = await getquhao();
        if(code === 0) {
          注释这里是因为我也不知道有啥用
          /* this.columns = data.map(v => {
            this.$set(v, 'text',  '+'+v.tel_code+'('+v.countryName+')')
            return v
          })
          console.log('sssssssssss',this.columns) ;
          
        }
        
      }, */
      //得到区号所对应的列表
      async gotQuhao(){
        let {data, code,msg} = await  getquhao()
       
        if (code === 0) {
       
          this.basicTelList = data;
          // let tel_local_space = {},tel_hot_space = {};
      ///api/locations&&/api/country/telcodes 数据合并
      //api/locations id name name_pinyin
      ///api/country/telcodes countryName tel_code
      //合并后格式为 id name name_pinyin tel_code
      // tel_local_space = this.local_List;
      // tel_hot_space = this.hot_List;
      // console.log(this.local_List);
      /* for (let key in tel_local_space) {
           this.basicTelList.map((val)=>{
             if(val.countryName == this.local_List[key].name){
               this.local_List[key].tel_code = val.tel_code;
             }
           })
         }
         console.log(this.local_List);
         
         for (let key in tel_hot_space) {
          
           this.basicTelList.map((val)=>{
             if(val.countryName == this.hot_List[key].name){
               this.hot_List[key].tel_code = val.tel_code;
             }
           })
         }
         console.log(this.hot_List); */
         
        //  this.telList= this._nomalLizePinyin(this.local_List,this.hot_List)



      //  console.log('this.telList',this.telList);
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
          // this.countryList = obj;
        return obj;
        /* else{
          let obj = {};
          this.basicTelList=data
          
        } */
       
   
      },

      selectItem(lists) { // 关闭更多选择层
        this.userform.nationality = lists[0].id;
        /* this.vxSaveNational(lists[0].name); */
        this.userform.location_info = lists[0].name;
        this.shownationality = false   
      },
      selectCode(lists,type) { // 关闭更多选择层
        this.userform.phone_country=lists[0].tel_code;
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
    font-size: 20px;
    font-weight: bold;
    width: 14px;
    color: #ee0a24;
  }
  .new-connect .van-cell--required::before {
    color: #fff!important;
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
