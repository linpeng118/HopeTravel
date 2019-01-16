<template>
  <div class="tag"
    :class="className"
    @click="onTag(tag)">{{tag.title}}
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      tag: {
        type: Object,
        require: true,
        default: () => ({})
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
      onTag(tag) {
        this.$emit('callOnTag', tag)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .tag {
    display: inline-block;
    margin: 0 32px 20px 0;
    padding: 10px 20px;
    font-size: 28px;
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
