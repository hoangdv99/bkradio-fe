<template>
  <div class="page-title">
    <h1>Quản lý Audio</h1>
    <upload-button></upload-button>
  </div>
</template>
<script>
import UploadButton from './-upload.vue'
export default {
  name: "PageTitle",
  components: {
    UploadButton
  },
}
</script>
<style lang="scss" scoped>
.page-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > .btn {
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #fff;
    background-color: #627c83;
    font-size: 1.2rem;
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
