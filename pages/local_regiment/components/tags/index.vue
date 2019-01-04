<template>
  <span class="tag"
    :class="className"
    @click="onTag">{{name}}
  </span>
</template>

<script>
  export default {
    components: {},
    props: {
      name: {
        type: String,
        require: true,
        default: ''
      },
      className: {
        type: String,
        default: 'normal'
      }
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {
      onTag() {
        this.$emit('callOnTag', )
      }
    },
  }
</script>

<style lang="scss" scoped>
  .tag {
    display: inline-block;
    margin: 0 32px 20px 0;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 26px;
    &.normal {
      color: #191919;
      background: #f1f1f1;
    }
    &.more {
      color: #f1f1f1;
      background: #399ef6;
    }
  }
</style>