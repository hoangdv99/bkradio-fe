<template>
  <v-app>
    <div class="default-layout">
      <div class="layout">
        <layout-sp-header v-if="device === 'mobile'" />
        <layout-header v-else />
        <main class="main">
          <nuxt class="content"></nuxt>
        </main>
        <layout-footer></layout-footer>
      </div>
      <div :class="'pagetop' + (hide ? ' -hide' : '')" @click="goTop">
        <v-icon color="white">mdi-chevron-up</v-icon>
      </div>
      <v-snackbar
        :value="snackbar.showing"
        :timeout="-1"
        :color="snackbar.color"
        top
        right
        absolute
        style="z-index: 9999"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </div>
  </v-app>
</template>
<script>
import { createNamespacedHelpers } from '@/util'
const { $get } = createNamespacedHelpers('layout')

export default {
  name: 'DefaultLayout',
  data() {
    return {
      hide: true,
    }
  },
  computed: {
    snackbar: $get('snackbar'),
    device: $get('device'),
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    updateScroll() {
      this.hide = !!(window.scrollY < 220)
    },
  },
}
</script>
<style lang="scss" scoped>
.default-layout {
  overflow: hidden;
  position: relative;
  > .layout {
    display: block;
    max-width: 1230px;
    background: #fff;
    position: relative;
    z-index: 108;
    margin: 0 auto;
    box-shadow: 0 1px 7px rgba(171, 171, 171, 0.5);
    @media (min-width: 992px) {
      margin-top: 25px;
      margin-bottom: 25px;
      width: 95%;
    }
  }
  > .layout > .main {
    @include sp {
      padding: 10px;
    }
    padding: 30px;
  }
  > .pagetop {
    width: 35px;
    height: 35px;
    line-height: 35px;
    background: #08f;
    text-align: center;
    display: block;
    position: fixed;
    bottom: 15px;
    background-color: #9ebaa0;
    color: #fff;
    right: 15px;
    border-radius: 35px;
    z-index: 3;
    transition: 0.3s;
    cursor: pointer;
    &.-hide {
      display: none;
    }
  }
}
</style>