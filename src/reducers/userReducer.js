import { 
    CHANGE_EMAIL, 
    CHANGE_FIRSTNAME, 
    CHANGE_LASTNAME, 
    LOAD_USER, 
    LOGIN, 
    LOG_OUT, 
    REGISTER 
} from "../actionTypes/userActionTypes";

const initialState = {
    user: null,
    isAuthenticated: false
}

const useReducer = (state=initialState, action) => {
    const {type, payload} = action;

    let user = {...state.user};

    switch(type){
        case LOAD_USER:
        case REGISTER:
        case LOGIN:
            return {user: payload, isAuthenticated: true}
        case LOG_OUT:
            return {user: initialState.user, isAuthenticated: false}
        case CHANGE_FIRSTNAME:
            user.firstName = payload.firstName;
            return {...state, user};
        case CHANGE_LASTNAME:
            user.firstName = payload.lastName;
            return {...state, user};
        case CHANGE_EMAIL:
            user.email = payload.email;
            return {...state, user}
        default:
            return state;
    }
}

export default useReducer;