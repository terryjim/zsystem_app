import { combineReducers } from 'redux'
/* import { reducer as formReducer } from 'redux-form' */
import user from './user'
import err from './err'
import success from './success'
import confirm from './confirm'
import cList from './cList'
import cForm from './cForm'

import { reducer as formReducer } from 'redux-form'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({cList,cForm,confirm,user,err,success,form: formReducer })

