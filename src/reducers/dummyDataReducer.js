import { USER_CREATED } from '../actionTypes/dummyDataActionTypes';
import users from '../dummyData/users'

const initialState = {
    users
}

const dummyDataReducer = (state=initialState, action) => {
    const {type, payload} = action;

    const users = state.users;

    switch(type){
        case USER_CREATED:
            users.push(payload);
            return {users}
        default:
            return state
    }
}

export default dummyDataReducer