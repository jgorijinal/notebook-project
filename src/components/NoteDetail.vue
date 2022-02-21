<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="notes = $event"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="false">请选择笔记</div>
      <div class="note-detail-ct" >
        <div class="note-bar">
            <span> 创建日期: {{currentNote.createdAtFriendly}}</span>
            <span> 更新日期: {{currentNote.updatedAtFriendly}}</span>
            <span> {{currentNote.statusText}}</span>
            <Icon  name="trash2-copy"></Icon>
            <Icon name="yulan"></Icon>
        </div>
        <div class="note-title">
          <input type="text"  v-model="currentNote.title" placeholder="请输入标题:">
        </div>
        <div class="editor">
          <textarea v-show="true" v-model="currentNote.content"  placeholder="请输入内容, 该区域支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false">
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
import Notes from '../apis/notes'
import Notebooks from "../apis/notebooks";
export default {
  components: {NoteSidebar,Icon},
  data() {
    return {
      currentNote:{
        title:'这是我的标题',
        content:'这是我的内容',
        createdAtFriendly:'创建时间',
        updatedAtFriendly:'更新时间',
        statusText:'已保存'
      },
      notes:[]
    }
  },
  created() {
    Auth.getInfo().then(response => {
      if (!response.isLogin) {
        this.$router.push('/login')
      }

    })
  },
  watch:{
    notes:function (){
      console.log(this.notes)
    }
  },
  beforeRouteUpdate(to,from,next) {
    this.currentNote = this.notes.find(note=>(note.id).toString() === to.query.noteId)
    next() //必须调用
  }
}
</script>
<style lang="less" scoped>
#note {
  display: flex;
   flex-grow: 1;
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
  border-bottom: 1px solid #eee;
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
  height: ~"calc(100% - 73px)";
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
