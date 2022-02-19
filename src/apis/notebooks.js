
import request from '../helpers/request'
import {friendlyDate} from "../helpers/util";
const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}
export default  {
  getAll(){
    return new Promise((resolve,reject)=>{  //在return new Promise 比较createdAt排序
      request(URL.GET, 'GET').then((response)=>{
        response.data = response.data.sort((notebook1, notebook2) => notebook1.createAt < notebook2.createAt ? 1 : -1)
        response.data.forEach(notebook=>notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt))
      resolve(response)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  addNotebook({title=''} = {title : ''}){
    return request(URL.ADD,'POST',{title})
  },
  updateNotebook(notebookId,{title=''} = {title : ''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },
  deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  }
}
