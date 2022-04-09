<template>
  <div class="audio-list">
    <h1 class="header">{{ title }}</h1>
    <div class="list">
      <div
        v-for="audio in audios"
        :key="audio.id"
        :style="{
          backgroundImage: `url(${audio.thumbnailUrl})`,
        }"
        class="post"
        @click="goToDetailPage(audio.slug)"
      >
        <div class="overlay">
          <span class="title">{{ audio.title }} | {{ audio.author }}</span>
        </div>
      </div>
    </div>
    <v-btn
      v-if="page < totalPage"
      block
      depressed
      color="blue-grey"
      text
      class="mt-4"
      @click="$emit('loadMore')"
    >
      Xem thêm
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'AudioList',
  props: {
    title: {
      type: String,
      default: '',
    },
    audios: {
      type: Array,
      default: () => {
        return []
      },
    },
    page: {
      type: Number,
      default: 0,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    goToDetailPage(slug) {
      this.$router.push(`/audio/${slug}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.audio-list {
  > .header {
    margin-bottom: 20px;
  }
  > .list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  > .list > .post {
    background-size: cover;
    width: 32%;
    height: 150px;
    border-radius: 15px;
    margin: 4px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: translateY(-0.1rem);
    }
  }
  > .list > .post > .overlay {
    position: relative;
    padding: 20px 15px 10px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.75)
    );
    border-radius: 15px;
  }
  > .list > .post > .overlay > .title {
    position: absolute;
    bottom: 10px;
    text-transform: capitalize;
    font-size: 16px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    line-height: 1.4;
    font-weight: 600;
  }
}
</style>
