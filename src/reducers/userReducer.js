import { LOAD_USER, LOGIN, LOG_OUT, REGISTER } from "../actionTypes/userActionTypes";

const initialState = {
    user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: ""
    },
    isAuthenticated: false
}

const useReducer = (state=initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_USER:
        case REGISTER:
        case LOGIN:
            return {user: payload, isAuthenticated: true}
        case LOG_OUT:
            return {user: initialState.user, isAuthenticated: false}
        default:
            return state;
    }
}

export default useReducer;