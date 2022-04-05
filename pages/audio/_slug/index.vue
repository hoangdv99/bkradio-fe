<template>
  <div class="detail-page">
    <v-skeleton-loader
      v-if="!audio"
      type="heading, card-heading, card, text@5, actions"
    ></v-skeleton-loader>
    <div v-else class="container">
      <div class="content">
        <div class="post-detail">
          <div class="header">
            <h1 class="title">
              {{ audio.title + ' | ' + audio.author }}
            </h1>
            <h2 class="subtitle">Giọng Đọc : {{ audio.voice }}</h2>
            <div class="statistic">
              <div class="comment">
                <font-awesome-icon :icon="commentIcon"></font-awesome-icon>
                <span>0</span>
              </div>
              <div class="view">
                <font-awesome-icon :icon="viewIcon"></font-awesome-icon>
                <span>{{ audio.views }}</span>
              </div>
            </div>
          </div>
          <div class="featured">
            <img :src="audio.thumbnailUrl" alt="image" class="image" />
            <vue-plyr>
              <audio
                ref="player"
                controls
                crossorigin
                playsinline
                :src="audio.url"
              ></audio>
            </vue-plyr>
          </div>
          <div class="description">{{ audio.description }}</div>
          <p class="notice">
            Các bạn nếu không nghe được audio, vui lòng gửi thông báo ở phần
            bình luận bên dưới. Ad sẽ chỉnh sửa trong thời gian sớm nhất, thanks
            các bạn nhiều nhiều !
          </p>
          <div class="rating">
            <star-rating
              v-model="audio.rating"
              :increment="1"
              :star-size="30"
              :show-rating="false"
              :read-only="!$auth.loggedIn"
              active-on-click
              class="stars"
              @rating-selected="updateRating"
            />
            <p class="text">10 bình chọn</p>
          </div>
          <div v-if="!$auth.loggedIn" class="alert">
            Bạn cần <nuxt-link to="/auth/login">đăng nhập</nuxt-link> để bình
            chọn
          </div>
          <div class="tags">
            <a
              v-for="(topic, index) in audio.topics"
              :key="index"
              href="#"
              class="tag"
              >#{{ topic }}</a
            >
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
      <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <v-card>
        <v-card-title class="text-h5">
          Tiếp tục nghe?
        </v-card-title>
        <v-card-text>Lần trước bạn đã nghe đến {{ convertTime(audio.history) }}</v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            color="orange darken-1"
            text
            class="float-left"
            @click="listenFromStart"
          >
            Nghe từ đầu
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="resumeListening"
          >
            Tiếp tục nghe
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <common-sidebar />
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComments, faEye } from '@fortawesome/free-solid-svg-icons'
import CommentBlock from './-comment.vue'
import Audios from '@/models/audios'
export default {
  layoutContent() {
    return {
      showSidebar: true,
    }
  },
  name: 'DetailPage',
  components: {
    FontAwesomeIcon,
    CommentBlock,
  },
  data() {
    return {
      commentIcon: faComments,
      viewIcon: faEye,
      audio: null,
      dialog: false,
    }
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.saveHistory)
  },
  async mounted() {
    this.audio = await Audios.getAudioBySlug(this.$auth.user.userId, this.$route.params.slug)
    await Audios.updateView(this.audio.id, this.$auth.user.userId)
    if (this.audio.history && this.audio.history > 0) {
      this.dialog = true
    }
  },
  beforeDestroy() {
    this.saveHistory()
    window.removeEventListener('beforeunload', this.saveHistory)
  },
  methods: {
    async updateRating() {
      await Audios.updateRating(
        this.audio.id,
        this.$auth.user.userId,
        this.audio.rating
      )
      // this.audio = await Audios.getAudioBySlug(this.$route.params.slug)
    },
    async saveHistory() {
      const currentPlayingTime = this.$refs.player?.currentTime
      if (currentPlayingTime > 0) {
        const audioLength = this.$refs.player.duration
        await Audios.saveHistory(
          this.audio.id,
          this.$auth.user.userId,
          currentPlayingTime,
          audioLength
        )
      }
    },
    convertTime(second) {
      return second ? new Date(second * 1000).toISOString().substr(11, 8) : null
    },
    listenFromStart() {
      this.dialog = false
      this.$refs.player.play()
    },
    resumeListening() {
      this.dialog = false
      this.$refs.player.currentTime = this.audio.history
      this.$refs.player.play()
    }
  },
}
</script>
<style lang="scss">
.detail-page {
  > .container {
    display: flex;
  }
  > .container > .content {
    width: 66%;
  }
}
.post-detail {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-bottom: 30px;
  > .header {
    padding: 30px 30px 20px;
  }
  > .header > .title {
    font-size: 30px !important;
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
    margin-bottom: 0;
    font-size: 15px;
  }
  > .alert {
    padding: 0 30px 20px;
    text-align: right;
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