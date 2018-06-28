import { loaded, loading, showError,checkStatus } from "./common";
//获取楼盘列表
export const getProjectList = () => dispatch => {
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let args = { method: 'GET', mode: 'cors', headers: headers, cache: 'reload' }
    let getUrl = window.TParams.urls['getProjectList']
    return fetch(getUrl, args).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0) {
                console.log(json.msg)
                return dispatch(showError(json.msg + '<br>' + json.data))
            }
            else {
                console.log(json.data)
                dispatch(fillProjectList(json.data))
            }
        }).catch(e => {
            return dispatch(showError('网络异常，获取楼盘列表出错，请稍后再试！<br/>' + e))
        })
}
//新增或修改后的记录更新列表
export const fillProjectList = (values) => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
    console.log(values)
    return {
        type: 'FILL_PROJECT_LIST',
        data: values
    }
}

//根据楼盘ID获取未分配公共区域列表（包含本门禁占用的公共区域）
export const getPublicAreaByProject = (id,accessControlId) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let body = JSON.stringify( id )
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.defaultUrl + 'project/findById'
    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else {
                if (json.data === undefined)
                    return dispatch(fillPulicAreaByProject([]))
                else {
                    return dispatch(fillPulicAreaByProject(json.data.publicArea))
                }
            }
        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//获取列表回调
export const fillPulicAreaByProject = (json) => (
    {
        type: 'FILL_PUBLIC_AREA_LIST',
        data: json
    }
)