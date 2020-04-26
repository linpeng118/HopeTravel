<template>
  <div class="commentDetail">
    <header-bar title="评论详情"></header-bar>
    <div class="commentDetail__wrapper">
      <!-- 評論評分 -->
      <div v-if="RateCountsData">
        <div class="commentDetail__rateList" v-if="RateCountsData.score_info.length > 1">
          <div class="rate__total">
            <b>{{ RateCountsData.comment_score }}</b>
            <span>综合评分</span>
            <van-rate
              v-model="scoreFormat"
              allow-half
              void-icon="star"
              color="#EF9A1A"
              void-color="#eee"
              :size="16"
              readonly
            />
          </div>
          <ul class="rateList__bars">
            <li v-for="(item, index) in RateCountsData.score_info" :key="index">
              <b>{{ item.name }}</b>
              <van-progress
                class="rateList__bars__progress"
                :percentage="(parseFloat(item.score) / 5) * 100"
                color="#EF9A1A"
                :show-pivot="false"
              />
              <span>{{ item.score }}</span>
            </li>
          </ul>
        </div>
        <div class="commentDetail__rateList__single" v-else>
          <span>综合评分</span>
          <van-rate
            v-model="scoreFormat"
            allow-half
            void-icon="star"
            color="#EF9A1A"
            void-color="#eee"
            :size="24"
            gutter="20px"
            readonly
          />
          <b>{{ RateCountsData.comment_score }}</b>
        </div>
      </div>

      <div v-if="RateCountsData && RateCountsData.comment_count">
        <!-- 评论分类 -->
        <ul class="commentDetail__cate" v-if="RateCountsData">
          <li
            @click="filterListHandle(0)"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 0 }"
          >全部{{ RateCountsData.comment_count }}</li>
          <li
            @click="filterListHandle(1,'is_top')"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 1 }"
            v-if="RateCountsData.top"
          >精华{{ RateCountsData.top }}</li>
          <li
            @click="filterListHandle(2,'is_good')"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 2 }"
            v-if="RateCountsData.good"
          >好评{{ RateCountsData.good }}</li>
          <li
            @click="filterListHandle(3,'is_bad')"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 3 }"
            v-if="RateCountsData.bad"
          >差评{{ RateCountsData.bad }}</li>
          <li
            @click="filterListHandle(4,'is_image')"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 4 }"
            v-if="RateCountsData.image"
          >有图{{ RateCountsData.image }}</li>
          <li
            @click="filterListHandle(5,'is_append')"
            class="commentDetail__cate__item"
            :class="{ on: cateIndex === 5 }"
            v-if="RateCountsData.append"
          >追评{{ RateCountsData.append }}</li>
        </ul>
        <!-- 评论列表 -->
        <van-list
          class="commentList"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="fetchList"
        >
          <ul>
            <li v-for="item in LIST" :key="item.comment_id + Math.random()">
              <div class="head">
                <div class="user">
                  <img :src="item.face" alt />
                  <b>{{ item.user_name }}</b>
                </div>
                <p>{{ item.created.toString().split(" ")[0] }}</p>
              </div>
              <div class="rate">
                {{ item.score }}
                <span v-if="item.is_top == 1">精华</span>
              </div>
              <!--评论-->
              <div class="content">{{ item.content }}</div>
              <!--图片列表-->
              <div class="img-list" v-if="item.image && item.image.length">
                <img
                  v-for="(item2, index2) in item.image"
                  :src="item2"
                  alt
                  :key="index2"
                  @click="imagePreviewHandle(item.image, index2)"
                />
              </div>

              <!--追评-->
              <div v-if="item.append_comment">
                <p class="append-tit">{{ item.append_comment.created }}</p>
                <div class="content">{{ item.append_comment.content }}</div>
                <!--图片列表-->
                <div
                  class="img-list"
                  v-if="
                    item.append_comment.image &&
                      item.append_comment.image.length
                  "
                >
                  <img
                    v-for="(item3, index3) in item.append_comment.image"
                    @click="
                      imagePreviewHandle(item.append_comment.image, index3)
                    "
                    :src="item3"
                    alt
                    :key="index3"
                  />
                </div>
              </div>
              <!--点赞-->
              <div class="prise" :class="{ on: item.is_praise != 0 }">
                <div class="praise-box" @click="praiseHanlde(item)">
                  <van-icon name="thumb-circle-o" />
                  <span>有用 {{ item.praise }}</span>
                </div>
              </div>

              <!--HopeTravel回复-->
              <div class="reply" v-if="item.reply">
                <div class="append-tit tourscool">
                  <img src="~assets/imgs/tourscool.png" alt />HopeTravel回复
                </div>
                <div class="content">{{ item.reply }}</div>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/header/sale_union";
