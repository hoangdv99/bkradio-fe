<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template #activator="{ on, attrs }">
        <v-btn depressed color="primary" text v-bind="attrs" v-on="on">
          Thêm tác giả
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Thêm tác giả </v-card-title>
        <v-card-text>
          <v-col full-width>
            <v-text-field
              v-model="author.name"
              :rules="rules.name"
              label="Tên tác giả"
              outlined
              required
            ></v-text-field>
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
  name: 'NewAuthorPopup',
  data() {
    return {
      dialog: false,
      author: {
        name: null,
      },
      rules: {
        name: [(value) => !!value || 'Tên tác giả không được bỏ trống'],
      },
    }
  },
  computed: {
    formIsValid() {
      return this.author.name
    }
  },
  methods: {
    create() {
      $dispatch('createNewAuthor', this.author)
      this.dialog = false
      this.author = {
        name: null,
      }
    },
    close() {
      this.dialog = false
      this.author = {
        name: null,
      }
    },
  },
}
</script>
