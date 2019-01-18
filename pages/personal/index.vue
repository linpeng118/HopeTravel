<template>
  <div class="container">
    <div class="header">
      <div class="info">
        <div class="user-pic">
          <img class src="../../assets/imgs/personal/index/user_pic.png" alt>
        </div>
        <div class="user-info">
          <div class="name">用户名</div>
          <div class="rice">
            <span>米粒：100</span>
            <button>查看</button>
          </div>
        </div>
        <div class="user-edit">
          <img src alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 750px;
  height: 318px;
  background: rgba(57, 158, 246, 1);
  opacity: 1;
  position: relative;
  padding: 0 16px;
  box-sizing: border-box;
  .info {
    color: #fff;
    .user-pic {
      position: absolute;
      top: 48px;
      left: 32px;
      img {
        width: 142px;
        height: 142px;
      }
    }
    .user-info {
      position: absolute;
      top: 74px;
      left: 198px;
      .name {
        width: 84px;
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }
      .rice {
        span {
          width: 104px;
          height: 32px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 300;
          line-height: 32px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
        button {
          width: 78px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 16px;
        }
      }
    }
  }
}
</style>