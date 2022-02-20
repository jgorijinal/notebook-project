<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="false">请选择笔记</div>
      <div class="note-detail-ct" >
        <div class="note-bar">
            <span> 创建日期: {{}}</span>
            <span> 更新日期: {{}}</span>
            <span> {{}}</span>
            <Icon name="trash2-copy"></Icon>
            <Icon name="yulan"></Icon>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea  placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from '../apis/auth'
import NoteSidebar from "./NoteSidebar";
import Icon from "./Icon.vue";

export default {
  components: {NoteSidebar,Icon},
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
<style lang="less" scoped>
#note {
  display: flex;
  width:100vw;
}
.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

.note-detail-ct {
  height: 100%;
}

.note-empty {
  font-size: 50px;
  color: #ccc;
  text-align: center;
  margin-top: 100px;
}

.note-bar {
  padding: 4px 20px;
  border-bottom: 1px solid #eee;
  background: #f1f0f0;
&:after {
   content:'';
   display: block;
   clear: both;
 }
span {
  font-size: 12px;
  color: #999;
  margin-right: 4px;
}
.iconfont{
  float: right;
  margin-left: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #8a8a8c;
  &:last-child{

  }
}

}

.note-title{
input,span {
  display: inline-block;
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px 20px;
}
}

.editor {
  height: ~"calc(100% - 70px)";
  position: relative;
}
textarea, .preview {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
}

textarea {
  border: none;
  resize: none;
  outline: none;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
}

code {
  color: #f66;
}
}
</style>
