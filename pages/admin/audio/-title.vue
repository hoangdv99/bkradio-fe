<template>
  <div class="page-title">
    <h1>Quản lý Audio</h1>
    <div class="actions">
      <upload-button class="btn"></upload-button>
      <convert-button class="btn"></convert-button>
    </div>
  </div>
</template>
<script>
import UploadButton from './-upload.vue'
import ConvertButton from './-convert.vue'
export default {
  name: "PageTitle",
  components: {
    UploadButton,
    ConvertButton,
  },
}
</script>
<style lang="scss" scoped>
.page-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > .actions {
    display: flex;
  }
  > .actions > .btn {
    margin-left: 10px;
  }
}
</style>
