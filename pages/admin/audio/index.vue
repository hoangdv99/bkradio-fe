<template>
  <div class="audio-management-page">
    <page-title></page-title>
    <audio-list></audio-list>
  </div>
</template>
<script>
import PageTitle from './-title.vue'
import AudioList from './-table.vue'
import { createNamespacedHelpers } from '~/util'
const { $get, $dispatch } = createNamespacedHelpers('audios')

export default {
  layoutContent() {
    return {
      showSidebar: false,
      breadcrumbs: [
        {
          name: 'Quản lý audio',
          url: '/admin/audio',
        }
      ],
    }
  },
  name: 'AdminAudioManagement',
  components: {
    PageTitle,
    AudioList,
  },
  middleware: ['isAuthenticated', 'isAdmin'],
  computed: {
    audios: $get('audios')
  },
  created() {
    if (!this.audios.length) $dispatch('getAudios')
  }
}
</script>
