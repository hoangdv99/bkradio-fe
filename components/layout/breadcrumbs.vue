<template>
  <nav v-if="items.length" class="app-breadcrumbs">
    <font-awesome-icon :icon="homeIcon"></font-awesome-icon>
    <a href="/" class="link">Trang chủ / </a>
    <a v-for="(item, index) in items" :key="'item-' + index" :href="item.url" class="link">{{
      index !== items.length - 1 ? item.name + ' / ' : item.name
    }}</a>
  </nav>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { createNamespacedHelpers } from '@/util'
const { $get } = createNamespacedHelpers('layout')
export default {
  name: 'AppBreadcrumbs',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      homeIcon: faHome,
    }
  },
  computed: {
    items: $get('breadcrumbs'),
  },
}
</script>
<style lang="scss" scoped>
.app-breadcrumbs {
  margin: 15px 30px;
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

