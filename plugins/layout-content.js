import Vue from "vue"
import { createNamespacedHelpers } from '@/util'
const { $commit } = createNamespacedHelpers('layout')

Vue.mixin({
  mounted() {
    if(this.$options.layoutContent) {
      const layoutContent = this.$options.layoutContent.apply(this)
      $commit('SET_SHOW_SIDEBAR', layoutContent.showSidebar || false)
    }
  },
})
