<template>
  <div class="login-page">
    <form class="form" @submit.prevent="login">
      <h3 class="title">Đăng nhập</h3>
      <div class="field">
        <span class="label">Tên tài khoản</span>
        <input v-model="loginData.username" type="text" placeholder="Nhập tên tài khoản" class="input" />
        <font-awesome-icon :icon="userIcon" class="icon"></font-awesome-icon>
      </div>
      <div class="field">
        <span class="label">Mật khẩu</span>
        <input v-model="loginData.password" type="password" placeholder="Nhập mật khẩu" class="input" />
        <font-awesome-icon :icon="lockIcon" class="icon"></font-awesome-icon>
      </div>
      <a href="#" class="link">Quên mật khẩu?</a>
      <button type="submit" class="btn">Đăng nhập</button>
      <NuxtLink to="/auth/signup" class="link">Chưa có tài khoản? Đăng kí ngay</NuxtLink>
    </form>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'LoginPage',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      userIcon: faUser,
      lockIcon: faLock,
      loginData: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      const res = await this.$auth.loginWith('local', {
        data: this.loginData,
      })
      this.$router.replace('/')
      console.log(res)
    },
  },
}
</script>
<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  > .form {
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    padding: 65px 55px 55px 55px;
  }
  > .form > .title {
    display: block;
    font-size: 39px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 49px;
  }
  > .form > .field {
    position: relative;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 23px;
    &:focus-within {
      border-color: #627c83;
      transform: 0.5s;
    }
    &:focus-within > .icon {
      color: #627c83;
    }
  }
  > .form > .field > .label {
    font-size: 16px;
    color: #333333;
    line-height: 1.5;
    padding-left: 7px;
  }
  > .form > .field > .input {
    font-size: 16px;
    color: #333333;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 55px;
    padding: 0 7px 0 43px;
  }
  > .form > .field > .icon {
    position: absolute;
    top: 65%;
    left: 7px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #bfbfbf;
  }
  > .form > .link {
    display: block;
    text-align: right;
    font-size: 16px;
    line-height: 1.2;
    color: #333;
    &:hover {
      color: #627c83;
    }
  }
  > .form > .btn {
    width: 100%;
    background-color: #627c83;
    margin: 15px;
    padding: 10px;
    text-align: center;
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      background-color: #9ebaa0;
      transform: 5s;
    }
  }
}
</style>