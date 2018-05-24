//根据单元、楼层分配房间临时数据中转用
let sample = [
    {
        "unit": 1,
        "floors": [{ name: 1, rooms: [1, 2, 3] }, { name: 1, rooms: [1, 2, 3] }],
    },
    {
        "unit": 2,
        "floors": [{ name: 1, rooms: [1, 2, 3] }, { name: 1, rooms: [1, 2, 3] }],
    },
]


const assignRooms = (state = [], action) => {
    if (action.type === 'ASSIGN_ROOMS') {
        console.log(action.data)
        //根据输入单元数楼层数房间数自动生成初始数据   
        return [].concat(action.data)
    }
    //编辑表单时填充原始数据
    if (action.type === 'FILL_FORM') {
        let data = action.data
        console.log('--------------------------------------------------------------')
        console.log(data)
        if (data != null && data != undefined && data._original!=undefined&& data._original!=null&&data._original.structure != undefined)
            return [].concat(data._original.structure)
        else
            return []


    }

    return state;
}
export default assignRooms;