<template>
  <div></div>
</template>
<script>
export default {
  layoutContent() {
    return {
      showSidebar: false
    }
  },
  name: 'AdminAudioManagement',
  middleware: 'isAdmin'
}
</script>