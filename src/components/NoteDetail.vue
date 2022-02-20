<template>
  <div id="note">
    <NoteSidebar></NoteSidebar>
    <div id=""note-detail>
      <h1>notebookId:{{$route.query.notebookId}}</h1>
      <h1>noteId:{{$route.query.noteId}}</h1>
    </div>
  </div>
</template>
<script>
import Auth from '../apis/auth'
import NoteSidebar from "./NoteSidebar";

export default {
  components: {NoteSidebar},
  data() {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    Auth.getInfo().then(response => {
      if (!response.isLogin) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
<style scoped>
#note {
  display: flex;
}
</style>
