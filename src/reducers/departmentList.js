//项目部列表
const departmentList = (state = [], action) => {
    if (action.type === 'FILL_DEPARTMENT_LIST') {
       
        if (action.data != null)
            state = [].concat(action.data)          
        console.log(state)
    }    
    return state;
}
export default departmentList;