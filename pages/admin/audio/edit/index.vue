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
        <v-col>
          <v-text-field
            v-model="audio.title"
            label="Tiêu đề* (Bắt buộc)"
            outlined
            counter="200"
            required
          ></v-text-field>
        </v-col>
        <v-col class="pt-0">
          <!-- <v-textarea
            v-model="audio.description"
            outlined
            name="input-7-4"
            label="Mô tả"
            counter="5000"
            no-resize
          ></v-textarea> -->
          <ckeditor v-model="audio.description"></ckeditor>
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
        <v-col class="d-flex pt-0" cols="12" sm="6">
          <v-select
            v-model="audio.type"
            :items="types"
            item-text="label"
            item-value="value"
            label="Thể loại"
            outlined
          ></v-select>
        </v-col>
        <v-col class="pt-0">
          <v-text-field
            v-model="audio.author"
            label="Tác giả"
            outlined
            counter="200"
            required
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="6" class="d-flex flex-row justify-start pt-0">
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
          <new-voice-popup class="mt-0 ml-2"></new-voice-popup>
        </v-col> -->
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
        <p class="mb-0">Giọng đọc</p>
        <span
          v-for="(link, index) in audio.links"
          :key="'link' + index"
          class="voice"
          :class="activeLink(link.name)"
          @click="changeLink(link)"
          >{{ link.name }}</span
        >
        <audio
          ref="player"
          controls
          crossorigin
          playsinline
          :src="selectedLink"
          class="audio"
        ></audio>
        <p class="mb-0">Audio link</p>
        <a :href="selectedLink" target="_blank">{{ selectedLink }}</a>
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
// import newVoicePopup from '@/pages/admin/audio/-@newVoicePopup.vue'
import firebaseStorage from '~/mixins/firebaseStorage'
import Audios from '@/models/audios'
const { $get, $dispatch } = createNamespacedHelpers('admin')
const layoutHelper = createNamespacedHelpers('layout')

export default {
  name: 'EditPage',
  layoutContent() {
    return {
      showSidebar: false,
    }
  },
  // components: {
  //   newVoicePopup,
  // },
  mixins: [firebaseStorage],
  middleware: ['isAuthenticated', 'isAdmin'],
  data() {
    return {
      thumbnail: null,
      isSelecting: false,
      rules: {
        title: [(value) => !!value || 'Tiêu đề không được bỏ trống'],
        author: [(value) => !!value || 'Tác giả không được bỏ trống'],
        topic: [(value) => !!value || 'Thể loại không được bỏ trống'],
      },
      statuses: [
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Riêng tư' },
      ],
      audio: {
        title: null,
        description: null,
        author: null,
        voiceId: null,
        thumbnailUrl: null,
        url: null,
        topicIds: [],
        type: 1,
      },
      types: [
        { value: 1, label: 'Truyện ngắn' },
        { value: 2, label: 'Truyện dài' },
        { value: 3, label: 'Sách nói' },
        { value: 4, label: 'Podcast' },
      ],
      selectedVoice: null,
      selectedLink: null,
    }
  },
  computed: {
    voices: $get('voices'),
    topics: $get('topics'),
    formIsValid() {
      return !this.isUploading && this.audio.title
    },
  },
  async mounted() {
    if (!this.voices.length) $dispatch('getVoices')
    if (!this.topics.length) $dispatch('getTopics')
    this.audio = await Audios.getAudio(this.$route.query.audioId)
    this.selectedVoice = this.audio.links[0].name
    this.selectedLink = this.audio.links[0].link
  },
  methods: {
    async save() {
      if (this.formIsValid) {
        if (this.thumbnail) {
          const { link } = await this.uploadSingleFile(
            'thumbnails',
            this.thumbnail
          )
          this.audio.thumbnailUrl = link
        }
        try {
          await Audios.updateAudio(this.audio)
          layoutHelper.$dispatch('setSnackbar', {
            showing: true,
            text: 'Chỉnh sửa audio thành công',
            color: 'success',
          })
          $dispatch('getAudios')
        } catch (err) {
          layoutHelper.$dispatch('setSnackbar', {
            showing: true,
            text: err.message,
            color: 'error',
          })
        }
      }
    },
    onThumbnailChanged(e) {
      this.thumbnail = e.target.files[0]
      if (!this.thumbnail.type.match('image.*')) {
        this.thumbnail = null
        return layoutHelper.$dispatch('setSnackbar', {
          showing: true,
          text: 'Sai định dạng file',
          color: 'error',
        })
      }
      this.audio.thumbnailUrl = URL.createObjectURL(this.thumbnail)
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
    activeLink(voiceName) {
      return voiceName === this.selectedVoice ? '-active' : ''
    },
    changeLink(link) {
      console.log(link)
      this.selectedVoice = link.name
      this.selectedLink = link.link
    },
  },
}
</script>
<style lang="scss">
.audio-section {
  > .audio {
    width: 100%;
    margin: 5px 0;
  }
  > .voice {
    padding-right: 10px;
    border-right: 2px solid #ccc;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      color: #9ebaa0;
    }
    &.-active {
      text-decoration: underline;
      color: #9ebaa0;
    }
    &:last-of-type {
      border: none;
    }
  }
}
.main {
  display: block !important;
}
</style>
