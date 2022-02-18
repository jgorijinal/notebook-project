<template>
  <div id="sidebar">
    <Avatar></Avatar>
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <Icon name="note" class="iconfont icon-note"></Icon>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <Icon name="notebook" class="iconfont icon-notebook"></Icon>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <Icon name="trash" class="iconfont icon-trash"></Icon>
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <Icon name="logout" class="iconfont icon-logout" ></Icon>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import Avatar from './Avatar.vue'
import Auth from '../apis/auth'
export default {
  components: {Icon, Avatar},
  methods:{
    logout(){
      console.log('logout')
      Auth.logout().then(data=>console.log(data))
    }
  }

}
</script>
<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 70px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 15px;


    a {
      transition: all 0.3s;
      padding: 12px 0;
      display: block;
    }

    a:hover {
      background-color: #8a8a8c;
    }

    .router-link-active {
      background-color: #5e6266;
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
    width: 2em;
    height: 2em;
  }
}
</style>
