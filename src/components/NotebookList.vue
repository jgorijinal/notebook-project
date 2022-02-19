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
          <router-link v-for="notebook in notebookList" :key="notebook.id" :to="`/note/${notebook.id}`" class="notebook" >
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
      const title = window.prompt('请输入标题:')
      if (title.trim() === '') {
        window.alert('标题不能为空,请重新输入')
        return
      }
      Notebooks.addNotebook({title: title})
        .then(response => {
          console.log(response.msg)
          response.data.friendlyCreatedAt = friendlyDate(response.data.createdAt)
          this.notebookList.unshift(response.data)
          alert(response.msg)
        })

    },
    onEdit(notebook) {
      const title = window.prompt('请输入你要修改的标题:')
      if (title.trim() === '') {
        window.alert('标题不能为空,请重新输入')
        return
      }
      Notebooks.updateNotebook(notebook.id, {title: title}).then(response => {
        notebook.title = title
        window.alert(response.msg)
      })
    }
  ,
  onDelete(notebook) {
    const inConfirm = window.confirm('确定要删除吗?')
    if (inConfirm) {
      Notebooks.deleteNotebook(notebook.id).then(response => {
        this.notebookList.splice(this.notebookList.indexOf(notebook), 1)
        window.alert(response.msg)
      }).catch(reason => window.alert('目前无法删除,因为' + reason.msg))
    }
  },
}
}
</script>

<style lang="less" scoped>
#notebookList {
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
        background: #d2b311;
        opacity: 0.9;
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
          padding: 12px 14px;
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
             margin: 3px 0 0 6px;
            }
          }
          .right{
            span{margin:0}
            .date{
            margin-top: 2.5px;
              padding: 0 10px;
            }
            .action{
              transition: all 0.2s;
              border-radius:4px ;
              padding: 0 10px;
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
