<template>
  <div class="edit-page">
    <div class="edit-page-title d-flex justify-space-between align-center">
      <h1 class="title">Chi tiết Audio</h1>
      <div class="actions">
        <v-btn
          color="orange darken-2"
          class="ma-2 white--text"
          dark
          @click="$router.push('/admin/audio')"
        >
          <v-icon dark left> mdi-arrow-left </v-icon>
          Quay lại
        </v-btn>
        <v-btn
          :disabled="!formIsValid"
          color="blue-grey"
          class="white--text"
          @click="save"
        >
          Lưu
          <v-icon class="ml-2" dark left> mdi-content-save </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="edit-page-content d-flex">
      <v-col cols="8" class="content mr-3">
        <v-col full-width>
          <v-text-field
            v-model="audio.title"
            label="Tiêu đề* (Bắt buộc)"
            outlined
            counter="200"
            required
          ></v-text-field>
        </v-col>
        <v-col full-width class="pt-0">
          <v-textarea
            v-model="audio.description"
            outlined
            name="input-7-4"
            label="Mô tả"
            counter="5000"
          ></v-textarea>
        </v-col>
        <div>
          <v-autocomplete
            v-model="audio.topicIds"
            :items="topics"
            class="d-flex pt-0 ml-3 mr-3"
            label="Chủ đề"
            item-text="title"
            item-value="id"
            dense
            outlined
            small-chips
            deletable-chips
            multiple
            required
          ></v-autocomplete>
        </div>
        <v-col cols="6" class="d-flex flex-row justify-start pt-0 pb-0">
          <v-autocomplete
            v-model="audio.authorId"
            :items="authors"
            class="d-flex"
            label="Tác giả"
            item-text="name"
            item-value="id"
            dense
            outlined
            required
          ></v-autocomplete>
          <new-author-popup class="mt-0"></new-author-popup>
        </v-col>
        <v-col cols="6" class="d-flex flex-row justify-start pt-0">
          <v-autocomplete
            v-model="audio.voiceId"
            :items="voices"
            class="d-flex"
            label="Giọng đọc"
            item-text="name"
            item-value="id"
            dense
            outlined
            required
          ></v-autocomplete>
          <new-voice-popup class="mt-0"></new-voice-popup>
        </v-col>
      </v-col>
      <v-col cols="4" class="audio-section pt-5">
        <p>Thumbnail</p>
        <div class="d-flex flex-column justify-space-between align-center mb-2">
          <v-img
            :lazy-src="require('@/assets/images/no-photo.png')"
            :src="audio.thumbnailUrl"
            width="100%"
            class="mb-2"
          ></v-img>
          <v-btn depressed text color="primary" @click="onUploadBtnClick">
            Tải ảnh lên
          </v-btn>
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/*"
            @change="onThumbnailChanged"
          />
        </div>
        <audio v-if="audio.url" controls class="mb-4 audio">
          <source :src="audio.url" type="audio/mpeg" />
        </audio>
        <p class="mb-0">Audio link</p>
        <a :href="audio.url" target="_blank">{{ audio.url }}</a>
        <v-col class="d-flex pl-0 pr-0 pt-4">
          <v-select
            v-model="audio.status"
            :items="statuses"
            label="Chế độ hiển thị"
            item-text="label"
            item-value="value"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-col>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from '~/util'
import Audios from '@/models/audios'
const { $get, $dispatch } = createNamespacedHelpers('audios')
const layoutNamespaceHelpers = createNamespacedHelpers('layout')

export default {
  name: 'EditPage',
  layoutContent() {
    return {
      showSidebar: false,
      breadcrumbs: [
        {
          name: 'Chỉnh sửa audio',
          url: '#',
        },
      ],
    }
  },
  data() {
    return {
      audio: {
        title: null,
        description: null,
        authorId: null,
        voiceId: null,
        thumbnailUrl: null,
        url: null,
        topicIds: [],
      },
      thumbnail: null,
      isSelecting: false,
      topics: [],
      rules: {
        title: [(value) => !!value || 'Tiêu đề không được bỏ trống'],
        author: [(value) => !!value || 'Tác giả không được bỏ trống'],
        voice: [(value) => !!value || 'Giọng đọc không được bỏ trống'],
        topic: [(value) => !!value || 'Thể loại không được bỏ trống'],
      },
      statuses: [
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Riêng tư' },
      ],
    }
  },
  computed: {
    authors: $get('authors'),
    voices: $get('voices'),
    formIsValid() {
      return (
        !this.isUploading &&
        this.audio.title &&
        this.audio.authorId &&
        this.audio.voiceId
      )
    },
  },
  async mounted() {
    if (!this.authors.length) await $dispatch('getAuthors')
    if (!this.voices.length) await $dispatch('getVoices')
    this.audio = await Audios.getAudio(this.$route.query.audioId)
    this.topics = await Audios.getTopics()
  },
  methods: {
    async save() {
      if (this.formIsValid) {
        const result = await Audios.updateAudio({
          id: this.audio.id,
          title: this.audio.title,
          description: this.audio.description,
          authorId: this.audio.authorId,
          voiceId: this.audio.voiceId,
          thumbnailUrl: this.audio.thumbnailUrl,
          topicIds: this.audio.topicIds,
          status: this.audio.status,
        })
        if (result.status === 200) {
          layoutNamespaceHelpers.$dispatch('setSnackbar', {
            showing: true,
            text: 'Chỉnh sửa audio thành công',
            color: 'success',
          })
          await $dispatch('getAudios')
        } else {
          layoutNamespaceHelpers.$dispatch('setSnackbar', {
            showing: true,
            text: 'Có lỗi xảy ra',
            color: 'error',
          })
        }
      }
    },
    async onThumbnailChanged(e) {
      this.thumbnail = e.target.files[0]
      this.audio.thumbnailUrl = URL.createObjectURL(this.thumbnail)
      await this.uploadThumbnail()
    },
    onUploadBtnClick() {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )
      this.$refs.uploader.click()
    },
    generateUniqueFileName(fileName) {
      return Math.floor(Date.now() + Math.random()) + '_' + fileName
    },
    async uploadThumbnail() {
      const { signedUrl, fileUrl } = await Audios.getS3PresignedUrl({
        fileName: this.generateUniqueFileName(this.thumbnail.name),
        fileType: 'image',
      })
      await Audios.uploadToS3(signedUrl, this.thumbnail)
      this.audio.thumbnailUrl = fileUrl
    },
  },
}
</script>
<style lang="scss">
.audio-section {
  > .audio {
    width: 100%;
  }
}
</style>
