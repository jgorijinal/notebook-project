<template>
  <svg class="iconfont" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>
<script>
import './iconfont'
export default {
  props:{
    name:{
      type:String,
    }
  }
}
</script>
<style scoped>
.iconfont {
  width: 1.8em; height: 1.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
