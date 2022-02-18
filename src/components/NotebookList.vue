<template>
  <div id="notebookList" class="detail">
    <header>
      <a href="#" class="btn">
        <Icon name="plus"></Icon>
        <span>新建笔记本</span></a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(1)</h3>
        <div class="book-list">
          <router-link to="/note/1" class="notebook">
            <div  class="left">
              <span><Icon name="note2"></Icon></span>{{'笔记本'}}
              <span>{{'个数'}}</span>
            </div>
            <div class="right">
              <span class="date">{{'2018.02.03'}}</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
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
window.Notebooks = Notebooks
export default {
  name: "NotebookList",
  components: {Icon},
  data() {
    return {
      msg: '笔记本列表'
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
      .iconfont {
        margin-left:6px;
        width:1.5em;
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
        span {
          font-size: 13px;
          font-weight:bold ;
          color: #b3c0c8;
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
