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



