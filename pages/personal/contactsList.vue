<template>
  <section>
    <van-nav-bar
      class="login-header tours-no-bb"
      ref="loginHeader"
      :title="title"
      :z-index="999"
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <van-icon class="left-wrap" name="arrow-left" slot="left" />
      <van-icon class="right-wrap" slot="right" v-if="type != 'list'">
        <div class="search active " v-if="checkuser.length == adult">
          <div class="text ">{{ $t("partcailComp.accomplish") }}</div>
        </div>
        <div class="search " v-else>
          <div class="text ">{{ $t("partcailComp.accomplish") }}</div>
        </div>
      </van-icon>
    </van-nav-bar>
    <template v-if="hasDataList">
      <div class="btnbox">
        <nuxt-link
          class="changeuser-btn"
          tag="button"
          :to="{
            path: '/personal/addContacts',
            query: {
              adult: $route.query.adult,
              isLogin: $route.query.isLogin,
              type: $route.query.type
            }
          }"
        >
          <van-icon name="plus" color="#1989fa;" />&nbsp;<span
            class="add-word"
            >{{ $t("selectTravlerPage.addTravler") }}</span
          >
        </nuxt-link>
      </div>
      <div v-if="$route.query.adult">
        <p v-if="adult" class="contancts-title">
          {{ $t("pleaseChoose") }}{{ adult
          }}{{ $t("personalPage.travelPeople") }}
        </p>
      </div>
      <van-checkbox-group
        v-if="type != 'list'"
        v-model="checkuser"
        class="checkboxall"
        :max="parseInt(adult)"
      >
        <van-checkbox
          v-for="(item, index) in list"
          class="elsecheck"
          :key="index"
          :disabled="item.phone && item.passport ? false : true"
          :name="item"
        >
          <span class="objitem">
            <i>
              {{ item.lastname }}&nbsp;{{ item.firstname }}
              <a>{{ item.gender == "f" ? $t("woman") : $t("man") }}</a>
            </i>
            <template v-if="item.phone && item.passport">
              <i>{{ $t("passportNumber") }}&nbsp;&nbsp;{{ item.passport }} </i>
              <i>{{ $t("phoneNumber") }}&nbsp;&nbsp;{{ item.phone }} </i>
            </template>
            <template v-else>
              <i style="color: red">{{
                $t("personalPage.addIncompleteInfo")
              }}</i>
            </template>
          </span>
          <b class="bicon">
            <nuxt-link
              :to="{
                path: '/personal/addContacts',
                query: {
                  id: item.customer_contract_id,
                  adult: $route.query.adult,
                  isLogin: $route.query.isLogin
                }
              }"
            >
              <p>
                <img
                  src="../../assets/imgs/edit@2x.png"
                  alt=""
                  class="elicon"
                />
              </p>
            </nuxt-link>
          </b>
        </van-checkbox>
      </van-checkbox-group>
      <ul v-else class="objitembox">
        <li v-for="(item, index) in list" :key="index">
          <span class="objitem">
            <i>
              {{ item.lastname }}&nbsp;{{ item.firstname }}
              <a>{{ item.gender == "f" ? $t("woman") : $t("man") }}</a>
            </i>
            <template v-if="item.phone && item.passport">
              <i>{{ $t("passportNumber") }}&nbsp;&nbsp;{{ item.passport }} </i>
              <i>{{ $t("phoneNumber") }}&nbsp;&nbsp;{{ item.phone }} </i>
            </template>
            <template v-else>
              <i style="color: red">{{
                $t("personalPage.addIncompleteInfo")
              }}</i>
            </template>
          </span>
          <nuxt-link
            :to="{
              path: '/personal/addContacts',
              query: {
                id: item.customer_contract_id,
                isLogin: $route.query.isLogin,
                type: 'list'
              }
            }"
          >
            <b class="bicon"><van-icon name="edit" color="#399EF6;"/></b>
          </nuxt-link>
        </li>
      </ul>
    </template>
    <div class="no-data" v-else>
      <no-data msg="还没有添加联系人，去添加吧"></no-data>
      <van-button round type="info" class="btn-go-add" block color ="#00ABF9" :to="{path:'/personal/addContacts',query:{'type':$route.query.type?'list':''}}">去添加</van-button>
    </div>
  </section>
</template>

