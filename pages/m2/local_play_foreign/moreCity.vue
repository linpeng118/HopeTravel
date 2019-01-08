<template>
  <section class="container">
    <lay-header :title="title"></lay-header>
    <div class="city-area">
      <mt-index-list>
        <mt-index-section v-for="item in cityList" :key="item.id" :index="item.title">
          <mt-cell v-for="country in item.items" :key="country.ids" :title="country.name">
            {{country.code}}
          </mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </section>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
export default {
  name: 'moreCity',
  transition: 'bounce',
  components: {
    LayHeader
  },
  data() {
    return {
      title: '更多城市',
      cityList: [
        {
          id: 1,
          title: 'A',
          items: [
            {
              ids: 1,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆1',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 4,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 2,
          title: 'B',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 3,
          title: 'C',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 4,
          title: 'D',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 5,
          title: 'E',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 6,
          title: 'F',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 7,
          title: 'A',
          items: [
            {
              ids: 1,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆1',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 4,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 8,
          title: 'B',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 9,
          title: 'C',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        },
        {
          id: 10,
          title: 'D',
          items: [
            {
              ids: 1,
              name: 'A中国大陆',
              code: 86
            },
            {
              ids: 2,
              name: '中国大陆',
              code: 86
            },
            {
              ids: 3,
              name: '中国大陆1',
              code: 86
            }
          ]
        }
      ]
    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .city-area{
    padding-top: 88px;
    background: #fff;
    .mint-indexlist-content{
      margin-right:0!important;
    }
    .mint-indexsection-index{
      height: 48px;
      padding:0 32px;
      line-height: 48px;
      background:rgba(241,241,241,1);
      font-size:22px;
      color:rgba(94,94,94,1);
      margin: 0;
    }
    .mint-indexlist-nav{
      border-left: none;
    }
    .mint-cell{
      height: 82px;
      margin: 0 32px;
      border-bottom: 1px solid rgba(222,222,222,1);
      &:last-child{
        border-bottom: none;
      }
      .mint-cell-value{
        color:rgba(152,152,152,1);
        font-size:24px;
        margin-right: 480px;
      }
      .mint-cell-wrapper{
        padding:0;
        .mint-cell-title{
          padding: 26px 0;
          font-size:24px;
          font-weight:300;
          color:rgba(25,25,25,1);
        }
      }
    }
    .mint-indexlist-navlist{
      position: fixed;
      top:50%;
      right: 2px;
      transform: translateY(-50%);
      font-size:24px;
      color:rgba(57,158,246,1);
      .mint-indexlist-navitem{
        font-size:24px;
      }
    }
  }
</style>
