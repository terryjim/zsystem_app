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
const projectList = (state = [], action) => {
    if (action.type === 'FILL_PROJECT_LIST') {
       
        if (action.data != null)
            state = [].concat(action.data)
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        console.log(state)
    }    
    return state;
}
export default projectList;