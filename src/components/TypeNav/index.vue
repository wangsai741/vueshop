<template>
  <div class="type-nav">
    <div class="container">
      <!-- @mouseleave  是事件委托，给父级 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 事件委派 + 编程式导航,实现路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 添加自定义属性 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="Search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二级,三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="Search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="Search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入lodash节流
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发送请求
  mounted() {
    // 判断在哪个组件，控制show，对typeNav隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧是一个函数，当使用这个计算属性时，会调用一次
      // 参数state，为大仓库的数据
      // 可以用namespace，这里没用
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      // 鼠标移入的一级分类的索引值
      // 操作过块，可能出现卡顿，需要节流
      this.currentIndex = index;
    }, 50),

    // 进行路由跳转
    goSearch(event) {
      // 最好的办法，编程式导航 + 事件委派
      // 问题只把a标签，进行路由跳转，点击a标签区分一级，二级，三级。使用自定义属性
      let element = event.target;

      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 有categorynames属性一定为a标签
      if (categoryname) {
        // 整理参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 区分一二三级
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 判断是否有params参数，一起携带
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理参数
          // this.$router.push({name:"search",query:{categoryName:'xxx',2id:'xxx'}})
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 移入
    enterShow() {
      this.show = true;
    },
    // 移出
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过度动画
    // 开始（进入）
    .sort-enter {
      height: 0px;
    }
    // 结束（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>