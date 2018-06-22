import { loaded, loading, showError,checkStatus } from "./common";
//是否登录成功
export const logined = ({ token, userName, expired }) => ({
    type: 'LOGINED',
    token,
    userName,
    expired
})
export const login = ({ userName, password }) => dispatch => {
    window.sessionStorage.accessToken = ''    
    let headers = { 'Content-Type': 'application/json' };
    let body = JSON.stringify({
        userName, password
    })
    let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }   
    dispatch(loading())
    return Promise.race([
        fetch(window.TParams.urls.login, args),
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('网络超时，请稍后再试！')), 30000)
        })]).then(checkStatus).then(response => {
            return (response.json())
        })
        .then(json => {
            dispatch(loaded())
            if (json.access_token != null && json.access_token != '') {
                console.log('登录成功')
                window.sessionStorage.accessToken = 'Bearer ' + json.access_token               
                return dispatch(logined({ token: 'Bearer ' + json.access_token, userName, propertyId: json.propertyId, propertyProjectId: json.propertyProjectId, companyName: json.companyName, expired: new Date().getTime() + 1000 * json.expires_in }))
            }          
        }).catch(error => {
            dispatch(loaded())
            if(error.response===undefined){
                return dispatch(showError('远程服务器连接异常，请稍后再试！<br/>' ))         
            }
            if (error.response.status === 500) {                
                return dispatch(showError('用户名或密码错误（或该用户已被禁用），请重新登录！'))    
            }
            return dispatch(showError('其它异常，请稍后再试！<br/>' + error))           
        }
        )
}
export const loginOut = () => {
    window.sessionStorage.accessToken = ''
    return (
        {
            type: 'LOGIN_OUT'
        })
}


//修改密码
export const chgPwd = ({oldPassword, newPassword }) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken
    let body = JSON.stringify({
        oldPassword, newPassword
    })
    let args = { method: 'POST', mode: 'cors', headers: headers, body: body, cache: 'reload' }
    return fetch(window.TParams.urls.chgPwd, args).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.result === 'success') {
                alert('密码修改成功！')
                return dispatch(loginOut())
            }
            if (json.status === 401) {
                alert('旧密码不正确，请重新输入！')
                return null
            }
        }).catch(e => {
            console.log(e);
            alert('网络异常，密码修改失败，请稍后再试！')
        }
        )
}
