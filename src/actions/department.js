import { loaded, loading, showError, checkStatus,showSuccess} from "./common";
//重置项目部管理员密码
export const initPassword = (id) =>dispatch=> {   
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    //headers.Authorization = WebIM.config.tokenLocal
    //console.log(values)
    let body =id
    //let body = values
    let args = { method: 'POST', mode: 'cors', body,headers: headers, cache: 'reload' }
    let getUrl = window.TParams.urls['initPassword']
    return fetch(getUrl, args).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0) {               
                console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                console.log(json.data)
                dispatch(showSuccess('初始密码成功，密码设置为123456！'))  
            }
        }).catch(e => {
            return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
        })
}



