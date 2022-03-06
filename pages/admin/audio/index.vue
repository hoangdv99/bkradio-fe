<template>
  <div class="audio-management-page">
    <page-title></page-title>
    <audio-list></audio-list>
  </div>
</template>
<script>
import PageTitle from './-title.vue'
import AudioList from './-table.vue'

export default {
  layoutContent() {
    return {
      showSidebar: false,
      breadcrumbs: [
        {
          name: 'Quản lý audio',
          url: '/admin/audio',
        },
      ],
    }
  },
  name: 'AdminAudioManagement',
  components: {
    PageTitle,
    AudioList,
  },
  middleware: ['isAuthenticated', 'isAdmin'],
}
</script>
