<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '../apis/auth'
import eventBus from "../helpers/eventBus";
export default {
  data() {
    return {
        username: ''
    }
  },
  computed:{
    slug(){
      return this.username.charAt(0)
    }
  },
  created() {
    eventBus.$on('userInfo',(value)=>{
      this.username = value.username
    })
    Auth.getInfo().then(response=>{
           console.log(response)
         this.username = response.data.username   //有bug
       }).catch(err=>{
         console.log('未登录')
    })
  },

}
</script>

<style scoped>
span {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
