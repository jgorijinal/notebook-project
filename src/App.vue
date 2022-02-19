<template>
  <div id="app">
    <Sidebar></Sidebar>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: 'App',
  components:{
    Sidebar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body, #app {
  height: 100%;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}
a {
  text-decoration: none;
  color: #444;
}
ul, li{
  list-style: none;
}
.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}
#app {
  display: flex;
  align-items: stretch;
}
.el-button{
  border: 1px solid grey;

}
.el-button:hover {
  background: #8a8a8c;
  color: white;
  border: 1px solid grey;
}
.el-button--primary,.el-button--primary:active,.el-button--primary:focus{
background: #2c333c;
border: 1px solid grey;
}
.el-input__inner:focus{
  border: 1px solid grey;
}
</style>
