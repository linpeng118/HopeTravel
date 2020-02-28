<template>
  <!-- 居中 -->
  <van-row class="area-code-input cb-border-b"
           type="flex"
           align="center"
           :class="className">
    <van-col class="area-code-wrap"
             span="12"
             @click.native="toggleAreaList">
      <span class="area-code">+{{areaCode}}</span>
      <van-icon class="icon-arrow"
                name="arrow-down" />
    </van-col>
    <van-col class="mobile-input"
             v-show="!isShowList"
             span="12">
      <van-field class="mobile"
                 style=""
                 placeholder-style="color:#D9D9D9"
                 maxlength="11"
                 v-model="mobile"
                 :placeholder="$t('partcailComp.enterPhone')">
      </van-field>
    </van-col>

    <van-popup v-model="isShowList"
               position="right"
               style="width:100%;height: 100%;">
      <!-- <tel-code :pageparent="'/personal/addContacts'"
                :dataObj="moreLists"
                @selectCode="selectCode"
                ref="moreList2"
                @back="toggleAreaList">
      </tel-code> -->
      <newtel-code :pageparent="'/personal/addContacts'"
                 :dataObj="getCountryCode"
                 @selectCode="selectCode"
                 ref="moreList2"
                 @back="toggleAreaList">
      </newtel-code>
    </van-popup>
    <!--<van-col v-show="isShowList"-->
    <!--class="area-list"-->
    <!--span="18">-->
    <!--<div class="area-item"-->
    <!--v-for="(area,index) in araeList"-->
    <!--:key="index"-->
    <!--@click="selectArea(area)">-->
    <!--<div class="addr">{{area.addr}}</div>-->
    <!--<div class="code">{{area.code}}</div>-->
    <!--</div>-->
    <!--</van-col>-->
  </van-row>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
// import TelCode from '@/components/confirm_foot/telcode'
import NewtelCode from '@/components/confirm_foot/newTelCode'
// import {getCountryTelcodes} from '@/api'
// import {guojialist} from '@/api/contacts'
import {getquhao,getLocationsCountry} from '@/api/contacts'
import {setLocalStore,getLocalStore} from '@/assets/js/utils'
export default {
  components: {NewtelCode},
  props: {
    proAreaCode: {
      type: [Number, String],
      default: '86',
    },
    proMobile: {
      type: [Number, String],
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShowList: false, // 是否显示列表
      areaCode: this.proAreaCode,
      mobile: '',
      araeList: [],
      moreLists: {},
      countryList:{},//国家列表
        telList:{},//区号列表
        basicTelList:[],//合并国家和区号的缓存列表
    }
  },
  computed:{
    ...mapGetters(['getCountryCode'])
  },
  watch: {
    mobile(val) {
      this.$emit('update:proMobile', val)
    },
  },
   mounted() {
    // this.guojia()
    console.log('我是猪',this.getCountryCode,this.getCountryCode['热门']);
    
    if(!this.getCountryCode['热门']||(this.getCountryCode['热门']&&this.getCountryCode['热门'].length==0)){
      this.gotCountry();
      this.gotQuhao();
    }
    if(!getLocalStore('tourscool_countryCode_vuex')){
        this.gotCountry();
        this.gotQuhao();
      }
    
  },
  beforeRouteEnter(to, from, next) {
      console.log(from)
      
      next(vm=>{
        vm.pushpath=from.path;
        // vm.getcontant();
      // vm.gotCountry();
      // vm.gotQuhao();
        next();
      })
    },
  methods: {
    ...mapMutations({
      vxSaveCountryCode: 'common/saveCountryCode'
    }),
    
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
    toggleAreaList() {
      this.isShowList = !this.isShowList
    },
    selectCode(area) {
      console.log()
      this.areaCode = area[0].tel_code
      this.$emit('update:proAreaCode', area[0].tel_code)
      this.toggleAreaList()
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
          setLocalStore('tourscool_countryCode_vuex',this.countryList)
        // console.log('this.countryList',this.countryList);
        console.log('vxSaveCountryCode',this.getCountryCode);
        
        }
        else {

        }

      },
      //得到区号所对应的列表
      async gotQuhao(){
        let {data, code,msg} = await  getquhao()
       
        if (code === 0) {
       
          this.basicTelList = data;
          console.log('区号',this.basicTelList);
          
        }
        else {

        }

      },
  },
}
</script>

<style lang="scss" scoped>
.area-code-input {
  // overflow: hidden;
  height: 62px;
  line-height: 62px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  .area-code-wrap {
    padding-left: 20px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    max-width: 178px;
    position: relative;
    .area-code {
      font-size: 36px;
      color: #000000;
      overflow: hidden;
    }
    .icon-arrow {
      margin-left: 16px;
      font-size: 18px;
      color: #000000;
      font-weight: bold;
    }
  }
  .mobile-input {
    .mobile {
      padding: 0 16px 0 0;
      font-size: 28px;
      color: #000;
    }
  }
  .area-list {
    position: absolute;
    right: -2px;
    top: 0;
    z-index: 999;
    background: #fff;
    border-radius: 0 10px 10px 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
    padding: 0 36px;
    width: 458px;
    max-height: 375px;
    overflow: scroll;
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 80px;
      width: 2px;
      height: 100%;
    }
    .area-item {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: center;
      -webkit-align-items: center;
      border-bottom: 2px solid #c4c4c4;
      font-size: 28px;
      color: rgba(85, 85, 85, 1);
    }
  }
}
</style>
