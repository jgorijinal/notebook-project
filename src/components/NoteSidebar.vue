<template>
<div class="note-sidebar">
  <header>
    <div class="notebook-title">
      <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        <span>{{currentNotebook.title}}</span>
        <Icon name="bottom"></Icon>
       </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="notebook in notebookList" :key="notebook.id" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
          <el-dropdown-item  command="trash">回收站</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <span class="add-note" @click="addNote">添加笔记</span>
  </header>
  <div class="menu">
    <div>更新时间</div>
    <div>标题</div>
  </div>
  <div class="notes">
   <ul>
     <li>
     <router-link v-for="note in notes" :key="note.id" :to="`/note?noteId=${note.id}&notebookId=${currentNotebook.id}`">
       <div class="date">{{note.createdAtFriendly}}</div>
       <div class="title">{{note.title}}</div>
     </router-link>
     </li>
   </ul>
  </div>
</div>
</template>
<script>
import Icon from './Icon.vue'
import Notebooks from '../apis/notebooks'
import Notes from '../apis/notes'
import eventBus from "../helpers/eventBus";

export default {
  components:{Icon},
  data(){
    return {
      notebookList:[],
      notes:[],
      currentNotebook:{}
    }

  },
  created() {
    Notebooks.getAll().then((response)=> {
      this.notebookList = response.data
      this.currentNotebook = this.notebookList.find(notebook=>{
        return notebook.id.toString() === this.$route.query.notebookId  // 利用this.$route.query.notebookId判断current的notebook
      }) || this.notebookList[0] || {}
      return Notes.getAll({notebookId : this.currentNotebook.id}) //.then 里面 再return一个请求 ,在下次再.then处理数据
    }).then((response)=>{
      this.notes = response.data
      this.$emit('update:notes',this.notes)
      eventBus.$emit('update:notes',this.notes)
      console.log(this.notes);
    })

  },
  methods:{
    handleCommand(notebookId){
      console.log(notebookId)
      this.currentNotebook = this.notebookList.find((notebook)=>notebook.id ===notebookId )
      Notes.getAll({notebookId}).then(response=>{
        this.notes = response.data
        this.$emit('update:notes',this.notes)
      })
    },
    addNote(){
      Notes.addNote({notebookId : this.currentNotebook.id},{title:'无标题'}).then(response=>{
        this.notes.unshift(response.data)
      })
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.note-sidebar{
  width: 320px;
  border-right:1px solid #ccc ;
  display: flex;
  flex-direction: column;
  height: 100%;
header{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom:1px solid #ccc;
  background:#f7f7f7;
  .notebook-title{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover{
    font-weight: bold;
    }
    .el-dropdown-link{
     display: flex;
      justify-content: center;
      align-items: center;
      span{
        font-size: 18px;
      }
      .iconfont{
        padding-left:10px ;
      }
    }

  }
  position: relative;
  .add-note{
    border: 1px solid #ccc;
    border-radius:4px;
    padding: 6px 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    &:hover{
      background: #dcdada;
    }
    &:active{
      background: white;
    }
  }
}
.menu{
  display: flex;
  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:6px  ;
    border-bottom: 1px solid #ccc;
    &:first-child{
      border-right:1px solid #ccc ;
    }
  }
}
.notes{
 height: 100%;
  overflow: auto;
  a{
    display: flex;
    border: 2px solid transparent;
    &:hover{
      background: #dcd9d9;
    }
    &.router-link-exact-active{
      border: 2px solid #81c0f3;
    &:first-child{
      border-top:2px solid #81c0f3  ;
    }
    }
    .date,.title {
      overflow:hidden;
      text-overflow :ellipsis;
      white-space: nowrap;
      font-size: 12px;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
     padding: 4px 0;
    }
  }

}







}

</style>
