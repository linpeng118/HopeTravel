<template>
  <div class="my-tabs">
    <div class="my-tabs__wrap">
      <div class="my-tabs__nav" ref="refTabBox">
        <div class="my-tab" 
          v-for="(list, index) in items" 
          :key="list.id" 
          @click="changeIndex(list,index)" 
          :class="list.is_selected ? 'active-tab': ''">
          <span>{{list.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    changeIndex(list,index) {
      this.$emit('changeTag', list, index)
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.my-tabs{
  position: relative;
  border-bottom: 2px solid #F2F7F9;
  background: #fff;
  .my-tabs__wrap{
    height: 88px;
    overflow: hidden;
  }
  .my-tabs__nav{
    position: relative;
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    box-sizing: content-box;
    height: 100%;
    padding-bottom: 15px;
    -webkit-overflow-scrolling: touch;
    .my-tab{
      flex: 0 0 25%;
      position: relative;
      box-sizing: border-box;
      min-width: 0;
      padding: 0 5px;
      font-size: 28px;
      line-height: 88px;
      text-align: center;
      color: #AEAEAE;
      &.active-tab{
        transition-duration: 0.3s;
        color: #00ABF9;
        &::after{
          content: '';
          background-color: #00ABF9;
          position: absolute;
          border-radius: 3px;
          width: 40px;
          bottom: 14px;
          left: 50%;
          height: 4px;
          transform: translate(-50%, -50%)
        }
      }
    }
  }
  .my-tabs__line{
    position: absolute;
    bottom: 15px;
    left: 0;
    z-index: 1;
    height: 4px;
    background-color: #00ABF9;
    border-radius: 3px;
    width: 40px;
    transition-duration: 0.3s;
  }
}
</style>
