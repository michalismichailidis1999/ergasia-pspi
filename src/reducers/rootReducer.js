import {combineReducers} from 'redux'
import adminReducer from './adminReducer'
import categoryReducer from './categoryReducer'
import courseReducer from './courseReducer'
import dummyDataReducer from './dummyDataReducer'
import formReducer from './formReducer'
import useReducer from './userReducer'

const rootReducer = combineReducers({
    user: useReducer,
    form: formReducer,
    dummyData: dummyDataReducer,
    course: courseReducer,
    admin: adminReducer,
    category: categoryReducer
})

export default rootReducer