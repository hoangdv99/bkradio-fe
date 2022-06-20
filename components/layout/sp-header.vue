<template>
  <div>
    <v-card class="mx-auto sp-header">
      <v-app-bar color="blue-grey" dark flat>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push('/')">BK.RADIO</v-toolbar-title>
        <v-spacer></v-spacer>
        <common-search />
      </v-app-bar>
    </v-card>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list>
        <v-list-item link @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Trang chủ</v-list-item-title>
        </v-list-item>
        <v-list-group prepend-icon="mdi-format-title" color="blue-grey">
          <template #activator>
            <v-list-item-title>Thể loại</v-list-item-title>
          </template>
          <v-list-item
            v-for="topic in topics"
            :key="topic.id"
            link
            @click="$router.push(`/topic/${topic.slug}`)"
          >
            <v-list-item-title class="pl-14">{{
              topic.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-account-voice" color="blue-grey">
          <template #activator>
            <v-list-item-title>Giọng đọc</v-list-item-title>
          </template>
          <v-list-group sub-group color="blue-grey">
            <template #activator>
              <v-list-item-title>Nam</v-list-item-title>
            </template>
            <v-list-item
              v-for="voice in maleVoices"
              :key="'malevoice' + voice.id"
              link
              @click="$router.push(`/voice/${voice.slug}`)"
            >
              <v-list-item-title class="pl-8">{{
                voice.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group sub-group color="blue-grey">
            <template #activator>
              <v-list-item-title>Nữ</v-list-item-title>
            </template>
            <v-list-item
              v-for="voice in femaleVoices"
              :key="'malevoice' + voice.id"
              link
              @click="$router.push(`/voice/${voice.slug}`)"
            >
              <v-list-item-title class="pl-8">{{
                voice.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-group sub-group color="blue-grey">
            <template #activator>
              <v-list-item-title>Giọng đọc tự động</v-list-item-title>
            </template>
            <v-list-item
              v-for="voice in ttsVoices"
              :key="'malevoice' + voice.id"
              link
              @click="$router.push(`/voice/${voice.slug}`)"
            >
              <v-list-item-title class="pl-8">{{
                voice.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-list-group
          v-if="$auth.loggedIn"
          prepend-icon="mdi-account-circle"
          color="blue-grey"
        >
          <template #activator>
            <v-list-item-title>Tài khoản</v-list-item-title>
          </template>
          <v-list-item link class="ml-14" @click="$auth.logout()">
            <v-list-item-title
              v-text="`Đăng xuất (${$auth.user.username})`"
            ></v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else link @click="$router.push('/auth/login')">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Đăng nhập</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { createNamespacedHelpers } from '@/util'
const { $get, $dispatch } = createNamespacedHelpers('audios')
export default {
  name: 'SpHeader',
  data() {
    return {
      drawer: false,
      group: null,
      keyword: '',
      searchResult: [],
    }
  },
  computed: {
    topics: $get('topics'),
    voices: $get('voices'),
    maleVoices() {
      return this.voices.filter(
        (voice) => voice.gender === 1 && !voice.isTtsVoice
      )
    },
    femaleVoices() {
      return this.voices.filter(
        (voice) => voice.gender === 2 && !voice.isTtsVoice
      )
    },
    ttsVoices() {
      return this.voices.filter((voice) => voice.isTtsVoice)
    },
  },
  mounted() {
    if (!this.topics.length) {
      $dispatch('getTopics')
    }
    if (!this.voices.length) {
      $dispatch('getVoices')
    }
  },
}
</script>
<style lang="scss" scoped>
.sp-header {
  position: relative;
  z-index: 1;
}
</style>