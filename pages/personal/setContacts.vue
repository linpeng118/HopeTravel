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
        :label="$t('selectTravlerPage.englishName')"
        :placeholder="$t('selectTravlerPage.plhdEnlastName')"
      />
      <p class="connet-title">{{$t('selectTravlerPage.documentsInformatio')}}</p>
      <van-field
        :label="$t('typeOfId')"
        disabled
        :placeholder="$t('passport')"
      />
      <van-field
        v-model="userform.passport"
        required
        clearable
        :label="$t('passportNumber')"
        icon="question-o"
        :placeholder="$t('selectTravlerPage.mustWithIdFit')"
        @click-icon="$toast($t('selectTravlerPage.mustWithIdFit'))"
      />
      <van-cell @click="shownationality=true" :title="$t('selectTravlerPage.nationality')" is-link :value="userform.nationality!=''?userform.nationality:$t('pleaseChoose')" />

      <p class="connet-title">{{$t('contact')}}</p>
      <van-field
        required
        v-model="userform.phone"
        icon="friends-o "
        :label="$t('telephone')"
        type="number"
        :placeholder="$t('selectTravlerPage.plndAreaSelect')"
      />
      <van-field
        v-model="userform.email"
        :label="$t('email')"
        type="email"
      />
      <p class="connet-title">$t('else')</p>

      <van-cell :title="$t('personalPage.dateOfBirth')" @click="showdate=true" is-link :value="!userform.dob?$t('selectTravlerPage.selectDate'):userform.dob" />

      <van-row class="setcheckbox">
        <van-col span="6">{{$t('sex')}}</van-col>
        <van-col span="18">
          <van-radio-group v-model="userform.gender">
            <van-radio style="width: 50%;float: left" name="f">{{$t('woman')}}</van-radio>
            <van-radio style="width: 50%" name="m">{{$t('man')}}</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-switch-cell v-model="userform.isuser" title="是否本人" />
      </van-cell-group>

    </div>
    <!--<van-popup v-model="shownationality" position="right" :overlay="false" style="width: 100%">-->
    <!--等待开发-->
    <!--&lt;!&ndash;<more-city :pageparent="'/personal/addContacts'" @countryName="countryName" ></more-city>&ndash;&gt;-->
    <!--</van-popup>-->
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
  import {setcontanct} from '@/api/contacts'
  export default {
    components: {

    },
    data() {
      return {
        userform:{
          "name_cn":"王五",
          "firstname":"jack",
          "lastname":"zhao",
          "phone":"86-18100000001",
          "dob":"1985-05-01",
          "email":"zhaos@163.com",
          "passport":"1234",
          "nationality":"中国",
          "gender":"m",
          "identity":"510123456789123456"
        },
        shownationality: false,
        datedob:new Date('1990/01/01'),
        showdate:false,
        title:this.$t('selectTravlerPage.editTitle'),
        minDate: new Date('1900/01/01'),
        maxDate: new Date()
      }
    },
    computed: {},
    created(){
    },
    mounted(){
    },

    methods: {
      countryName(data){
        this.userform.nationality=data;
        this.shownationality=false
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
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      async onClickRight() {
        let id='';
        let {data, code} = await setcontanct(this.userform,id)
        if (code === 0) {
          // console.log(data)
        }
        else {
        }


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
</style>
