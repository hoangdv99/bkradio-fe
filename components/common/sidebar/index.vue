<template>
  <div class="app-sidebar">
    <div class="wrapped-content -lastviewed">
      <div class="title">
        <font-awesome-icon
          :icon="thumbtackIcon"
          class="icon"
        ></font-awesome-icon>
        Danh sách tiếp tục nghe
      </div>
      <div v-if="$auth.loggedIn" class="posts">
        <nuxt-link
          v-for="audio in lastViewedAudios"
          :key="audio.id"
          :to="`/audio/${audio.slug}`"
          class="post"
          >{{ audio.title }} | {{ audio.author
          }}<span class="ml-4">{{
            convertTime(audio.currentListeningTime)
          }}</span></nuxt-link
        >
      </div>
      <p v-else>
        <nuxt-link to="/auth/login">Đăng nhập</nuxt-link> để sử dụng tính năng
        này
      </p>
    </div>
    <div class="wrapped-content -mostviewed">
      <div class="title">
        <font-awesome-icon :icon="bookIcon" class="icon"></font-awesome-icon>
        Nghe nhiều nhất
      </div>
      <v-tabs color="blue-grey" class="mt-2 mb-2">
        <v-tab @click="getTrendingAudios('all')">Tất cả</v-tab>
        <v-tab @click="getTrendingAudios('all')">Tuần</v-tab>
        <v-tab @click="getTrendingAudios('all')">Tháng</v-tab>
      </v-tabs>
      <div class="posts">
        <li
          v-for="audio in trendingAudios"
          :key="audio.id"
          class="post"
          @click="goToDetailPage(audio)"
        >
          <img :src="audio.thumbnailUrl" alt="thumbnail" class="thumbnail" />
          <p :to="`/audio/${audio.slug}`" class="title">
            {{ audio.title }} | {{ audio.author }}
          </p>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbtack, faBook } from '@fortawesome/free-solid-svg-icons'
import Audios from '~/models/audios'

export default {
  name: 'AppSidebar',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      thumbtackIcon: faThumbtack,
      bookIcon: faBook,
      lastViewedAudios: [],
      trendingAudios: [],
    }
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      this.lastViewedAudios = await Audios.getLastViewedAudios(
        this.$auth.user.userId
      )
    }
    await this.getTrendingAudios('all')
  },
  methods: {
    async getTrendingAudios(period) {
      const audios = await Audios.getTrendingAudios(period)
      this.trendingAudios = audios
    },
    goToDetailPage(audio) {
      this.$router.push(`/audio/${audio.slug}`)
    },
    convertTime(second) {
      return new Date(second * 1000).toISOString().substr(11, 8)
    },
  },
}
</script>
<style lang="scss" scoped>
.app-sidebar {
  position: relative;
  overflow: visible;
  width: 33.33333%;
  padding: 0 15px;
  > .wrapped-content {
    margin-bottom: 20px;
  }
}
.wrapped-content {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 30px;
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
  &.-mostviewed > .title {
    margin-bottom: 0;
  }
  &.-mostviewed > .posts {
    counter-reset: post-widget-counter;
  }
  &.-mostviewed > .posts > .post {
    position: relative;
    display: flex;
    padding: 7px 0;
    text-align: start;
    transition: 0.3s;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: translateY(-0.15rem);
      box-shadow: 0 4px 7px rgb(0 0 0 / 20%);
    }
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
    width: 120px;
    height: 80px;
    border-radius: 15px;
    margin-right: 15px;
    cursor: pointer;
  }
  &.-mostviewed > .posts > .post > .title {
    font-size: 14px !important;
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