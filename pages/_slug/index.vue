<template>
  <div class="detail-page"></div>
</template>
<script>
export default {
  layoutContent() {
    return {
      showSidebar: true,
      breadcrumbs: [
        {
          name: 'Truyện ngắn',
          url: '#',
        },
        {
          name: 'Phận đàn bà | Y mùi',
          url: '#',
        },
      ]
    }
  },
  name: 'DetailPage',
}
</script>