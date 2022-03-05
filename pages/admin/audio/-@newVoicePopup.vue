<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template #activator="{ on, attrs }">
        <v-btn depressed color="primary" text v-bind="attrs" v-on="on">
          Thêm giọng đọc
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Thêm giọng đọc </v-card-title>
        <v-card-text>
          <v-col full-width>
            <v-text-field
              v-model="voice.name"
              :rules="rules.name"
              label="Giọng đọc"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex mt-0" cols="12" sm="6">
            <v-select
              v-model="voice.gender"
              :items="gender"
              item-text="name"
              item-value="id"
              label="Giới tính"
              outlined
            ></v-select>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="close"> Đóng </v-btn>
          <v-btn :disabled="!formIsValid" color="primary" text @click="create"> Thêm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { createNamespacedHelpers } from '~/util'
const { $dispatch } = createNamespacedHelpers('audios')

export default {
  name: 'NewVoicePopup',
  data() {
    return {
      dialog: false,
      gender: [
        { id: 1, name: 'Nam' },
        { id: 2, name: 'Nữ' },
      ],
      voice: {
        name: null,
        gender: 1,
      },
      rules: {
        name: [(value) => !!value || 'Tiêu giọng đọc không được bỏ trống'],
      },
    }
  },
  computed: {
    formIsValid() {
      return this.voice.name
    }
  },
  methods: {
    create() {
      $dispatch('createNewVoice', this.voice)
      this.dialog = false
      this.voice = {
        name: null,
        gender: 1,
      }
    },
    close() {
      this.dialog = false
      this.voice = {
        name: null,
        gender: 1,
      }
    },
  },
}
</script>
