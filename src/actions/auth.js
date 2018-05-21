import { loaded, loading, showError } from "./common";
//是否登录成功
export const logined = ({ token, userName, expired }) => ({
    type: 'LOGINED',
    token,
    userName,
    expired
})
export const login = ({ userName, password }) => dispatch => {
    window.sessionStorage.accessToken = ''
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };

    //headers.Authorization = WebIM.config.tokenLocal
    let body = JSON.stringify({
        userName, password
    })

    let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
    console.log('登录')
    dispatch(loading())
    // return dispatch(logined('qwerfasdfasdfasdfasdfasfd'))
    return fetch(window.TParams.urls.login, args).then(response => {
        return (response.json())
    })
        .then(json => {
            console.log(json)
            if (json.access_token != null && json.access_token != '') {
                console.log('登录成功')
                window.sessionStorage.accessToken = 'Bearer '+json.access_token
                dispatch(loaded())
                return dispatch(logined({ token: 'Bearer '+json.access_token, userName, expired: new Date().getTime() + 1000 * json.expires_in }))
            }
            if (json.status === 500) {
                console.log(json)
                console.log(json.message)
                alert('用户名或密码错误（或该用户已被禁用），请重新登录！')
                return dispatch(showError('错误<br/>' + json.message))
                return dispatch(loaded())
            }
        }).catch(e => {
            return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
            return dispatch(loaded())
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
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };

    headers.Authorization = window.sessionStorage.accessToken
    let body = JSON.stringify({
        oldPassword, newPassword
    })
    console.log(body)
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
