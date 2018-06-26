import { loaded, loading, showError, checkStatus, showSuccess } from "./common";
//根据单元、楼层、楼层房间数自动创建房号
export const initRooms = (units, floors, rooms) => {
    // [{unit:1,floors:[{name:1,rooms:[01,02,03]}]}]
    let arr = new Array(units).fill('')
    arr.map((x, index) => {
        let floorsArr = new Array(floors).fill('')
        floorsArr.map((floor, index2) => {
            let roomsArrTemp = new Array(rooms).fill('')
            let roomsArr = roomsArrTemp.map((room, index) => '' + (index + 1))
            floorsArr[index2] = { name: '' + (index2 + 1), rooms: roomsArr }
        })
        arr[index] = { unit: '' + (index + 1), floors: floorsArr }
    })
    console.log(arr)
    return (
        {
            type: 'ASSIGN_ROOMS',
            data: arr
        }
    )
}
//根据楼盘ID获取楼栋列表
export const getBuildingsByProject = (pid) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let body = JSON.stringify({ pid })
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.urls['getBuildingsByProject']

    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else
                return dispatch(getBuildingListResult(json.data))
        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//获取列表回调
export const getBuildingListResult = (json) => (
    {
        type: 'FILL_BUILDING_LIST',
        data: json
    }
)


export const allotBuildings = (id, buildings) => dispatch => {
    //不能用headers=new Headers()，否则跨域出错
    /*let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };*/
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken
    //orderBy
    let body = JSON.stringify({ id, buildings })
    //alert(body)  
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.urls['allotBuildings']

    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else {
                dispatch(showSuccess('楼栋分配成功！'))
                //回传添加或修改后的记录    
                dispatch(allotBuildingModifyGrid(json.data))
            }

        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//获取列表回调
export const allotBuildingModifyGrid = (json) => (
    {
        type: 'ALLOT_BUILDINGS_MODIFY_GRID',
        data: json
    }
)


//根据楼盘ID获取公共区域列表
export const getPublicAreaByBuilding = (id) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let body = JSON.stringify(id)
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.defaultUrl + 'building/findById'
    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else {
                if (json.data === undefined)
                    return dispatch(fillPulicAreaByBuilding([]))
                else {
                    return dispatch(fillPulicAreaByBuilding(json.data.publicArea))
                }
            }
        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//根据楼盘ID获取单元列表
export const getUnitByBuilding = (id) => dispatch => {
    let headers = { 'Content-Type': 'application/json' };
    headers.Authorization = window.sessionStorage.accessToken

    let body = JSON.stringify(id)
    let args = { method: 'POST', mode: 'cors', body, headers: headers, cache: 'reload' }
    let getUrl = window.TParams.defaultUrl + 'building/findById'
    return fetch(getUrl, args).then(checkStatus).then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.code !== 0)
                return dispatch(showError(json.msg + '<br>' + json.data))
            else {
                if (json.data === undefined)
                    return dispatch(fillPulicAreaByBuilding([]))
                else {
                    let structure = json.data.structure
                    if (structure === undefined || structure.length === 0)
                        return dispatch(fillPulicAreaByBuilding([]))
                    else {
                        let units = new Array(structure.length).fill({})
                        structure.map((x, index) => units[index]={id:x.unit,name:x.unit })                              
                        return dispatch(fillPulicAreaByBuilding(units))
                    }
                }
            }
        }).catch(e => {
            return dispatch(showError('系统异常，请稍后再试！<br/>' + e))
        }
        )
}
//获取列表回调
export const fillPulicAreaByBuilding = (json) => (
    {
        type: 'FILL_PUBLIC_AREA_LIST',
        data: json
    }
)