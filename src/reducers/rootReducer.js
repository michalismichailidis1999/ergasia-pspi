import {combineReducers} from 'redux'
import adminReducer from './adminReducer'
import categoryReducer from './categoryReducer'
import courseReducer from './courseReducer'
import formReducer from './formReducer'
import useReducer from './userReducer'
import layoutReducer from './layoutReducer'

const rootReducer = combineReducers({
    user: useReducer,
    form: formReducer,
    course: courseReducer,
    admin: adminReducer,
    category: categoryReducer,
    layout: layoutReducer
})

export default rootReducer