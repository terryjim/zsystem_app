import { loaded, loading, showError, checkStatus,showSuccess} from "./common";

//启用或停止白名单
export const enabledWhitelist = (values) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken
    let body = JSON.stringify(values)
    let args = { method: 'POST', mode: 'cors', headers: headers, body, cache: 'reload' }
    let saveUrl = window.TParams.urls['enabledWhitelist']   
    dispatch(loading())
    return fetch(saveUrl, args).then(response => response.json())
        .then(json => {
            //console.log(json)
            dispatch(loaded())
            if (json.code !== 0) {
                //console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                dispatch(showSuccess('设置成功！'))
                //回传添加或修改后的记录    
                dispatch(addToGrid(json.data))               
            }
        }).catch(e => {
            dispatch(loaded())
            return dispatch(showError('网络异常，请稍后再试！<br/>' + e))
        }
        )
}

//新增或修改后的记录更新列表
export const addToGrid = (values) => {
    return {
        type: 'ADD_TO_GRID',
        data: values
    }
}

//根据返回
export const fillForm = (json) => (
    {
        type: 'FILL_FORM',
        data: json
    }
)