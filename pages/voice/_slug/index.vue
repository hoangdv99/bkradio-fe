<template>
  <div class="voice-audio-page">
    <div class="container">
      <common-audio-list
        :title="voice"
        :audios="audios"
        :page="page"
        :total-page="totalPage"
        class="content"
        @loadMore="loadMore"
      ></common-audio-list>
      <common-sidebar v-if="device !== 'mobile'"></common-sidebar>
    </div>
  </div>
</template>
<script>
import Audios from '@/models/audios.js'
import { createNamespacedHelpers } from '@/util'
const { $get } = createNamespacedHelpers('layout')
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
    voice() {
      return this.audios.length ? this.audios[0].voice : ''
    },
    device: $get('device'),
  },
  async mounted() {
    const { audios, pagination } = await Audios.getAudios({
      page: this.page,
      perPage: 24,
      voice: this.$route.params.slug,
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
        voice: this.$route.params.slug,
      })
      this.audios = [...this.audios, ...audios]
    },
  },
}
</script>
<style lang="scss" scoped>
.voice-audio-page {
  > .container {
    display: flex;
    @include sp {
      padding: 0;
      height: 100%;
    }
  }
  > .container > .content {
    @include sp {
      width: 100%;
    }
    width: 66.667%;
  }
}
</style>
