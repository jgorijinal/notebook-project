<template>
  <div id="login">
    <h1>{{ msg }}</h1>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main">
            <div class="logo">
              <Icon name="infinity"></Icon>
              <p>Forever云笔记</p>
            </div>
            <h1>让工作更有序，让生活更简约。</h1>
          </div>
          <div class="form">
            <h3>创建账户</h3>
            <div v-show="true" class="register">
              <input type="text" placeholder="用户名">
              <input type="password" placeholder="密码">
              <div class="button">创建账号</div>
            </div>
            <h3>登录</h3>
            <div v-show="false" class="login">
              <input type="text" placeholder="输入用户名">
              <input type="password" placeholder="密码">
              <div class="button"> 登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  name: 'Login',
  components:{Icon},
  data() {
    return {
      msg: '登录页面'
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
      position: relative;
      .logo{display: flex;align-items: center;justify-content: center;font-size: 3em;margin-top: 2em;
        svg{width:1.5em;margin-right: 0.3em;}
      }
      h1{
        font-size: 50px;
        position: absolute;
        left: 30px;
        top: 50%;
      }

    }
    .form {
      width: 270px;
      border-left: 1px solid #ccc;
        h3 {
          padding: 10px 20px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
          transition: all 0.3s;
          &:hover{
            background: #efecec;
          }
            &:nth-of-type(2){
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
          margin-top: 18px;
          cursor: pointer;
        }

        .login,.register {
          padding: 10px 20px;
          border-top: 1px solid #eee;

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
