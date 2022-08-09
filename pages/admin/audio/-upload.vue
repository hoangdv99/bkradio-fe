<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000" persistent>
      <template #activator="{ on, attrs }">
        <v-btn color="blue-grey" dark v-bind="attrs" v-on="on">
          <v-icon left dark> mdi-cloud-upload </v-icon>
          Tải audio lên
        </v-btn>
      </template>
      <v-card v-if="!selectedFile">
        <v-card-title class="white mb-2"> Tải audio lên </v-card-title>
        <v-card-text class="text-center">
          <div>
            <v-btn
              class="mx-2"
              fab
              depressed
              x-large
              :loading="isSelecting"
              @click="onUploadBtnClick"
            >
              <v-icon dark> mdi-cloud-upload </v-icon>
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="audio/*"
              @change="onAudioChanged"
            />
          </div>
          <p class="mt-2 font-weight-bold">Chọn tệp audio để tải lên</p>
          <p>
            Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false"> Đóng </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="white mb-2">
          {{ selectedFile.name }}
        </v-card-title>
        <v-card-text>
          <h2>Chi tiết</h2>
          <div class="audio-section d-flex">
            <v-col cols="8" class="content mr-3">
              <v-col full-width>
                <v-text-field
                  v-model="audio.title"
                  :rules="rules.title"
                  label="Tiêu đề"
                  outlined
                  counter="200"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col full-width class="pt-0">
                <v-textarea
                  v-model="audio.description"
                  outlined
                  name="input-7-4"
                  label="Mô tả"
                  counter="5000"
                ></v-textarea>
              </v-col> -->
              <v-col class="pt-0">
                <ckeditor v-model="audio.description"></ckeditor>
              </v-col>
              <div>
                <v-autocomplete
                  v-model="audio.topicIds"
                  :items="topics"
                  :rules="rules.topic"
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
              <v-col class="pt-0" full-width>
                <v-text-field
                  v-model="audio.author"
                  :rules="rules.author"
                  label="Tác giả"
                  outlined
                  counter="200"
                  required
                ></v-text-field>
              </v-col>
              <div class="d-flex flex-row justify-start">
                <v-autocomplete
                  v-model="audio.voiceId"
                  :items="realVoices"
                  :rules="rules.voice"
                  class="d-flex pt-0 ml-3"
                  label="Giọng đọc"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  required
                ></v-autocomplete>
                <new-voice-popup class="mt-0"></new-voice-popup>
              </div>
            </v-col>
            <v-col cols="4" class="audio">
              <p>Thumbnail</p>
              <div
                class="
                  d-flex
                  flex-column
                  justify-space-between
                  align-center
                  mb-2
                "
              >
                <v-img
                  :lazy-src="require('@/assets/images/no-photo.png')"
                  :src="
                    audio.thumbnailUrl ||
                    require('@/assets/images/no-photo.png')
                  "
                  width="100%"
                  class="mb-2"
                ></v-img>
                <v-btn
                  depressed
                  text
                  color="primary"
                  :loading="isSelecting"
                  @click="onUploadBtnClick"
                >
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
              <p v-if="isUploading">Đang tải audio lên...</p>
              <audio v-else controls class="mb-2">
                <source :src="audio.audioUrl" :type="selectedFile.type" />
              </audio>
              <p class="mb-0">Audio link</p>
              <a :href="audio.audioUrl">{{ audio.audioUrl }}</a>
            </v-col>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text :disabled="isUploading" @click="close">
            Đóng
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" color="primary" text @click="save">
            Hoàn tất
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import NewVoicePopup from './-@newVoicePopup.vue'
import { createNamespacedHelpers } from '~/util'
import firebaseStorage from '~/mixins/firebaseStorage'
const { $get, $dispatch } = createNamespacedHelpers('admin')
const layoutHelper = createNamespacedHelpers('layout')

export default {
  name: 'UploadButton',
  components: {
    NewVoicePopup,
  },
  mixins: [firebaseStorage],
  data() {
    return {
      dialog: false,
      selectedFile: null,
      isSelecting: false,
      isUploading: false,
      rules: {
        title: [(value) => !!value || 'Tiêu đề không được bỏ trống'],
        author: [(value) => !!value || 'Tác giả không được bỏ trống'],
        topic: [(value) => !!value || 'Thể loại không được bỏ trống'],
      },
      audio: {
        title: null,
        description: null,
        author: null,
        voiceId: 0,
        thumbnailUrl: null,
        audioUrl: null,
        topicIds: [],
        type: 1,
      },
      thumbnail: null,
      types: [
        { value: 1, label: 'Truyện ngắn' },
        { value: 2, label: 'Truyện dài' },
        { value: 3, label: 'Sách nói' },
        { value: 4, label: 'Podcast' },
      ],
    }
  },
  computed: {
    voices: $get('voices'),
    topics: $get('topics'),
    formIsValid() {
      return !this.isUploading && this.audio.title && this.audio.author
    },
    realVoices() {
      return this.voices.filter(voice => !voice.isTtsVoice)
    }
  },
  mounted() {
    if (!this.voices.length) $dispatch('getVoices')
    if (!this.topics.length) $dispatch('getTopics')
  },
  methods: {
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
    async onAudioChanged(e) {
      this.selectedFile = e.target.files[0]
      if (!this.selectedFile.type.match('audio.*')) {
        this.selectedFile = null
        return layoutHelper.$dispatch('setSnackbar', {
          showing: true,
          text: 'Sai định dạng file',
          color: 'error',
        })
      }
      this.audio.title = this.selectedFile.name.replace(/\.[^/.]+$/, '')
      this.isUploading = true
      const { link } = await this.uploadSingleFile('audio', this.selectedFile)
      this.audio.audioUrl = link
      this.isUploading = false
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
    async save() {
      if (this.thumbnail) {
        const { link } = await this.uploadSingleFile(
          'thumbnails',
          this.thumbnail
        )
        this.audio.thumbnailUrl = link
      }
      this.audio.links = [{
        voiceId: this.audio.voiceId,
        link: this.audio.audioUrl,
      }]
      if (
        await $dispatch('createNewAudio', {
          ...this.audio,
          userId: this.$auth.user.userId,
        })
      ) {
        this.audio = {
          title: null,
          description: null,
          author: null,
          voiceId: null,
          thumbnailUrl: null,
          audioUrl: null,
        }
        this.selectedFile = null
        this.thumbnail = null
        this.dialog = false
      }
    },
    close() {
      this.audio = {
        title: null,
        description: null,
        author: null,
        voiceId: null,
        thumbnailUrl: null,
        audioUrl: null,
      }
      this.selectedFile = null
      this.thumbnail = null
      this.dialog = false
    },
  },
}
</script>
