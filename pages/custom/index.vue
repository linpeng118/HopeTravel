<template>
  <div class="custom-page">
    <!-- header -->
    <normal-header :title="'私人定制'"
      transparent
      fixed />
    <!-- banner -->
    <div class="banner">
      <h1 class="title">高阶玩法&emsp;探秘全球</h1>
      <h3 class="desc">高阶玩法&emsp;探秘全球</h3>
      <div class="form-wrap">
        <div class="title-s">热门景点</div>
        <div class="tag-list">
          <transp-tag v-for="tag in tagList"
            @callOnTag="onTag"
            :tag="tag"
            :key="tag.title">
          </transp-tag>
        </div>
        <div class="form">
          <!-- 地点 -->
          <div class="form-input">
            <div class="left-icon"></div>
            <div class="transparent-input">
              <van-field class="tours-input-no-bg"
                v-model="address"
                placeholder="请填写您想去的目的地或景点" />
            </div>
            <div class="right">*</div>
          </div>
          <!-- 手机号码 -->
          <div class="form-input mobile">
            <div class="left-icon"></div>
            <div class="transparent-input">
              <van-field class="tours-input-no-bg"
                v-model="mobile"
                placeholder="请填写您的电话号码" />
            </div>
            <div class="right">*</div>
          </div>
          <!-- 微信 -->
          <div class="form-input wx">
            <div class="left-icon"></div>
            <div class="transparent-input">
              <van-field class="tours-input-no-bg"
                v-model="wx"
                placeholder="请填写您的微信号码" />
            </div>
            <div class="right">*</div>
          </div>
          <!-- 定制按钮 -->
          <van-button class="btn-custom tours-button-no-bg"
            size="large"
            :disabled="!canSubmit"
            @click="onCustom">开始定制</van-button>
        </div>
      </div>
    </div>
    <!-- 当季推荐 -->
    <!-- 承诺/服务 -->
  </div>
</template>

<script>
  import NormalHeader from '@/components/header/mormal'
  import transpTag from '@/components/tags/transparent'

  export default {
    components: {
      NormalHeader,
      transpTag
    },
    data() {
      return {
        tagList: [
          {title: '日本'},
          {title: '泰国'},
          {title: '美国'},
          {title: '新加坡'},
          {title: '马尔代夫'},
          {title: '毛里求斯'},
        ],
        address: '',
        mobile: '',
        wx: '',
        canSubmit: false,
      }
    },
    computed: {},
    methods: {
      onTag(item) {
        console.log(item)
      },
      onCustom() {
        console.log(1)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .custom-page {
    min-height: 100vh;
    font-size: 0;
    background: #f1f1f1 url("../../assets/imgs/custom/custom_bg@2x.png") no-repeat
      0 -88px/100%;
    .banner {
      padding: 154px 32px 28px;
      .title {
        height: 74px;
        line-height: 74px;
        font-size: 52px;
        font-weight: 100;
        color: rgba(255, 255, 255, 1);
        -webkit-text-stroke: 1 rgba(255, 255, 255, 1);
        text-stroke: 1 rgba(255, 255, 255, 1);
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          position: absolute;
          left: 235px;
          top: 12px;
          width: 2px;
          height: 52px;
          background: #fff;
        }
      }
      .desc {
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
      }
      .form-wrap {
        margin-top: 80px;
        padding: 20px 32px;
        width: 686px;
        height: 656px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.7;
        border-radius: 12px;
        .title-s {
          font-size: 24px;
          font-weight: 300;
          line-height: 34px;
          color: rgba(152, 152, 152, 1);
        }
        .tag-list {
          margin-top: 20px;
        }
        .form {
          margin-top: calc(58px - 20px);
          .form-input {
            width: 622px;
            height: 72px;
            background: rgba(0, 0, 0, 0);
            border: 2px solid rgba(255, 255, 255, 1);
            border-radius: 22px;
            display: flex;
            justify-content: center;
            align-content: center;
            .left-icon {
              width: 74px;
              display: 0 0 74px;
              background: url("../../assets/imgs/icon_pos.png") no-repeat center
                center/40px 40px;
              position: relative;
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                right: 0;
                top: 15px;
                width: 2px;
                height: 40px;
                background: #fff;
              }
            }
            .transparent-input {
              flex: 1;
            }
            .right {
              flex: 0 0 30px;
              height: 28px;
              align-self: center;
              line-height: 100%;
              color: #fff;
              font-size: 28px;
            }
          }
          .mobile,
          .wx {
            margin-top: 24px;
          }
          .btn-custom {
            margin-top: 62px;
          }
        }
      }
    }
  }
</style>