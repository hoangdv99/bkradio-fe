<template>
  <div class="type-audio-page">
    <div class="container">
      <common-audio-list
        :title="audioType"
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
import { audioTypes } from '@/constants'
const { $get } = createNamespacedHelpers('layout')
export default {
  name: 'TypeAudioPage',
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
    device: $get('device'),
    audioType() {
      return audioTypes.find(e => e.slug === this.$route.params.slug).name
    }
  },
  async mounted() {
    const { audios, pagination } = await Audios.getAudios({
      page: this.page,
      perPage: 24,
      type: this.$route.params.slug,
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
        type: this.$route.params.slug,
      })
      this.audios = [...this.audios, ...audios]
    },
  },
}
</script>
<style lang="scss" scoped>
.type-audio-page {
  > .container {
    display: flex;
    @include sp {
      padding: 0;
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
