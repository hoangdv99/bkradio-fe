<template>
  <div class="topic-audio-page">
    <div class="container">
      <common-audio-list
        :title="topic"
        :audios="audios"
        :page="page"
        :total-page="totalPage"
        class="content"
        @loadMore="loadMore"
      ></common-audio-list>
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
}
</style>
