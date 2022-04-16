<template>
  <nav v-if="items.length" class="app-breadcrumbs">
    <v-icon>mdi-home</v-icon>
    <a href="/" class="link">Trang chủ / </a>
    <a
      v-for="(item, index) in items"
      :key="'item-' + index"
      :href="item.url"
      class="link"
      >{{ index !== items.length - 1 ? item.name + ' / ' : item.name }}</a
    >
  </nav>
</template>
<script>
import { createNamespacedHelpers } from '@/util'
const { $get } = createNamespacedHelpers('layout')
export default {
  name: 'AppBreadcrumbs',
  computed: {
    items: $get('breadcrumbs'),
  },
}
</script>
<style lang="scss" scoped>
.app-breadcrumbs {
  margin: 15px 30px 0;
  color: #999999;
  > .link {
    text-decoration: none;
    color: #999999;
    &:hover {
      color: #9ebaa0;
    }
  }
}
</style>

