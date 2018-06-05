//管理员列表
let sample = {
    "content": [
        {
            "id": "195884804934228449",
            "name": "坐标城",
            "category": "1",
            "public_area": [
                {
                    "id": 1,
                    "name": "公共区域A"
                }
            ],
            "address": {
                "c": "武汉市",
                "d": "东湖高新区",
                "p": "湖北省"
            },
            "remark": "楼盘描述1坐标城6xiugai"
        }, {
            "id": "195874794355317217",
            "name": "光谷新世1",
            "category": "1",
            "public_area": [
                {
                    "id": 1,
                    "name": "公共区域A"
                }
            ],
            "address": {
                "c": "武汉市",
                "d": "东湖高新区",
                "p": "湖北省"
            },
            "remark": "楼盘描述12"
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
const cList = (state = {}, action) => {
    if (action.type === 'GET_LIST') {
        if (action.data != null)
            state = Object.assign({}, action.data)
        //console.log(state)
    }
    if (action.type === 'ADD_TO_GRID') {
        //console.log(action.data)
        if (action.data != null) {
            //console.log(action.data)
            //如果存在相由的id说明是修改记录，则先删除state中原记录           
            let index = state.content.findIndex(v => v.id === action.data.id)
            if (index > -1)
                state.content.splice(index, 1, action.data);
            else
                state.content.splice(0, 0, action.data);
            //state.push(action.data)
            state = Object.assign({}, state)
        }
    }
    if (action.type === 'DEL_FROM_GRID') {
        if (action.data != null) {
            //如果存在相由的id说明是修改记录，则先删除state中原记录  
            action.data.map(id => {
                let index = state.content.findIndex(v => v.id === id)
                if (index > -1)
                    state.content.splice(index, 1);
            })
            state = Object.assign({}, state)
        }
    }
    //分配楼栋后更新列表
    //action.data: {id:'',buildings:[]}
    if (action.type === 'ALLOT_BUILDINGS_MODIFY_GRID') {
        if (action.data != null) {
            let buildings=action.data.buildings
            //解除原来绑定buildings信息           
            state.content.map(s=>{
                if(s.buildings!=undefined){
                s.buildings=s.buildings.filter(item=>{
                    //若项目部buildings列表中包含等分配楼栋id则删除
                    return buildings.indexOf(item.id)<0})
                }
            })
            //返回值id(项目部）,buildings（分配楼栋数组）            
            let index = state.content.findIndex(v => v.id === action.data.id)
            if (index > -1) {
                state.content[index].buildings = buildings.map(x=>({id:x})) 
            }
            state = Object.assign({}, state)
        }
    }
    return state;
}
export default cList;