<template>
  <div class="login-page" @submit.prevent="signup">
    <form class="form">
      <h3 class="title">Đăng ký</h3>
      <div class="field">
        <span class="label">Tên tài khoản</span>
        <input
          v-model="signupData.username"
          type="text"
          placeholder="Nhập tên tài khoản"
          class="input"
        />
        <v-icon class="icon">mdi-account</v-icon>
      </div>
      <div class="field">
        <span class="label">Mật khẩu</span>
        <input
          v-model="signupData.password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="input"
        />
        <v-icon class="icon">mdi-lock</v-icon>
      </div>
      <div class="field">
        <span class="label">Nhập lại mật khẩu</span>
        <input
          v-model="signupData.confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          class="input"
        />
        <v-icon class="icon">mdi-lock</v-icon>
      </div>
      <button type="submit" class="btn">Đăng ký</button>
      <NuxtLink to="/auth/login" class="link"
        >Đã có tài khoản? Quay lại đăng nhập</NuxtLink
      >
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      signupData: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async signup() {
      const res = await this.$axios.post('auth/signup', {
        json: {
          username: this.signupData.username,
          password: this.signupData.password,
        },
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
    @include sp {
      padding: 10px;
    }
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
    margin: 15px 0;
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