<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000" persistent>
      <template #activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on">
          <v-icon left dark> mdi-swap-horizontal </v-icon>
          Chuyển đổi kịch bản
        </v-btn>
      </template>
      <v-card v-if="!selectedFile">
        <v-card-title class="white mb-2"> Tải kịch bản </v-card-title>
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
              <v-icon dark> mdi-swap-horizontal </v-icon>
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="application/pdf"
              @change="onFileChange"
            />
          </div>
          <p class="mt-2 font-weight-bold">Chọn kịch bản để chuyển đổi</p>
          <p>Chỉ chấp nhận file tải lên có định dạng PDF</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false"> Đóng </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="white mb-2">
          {{ audio.title }}
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
                  width="80%"
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
              <div class="convert-area">
                <p>{{ selectedFile.name }}</p>
                <div class="d-flex flex-column justify-start">
                  <v-autocomplete
                    v-model="audio.voiceId"
                    :items="ttsVoices"
                    :rules="rules.voice"
                    class="d-flex pt-0"
                    label="Giọng đọc"
                    :item-text="(item) => formatVoiceLabel(item)"
                    item-value="id"
                    dense
                    outlined
                    required
                  ></v-autocomplete>
                  <v-btn
                    depressed
                    color="primary"
                    :disabled="isConverting || audio.audioUrl"
                    @click="convertPdf"
                  >
                    {{ isConverting ? 'Đang chuyển đổi...' : 'Chuyển đổi' }}
                  </v-btn>
                </div>
              </div>
              <audio v-if="audio.audioUrl" controls class="mb-2">
                <source :src="audio.audioUrl" type="audio/mp3" />
              </audio>
            </v-col>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            text
            :disabled="isConverting"
            @click="dialog = false"
          >
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
import { createNamespacedHelpers } from '~/util'
import firebaseStorage from '~/mixins/firebaseStorage'
const layoutStore = createNamespacedHelpers('layout')
const adminStore = createNamespacedHelpers('admin')

export default {
  name: 'ConvertButton',
  mixins: [firebaseStorage],
  data() {
    return {
      dialog: false,
      selectedFile: null,
      isSelecting: false,
      audio: {
        title: null,
        description: null,
        author: null,
        voiceId: 35,
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
      rules: {
        title: [(value) => !!value || 'Tiêu đề không được bỏ trống'],
        author: [(value) => !!value || 'Tác giả không được bỏ trống'],
        topic: [(value) => !!value || 'Thể loại không được bỏ trống'],
      },
      isConverting: false,
    }
  },
  computed: {
    topics: adminStore.$get('topics'),
    formIsValid() {
      return !this.isConverting && this.audio.title && this.audio.author
    },
    voices: adminStore.$get('voices'),
    ttsVoices() {
      return this.voices.filter((voice) => voice.isTtsVoice)
    },
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
    onFileChange(e) {
      this.selectedFile = e.target.files[0]
      if (!this.selectedFile.type.match('application/pdf')) {
        this.selectedFile = null
        return layoutStore.$dispatch('setSnackbar', {
          showing: true,
          text: 'Sai định dạng file',
          color: 'error',
        })
      }
      this.audio.title = this.selectedFile.name.replace(/\.[^/.]+$/, '')
      this.isConverting = false
    },
    onThumbnailChanged(e) {
      this.thumbnail = e.target.files[0]
      if (!this.thumbnail.type.match('image.*')) {
        this.thumbnail = null
        return layoutStore.$dispatch('setSnackbar', {
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
      if (
        await adminStore.$dispatch('createNewAudio', {
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
    formatVoiceLabel(voice) {
      let gender, region
      if (voice.gender === 1) {
        gender = 'Nam'
      } else if (voice.gender === 2) {
        gender = 'Nữ'
      }
      if (voice.region === 1) {
        region = 'miền bắc'
      } else if (voice.region === 2) {
        region = 'miền trung'
      } else if (voice.region === 3) {
        region = 'miền nam'
      }

      return `${voice.name} (${gender} ${region})`
    },
    async convertPdf() {
      this.isConverting = true
      this.audio.audioUrl = await adminStore.$dispatch(
        'convertPdfFile', {
          pdf: this.selectedFile,
          voiceId: this.audio.voiceId
        }
      )
      this.isConverting = false
    },
  },
}
</script>
<style lang="scss">
.convert-area {
  background-color: #fafafa;
  margin-bottom: 8px;
  padding: 10px;
}
</style>