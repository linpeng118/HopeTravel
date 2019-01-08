<template>
  <mt-header :fixed="isFixed"
    :title="title"
    class="defalut-header">
    <router-link to="/"
      slot="left">
      <mt-button icon="back"
        class="back"></mt-button>
    </router-link>
    <mt-button icon="more"
      slot="right"></mt-button>
  </mt-header>
</template>

<script>
  import {Header} from 'mint-ui';
  export default {
    components: {
      Header
    },
    props: {
      title: {
        type: String,
        default: '标题'
      }
    },
    data() {
      return {
        isFixed: true,
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .defalut-header {
    height: 88px;
    font-size: 16px;
    background-color: transparent;
    color: #eee;
    .back,
    .more {
      font-size: 16px;
    }
  }
</style>
