//管理员列表
let sample = [
    {
        "name": "绿地香树花城",
        "id": '196015270102325730',
        "category": 1
    },
    {
        "name": "当代·光谷梦工场",
        "id": '196015529964624350',
        "category": 2
    },
]
const buildingList = (state = [], action) => {
    if (action.type === 'FILL_BUILDING_LIST') {
        console.log(action.data)
        if (action.data != null) {
            state = []
            action.data.forEach(member =>
                state = state.concat({ id: member.id, name: member.name })
            )
        }

        console.log(state)
    }
    return state;
}
export default buildingList;