<script>
import { getcontants } from "@/api/contacts";
import NoData from '@/components/no-data'
export default {
  components: {NoData},
  data() {
    return {
      checkuser: [],
      checker: this.$route.query.checker || [],
      list: [],
      type: this.$route.query.type || "",
      title: "选择出行人",
      adult: this.$route.query.adult || 1,
      hasDataList: true
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getlist();
  },

  methods: {
    //获得价格日历数据
    async getlist() {
      let { data, code, msg } = await getcontants();
      if (code === 0) {
        this.list = data || [];
        this.setcheck();
      } else if (code == 401) {
      } else {
        this.$dialog.alert({
          message: msg
        });
      }
      this.hasDataList = !!this.list.length
    },
    onClickLeft() {
      let href = window.location.href.slice(-1);
      if (href == "#") {
        this.$router.go(-2);
      } else {
        this.$router.go(-1);
      }
    },
    setcheck() {
      let objarr = [];
      var this_ = this;
      this.checker = this.$route.query.checker;
      if (this.checker && this.checker.length > 0) {
        for (let i = 0; i < this_.checker.length; i++) {
          for (let j = 0; j < this_.list.length; j++) {
            if (this_.list[j].customer_contract_id == this_.checker[i].id) {
              this_.checkuser.push(this_.list[j]);
            }
          }
        }
      }
    },
    onClickRight() {
      if (this.checkuser.length == this.adult) {
        var objarrx = [];
        for (let i = 0; i < this.checkuser.length; i++) {
          objarrx.push({
            id: this.checkuser[i].customer_contract_id,
            name: this.checkuser[i].lastname + this.checkuser[i].firstname
          });
        }
        if (objarrx.length > 0) {
          this.$router.replace({
            path: "/confirm_order",
            query: { checker: objarrx, isLogin: this.$route.query.isLogin }
          });
        } else {
          this.$router.replace({ path: "/confirm_order" });
        }
      }
    }
  }
};
</script>
<style>
.elsecheck .van-checkbox__icon {
  vertical-align: top !important;
  display: inline-block;
  margin-top: 6px;
}
.elsecheck .van-checkbox__icon .van-icon {
  border: 2px solid #399ef6 !important;
}
.elsecheck .van-checkbox__icon .van-icon::before {
  vertical-align: text-bottom;
}
.van-icon::before {
  vertical-align: text-top;
  margin-top: 1px;
}
.changeuser-btn .van-icon-plus:before {
  content: "\F000";
}
.bicon .van-icon-edit:before {
  font-size: 42px !important;
}
</style>
<style lang="scss" scoped>
.no-data{
  padding: 200px 76px 0 76px;
}
.btn-go-add{
  margin-top: 80px;
}
.checkboxall {
  padding: 34px;
}

.objitembox {
  padding: 50px;
  overflow-y: auto;
  li{
    padding: 20px 0;
    border-bottom: 2px solid #E4E4E4;
  }
}

.checkboxall > div {
  margin-bottom: 20px;
}
.elsecheck {
  vertical-align: top !important;
  border-bottom: 2px solid#E4E4E4;
  padding: 20px 0;
  display: -webkit-box;

}
.elsecheck > div:nth-child(1) {
  padding-top: 5px;
}
.objitem {
  display: inline-block;
  font-size: 28px;
  color: #9f9f9f;
  padding-top: 2px;
  width: 550px;
}
.objitem i {
  display: inline-block;
  font-size: 24px;
  font-style: normal;
  width: 500px;
  padding-bottom: 15px;
}
.objitem i:first-child {
  font-size: 28px;
  color: #191919;
  font-weight: bold;
  // margin-bottom: 15px;
}
.objitem > i:first-child > a {
  display: inline-block;
  font-size: 24px;
  color: #9f9f9f;
  font-weight: normal;
  font-style: normal;
}
.bicon {
  display: inline-block;
  font-size: 32px !important;
  color: #399ef6;
  font-weight: normal;
  font-style: normal;
  float: right;
  width: 50px;
}
.btnbox {
  margin-top: 100px;
  text-align: center;
}
.changeuser-btn {
  width: 375px;
  height: 60px;
  background: #f8f8f8;
  opacity: 1;
  font-size: 24px;
  color: rgba(57, 158, 246, 1);
  margin: 28px 0;
  border-radius: 8px;
}

.contancts-title {
  font-size: 28px;
  color: #ef9a1a;
  padding: 0 34px;
  line-height: 50px;
  padding-top: 20px;
}
.login-header {
  height: 88px;
  font-size: 32px;
  color: #191919;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
  border-bottom: 2px solid rgb(238, 238, 238);
  transition: all 0.5s;
  .left-wrap {
    /*color: #404040;*/
    line-height: 36px;
    /*font-size: 32px;*/
  }
  .right-wrap {
    .search {
      width: 92px;
      height: 36px;
      font-size: 24px;
      line-height: 36px;
      background: #d2d2d2;
      opacity: 1;
      color: #fff;
      border-radius: 18px;
    }
  }
}
.active {
  background-color: #399ef6 !important;
}
.elseicon {
  font-size: 36px;
}
.elicon {
  width: 40px;
  padding-top: 5px;
  margin-left: 30px;
  height: auto;
}
</style>
