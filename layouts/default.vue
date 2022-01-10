<template>
  <div class="default-layout">
    <div class="layout">
      <layout-header></layout-header>
      <main class="main">
        <nuxt class="content"></nuxt>
      </main>
      <layout-footer></layout-footer>
    </div>
    <div :class="'pagetop' + (hide ? ' -hide' : '')" @click="goTop">
      <font-awesome-icon :icon="angleUpIcon" />
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
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
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    updateScroll() {
      this.hide = !!(window.scrollY < 220)
    }
  },
}
</script>
<style lang="scss" scoped>
.default-layout {
  > .layout {
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
    min-height: 80vh;
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