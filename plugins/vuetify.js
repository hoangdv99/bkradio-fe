import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import vi from 'vuetify/lib/locale/vi'
import en from 'vuetify/lib/locale/en'

Vue.use(Vuetify)

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'en'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { vi, en },
    current: 'vi',
  },
})
