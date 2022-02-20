<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main">
            <div class="logo">
              <Icon name="infinity"></Icon>
              <p>Forever云笔记</p>
            </div>
          </div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <div :class="{show:isShowRegister}" class="register">
              <input type="text" v-model="register.username" placeholder="请输入用户名">
              <input type="password" v-model="register.password" placeholder="设置你的密码">
              <p :class="{error:register.isError}">{{ register.notice }}</p>
              <div class="button" @click="onRegister">创建账号</div>
            </div>
            <h3 @click="showLogin">登录</h3>
            <div :class="{show:isShowLogin}" class="login">
              <input type="text" v-model="login.username" placeholder="请输入用户名">
              <input type="password" v-model="login.password" placeholder="请输入密码">
              <p :class="{error:login.isError}">{{ login.notice }}</p>
              <div class="button" @click="onLogin">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon";
import Auth from '../apis/auth' //认证相关axios的api
import eventBus from '../helpers/eventBus'


export default {
  name: 'Login',
  components: {Icon},
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '请输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '点击创建帐户',
        isError: false
      }
    }
  },
  methods: {
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    onRegister() {
      let result1 = this.validUsername(this.register.username)
      if (!result1.isValid) {
        this.register.isError = true
        this.register.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.register.password)
      if (!result2.isValid) {
        this.register.isError = true
        this.register.notice = result2.notice
        return
      }
      this.register.notice = ''
      this.register.isError = false

      Auth.register({
        username: this.register.username,
        password: this.register.password
      }).then(data => {
        this.register.isError = false
        this.register.notice = data.msg
      }).catch(data=>{
        this.register.isError = true
        this.register.notice = data.msg
      })
    },
    onLogin() {
      let result1 = this.validUsername(this.login.username)
      if (!result1.isValid) {
        this.login.isError = true
        this.login.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.login.password)
      if (!result2.isValid) {
        this.login.isError = true
        this.login.notice = result2.notice
        return
      }
      this.login.notice = ''
      this.login.isError = false
      Auth.login(
        {username: this.login.username, password: this.login.password}
      )
        .then((data) => {
          this.login.isError = false   //箭头函数没有this,所以可以用this
          this.login.notice = ''
          eventBus.$emit('userInfo',{username : this.login.username})  //触发Avatar组件的头像字母
          this.$router.push('/notebooks')
          })
        .catch((data)=>{
          this.login.isError = true
          this.login.notice = data.msg
        })


    },
    validUsername(username) {
      return {
        isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名必须是3~15个字符,包括字母、数字、下划线和中文'
      }
    },
    validPassword(password) {
      return {
        isValid: /^.{6,16}$/.test(password),
        notice: '密码必须是6~15个字符'
      }
    }


  }
}
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}

.modal-container {
  width: 1000px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to left,white, grey);
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4em;
      transition: all 1.2s ease-out;
      &:hover {
        transform: scale(1.06);
      }

      svg {
        width: 1.5em;
        margin-right: 0.3em;
      }
    }

  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      margin-top: -1px;
      padding: 10px 20px;
      font-weight: bold;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #e1dfdf;

      }

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;

      }
    }

    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 10px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #26a258;
      }

      &:active {
        background-color: #2bb964;
      }
    }

    .login, .register {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height 0.5s;

      &.show {
        height: 190px;
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }

}
</style>
