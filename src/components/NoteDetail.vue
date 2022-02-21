<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="notes = $event"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
            <span> 创建日期: {{currentNote.createdAtFriendly}}</span>
            <span> 更新日期: {{currentNote.updatedAtFriendly}}</span>
            <span> {{statusText}}</span>
          <span @click="deleteNote"><Icon  name="trash2-copy" ></Icon></span>
          <span  @click="markdownVisible = !markdownVisible"><Icon name="yulan"></Icon></span>
        </div>
        <div class="note-title">
          <input type="text"  v-model="currentNote.title"  @input="updateNote" @keydown="statusText='正在输入...'" placeholder="请输入标题:">
        </div>
        <div class="editor">
          <textarea v-show="!markdownVisible" v-model="currentNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="请输入内容, 该区域支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewMarkdown" v-show="markdownVisible">
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
import eventBus from "../helpers/eventBus";
import _ from 'lodash'
import Notes from '../apis/notes'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt();

export default {
  components: {NoteSidebar,Icon},
  data() {
    return {
      currentNote:{},
      notes:[],
      statusText:'未有改动',
      markdownVisible:false
    }
  },
  created() {
    Auth.getInfo().then(response => {
      if (!response.isLogin) {
        this.$router.push('/login')
      }
    })
    eventBus.$on('update:notes', notes =>{   //一开始create时让 笔记本展示当前内容
      this.currentNote = notes.find(note=>(note.id).toString() === this.$route.query.noteId) || {}

    })
  },
  beforeRouteUpdate(to,from,next) {
    this.currentNote = this.notes.find(note=>(note.id).toString() === to.query.noteId) || {}
    next() //必须调用
  },
  computed:{
    previewMarkdown(){
      return  md.render(this.currentNote.content || '' )
    }
  },
  methods:{
    updateNote: _.debounce(function (){
      const {id,title,content} = this.currentNote
      Notes.updateNote({noteId:id},{title,content})
      .then(data=>{
        this.statusText = '已保存'

      }).catch((err)=>{
        this.statusText = '保存出错'
        this.$message(err.msg)
      })
    },500),
    deleteNote(){
      Notes.deleteNote({noteId:this.currentNote.id})
      .then(response=>{
        this.$message.success(response.msg)
        this.notes.splice(this.notes.indexOf(this.currentNote),1)
        this.$router.replace({path:'/note'})
      })
    }
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
  &:hover{
    transform: scale(1.1);
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
background: white;
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
