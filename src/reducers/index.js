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
import publicAreaList from './publicAreaList'
import { reducer as formReducer } from 'redux-form'
import accessHardwareList from './accessHardwareList'
import departmentList from './departmentList'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({departmentList,accessHardwareList,publicAreaList,buildingList,propertyList,projectList,assignRooms,cList,cForm,confirm,user,err,success,form: formReducer })

