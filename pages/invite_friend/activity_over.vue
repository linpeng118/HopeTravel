<template>
  <div class="pull-new-over-page">
    <pull-new-comp />
  </div>
</template>

<script>
  import PullNewComp from '@/components/partcail/activity/PullNew'

  export default {
    components: {
      PullNewComp
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>
  .pull-new-over-page {
    padding: 40px 0 134px;
    background: #FDB300;
    height: 100%;
  }
</style>
