//门禁硬件列表，用于selectAccessHardware可编辑表格
let sample = {
    "content": [
        {
        }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "number": 0,
    "size": 20,
    "sort": null,
    "first": true,
    "numberOfElements": 2
}
const accessHardwareList = (state = {}, action) => {
    if (action.type === 'GET_ACCESS_HARDWARE_LIST') {
        if (action.data != null)
            state = Object.assign({}, action.data)
        else
            state = Object.assign({}, {})
    }
    return state;
}
export default accessHardwareList;