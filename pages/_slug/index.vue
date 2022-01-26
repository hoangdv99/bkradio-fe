<template>
  <div class="detail-page">
    <div class="post-detail">
      <div class="header">
        <h1 class="title">
          Bỉ Ngạn Hoa | Biên Niên Cô Đơn | Nguyễn Ngọc Thạch
        </h1>
        <h2 class="subtitle">Giọng Đọc : Trần Ngọc San</h2>
        <div class="statistic">
          <div class="comment">
            <font-awesome-icon :icon="commentIcon"></font-awesome-icon>
            <span>0</span>
          </div>
          <div class="view">
            <font-awesome-icon :icon="viewIcon"></font-awesome-icon>
            <span>1000</span>
          </div>
        </div>
      </div>
      <div class="featured">
        <img
          src="https://i0.wp.com/hemradio.com/wp-content/uploads/2021/10/bi-ngan-hoa-bien-nien-co-don-nguyen-ngoc-thach.gif?resize=780%2C470&ssl=1"
          alt="image"
          class="image"
        />
        <vue-plyr>
          <audio controls crossorigin playsinline>
            <source
              src="https://archive.org/download/y-2mate.com-bi-nga-n-hoa-bie-n-nie-n-co-do-n-tac-gia-nguyen-ngoc-thach-giong-doc/y2mate.com%20-%20B%E1%BB%88%20NG%E1%BA%A0N%20HOA%20%20BI%C3%8AN%20NI%C3%8AN%20C%C3%94%20%C4%90%C6%A0N%20%20T%C3%A1c%20gi%E1%BA%A3%20Nguy%E1%BB%85n%20Ng%E1%BB%8Dc%20Th%E1%BA%A1ch%20%20Gi%E1%BB%8Dng%20%C4%91%E1%BB%8Dc%20Tr%E1%BA%A7n%20Ng%E1%BB%8Dc%20San%20%20PH%E1%BB%90%20RADIO.mp3?_=1"
              type="audio/mp3"
            />
          </audio>
        </vue-plyr>
      </div>
      <div class="description">
        Link mua sách BIÊN NIÊN CÔ ĐƠN và các tác phẩm đặc sắc khác của nhà văn
        Nguyễn Ngọc Thạch: Shopee: https://shp.ee/kpe6w66 Tiki:
        https://bit.ly/3A4Rogw Trong video có sử dụng các Lyrics Music Video là
        sáng tác và sự thể hiện của Ca nhạc sĩ Duy Khiêm Ngố: – Thất Tình Chẳng
        Sao. – Ngàn Năm. – Ngồi Ngắm Hoa Tàn. – Biên Niên Cô Đơn. Phố Radio xin
        tri ân nhà văn Nguyễn Ngọc Thạch và Ca nhạc sĩ Duy Khiêm Ngố đã đồng ý
        cho Phố Radio sử dụng những nguồn tư liệu quý giá này. Mong quý vị khán
        thính giả gần xa tiếp tục ủng hộ hai nghệ sĩ trẻ này. Để nghe thêm các
        tác phẩm truyện audio khác được thực hiện bởi Phố Radio cùng nhiều giọng
        đọc hay, hãy tìm thêm trên kênh Phố Radio. Rất mong, Phố Radio sẽ là địa
        chỉ nghe radio, nghe đọc truyện online, đọc truyện ngắn, nghe đọc truyện
        đêm khuya quen thuộc với quý khán thính giả gần xa. 📌Liên hệ với Phố
        Radio: Facebook: https://www.facebook.com/PhoRadioOffi… Email:
        Phoradiovn@gmail.com Mọi đóng góp, giúp đỡ cho Phố Radio, xin gửi về:
        PayPal: tranngocsan2007@gmail.com Techcombank: 19027463618018 – Tran
        Ngoc San – Chi Nhánh Quận 03, TP.HCM. Momo: 0933100192 – Tran Ngoc San.
        Xin chân thành cảm ơn.
      </div>
      <p class="notice">
        Các bạn nếu không nghe được audio, vui lòng gửi thông báo ở phần bình
        luận bên dưới. Ad sẽ chỉnh sửa trong thời gian sớm nhất, thanks các bạn
        nhiều nhiều !
      </p>
      <div class="rating">
        <star-rating
          :increment=0.5
          :star-size=30
          :show-rating=false
          class="stars"
        />
        <p class="text">10 bình chọn</p>
      </div>
      <div class="tags">
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
        <a href="#" class="tag">#Hem radio</a>
      </div>
    </div>
    <div class="related-posts">
      <h3 class="title">Có thể bạn quan tâm...</h3>
      <ul class="list">
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
        <a href="" class="post">
          <img
            src="https://i0.wp.com/hemradio.com/wp-content/uploads/2020/11/audio-dong-hao-co-ma.gif?resize=390%2C220&ssl=1"
            alt="post"
            class="thumbnail"
          />
          Đồng Hào Có Ma | Nguyễn Công Hoan
        </a>
      </ul>
    </div>
    <comment-block></comment-block>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComments, faEye } from '@fortawesome/free-solid-svg-icons'
