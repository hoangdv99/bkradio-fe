<template>
  <div class="not-found-page">
    <h1 class="content">404 NOT FOUND</h1>
  </div>
</template>
<script>
export default {
  name: 'NotFoundPage',
}
</script>
<style lang="scss" scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  > .content {
    padding: 100px 0;
    color: #9ebaa0;
    font-weight: 700;
    font-size: 60px;
    @include sp {
      font-size: 40px;
    }
  }
}
</style>
