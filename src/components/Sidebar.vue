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
    <div class="logout">
      <Icon name="logout" class="iconfont icon-logout"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import Avatar from './Avatar.vue'
export default {
  components: {Icon,Avatar}
}
</script>
<style scoped>
#sidebar {
  position: relative;
  width: 70px;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;
}

.icons a {
  transition: all 0.3s;
  padding: 12px 0;
  display: block;
}

.icons a:hover {
  background-color: #8a8a8c;
}

.icons .router-link-active {
  background-color: #5e6266;
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
</style>
