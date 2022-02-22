import Notebooks from '../../apis/notebooks'
import {Message} from "element-ui";
const state ={
  notebooks:[]
}
const getters = {
  notebooks(state){
     return state.notebooks
}
}
const mutations ={
  setNotebooks(state,payload){
    state.notebooks = payload.notebooks
  },
  addNotebook(state,payload){
    state.notebooks.unshift(payload.notebook)
  },
  updateNotebook(state,payload){
    let currentNote = state.notebooks.find(notebook => notebook.id === payload.notebookId) || {}
    currentNote.title = payload.title
  },
  deleteNotebook(state,payload){
    state.notebooks = state.notebooks.filter(notebook=>notebook.id !== payload.notebookId)   //filter会return新数组
  }
}
const actions ={
  getNotebooks({commit}) {
    Notebooks.getAll().then(response => {
      commit('setNotebooks', {notebooks: response.data})
    })
  },
  addNotebook({commit},payload){
    Notebooks.addNotebook({title:payload.title}).then(response=>{
      commit('addNotebook',{notebook:response.data})
      Message.success(response.msg)
    })
  },
  updateNotebook({commit},payload){
    Notebooks.updateNotebook(payload.notebookId,{title:payload.title}).then(response=>{
      commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
      Message.success(response.msg)
    })

  },
  deleteNotebook({commit},payload){
    Notebooks.deleteNotebook(payload.notebookId).then(response=>{
      commit('deleteNotebook',{notebookId:payload.notebookId})
      Message.success(response.msg)
    })
  }

}
export default {
  state,
  getters,
  mutations,
  actions
}
