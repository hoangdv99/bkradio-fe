<template>
  <footer class="app-footer">
    <div class="text">© Copyright 2022 BKRadio | Thư Viện Audio Dành Cho Mọi Người</div>
    <ul class="menu">
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
      <a href="#" class="item">Tình yêu</a>
    </ul>
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
}
</script>
<style lang="scss" scoped>
.app-footer {
  margin-top: 50px;
  background-color: #627c83;
  text-align: center;
  padding: 20px;
  color: #daeaea;
  > .menu {
    display: flex;
    justify-content: center;
  }
  > .menu > .item {
    padding: 10px;
    color: #daeaea;
  }
}
</style>