<template>
  <div class="app-header">
    <header class="header">
      <NuxtLink to="/" class="logo">BK.RADIO</NuxtLink>
      <ul class="menu">
        <li ref="home" class="item -active">
          <nuxt-link to="/" class="link">Trang chủ</nuxt-link>
        </li>
        <li ref="shortStories" class="item">
          <nuxt-link to="/audio/type/truyen-ngan" class="link"
            >Truyện ngắn</nuxt-link
          >
        </li>
        <li ref="longStories" class="item">
          <nuxt-link to="/audio/type/truyen-dai" class="link"
            >Truyện dài</nuxt-link
          >
        </li>
        <li ref="book" class="item">
          <nuxt-link to="/audio/type/sach-noi" class="link">Sách nói</nuxt-link>
        </li>
        <li ref="topic" class="item">
          <div class="link -dropdown">Thể loại</div>
          <ul class="sub-menu">
            <li class="list">
              <nuxt-link
                v-for="topic in topics"
                :key="topic.id"
                :to="'/topic/' + topic.slug"
                class="item"
                >{{ topic.title }}</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li ref="voice" class="item">
          <div class="link -dropdown">Giọng đọc</div>
          <ul class="sub-menu -voices">
            <li class="list">
              <nuxt-link
                v-for="voice in maleVoices"
                :key="voice.id"
                :to="'/voice/' + voice.slug"
                class="item"
                >{{ voice.name }}</nuxt-link
              >
            </li>
            <li class="list">
              <nuxt-link
                v-for="voice in femaleVoices"
                :key="voice.id"
                :to="'/voice/' + voice.slug"
                class="item"
                >{{ voice.name }}</nuxt-link
              >
            </li>
            <li class="list">
              <nuxt-link
                v-for="voice in ttsVoices"
                :key="voice.id"
                :to="'/voice/' + voice.slug"
                class="item"
                >{{ voice.name }}</nuxt-link
              >
            </li>
          </ul>
        </li>
      </ul>
      <common-search class="search" />
      <div v-if="isAuthenticated" class="account">
        <img
          src="~/assets/images/default-avatar.jpg"
          alt="Avatar"
          class="avatar"
        />
        <ul class="sub-menu">
          <li class="list">
            <nuxt-link v-if="isAdmin" to="/admin/audio" class="item"
              >Quản lý audio</nuxt-link
            >
            <div class="item" @click="logout">
              Đăng xuất ({{ $auth.user.username }})
            </div>
          </li>
        </ul>
      </div>
      <NuxtLink v-else to="/auth/login" class="auth">Đăng nhập</NuxtLink>
    </header>
  </div>
</template>
<script>
import { userRole } from '~/constants'
import { createNamespacedHelpers } from '@/util'
const audioStore = createNamespacedHelpers('audios')
export default {
  name: 'AppHeader',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    isAdmin() {
      return Boolean(this.$auth.user.roleId === userRole.ADMIN)
    },
    voices: audioStore.$get('voices'),
    topics: audioStore.$get('topics'),
    maleVoices() {
      return this.voices.length
        ? this.voices.filter((voice) => voice.gender === 1 && !voice.isTtsVoice)
        : []
    },
    femaleVoices() {
      return this.voices.length
        ? this.voices.filter((voice) => voice.gender === 2 && !voice.isTtsVoice)
        : []
    },
    ttsVoices() {
      return this.voices.length
        ? this.voices.filter((voice) => voice.isTtsVoice)
        : []
    },
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case 'index':
          this.activeTab('home')
          break
        case 'topic-slug':
          this.activeTab('topic')
          break
        case 'voice-slug':
          this.activeTab('voice')
          break
        case 'audio-type-slug':
          if (to.params.slug === 'truyen-ngan') {
            this.activeTab('shortStories')
          } else if (to.params.slug === 'truyen-dai') {
            this.activeTab('longStories')
          } else if (to.params.slug === 'sach-noi') {
            this.activeTab('book')
          }
          break
        default:
          break
      }
    },
  },
  mounted() {
    if (!this.voices.length) audioStore.$dispatch('getVoices')
    if (!this.topics.length) audioStore.$dispatch('getTopics')
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    activeTab(tab) {
      const tabs = [
        'home',
        'voice',
        'topic',
        'shortStories',
        'longStories',
        'book',
      ]
      tabs.splice(tabs.indexOf(tab), 1)
      this.$refs[tab].classList.add('-active')
      tabs.forEach((unactiveTab) =>
        this.$refs[unactiveTab].classList.remove('-active')
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.app-header {
  > .header {
    display: flex;
    justify-content: space-between;
    height: 73px;
    background-color: #627c83;
    padding: 0 30px;
  }
  > .header > .logo {
    display: block;
    padding: 0 14px;
    height: 73px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 73px;
    font-size: 24px;
    cursor: pointer;
  }
  > .header > .logo > .image {
    border-radius: 50%;
  }
  > .header > .menu {
    display: table;
  }
  > .header > .menu > .item {
    display: table-cell;
    position: relative;
    &:hover {
      background-color: #9ebaa0;
    }
    &:hover > .sub-menu {
      display: block;
      &.-voices {
        display: flex;
        width: 400px;
      }
    }
    &.-active {
      background-color: #9ebaa0;
      margin-bottom: -5px;
      border-bottom: 5px solid #9ebaa0;
    }
    &.-active::after {
      content: '';
      width: 20px;
      height: 2px;
      position: absolute;
      margin-top: 17px;
      left: 50%;
      top: 50%;
      bottom: auto;
      right: auto;
      transform: translateX(-50%) translateY(-50%);
      background: #2c2f34;
      transition: 0.3s;
    }
  }
  > .header > .menu > .item > .sub-menu {
    position: absolute;
  }
  > .header > .menu > .item > .link {
    display: block;
    padding: 0 14px;
    height: 73px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    line-height: 73px;
    &.-dropdown {
      padding-right: 26px;
      &::before {
        content: '';
        position: absolute;
        right: 12px;
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-top: 4px solid #ffffff;
        transition: border 0.15s;
      }
    }
  }
  > .header > .search {
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
  }
  > .header > .account {
    display: flex;
    justify-content: center;
    position: relative;
    width: 120px;
    &:hover > .sub-menu {
      display: block;
    }
  }
  > .header > .account > .avatar {
    margin: auto;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  > .header > .account > .sub-menu {
    position: absolute;
    top: 100%;
    right: 0;
  }
  > .header > .auth {
    display: block;
    padding: 0 14px;
    height: 73px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    line-height: 73px;
    cursor: pointer;
    &:hover {
      color: #9ebaa0;
    }
  }
}
.sub-menu {
  display: none;
  padding: 15px;
  width: 230px;
  background-color: #627c83;
  border-top: 2px solid #08f;
  border-color: #9ebaa0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 3;
  > .list > .item + .sub-menu {
    &:hover {
      display: block;
      top: 20px;
      left: 80%;
      border-top: none;
    }
  }
  > .list > .item {
    display: block;
    font-weight: 400;
    text-transform: uppercase;
    color: #fff;
    line-height: 20px;
    padding: 8px 10px;
    cursor: pointer;
    &:hover {
      color: #9ebaa0;
      + .sub-menu {
        display: block;
        top: 20px;
        left: 80%;
        border-top: none;
      }
    }
  }
}
</style>