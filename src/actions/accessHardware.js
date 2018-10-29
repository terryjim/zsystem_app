import { loaded, loading, showError, checkStatus,showSuccess} from "./common";
//获取列表
export const getAccessHardwareList = ({ whereSql, page, size, orderBy}) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken
    let body = JSON.stringify({ whereSql, page, size, orderBy })
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.defaultUrl + 'vAccessHardware/getByPage'
    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else
                return dispatch(getAccessHardwareListResult(json.data))
        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//获取列表回调
export const getAccessHardwareListResult = (json) => (
    {
        type: 'GET_ACCESS_HARDWARE_LIST',
        data: json
    }
)
//更新固件版本
export const updateAccessHardware=(formData)=>dispatch=>{
    let headers = {}
    headers.Authorization = window.sessionStorage.accessToken
    let body = formData
    body.Authorization = window.sessionStorage.accessToken
    let args = { method: 'POST', mode: 'cors', headers, body, cache: 'reload' }
    let getUrl = window.TParams.urls['updateAccessHardware']    
    dispatch(loading("固件更新中..."))
    return fetch(getUrl, args).then(checkStatus).then(response => {
        return (response.json())
    })
        .then(json => {
            dispatch(loaded())
            if (json.code !== 0) {
                console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                dispatch(showSuccess(json.data))
            }
        }).catch(error => {
            dispatch(loaded())
            if (error.response === undefined) {
                return dispatch(showError('远程服务器连接异常，请稍后再试！<br/>'))
            }
            return dispatch(showError('其它异常，请稍后再试！<br/>' + error))
        })
}



