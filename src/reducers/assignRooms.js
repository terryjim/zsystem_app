//根据单元、楼层分配房间临时数据中转用
let sample = [
    {
        "unit": "1",
        "floor": "1",
        "room": "[1,2,3]"
      },
      {
        "unit": "1",
        "floor": "2",
        "room": "[1,2,3]"
      }
]
   

const assignRooms = (state = sample, action) => {
    if (action.type === 'ASSIGN_FORM') {
        console.log(action.data)
       return {data:action.data}
    }
    return state;
}
export default assignRooms;