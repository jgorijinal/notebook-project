  export function friendlyDate(dateStr) {
    let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let  space = now -time
    let str = ''
    if(space < 60 * 1000){
      str = '刚刚'
    }else if(space <3600 * 1000){
      str = Math.floor(space / (60*1000)) + '分钟前'
    }else if(space < 24 *3600 *1000){
      str = Math.floor(space /(3600*1000)) + '小时前'
    }else{
      str  = Math.floor(space / (24 * 3600 *1000)) + '天前'
    }
    return str
}
