<template>
  <div class="app-header">
    <header class="header">
      <NuxtLink to="/" class="logo">BK.RADIO</NuxtLink>
      <ul class="menu">
        <li ref="home" class="item -active">
          <nuxt-link to="/" class="link">Trang chủ</nuxt-link>
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
            <nuxt-link v-if="isAdmin" to="/admin/audio" class="item">Quản lý audio</nuxt-link>
            <div class="item" @click="logout">Đăng xuất</div>
          </li>
        </ul>
      </div>
      <NuxtLink v-else to="/auth/login" class="auth">Đăng nhập</NuxtLink>
    </header>
  </div>
</template>
<script>
import Audios from '@/models/audios'
import Voices from '@/models/voices'
import { userRole } from "~/constants"
export default {
  name: 'AppHeader',
  data() {
    return {
      topics: [],
      maleVoices: [],
      femaleVoices: [],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    isAdmin() {
      return Boolean(this.$auth.user.roleId === userRole.ADMIN)
    }
  },
  watch: {
    $route(to, from) {
      switch (to.name) {
        case 'index':
          this.$refs.home.classList.add('-active')
          this.$refs.topic.classList.remove('-active')
          this.$refs.voice.classList.remove('-active')
          break
        case 'topic-slug':
          this.$refs.topic.classList.add('-active')
          this.$refs.home.classList.remove('-active')
          this.$refs.voice.classList.remove('-active')
          break
        case 'voice-slug':
          this.$refs.voice.classList.add('-active')
          this.$refs.home.classList.remove('-active')
          this.$refs.topic.classList.remove('-active')
          break
        default:
          break
      }
    },
  },
  async mounted() {
    this.topics = await Audios.getTopics()
    const totalVoices = await Voices.getVoices()
    this.maleVoices = totalVoices.filter((voice) => voice.gender === 1)
    this.femaleVoices = totalVoices.filter((voice) => voice.gender === 2)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
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
        width: 300px;
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
  z-index: 1;
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