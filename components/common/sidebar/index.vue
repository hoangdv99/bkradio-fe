<template>
  <div class="app-sidebar">
    <div class="wrapped-content -lastviewed">
      <div class="title">
        <font-awesome-icon
          :icon="thumbtackIcon"
          class="icon"
        ></font-awesome-icon>
        Bạn Vừa Nghe
      </div>
      <ul class="posts">
        <a href="" class="post">Phận Đàn Bà | Y Mùi</a>
        <a href="" class="post">Phận Đàn Bà | Y Mùi</a>
        <a href="" class="post">Phận Đàn Bà | Y Mùi</a>
      </ul>
    </div>
    <div class="wrapped-content -mostviewed">
      <div class="title">
        <font-awesome-icon :icon="bookIcon" class="icon"></font-awesome-icon>
        Nghe nhiều nhất
      </div>
      <ul class="posts">
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
        <li class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/muon-kiep-nhan-sinh-nguyen-phong.gif?resize=220%2C150&ssl=1"
            alt="thumbnail"
            class="thumbnail"
          />
          <a href="" class="title">Muôn Kiếp Nhân Sinh | Nguyên Phong</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbtack, faBook } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'AppSidebar',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      thumbtackIcon: faThumbtack,
      bookIcon: faBook,
    }
  },
}
</script>
<style lang="scss" scoped>
.app-sidebar {
  position: relative;
  overflow: visible;
  width: 33.33333%;
  padding: 0 15px;
}
.wrapped-content {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  > .title {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    width: auto;
    font-size: 15px;
    line-height: 27px;
    font-weight: 500;
    margin-bottom: 20px;
    background-color: #627c83;
    color: #fff;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 70%;
      height: 100%;
      background-color: #627c83;
      -webkit-transform: skew(-40deg) translateX(14px);
      -ms-transform: skew(-40deg) translateX(14px);
      transform: skew(-40deg) translateX(14px);
      z-index: -1;
    }
  }
  > .title > .icon {
    width: 10px;
    height: 15px;
    margin-right: 5px;
  }
  &.-lastviewed > .posts > .post {
    display: block;
    padding: 6px 0;
    color: #333;
    transition: 0.15s;
    &:hover {
      color: #627c83;
    }
  }
  &.-mostviewed > .posts {
    counter-reset: post-widget-counter;
  }
  &.-mostviewed > .posts > .post {
    position: relative;
    display: flex;
    padding: 7px 0;
    text-align: start;
    &:last-child {
      padding-top: 0;
    }
    &::before {
      display: block;
      width: 30px;
      height: 30px;
      content: counter(post-widget-counter, decimal);
      counter-increment: post-widget-counter;
      position: absolute;
      z-index: 2;
      top: 0;
      left: -15px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 26px;
      border: 2px solid #ffffff;
      background: #9ebaa0;
      color: #fff;
      border-radius: 100%;
    }
  }
  &.-mostviewed > .posts > .post > .thumbnail {
    width: 110px;
    border-radius: 15px;
    margin-right: 15px;
    cursor: pointer;
  }
  &.-mostviewed > .posts > .post > .title {
    font-size: 14px;
    line-height: 1.4;
    color: #333;
    font-weight: 600;
    transition: 0.15s;
    &:hover {
      color: #9ebaa0;
    }
  }
}
</style>