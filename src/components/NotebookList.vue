<template>
<div id="notebookList">
  <h1>{{msg}}</h1>
  <ul>
    <router-link to="/note/1">1</router-link>
    <router-link to="/note/2">2</router-link>
  </ul>
</div>
</template>

<script>
import Auth from '../apis/auth'
export default {
  name: "NotebookList",
  data(){
    return {
      msg:'笔记本列表'
    }
  },
  created() {
    Auth.getInfo().then(response=>{
      console.log(response.isLogin)
      if(!response.isLogin){
        this.$router.push('/login')
      }

    })
  }
}
</script>

<style scoped>

</style>
