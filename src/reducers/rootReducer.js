import {combineReducers} from 'redux'
import dummyDataReducer from './dummyDataReducer'
import formReducer from './formReducer'
import useReducer from './userReducer'

const rootReducer = combineReducers({
    user: useReducer,
    form: formReducer,
    dummyData: dummyDataReducer
})

export default rootReducer