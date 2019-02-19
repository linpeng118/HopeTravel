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
          <div class="text">保存</div>
        </div>
      </van-icon>
    </van-nav-bar>
    <div class="new-connect">
      <p class="connet-title">顾客姓名</p>
      <van-field
        v-model="userform.name_cn"
        label="中文名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="userform.firstname"
        required
        label="英文姓"
        placeholder="请输入英文姓"
      />
      <van-field
        required
        v-model="userform.lastname"
        label="英文名"
        placeholder="请输入英文名"
      />
      <p class="connet-title">证件信息</p>
      <van-field
        label="证件类型"
        disabled
        placeholder="护照"
      />
      <van-field
        v-model="userform.passport"
        required
        clearable
        label="护照号码"
        icon="question-o"
        placeholder="须与证件上一致"
        @click-icon="$toast('须与证件上一致')"
      />
      <van-cell @click="shownationality=true" title="国籍" is-link :value="userform.nationality!=''?userform.nationality:'请选择'" />
      <p class="connet-title">联系方式</p>
      <div class="van-cell van-field">
        <div class="van-cell__title">
          <span>电话</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <i class="setvan" @click="showselqu=true">+{{userform.phone_country}}<van-icon name="arrow" /></i>
            <input type="text" v-model="userform.phonex" placeholder="请注意区域选择" class="van-field__control">
          </div>
        </div>
      </div>
      <van-popup v-model="showselqu" position="bottom" :overlay="true">
        <van-picker :columns="columns" @confirm="onChangequ" show-toolbar title="选择区号"/>
      </van-popup>

      <van-field
        v-model="userform.email"
        label="邮箱"
        type="email"
      />
      <p class="connet-title">其他</p>
      <van-cell title="出生日期" @click="showdate=true" is-link :value="!userform.dob?'选择日期':userform.dob" />
      <van-row class="setcheckbox">
        <van-col span="6">性别</van-col>
        <van-col span="18">
          <van-radio-group v-model="userform.gender">
            <van-radio style="width: 20%;float: left" name="f">女</van-radio>
            <van-radio style="width: 20%" name="m">男</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-switch-cell v-model="userform.isuser" title="是否本人" />
      </van-cell-group>
      <van-cell-group v-if="queryid!=0">
        <div class="deluser" @click="delconfirm()">删除出行人</div>
      </van-cell-group>
    </div>
    <van-popup v-model="shownationality" position="right" style="width: 80%;height: 100%;">
      <!--等待开发-->
      <city-list :pageparent="'/personal/addContacts'"
                 :dataObj="moreLists"
                 @selectItem="selectItem"
                 ref="moreList"
                 @back="moreListBack"
                 @countryName="countryName" >
      </city-list>
    </van-popup>
    <van-popup v-model="showdate" position="bottom" :overlay="true" style="width: 100%">
      <van-datetime-picker
        v-model="datedob"
        type="date"
        :min-date="new Date('1920-01-01')"
        :max-date="new Date()"
        @confirm="setval"
      />
    </van-popup>
  </section>
</template>

<script>
  import {guojialist} from '@/api/contacts'
  import {setcontanct} from '@/api/contacts'
  import {delcontanct} from '@/api/contacts'
  import {addcontanct} from '@/api/contacts'
  import {getcontants} from '@/api/contacts'
  import {getcontant} from '@/api/contacts'
  import CityList from '@/components/list/cityList'
  import {getquhao} from '@/api/contacts'
  export default {
    components: {
      CityList
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
         "nationality":"中国",
         "six":0,
         "phone_country":'86',
         "identity":null,
         "isuser":false
       },
        shownationality: false,
        datedob:new Date('1990-01-01'),
        showdate:false,
        title:'新增出行人',
        queryid:this.$route.query.id||0,
        adult:this.$route.query.adult||null,
        checker:this.$route.query.checker||[],
        pushpath:"",
        moreLists:{},
        showselqu:false,
        columns: [],
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      if(this.queryid!=0){
        this.title='编辑出行人';
        this.getcontant();
      }
      this.guojia();
      this.getqu();
    },

    beforeRouteEnter(to, from, next) {
      console.log(from)
      next(vm=>{
        vm.pushpath=from.path;
        next();
      })
    },
    methods: {
      countryName(data){
        this.userform.nationality=data;
        this.shownationality=false
      },
      // 得到区号
      async getqu() {
        let {data, code, msg} = await getquhao();
        if(code === 0) {
          this.columns = data.map(v => {
            this.$set(v, 'text',  '+'+v.tel_code+'('+v.countryName+')')
            return v
          })
        }
        else {
          this.$dialog.alert({
            message: msg
          });
        }
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
        this.$router.go(-1)
      },
      async onClickRight() {
        if(  this.title=='编辑出行人'){
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
              query:{checker:this.$route.query.checker||[]}
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
      delconfirm(){
        var this_=this;
        this.$dialog.confirm({
          title: '删除联系人',
          message: '是否确认删除联系人?'
        }).then(() => {
          this_.deluser();
        }).catch(() => {

        });
      },
      async deluser(){
        let {data, code,msg} = await delcontanct(this.queryid)
        if (code === 0) {
          this.$toast('删除成功')
          this.$router.go(-1)
        }
        else {
          this.$toast(msg)
        }

      },
      async guojia(){
        let {data, code,msg} = await guojialist()
        if (code === 0) {
          console.log( this._nomalLizePinyin(data))
        }
        else {

        }

      },
      //格式化拼音列表
      _nomalLizePinyin(data) {
        let len = data.length;
        let obj = {};
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }
        this.moreLists=obj
      },
      selectItem(lists,type) { // 关闭更多选择层
        this.userform.nationality=lists[0].name;
        this.shownationality = false
      },
      // 更多列表返回
      moreListBack() {
        this.shownationality = false
      },
      onChangequ(picker){
        this.userform.phone_country =picker.tel_code;
        this.showselqu=false
      },

    },
  }
</script>

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
    font-size: 28px;
  }
 .login-header {
   height: 88px;
   font-size: 32px;
   color: #191919;
   background-color: #fff;
   box-shadow:0px 4px 12px rgba(0,0,0,0.14);
   border-bottom:1px solid rgb(238, 238, 238);
   transition: all 0.5s;
   .left-wrap {
     color: #404040;
     font-size: 32px;
   }
   .right-wrap {
     .search {
       width:92px;
       height:36px;
       background:rgba(57,158,246,1);
       opacity:1;
       color: #fff;
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
   width: 120px;
   display: inline-block;
   border-right: 1px solid #dedede;
   text-align: center;
   margin-right: 12px;
 }

 .setvan i {
   top: 6px;
 }

</style>
