<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
                    <img src="./images/floor-1-b02.png" />
                  </div>
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b03.png" />
                  </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler(newValue, oldValer) {
        // 用watch监视bannerList属性的属性值的变化，执行handler时，表示这个属性已经变化
        // 但是bannerList数据已经有了，v-for不一定已经执行完成了，可能没用结构
        // nextTick:在下次DOM更新 循环结束之后 执行延迟回调.在 修改数据之后 立即使用这个方法,获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped lang="less">
</style>