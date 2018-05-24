//根据单元、楼层、楼层房间数自动创建房号
export const initRooms = (units, floors, rooms) => {
    // [{unit:1,floors:[{name:1,rooms:[01,02,03]}]}]
   let arr = new Array(units).fill(0)
   arr.map((x, index) => {       
        let floorsArr = new Array(floors).fill(0)
        floorsArr.map((floor,index2)=>{            
            let roomsArrTemp = new Array(rooms).fill(0)
            let roomsArr=roomsArrTemp.map((room,index)=>index+1)
            floorsArr[index2]={name:index2+1,rooms:roomsArr}
        })
        arr[index]={unit:index+1,floors:floorsArr}
    })  
    console.log(arr)
    return (
        {
            type: 'ASSIGN_ROOMS',
            data: arr
        }
    )
}
