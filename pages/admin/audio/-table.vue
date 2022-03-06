<template>
  <v-data-table :headers="headers" :items="audioList" :items-per-page="5">
    <template #[`item.audioDescription`]="{ item }">
      <div class="d-flex align-center pt-1 pb-1 audio-info">
        <img
          width="120"
          height="80"
          :src="item.thumbnailUrl || require('@/assets/images/no-photo.png')"
          class="mr-2 thumbnail"
        />
        <div class="description">
          <p class="text-left mb-0 font-weight-medium">{{ item.title }}</p>
          <p class="text-left mb-0">Thể loại: {{ item.topics.join(', ') }}</p>
          <p class="text-left mb-0">Giọng đọc: {{ item.voice }}</p>
          <p class="text-left mb-0">Tác giả: {{ item.author }}</p>
          <p class="text-left mb-0 summary">
            {{ item.description || 'Thêm mô tả' }}
          </p>
        </div>
      </div>
    </template>
    <template #[`item.status`]="{ item }">
      <span>{{ convertStatus(item.status) }}</span>
    </template>
    <template #[`item.actions`]>
      <v-btn class="mx-2" fab dark small color="amber">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small color="red">
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import Audio from '@/models/audios'
export default {
  name: 'AudioList',
  data() {
    return {
      headers,
      audioList: [],
    }
  },
  async fetch() {
    this.audioList = await Audio.getAudios()
  },
  computed: {
    heightCard() {
      const { top, bar } = this.$vuetify.application
      return `calc(100vh - ${top + bar}px - 200px)`
    },
  },
  methods: {
    convertStatus(status) {
      if (status === 1) return 'Công khai'
      return 'Riêng tư'
    },
  },
}
const headers = [
  {
    text: 'Audio',
    value: 'audioDescription',
    sortable: false,
    align: 'center',
  },
  {
    text: 'Trạng thái',
    value: 'status',
    width: 120,
    align: 'center',
  },
  {
    text: 'Lượt xem',
    value: 'views',
    sortable: true,
    width: 120,
    sort: (a, b) => a - b,
    align: 'center',
  },
  {
    text: 'Bình luận',
    value: 'comment',
    width: 120,
    sortable: true,
    align: 'center',
  },
  {
    text: 'Hành động',
    value: 'actions',
    width: 150,
    align: 'center',
  },
]
</script>
<style lang="scss">
.audio-info {
  > .thumbnail {
    cursor: pointer;
  }
  > .description > .summary {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
