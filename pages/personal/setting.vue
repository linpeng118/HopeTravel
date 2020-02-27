<template>
  <div class="personal-setting-page">
    <normal-header :title="$t('personalPage.seting')" />
    <van-cell v-show="!item.hidden"
              v-for="(item) in settingList"
              :key="item.type"
              :value="item.value"
              :is-link="item.isRightIcon"
              @click="onCell(item)">
      <template slot="title">
        <img class="cell-icon"
             :src="item.icon"
             alt="icon">
        <span class="custom-text">{{item.title}}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import NormalHeader from '@/components/header/normal'

const SETTING = {
  CHANGE_PSW: 'changePsw',
  ABOUT: 'about',
  VERSION: 'version',
  GRADE: 'grade',
  CLEAR_CACHE: 'clearCache',
}

export default {
  components: {
    NormalHeader,
  },
  data() {
    return {
      settingList: [],
    }
  },
  computed: {
    ...mapState({
      vxProfile: state => state.profile.profile,
    }),
  },
  mounted() {
    console.log('ddvv', this.vxProfile)
    this.settingList = [
      {
        type: SETTING.CHANGE_PSW,
        icon: require('~/assets/imgs/personal/setting_1@2x.png'),
        title: this.vxProfile.is_password ? this.$t('personalPage.changePassword') : this.$t('partcailComp.setPass'),
        isRightIcon: true,
        value: '',
        path: '/personal/changePsw',
        hidden: JSON.stringify(this.vxProfile) == '{}' ? true : false,
      },
      {
        type: SETTING.ABOUT,
        icon: require('~/assets/imgs/personal/setting_2@2x.png'),
        title: this.$t('personalPage.aboutScool'),
        isRightIcon: true,
        value: '',
        path: '/personal/about',
      },
      {
        type: SETTING.VERSION,
        icon: require('~/assets/imgs/personal/setting_3@2x.png'),
        title: this.$t('personalPage.feedback'),
        isRightIcon: false,
        value: '',
        path: '/personal/content',
      },
      // {type: SETTING.GRADE, icon: require('~/assets/imgs/personal/setting_4@2x.png'), title: '给我们评分', isRightIcon: true, value: '', path: '/personal/grade'},
      // {type: SETTING.CLEAR_CACHE, icon: require('~/assets/imgs/personal/setting_5@2x.png'), title: '清除缓存', isRightIcon: true, value: '', path: '/personal/clearCache'},
    ]
  },
  methods: {
    onCell(item) {
      this.$router.push({
        path: item.path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.personal-setting-page {
  .cell-icon {
    vertical-align: middle;
    width: 48px;
    height: 48px;
  }
}
</style>
