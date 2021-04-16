import { USER_CREATED } from '../actionTypes/dummyDataActionTypes';
import { CHANGE_EMAIL, CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_PASSWORD } from '../actionTypes/userActionTypes';
import users from '../dummyData/users'

const initialState = {
    users
}

const dummyDataReducer = (state=initialState, action) => {
    const {type, payload} = action;

    let users = state.users;

    switch(type){
        case USER_CREATED:
            users.push(payload);
            return {users}
        case CHANGE_FIRSTNAME:
            users = users.map(user => {
                if(user.id === payload.userId){
                    user.firstName = payload.firstName;
                }

                return user;
            })

            return {...state, users}
        case CHANGE_LASTNAME:
            users = users.map(user => {
                if(user.id === payload.userId){
                    user.lastName = payload.lastName;
                }

                return user;
            })

            return {...state, users}
        case CHANGE_EMAIL:
            users = users.map(user => {
                if(user.id === payload.userId){
                    user.email = payload.email;
                }

                return user;
            })

            return {...state, users}
        case CHANGE_PASSWORD:
            users = users.map(user => {
                if(user.id === payload.userId){
                    user.password = payload.password;
                }

                return user;
            })

            return {...state, users}
        default:
            return state
    }
}

export default dummyDataReducer