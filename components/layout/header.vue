<template>
  <div class="app-header">
    <header class="header">
      <NuxtLink to="/" class="logo">BK.RADIO</NuxtLink>
      <ul class="menu">
        <li ref="home" class="item -active">
          <nuxt-link to="/" class="link">Trang chủ</nuxt-link>
        </li>
        <li ref="topic" class="item">
          <div href="" class="link -dropdown">Thể loại</div>
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
      </ul>
      <div
        ref="search"
        class="search"
        tabindex="0"
        @focus="handleFocus"
        @focusout="handleFocusOut"
      >
        <input
          ref="input"
          v-model="keyword"
          type="text"
          class="input"
          placeholder="Nhập nội dung cần tìm..."
          tabindex="1"
          @focus="handleFocus"
          @input="search"
        />
        <v-icon class="icon">mdi-magnify</v-icon>
        <div v-if="keyword !== ''" class="search-result">
          <p v-if="searchResult.length === 0" class="text-center">
            Không tìm thấy kết quả phù hợp.
          </p>
          <div
            v-for="audio in searchResult"
            :key="audio.id"
            class="post"
            @click="goToDetailPage(audio)"
          >
            <img :src="audio.thumbnailUrl" alt="thumbnail" class="thumbnail" />
            <p :to="`/audio/${audio.slug}`" class="title">
              {{ audio.title }} | {{ audio.author }}
            </p>
          </div>
        </div>
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
  </div>
</template>
<script>
import Audios from '@/models/audios'
import Voices from '@/models/voices'
export default {
  name: 'AppHeader',
  data() {
    return {
      topics: [],
      maleVoices: [],
      femaleVoices: [],
      keyword: '',
      searchResult: [],
      timeout: null,
      openPopup: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
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
    search() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        const { audios } = await Audios.getAudios({
          searchKeyword: this.keyword,
        })
        this.searchResult = audios
        this.$refs.input.focus()
      }, 500)
    },
    goToDetailPage(audio) {
      this.keyword = ''
      this.searchResult = []
      this.$router.push(`/audio/${audio.slug}`)
    },
    handleFocus() {
      this.$refs.search.classList.remove('-hideresult')
    },
    handleFocusOut() {
      this.$refs.search.classList.add('-hideresult')
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
  > .header > .search > .input {
    width: 240px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    padding: 10px 20px 10px 10px;
    color: #daeaea;
  }
  > .header > .search > .icon {
    position: absolute;
    font-size: 18px;
    color: #daeaea;
    right: 10px;
    top: 14px;
    cursor: pointer;
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
  > .header > .search {
    outline: none;
    &.-hideresult > .search-result {
      display: none;
    }
  }
  > .header > .search > .input {
    outline: none;
  }
  > .header > .search > .search-result {
    position: absolute;
    left: 0;
    top: 40px;
    width: 370px;
    z-index: 999;
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
.search-result {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  > .post {
    display: flex;
    margin-bottom: 10px;
    transition: 0.3s;
    border-radius: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      opacity: 0.8;
      transform: translateY(-0.15rem);
      box-shadow: 0 4px 7px rgb(0 0 0 / 20%);
      > .title {
        color: #9ebaa0;
      }
    }
  }
  > .post > .thumbnail {
    width: 120px;
    height: 80px;
    border-radius: 15px;
    margin-right: 15px;
    cursor: pointer;
  }
  > .post > .title {
    font-size: 14px !important;
    line-height: 1.4;
    color: #333;
    font-weight: 600;
    transition: 0.15s;
    cursor: pointer;
  }
}
</style>