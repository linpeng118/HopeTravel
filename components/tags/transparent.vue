<template>
  <div class="tag"
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
    margin: 0 16px 20px 0;
    padding: 6px 36px;
    font-size: 22px;
    font-weight: 300;
    background: rgba(0, 0, 0, 0);
    color: #fff;
    border: 2px solid rgba(57, 158, 246, 1);
    border-radius: 22px;
  }
</style>