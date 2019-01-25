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
      <van-field
        required
        v-model="userform.phone"
        icon="friends-o "
        label="电话"
        type="number"
        placeholder="请注意区域选择"
      />
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
            <van-radio style="width: 50%;float: left" name="f">女</van-radio>
            <van-radio style="width: 50%" name="m">男</van-radio>
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
        :min-date="new Date('1920-01-01')"
        :max-date="new Date()"
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
        datedob:new Date('1990-01-01'),
        showdate:false,
        title:'编辑出行人'
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
        this.$router.go(-1)
      },
      async onClickRight() {
        let id='';
        let {data, code} = await setcontanct(this.userform,id)
        if (code === 0) {console.log(data)
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
</style>
