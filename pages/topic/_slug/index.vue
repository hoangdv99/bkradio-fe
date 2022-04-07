<template>
  <div class="topic-audio-page">
    <div class="container">
      <div class="content">
        <h1 class="header">{{ topic }}</h1>
        <div class="list">
          <div
            v-for="audio in audios"
            :key="audio.id"
            :style="{
              backgroundImage: `url(${audio.thumbnailUrl})`,
            }"
            class="post"
          >
            <div class="overlay">
              <span class="title">{{ audio.title }} | {{ audio.author }}</span>
            </div>
          </div>
        </div>
        <v-btn
          v-if="page < totalPage"
          block
          depressed
          color="blue-grey"
          text
          class="mt-4"
          @click="loadMore"
        >
          Xem thêm
        </v-btn>
      </div>
      <common-sidebar></common-sidebar>
    </div>
  </div>
</template>
<script>
import Audios from '@/models/audios.js'
export default {
  name: 'TopicAudioPage',
  data() {
    return {
      page: 1,
      totalPage: 0,
      audios: [],
    }
  },
  computed: {
    topic() {
      return this.audios.length ? this.audios[0].topics[0] : ''
    },
  },
  async mounted() {
    const { audios, pagination } = await Audios.getAudios({
      page: this.page,
      perPage: 24,
      topic: this.$route.params.slug,
    })
    this.audios = audios
    console.log(pagination);
    this.totalPage = pagination.lastPage
  },
  methods: {
    async loadMore() {
      this.page++
      const { audios } = await Audios.getAudios({
        page: this.page,
        perPage: 24,
        topic: this.$route.params.slug,
      })
      this.audios = [...this.audios, ...audios]
    },
  },
}
</script>
<style lang="scss" scoped>
.topic-audio-page {
  > .container {
    display: flex;
  }
  > .container > .content {
    width: 66.667%;
  }
  > .container > .content > .header {
    margin-bottom: 20px;
  }
  > .container > .content > .list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  > .container > .content > .list > .post {
    background-size: cover;
    width: 32%;
    height: 150px;
    border-radius: 15px;
    margin: 4px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: translateY(-0.1rem);
    }
  }
  > .container > .content > .list > .post > .overlay {
    position: relative;
    padding: 20px 15px 10px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.75)
    );
    border-radius: 15px;
  }
  > .container > .content > .list > .post > .overlay > .title {
    position: absolute;
    bottom: 10px;
    text-transform: capitalize;
    font-size: 16px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    line-height: 1.4;
    font-weight: 600;
  }
}
</style>
