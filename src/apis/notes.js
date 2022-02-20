import request from '../helpers/request'
import {friendlyDate} from "../helpers/util";
const URL = {
  GET:'/notes/from/:notebookId',
  ADD:'/notes/to/:notebookId',
  UPDATE:'/notes/:noteId',
  DELETE:'/notes/:noteId'
}
export default  {
  getAll({notebookId}){
    return new Promise((resolve,reject)=> {
      request(URL.GET.replace(':notebookId',notebookId)).then(response=>{
        response.data = response.data.map(data=>{
          data.createdAtFriendly = friendlyDate(data.createdAt)
          data.updatedAtFriendly = friendlyDate(data.updatedAt)
          return data
        }).sort((note1,note2)=>{
          return note1.updatedAt < note2.updatedAt
        })
        resolve(response)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  addNote({notebookId},{title='',content=''} = {title:'',content:''}){
    return request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
  },
  updateNote({noteId},{title,content}){
    return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})
  },
  deleteNote({noteId}){
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  }
}
