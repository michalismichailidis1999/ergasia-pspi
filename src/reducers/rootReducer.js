import {combineReducers} from 'redux'
import courseReducer from './courseReducer'
import dummyDataReducer from './dummyDataReducer'
import formReducer from './formReducer'
import useReducer from './userReducer'

const rootReducer = combineReducers({
    user: useReducer,
    form: formReducer,
    dummyData: dummyDataReducer,
    course: courseReducer
})

export default rootReducer