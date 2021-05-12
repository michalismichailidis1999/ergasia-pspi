import {
    SET_IS_IN_ADMIN_AREA,
    SET_LINE_CHART, 
    SET_PIE_CHART, 
    SET_TABLE_HEADERS_AND_BODY,
    SET_USER_ROLE,
    GET_USERS
} from '../actionTypes/adminActionTypes'

const initialState = {
    isInAdminArea: false,
    table: {
        headers: [],
        data: []
    },
    pieChart: null,
    lineChart: null,
    users: []
};

const adminReducer = (state=initialState, {type, payload}) => {
    let users = state.users;

    switch(type){
        case SET_IS_IN_ADMIN_AREA:
            return {...state, isInAdminArea: payload}
        case SET_TABLE_HEADERS_AND_BODY:
            return {...state, table: JSON.parse(payload.table)}
        case SET_PIE_CHART:
            return {...state, pieChart: JSON.parse(payload.pieChart)}
        case SET_LINE_CHART:
            return {...state, lineChart: JSON.parse(payload.lineChart)}
        case SET_USER_ROLE:
            users = users.map(user => {
                if(user.id === payload.userId){
                    user.role = payload.role;
                }
                
                return user
            })
            return {...state}
        case GET_USERS:
            return {...state, users: payload.users}
        default:
            return state;
    }
}

export default adminReducer;