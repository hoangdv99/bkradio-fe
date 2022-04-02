<template>
  <div class="index-page">
    <div class="block-content">
      <div class="title">Mới cập nhật</div>
      <vue-slick-carousel v-bind="settings">
        <div class="wrapped-slide">
          <div
            v-for="audio in getFirstSlide(audios.newUploadedAudios)"
            :key="audio.id"
            :style="{ backgroundImage: `url(${audio.thumbnailUrl})` }"
            class="post -new"
            @click="goToDetailPage(audio)"
          >
            <div class="overlay">
              <span class="title">{{ audio.title }} | {{ audio.author }}</span>
            </div>
          </div>
        </div>
        <div class="wrapped-slide">
          <div
            v-for="audio in getSecondSlide(audios.newUploadedAudios)"
            :key="audio.id"
            :style="{ backgroundImage: `url(${audio.thumbnailUrl})` }"
            class="post -new"
          >
            <div class="overlay">
              <span class="title">{{ audio.title }} | {{ audio.author }}</span>
            </div>
          </div>
        </div>
      </vue-slick-carousel>
    </div>
    <div class="wrapper">
      <div class="content">
        <div
          v-for="(audiosByType, index) in audios.audiosByTypes"
          :key="index"
          class="block-content"
        >
          <a :href="`/tag/${audiosByType.type.slug}`" class="title">{{ audiosByType.type.name }}</a>
          <vue-slick-carousel v-bind="settings">
            <div class="wrapped-slide">
              <div
                v-for="audio in getFirstSlide(audiosByType.audios)"
                :key="audio.id"
                :style="{ backgroundImage: `url(${audio.thumbnailUrl})` }"
                class="post"
                @click="goToDetailPage(audio)"
              >
                <div class="overlay">
                  <span class="title"
                    >{{ audio.title }} | {{ audio.author }}</span
                  >
                </div>
              </div>
            </div>
            <div v-if="audiosByType.audios.length > 6" class="wrapped-slide">
              <div
                v-for="audio in getSecondSlide(audiosByType.audios)"
                :key="audio.id"
                :style="{ backgroundImage: `url(${audio.thumbnailUrl})` }"
                class="post"
              >
                <div class="overlay">
                  <span class="title">{{ audio.title }} | {{ audio.author }}</span>
                </div>
              </div>
            </div>
          </vue-slick-carousel>
        </div>
      </div>
      <common-sidebar></common-sidebar>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Audios from '~/models/audios'
export default {
  layoutContent() {
    return {
      showSidebar: true,
    }
  },
  name: 'IndexPage',
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        dots: true,
        arrows: false,
      },
      audios: {
        newUploadedAudios: [],
        audiosByTypes: {},
      },
    }
  },
  async mounted() {
    this.audios = await Audios.getHomeAudios()
  },
  methods: {
    generateThumbnail(audio) {
      return `{ backgroundImage: ${audio.thumbnailUrl} }`
    },
    getFirstSlide(audios) {
      if (audios.length > 6) {
        const temp = [...audios]
        return temp.splice(0, 6)
      }
      return audios
    },
    getSecondSlide(audios) {
      const temp = [...audios]
      return temp.splice(6, temp.length)
    },
    goToDetailPage(audio) {
      this.$router.push(`/audio/${audio.slug}`)
    }
  },
}
</script>
<style lang="scss">
.index-page {
  padding-right: 3px;
  > .wrapper {
    display: flex;
  }
  > .wrapper > .content {
    width: 66.667%;
  }
  > .wrapper > .content > .block-content {
    position: relative;
    margin-bottom: 30px;
  }
  > .block-content {
    margin-bottom: 50px;
  }
}
.block-content {
  > .title {
    position: relative;
    opacity: 0.99;
    display: inline-block !important;
    width: auto;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 5px 10px;
    color: #fff;
    background-color: #9ebaa0;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 70%;
      height: 100%;
      background-color: #9ebaa0;
      -webkit-transform: skew(-40deg) translateX(14px);
      -ms-transform: skew(-40deg) translateX(14px);
      transform: skew(-40deg) translateX(14px);
      z-index: -1;
    }
  }
}

//custom vue-slide-carousel
.wrapped-slide {
  display: flex !important;
  flex-wrap: wrap;
  > .post {
    background-size: cover;
    width: calc(33.1% - 3px);
    height: 180px;
    border-radius: 15px;
    margin: 0 2px 4px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: translateY(-0.1rem);
    }
    &.-new {
      height: 210px;
    }
  }
  > .post > .overlay {
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
  > .post > .overlay > .title {
    position: absolute;
    bottom: 10px;
    text-transform: capitalize;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    line-height: 1.4;
    font-weight: 600;
  }
}
.slick-dots > li > button {
  &::before {
    font-size: 10px;
  }
}
</style>