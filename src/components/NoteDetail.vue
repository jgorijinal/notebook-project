<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="notes = $event"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!$route.query.noteId">请选择笔记</div>
      <div class="note-detail-ct" v-show="$route.query.noteId">
        <div class="note-bar">
            <span> 创建日期: {{curNote.createdAtFriendly}}</span>
            <span> 更新日期: {{curNote.updatedAtFriendly}}</span>
            <span> {{statusText}}</span>
          <span @click="onDeleteNote"><Icon  name="trash2-copy" ></Icon></span>
          <span  @click="markdownVisible = !markdownVisible"><Icon name="yulan"></Icon></span>
        </div>
        <div class="note-title">
          <input type="text"  v-model="curNote.title"  @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="请输入标题:">
        </div>
        <div class="editor">
          <textarea v-show="!markdownVisible" v-model="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="请输入内容, 该区域支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewMarkdown" v-show="markdownVisible">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoteSidebar from "./NoteSidebar";
import Icon from "./Icon.vue";
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapState,mapGetters, mapActions, mapMutations} from 'vuex'

let md = new MarkdownIt();

export default {
  components: {NoteSidebar,Icon},
  data () {
    return {
      statusText: '笔记未改动',
      markdownVisible: false
    }
  },

  created() {
    // this.checkLogin({ path: '/login' })
  },

  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),

    previewMarkdown() {
      return md.render(this.curNote.content||'')
    }
  },

  methods: {
    ...mapMutations([
      'setCurNote'
    ]),

    ...mapActions([
      'updateNote',
      'deleteNote',
      // 'checkLogin'
    ]),

    onUpdateNote: _.debounce(function() {
      this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })

    }, 300),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id })
        .then(data => {
          this.$router.replace({ path: '/note' })
        }).catch(err=>console.log(err))
    }

  },

  beforeRouteUpdate (to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId})
    next()
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
