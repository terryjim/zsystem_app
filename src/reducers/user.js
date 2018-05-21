const user = (state =null, action) => {
    if (action.type === 'LOGINED') {
        state = Object.assign({},{token:action.token,userName:action.userName,expired:action.expired})
        console.log(state)
    }
    if (action.type === 'LOGIN_OUT') {
        state = Object.assign({},null)
    }
     if (action.type === 'LOGIN_FAILURE') {
        state = Object.assign({},null)
    }
    return state;

}
export default user;