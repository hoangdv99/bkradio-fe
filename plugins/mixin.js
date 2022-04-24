import Vue from "vue"
import { createNamespacedHelpers } from '@/util'
const { $commit } = createNamespacedHelpers('layout')

const mixin = {
  mounted() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $commit('SET_DEVICE', 'mobile')
    }
  }
}

Vue.mixin(mixin)
