<template>
  <div class="personal-setting-page">
    <normal-header title="设置" />
    <van-cell v-for="item in settingList"
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
      NormalHeader
    },
    data() {
      return {
        settingList: [
          {type: SETTING.CHANGE_PSW, icon: require('~/assets/imgs/personal/setting_1@2x.png'), title: '修改密码', isRightIcon: true, value: '', path: '/personal/changePsw'},
<<<<<<< HEAD
          {type: SETTING.ABOUT, icon: require('~/assets/imgs/personal/setting_2@2x.png'), title: '关于稀饭', isRightIcon: true, value: '', path: '/protocol/about'},
          {type: SETTING.VERSION, icon: require('~/assets/imgs/personal/setting_3@2x.png'), title: '当前系统版本', isRightIcon: false, value: 'V1.0', path: '/personal/version'},
          {type: SETTING.GRADE, icon: require('~/assets/imgs/personal/setting_4@2x.png'), title: '给我们评分', isRightIcon: true, value: '', path: '/personal/grade'},
          {type: SETTING.CLEAR_CACHE, icon: require('~/assets/imgs/personal/setting_5@2x.png'), title: '清除缓存', isRightIcon: true, value: '', path: '/personal/clearCache'},
=======
          {type: SETTING.ABOUT, icon: require('~/assets/imgs/personal/setting_2@2x.png'), title: '关于稀饭', isRightIcon: true, value: '', path: '/personal/about'},
          // {type: SETTING.VERSION, icon: require('~/assets/imgs/personal/setting_3@2x.png'), title: '当前系统版本', isRightIcon: false, value: 'V1.0', path: '/personal/version'},
          // {type: SETTING.GRADE, icon: require('~/assets/imgs/personal/setting_4@2x.png'), title: '给我们评分', isRightIcon: true, value: '', path: '/personal/grade'},
          // {type: SETTING.CLEAR_CACHE, icon: require('~/assets/imgs/personal/setting_5@2x.png'), title: '清除缓存', isRightIcon: true, value: '', path: '/personal/clearCache'},
>>>>>>> 551ff5ce6bcc6f449d711b12bd12b70a4770dd8c
        ]
      }
    },
    computed: {},
    mounted() {},
    methods: {
      onCell(item) {
<<<<<<< HEAD
        switch (item.type) {
          case SETTING.CHANGE_PSW:
            this.$router.push({
              path: item.path
            })
            break;
          case SETTING.ABOUT:
            this.$router.push({
              path: item.path
            })
            break;
          case SETTING.VERSION:

            break;
          case SETTING.GRADE:

            break;
          case SETTING.CLEAR_CACHE:

            break;
          default:
            console.log(`${item.type} is not found`)
            break;
        }
=======
        this.$router.push({
          path: item.path
        })
>>>>>>> 551ff5ce6bcc6f449d711b12bd12b70a4770dd8c
      }
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
