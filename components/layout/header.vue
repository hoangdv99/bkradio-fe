<template>
  <header class="app-header">
    <nuxt-link to="/" class="logo">
      <img src="/hemradio.png" alt="logo" />
    </nuxt-link>
    <ul class="menu">
      <li class="item -active">
        <a href="" class="link">Trang chủ</a>
      </li>
      <li class="item">
        <a href="" class="link -dropdown">Thể loại</a>
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
      <li class="item">
        <a href="" class="link -dropdown">Giọng đọc</a>
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
      <li class="item">
        <a href="" class="link">Blog</a>
      </li>
    </ul>
    <div class="search">
      <input type="text" class="input" placeholder="Nhập nội dung cần tìm..." />
      <font-awesome-icon :icon="searchIcon" class="icon" />
    </div>
    <div v-if="isAuthenticated" class="account">
      <img
        src="~/assets/images/default-avatar.jpg"
        alt="Avatar"
        class="avatar"
      />
      <ul class="sub-menu">
        <li class="list">
          <nuxt-link to="/admin/audio" class="item">Quản lý audio</nuxt-link>
          <div class="item" @click="logout">Đăng xuất</div>
        </li>
      </ul>
    </div>
    <NuxtLink v-else to="/auth/login" class="auth">Đăng nhập</NuxtLink>
  </header>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Audios from '@/models/audios'
import Voices from '@/models/voices'
export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      searchIcon: faSearch,
      topics: [],
      maleVoices: [],
      femaleVoices: [],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  async mounted() {
    this.topics = await Audios.getTopics()
    const totalVoices = await Voices.getVoices()
    this.maleVoices = totalVoices.filter(voice => voice.gender === 1)
    this.femaleVoices = totalVoices.filter(voice => voice.gender === 2)
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
  display: flex;
  justify-content: space-between;
  height: 73px;
  background-color: #627c83;
  padding: 0 30px;
  > .logo {
    width: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  > .menu {
    display: table;
  }
  > .menu > .item {
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
  > .menu > .item > .sub-menu {
    position: absolute;
  }
  > .menu > .item > .link {
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
  > .search {
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
  }
  > .search > .input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    padding: 10px 20px 10px 10px;
    color: #daeaea;
  }
  > .search > .icon {
    position: absolute;
    font-size: 14px;
    color: #daeaea;
    right: 10px;
    top: 14px;
    cursor: pointer;
  }
  > .account {
    display: flex;
    justify-content: center;
    position: relative;
    width: 120px;
    &:hover > .sub-menu {
      display: block;
    }
  }
  > .account > .avatar {
    margin: auto;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  > .account > .sub-menu {
    position: absolute;
    top: 100%;
    right: 0;
  }
  > .auth {
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