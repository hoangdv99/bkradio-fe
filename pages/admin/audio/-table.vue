<template>
  <div>
    <v-col cols="12" sm="8">
      <v-text-field
        v-model="keyword"
        label="Tìm kiếm"
        prepend-inner-icon="mdi-magnify"
        color="blue-grey"
        @input="search"
      ></v-text-field>
    </v-col>
    <v-data-table :headers="headers" :items="audios" hide-default-footer>
      <template #[`item.audioDescription`]="{ item }">
        <div class="d-flex align-center pt-1 pb-1 audio-info">
          <img
            width="160"
            height="120"
            :src="item.thumbnailUrl || require('@/assets/images/no-photo.png')"
            class="mr-2 thumbnail"
          />
          <div class="description">
            <p class="text-left mb-0 font-weight-medium">{{ item.title }}</p>
            <p class="text-left mb-0">
              Thể loại: {{ item.topics && item.topics.join(', ') }}
            </p>
            <p class="text-left mb-0">Giọng đọc: {{ item.voice }}</p>
            <p class="text-left mb-0">Tác giả: {{ item.author }}</p>
            <p v-if="!item.updatedAt" class="text-left mb-0">
              Ngày đăng tải: {{ new Date(item.createdAt).toLocaleDateString() }}
            </p>
            <p v-else class="text-left mb-0">
              Ngày cập nhật: {{ new Date(item.updatedAt).toLocaleDateString() }}
            </p>
            <p class="text-left mb-0 summary">
              {{ item.description || 'Thêm mô tả' }}
            </p>
          </div>
        </div>
      </template>
      <template #[`item.status`]="{ item }">
        <span>{{ convertStatus(item.status) }}</span>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          class="mx-0"
          fab
          dark
          x-small
          color="blue-grey"
          @click="goToDetailPage(item.slug)"
        >
          <v-icon dark> mdi-eye </v-icon>
        </v-btn>
        <v-btn
          class="mx-0"
          fab
          dark
          x-small
          color="amber"
          @click="goToEditPage(item.id)"
        >
          <v-icon dark> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          class="mx-0"
          fab
          dark
          x-small
          color="red"
          @click="deleteAudio(item.id)"
        >
          <v-icon dark> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="lastPage"
      total-visible="7"
      color="blue-grey"
      class="mt-4"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>
<script>
import Audios from '@/models/audios'
import { createNamespacedHelpers } from '~/util'
const layoutNamespaceHelpers = createNamespacedHelpers('layout')

export default {
  name: 'AudioList',
  data() {
    return {
      headers,
      audios: [],
      perPage: 10,
      page: 1,
      totalPages: 0,
      lastPage: 0,
      timeout: null,
      keyword: '',
    }
  },
  computed: {
    heightCard() {
      const { top, bar } = this.$vuetify.application
      return `calc(100vh - ${top + bar}px - 200px)`
    },
  },
  async mounted() {
    await this.getAudios()
  },
  methods: {
    convertStatus(status) {
      if (status === 1) return 'Công khai'
      return 'Riêng tư'
    },
    goToEditPage(id) {
      this.$router.push({ path: '/admin/audio/edit', query: { audioId: id } })
    },
    goToDetailPage(slug) {
      window.open(`/audio/${slug}`, '_blank')
    },
    async deleteAudio(id) {
      try {
        if (confirm('Bạn có chắc chắn muốn xóa audio này không?')) {
          await Audios.deleteAudio(id)
          layoutNamespaceHelpers.$dispatch('setSnackbar', {
            showing: true,
            text: 'Xóa audio thành công',
            color: 'success',
          })
          this.audios = await Audios.getAudios({})
        }
      } catch (error) {
        layoutNamespaceHelpers.$dispatch('setSnackbar', {
          showing: true,
          text: 'Có lỗi xảy ra',
          color: 'error',
        })
      }
    },
    handlePageChange(value) {
      this.page = value
      this.getAudios()
    },
    async getAudios() {
      const { audios, pagination } = await Audios.getAudios({
        page: this.page,
        perPage: this.perPage,
      })
      this.audios = audios
      this.lastPage = pagination.lastPage
    },
    search() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        const { audios } = await Audios.getAudios({
          searchKeyword: this.keyword,
        })
        this.audios = audios
      }, 500)
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
    sortable: false,
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
    text: 'Hành động',
    value: 'actions',
    width: 150,
    align: 'center',
    sortable: false,
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
