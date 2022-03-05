<template>
  <v-app>
    <div class="default-layout">
      <div class="layout">
        <layout-header></layout-header>
        <layout-breadcrumbs></layout-breadcrumbs>
        <main class="main">
          <nuxt class="content"></nuxt>
          <common-sidebar v-if="showSidebar"></common-sidebar>
        </main>
        <layout-footer></layout-footer>
      </div>
      <div :class="'pagetop' + (hide ? ' -hide' : '')" @click="goTop">
        <font-awesome-icon :icon="angleUpIcon" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { createNamespacedHelpers } from '@/util'
const { $get } = createNamespacedHelpers('layout')

export default {
  name: 'DefaultLayout',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      angleUpIcon: faAngleUp,
      hide: true,
    }
  },
  computed: {
    showSidebar: $get('showSidebar'),
    snackbar: $get('snackbar'),
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
    display: flex;
    margin-top: 15px;
    padding: 0 30px;
    min-height: 80vh;
  }
  > .layout > .main > .content {
    flex: 8;
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