<template>
  <div
    ref="search"
    class="search-component"
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
    <v-icon small class="icon">mdi-magnify</v-icon>
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
</template>
<script>
import Audios from '@/models/audios'
export default {
  name: 'SearchComponent',
  data() {
    return {
      keyword: '',
      searchResult: [],
      timeout: null,
      openPopup: false,
    }
  },
  methods: {
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
.search-component {
  @include sp {
    width: 50%;
  }
  outline: none;
  &.-hideresult > .search-result {
    display: none;
  }

  > .input {
    width: 240px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    padding: 10px 20px 10px 10px;
    color: #daeaea;
    outline: none;
  }
  > .icon {
    @include sp {
      top: 20px;
      right: 22px;
    }
    position: absolute;
    right: 10px;
    top: 14px;
    color: #fff;
    cursor: pointer;
  }
  > .search-result {
    position: absolute;
    left: 0;
    top: 40px;
    width: 370px;
    z-index: 999;
    @include sp {
      top: 50px;
      left: 0;
      right: 0;
      margin: auto;
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