import { ImagePreview, Toast } from "vant";
import {
  getRateAndCounts,
  getCommentList,
  conmmentPraise
} from "@/api/comment";
export default {
  name: "commentDetail",
  components: {
    HeaderBar
  },
  data() {
    return {
      RateCountsData: null, //评分以及评论分类条数

      cateIndex: 0,

      /* 请求评论列表参数 */
      listParams: {
        page: 1,
        created: "desc", //desc 倒叙 asc 正序
        is_top: "0", //精华- 1搜索 0 不搜索
        is_good: "0", //好评- 1搜索 0 不搜索
        is_bad: "0", //差评- 1搜索 0 不搜索
        is_image: "0", //有图- 1搜索 0 不搜索
        is_append: "0" //追评- 1搜索 0 不搜索
      },

      LIST: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    scoreFormat() {
      return parseFloat(this.RateCountsData.comment_score);
    }
  },
  created() {
    this.fetchRateCounts(); //初始-获取评分以及评论分类条数
  },

  methods: {
    /**
     * 获取评分以及评论分类条数
     */
    async fetchRateCounts() {
      let res = await getRateAndCounts(this.$route.params.productId);
      this.RateCountsData = res.data || null;
    },
    /**
     * 获取评论列表
     */
    async fetchList() {
      let res = await getCommentList(
        this.$route.params.productId,
        this.listParams
      );

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.listParams.page >= res.pagination.total_page) {
        this.finished = true;
      }

      this.LIST = this.LIST.concat(res.data);
      this.$set(this.listParams, "page", res.pagination.page + 1);
    },
    /**
     * 筛选评论列表
     */
    filterListHandle(index, type) {
      this.cateIndex = index;
      this.listParams.page = 1
      this.listParams = {
        page: 1,
        created: "desc", //desc 倒叙 asc 正序
        is_top: "0", //精华- 1搜索 0 不搜索
        is_good: "0", //好评- 1搜索 0 不搜索
        is_bad: "0", //差评- 1搜索 0 不搜索
        is_image: "0", //有图- 1搜索 0 不搜索
        is_append: "0" //追评- 1搜索 0 不搜索
      };
        this.LIST = []
        console.log(this.listParams);
        if(type){
            this.$set(this.listParams, type, 1)
        }
        this.fetchList()
    //   switch (index) {
    //     case 0: //全部
    //       this.fetchList();
    //       break;
    //     case 1: //精华
    //       this.$set(this.listParams, "top", 1);
    //       this.fetchList();
    //       break;
    //     case 2: //好评
    //       this.$set(this.listParams, "good", 1);
    //       this.fetchList();
    //       break;
    //     case 3: //差评
    //       this.$set(this.listParams, "bad", 1);
    //       this.fetchList();
    //       break;
    //     case 4: //有图
    //       this.$set(this.listParams, "image", 1);
    //       this.fetchList();
    //       break;
    //     case 5: //追评
    //       this.$set(this.listParams, "append", 1);
    //       this.fetchList();
    //       break;
    //   }
    },
    /**
     * 图片预览
     */
    imagePreviewHandle(images, startPosition) {
      ImagePreview({
        images,
        startPosition,
        showIndicators: true
      });
    },
    /**
     * 点赞
     */
    async praiseHanlde(item) {
      if (item.is_praise != 0) return;
      let res = await conmmentPraise(item.comment_id);
      console.log(res);
      if (res.code == 0) {
        item.is_praise = 1;
        item.praise++;
      } else {
        Toast(res.msg || "点赞失败，请重试~");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.commentDetail {
  padding-top: 88px;
  height: 100vh;
  background: #f2f2f2;
  border-top: 1px solid #eee;

  .commentDetail__rateList {
    width: 100vw;
    height: 274px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;

    .rate__total {
      width: 40vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 400;

      b {
        color: #ef9a1a;
        font-size: 44px;
        font-weight: 400;
      }

      span {
        color: #131313;
        font-size: 24px;
        margin-top: 12px;
      }
    }

    .rateList__bars {
      width: 60vw;
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        font-size: 20px;
        margin-bottom: 18px;
        justify-content: center;
        align-items: center;

        b {
          font-weight: 400;
          color: #131313;
        }

        .rateList__bars__progress {
          width: 210px;
          margin: 0 12px;
        }

        span {
          color: #000000;
        }
      }
    }
  }

  .commentDetail__rateList__single {
    width: 100vw;
    height: 136px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 34px;

    b {
      color: #ef9a1a;
      font-size: 36px;
      font-weight: 400;
    }

    span {
      color: #131313;
      font-size: 28px;
      margin-right: -100px;
    }
  }

  .commentDetail__cate {
    width: 100vw;
    height: 190px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 20px;
    border-bottom: 1px solid #e7e7e7;
    margin: 24px 0 0;

    .commentDetail__cate__item {
      background: #fff;
      padding: 0 36px;
      height: 50px;
      line-height: 50px;
      border: 2px solid #d8d8d8;
      margin-right: 20px;
      font-size: 22px;
      border-radius: 40px;
      color: #848484;

      &.on {
        background: #4bb1f5;
        color: #fff;
        border: 2px solid rgba(75, 177, 245, 1);
      }
    }
  }

  .commentList {
    background: #fff;

    li {
      padding: 28px 20px 32px;

      .head {
        display: flex;
        justify-content: space-between;

        .user {
          display: flex;
          align-items: center;

          img {
            width: 44px;
            height: 44px;
            border-radius: 100%;
            overflow: hidden;
            display: inline-block;
            background-color: #f1f1f1;
          }

          b {
            font-size: 24px;
            font-weight: 400;
            color: rgba(25, 25, 25, 1);
            margin-left: 10px;
          }
        }

        p {
          font-size: 20px;
          font-family: Segoe UI;
          font-weight: 400;
          color: rgba(181, 181, 181, 1);
        }
      }

      .rate {
        font-size: 30px;
        line-height: 32px;
        color: rgba(239, 154, 26, 1);
        margin: 22px 0;
        padding: 0 58px;

        span {
          font-size: 22px;
          background: #ef9a1a;
          color: #fff;
          padding: 2px 12px;
          border-radius: 40px;
        }
      }

      .content {
        padding: 0 58px;
        font-size: 24px;
        font-weight: 400;
        line-height: 44px;
        color: rgba(25, 25, 25, 1);
      }

      .img-list {
        padding: 0 58px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 12px;

        img {
          margin-right: 8px;
          width: 190px;
          height: 190px;
          margin-bottom: 8px;

          &:nth-of-type(3n) {
            margin-right: 0;
          }
        }
      }

      .append-tit {
        color: #ff7200;
        font-size: 24px;
        padding: 0 58px;
        margin: 20px 0 10px;

        &.tourscool {
          color: #000;
          font-weight: 600;
          display: flex;
          align-items: center;

          img {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }
        }
      }

      .prise {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #b5b5b5;
        font-size: 20px;
        margin-top: 20px;
        padding: 0 58px;

        .praise-box {
          display: flex;
          align-items: center;

          i {
            font-size: 34px;
            margin-right: 10px;
          }
        }

        &.on {
          color: #ef9a1a;
        }
      }
    }
  }
}
</style>
<style>
.van-image-preview__index {
  z-index: 99;
}
</style>
