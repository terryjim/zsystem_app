//公共区域（单元号）列表，如果是单元号，name与id值相同
let sample = [
    {
        "name": "大门",
        "id": '196015270102325730'       
    },
    {
        "name": "当代·光谷梦工场",
        "id": '196015529964624350',       
    },
]
const publicAreaList = (state = [], action) => {
    if (action.type === 'FILL_PUBLIC_AREA_LIST') {
        console.log(action.data)
        if (action.data != null) {
            state = []
            action.data.forEach(member =>
                state = state.concat({ id: member.id, name: member.name })
            )
        }
    } 
     if (action.type === 'DEL_FROM_PUBLIC_AREA_LIST') {       
        if (action.data != null) {
            let newState = [...state];
            action.data.map(d=>{
                let keyIndex = state.indexOf(d);           
                if (keyIndex >= 0) {              
                    newState = [
                    ...newState.slice(0, keyIndex),
                    ...newState.slice(keyIndex + 1)
                  ];
                } 
            })
            state=[].concat(newState)            
        }
    }
    return state;
}
export default publicAreaList;