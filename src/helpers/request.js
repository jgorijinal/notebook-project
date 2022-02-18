import axios from 'axios'
import baseURLConfig from './config-baseURL'
//console.log(baseURLConfig)
//默认配置
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true

export default function request(url , method = 'GET',data={}){
  return new Promise((resolve,reject)=>{
    let option = {
      url:url,
      method:method,
      validateStatus(status){
        return (status>= 200 && status < 300) || status === 400
      }
    }
    if(method.toLowerCase() === 'get'){
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then((response)=>{
      if(response.status === 200){
        resolve(response.data)
      }else {
        reject(response.data)
      }
    }).catch(err =>{
      reject({msg:'网络异常'})
    })
  })
}

//在外面使用时:
//request('/auth/login','POST',{username:'hunger',password:'123456'}).then((data)=>{console.log(data)})
