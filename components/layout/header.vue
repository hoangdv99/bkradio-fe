<template>
  <header class="app-header">
    <img src="/hemradio.png" alt="logo" class="logo" />
    <ul class="menu">
      <li class="item -active">
        <a href="" class="link">Home</a>
      </li>
      <li class="item">
        <a href="" class="link -dropdown">Truyện</a>
        <ul class="sub-menu">
          <a href="" class="item">Truyện ngắn</a>
          <a href="" class="item">Truyện dài</a>
        </ul>
      </li>
      <li class="item">
        <a href="" class="link">Sách nói</a>
      </li>
      <li class="item">
        <a href="" class="link -dropdown">Thể loại</a>
        <ul class="sub-menu">
          <a href="" class="item">Tình yêu</a>
          <a href="" class="item">Kỹ năng sống</a>
          <a href="" class="item">Văn học học đường</a>
        </ul>
      </li>
      <li class="item">
        <a href="" class="link -dropdown">Giọng đọc</a>
        <ul class="sub-menu">
          <a href="" class="item">Nam</a>
          <ul class="sub-menu">
            <a href="" class="item">Trần Ngọc San</a>
            <a href="" class="item">Kẻ Trộm Hương</a>
          </ul>
          <a href="" class="item">Nữ</a>
          <ul class="sub-menu">
            <a href="" class="item">Kim Phượng</a>
            <a href="" class="item">Thy Mai</a>
          </ul>
        </ul>
      </li>
      <li class="item">
        <a href="" class="link">Blog</a>
      </li>
    </ul>
    <div class="search">
      <input type="text" class="input" placeholder="Nhập nội dung cần tìm..." />
      <font-awesome-icon :icon="searchIcon" class="icon" />
    </div>
  </header>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      searchIcon: faSearch,
    }
  },
}
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 73px;
  background-color: #627c83;
  padding: 0 30px;
  > .logo {
    width: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  > .menu {
    display: table;
  }
  > .menu > .item {
    display: table-cell;
    position: relative;
    &:hover {
      background-color: #9ebaa0;
    }
    &:hover > .sub-menu {
      display: block;
    }
    &.-active {
      background-color: #9ebaa0;
      margin-bottom: -5px;
      border-bottom: 5px solid #9ebaa0;
    }
    &.-active::after {
      content: '';
      width: 20px;
      height: 2px;
      position: absolute;
      margin-top: 17px;
      left: 50%;
      top: 50%;
      bottom: auto;
      right: auto;
      transform: translateX(-50%) translateY(-50%);
      background: #2c2f34;
      transition: 0.3s;
    }
  }
  > .menu > .item > .link {
    display: block;
    padding: 0 14px;
    height: 73px;
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    line-height: 73px;
    &.-dropdown {
      padding-right: 26px;
      &::before {
        content: '';
        position: absolute;
        margin-top: 2px;
        right: 12px;
        top: 50%;
        bottom: auto;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-top: 4px solid #ffffff;
        transition: border 0.15s;
      }
    }
  }
  > .search {
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
  }
  > .search > .input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    padding: 10px 20px 10px 10px;
    color: #daeaea;
  }
  > .search > .icon {
    position: absolute;
    font-size: 14px;
    color: #daeaea;
    right: 10px;
    top: 14px;
    cursor: pointer;
  }
}
.sub-menu {
  display: none;
  padding: 15px;
  width: 230px;
  position: absolute;
  background-color: #627c83;
  border-top: 2px solid #08f;
  border-color: #9ebaa0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .item + .sub-menu {
    &:hover {
      display: block;
      top: 20px;
      left: 80%;
      border-top: none;
    }
  }
  > .item {
    display: block;
    font-weight: 400;
    text-transform: uppercase;
    color: #fff;
    line-height: 20px;
    padding: 8px 10px;
    &:hover {
      color: #9ebaa0;
      + .sub-menu {
        display: block;
        top: 20px;
        left: 80%;
        border-top: none;
      }
    }
  }
}
</style>