import CommentBlock from './-comment.vue'
export default {
  layoutContent() {
    return {
      showSidebar: true,
      breadcrumbs: [
        {
          name: 'Truyện ngắn',
          url: '#',
        },
        {
          name: 'Phận đàn bà | Y mùi',
          url: '#',
        },
      ],
    }
  },
  name: 'DetailPage',
  components: {
    FontAwesomeIcon,
    CommentBlock
  },
  data() {
    return {
      commentIcon: faComments,
      viewIcon: faEye,
    }
  },
}
</script>
<style lang="scss">
.post-detail {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-bottom: 30px;
  > .header {
    padding: 30px 30px 20px;
  }
  > .header > .title {
    font-size: 30px;
    text-transform: capitalize;
    margin-bottom: 15px;
    line-height: 1.4;
    color: #2c3f34;
  }
  > .header > .subtitle {
    font-size: 22px;
    line-height: 27px;
    font-weight: normal;
    margin-top: -5px;
    margin-bottom: 15px;
    color: #777777;
    font-family: inherit;
    letter-spacing: 0;
  }
  > .header > .statistic {
    display: flex;
    justify-content: right;
  }
  > .header > .statistic > .comment {
    margin-right: 10px;
  }
  > .featured {
    margin-bottom: 30px;
  }
  > .featured > .image {
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  > .featured > .plyr > .plyr__controls {
    background: #9ebaa0;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  > .featured > .plyr > .plyr__controls > .plyr__controls__item {
    color: #fff;
  }
  > .description {
    padding: 0 30px 20px;
    font-size: 15px;
    color: #2c2f34;
    line-height: 25px;
  }
  > .rating {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30px 20px;
  }
  > .rating > .text {
    margin-left: 10px;
    font-size: 15px;
  }
  > .notice {
    padding: 0 30px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #ff6600;
  }
  > .tags {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    padding: 0 30px 20px;
  }
  > .tags > .tag {
    font-size: 15px;
    color: #2c2f34;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    margin: 5px;
    font-weight: 700;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.03);
    &:hover {
      color: #9ebaa0;
      transform: 0.15s;
    }
  }
}
.related-posts {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 30px 30px 20px;
  margin-bottom: 30px;
  > .title {
    position: relative;
    opacity: 0.99;
    display: inline-block !important;
    width: auto;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 5px 10px;
    color: #fff;
    background-color: #9ebaa0;
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
      background-color: #9ebaa0;
      -webkit-transform: skew(-40deg) translateX(14px);
      -ms-transform: skew(-40deg) translateX(14px);
      transform: skew(-40deg) translateX(14px);
      z-index: -1;
    }
  }
  > .list {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }
  > .list > .post {
    width: 30%;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 19px;
    color: #2c2f34;
    font-weight: 600;
    &:hover {
      color: #9ebaa0;
      transform: 0.15s;
      opacity: 0.8;
    }
  }
  > .list > .post > .thumbnail {
    border-radius: 15px;
  }
}
</style>