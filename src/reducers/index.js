import { combineReducers } from 'redux'
/* import { reducer as formReducer } from 'redux-form' */
import user from './user'
import err from './err'
import success from './success'
import confirm from './confirm'
import cList from './cList'
import cForm from './cForm'
import assignRooms from './assignRooms'
import projectList from './projectList'
import propertyList from './propertyList'
import buildingList from './buildingList'
import { reducer as formReducer } from 'redux-form'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({buildingList,propertyList,projectList,assignRooms,cList,cForm,confirm,user,err,success,form: formReducer })

