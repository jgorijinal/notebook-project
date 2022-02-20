<template>
  <div id="notebookList" class="detail">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <Icon name="plus"></Icon>
        <span>新建笔记本</span></a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(1)</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebookList" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook" >
            <div  class="left">
              <span><Icon name="note2"></Icon></span>{{notebook.title}}
              <span class="counts">{{notebook.noteCounts}}</span>
            </div>
            <div class="right">
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">修改标题</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Icon from './Icon.vue'
import Notebooks from '../apis/notebooks'
import {friendlyDate} from "../helpers/util";
window.Notebooks = Notebooks

export default {
  name: "NotebookList",
  components: {Icon},
  data() {
    return {
      msg: '笔记本列表',
      notebookList: []
    }
  },
  created() {
    Auth.getInfo().then(response => {
      console.log(response)
      if (!response.isLogin) {
        this.$router.push('/login')
      }
    })
    Notebooks.getAll().then(response => {
      this.notebookList = response.data
      console.log(this.notebookList)
    })
  },
  methods: {
    onCreate() {
      this.$prompt('请输入标题', '创建新的笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，而且字数不能超过30个字符'
      }).then(({ value }) => {
        return Notebooks.addNotebook({title: value})
      }).then((response)=>{
        response.data.friendlyCreatedAt = friendlyDate(response.data.createdAt)
        this.notebookList.unshift(response.data)
        console.log(response.data)
        this.$message({
          type: 'success',
          message: response.msg
        });
      }).catch((response) => {
        if(response.msg){
          this.$message.info(response.msg);
        }
      });
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入标题', '修改笔记本的标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:notebook.title,
        inputPattern: /^.{1,35}$/,
        inputErrorMessage: '标题不能为空，而且字数不能超过30个字符'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, {title})
      }).then((response) => {
        notebook.title = title
        this.$message({
          type: 'success',
          message: response.msg
        });
      }).catch((response) => {
        if(response.msg){
          this.$message.error(response.msg);
        }
      });
    },
  onDelete(notebook) {
    this.$confirm('此操作将永久删除该笔记本, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }).then(()=>{
      return Notebooks.deleteNotebook(notebook.id)
    }).then((response) => {
      this.notebookList.splice(this.notebookList.indexOf(notebook), 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch((response) => {
      if(response.msg){
        this.$message.error(response.msg)
      }
    });
    }
  }
}
</script>

<style lang="less" scoped>
#notebookList {
  .el-button--primary{
    background: #2c333c;
  }
  flex: 1;
  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
    .btn {
      width: 120px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding:6px 0 ;
      border-radius:4px;
      transition:all 0.2s;
      color: black;
      &:hover{
        background: #dcdada;
      }
      &:active{
        background: white;
      }
      .iconfont {
        margin-left:6px;
        width:1.3em;
      }
      span {
        font-size: 16px;
        margin-right:6px;
      }
    }
  }
  main {
    height: calc(100vh - 59px);
    overflow: scroll;
    padding: 30px 40px;
    .layout {
      max-width: 966px;
      margin: 0 auto;
      height: 100%;
      h3{
        font-size: 14px;
        color: #000;
      }
      .book-list {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        background-color: #fff;
        border-radius: 4px;
        font-weight: bold;
        a{
          transition: all 0.2s;
        }
        span {
          font-size: 13px;
          font-weight:bold ;
          color: #a4b2bb;
          margin-right: 10px;
        }
        .notebook{
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border-bottom: 1px solid #ebebeb;
          padding: 0 14px;
          .left,.right{
            display: flex;
            align-items: center;
            vertical-align: middle;
          }
          .left{
            .counts{
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2px 0 0 6px;
            }
          }
          .right{
            span{margin:0}
            .date{
            margin-top: 1px;
              padding: 0 10px;
            }
            .action{
              transition: all 0.2s;
              border-radius:4px ;
              padding: 16px 10px;
            }
            .action:hover{
              transform: scale(1.1);
            }
          }
          &:hover{
            background-color: #f7fafd;
          }
        }
      }
    }
  }

}




</style>
