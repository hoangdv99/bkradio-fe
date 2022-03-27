<template>
  <footer class="app-footer">
    <div class="text">
      © Copyright 2022 BKRadio | Thư Viện Audio Dành Cho Mọi Người
    </div>
    <ul class="menu">
      <nuxt-link
        v-for="topic in topics"
        :key="topic.id"
        :to="'/topic/' + topic.slug"
        class="item"
        >{{ topic.title }}</nuxt-link
      >
    </ul>
  </footer>
</template>
<script>
import Audios from '@/models/audios'
export default {
  name: 'AppFooter',
  data() {
    return {
      topics: [],
    }
  },
  async mounted() {
    this.topics = await Audios.getTopics()
  },
}
</script>
<style lang="scss" scoped>
.app-footer {
  margin-top: 50px;
  background-color: #627c83;
  text-align: center;
  padding: 20px;
  color: #daeaea;
  > .menu {
    display: flex;
    justify-content: center;
  }
  > .menu > .item {
    padding: 10px;
    color: #daeaea;
  }
}
</style>