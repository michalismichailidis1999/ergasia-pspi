import {
    SET_IS_IN_ADMIN_AREA,
    SET_LINE_CHART_DATA, 
    SET_PIE_CHART_DATA, 
    SET_SELECTED_COMPONENT, 
    SET_TABLE_HEADERS_AND_BODY,
    SET_USER_ROLE
} from '../actionTypes/adminActionTypes'
import { lineChart, pieChart } from '../dummyData/chart';
import users from '../dummyData/users';

const initialState = {
    isInAdminArea: false,
    table: {
        headers: [],
        data: []
    },
    selectedComponent: "",
    pieChart,
    lineChart,
    users,
    tableData: users.map(user => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    })
};

const adminReducer = (state=initialState, {type, payload}) => {
    let users = state.users;
    let tableData = state.tableData;

    switch(type){
        case SET_IS_IN_ADMIN_AREA:
            return {...state, isInAdminArea: payload}
        case SET_TABLE_HEADERS_AND_BODY:
            return {...state, table: payload}
        case SET_SELECTED_COMPONENT:
            return {...state, selectedComponent: payload}
        case SET_PIE_CHART_DATA:
            let pie = {...state.pieChart}
            pie.data.datasets = payload;
            return {...state, pieChart}
        case SET_LINE_CHART_DATA:
            let line = {...state.lineChart}
            line.data.datasets = payload;
            return {...state, lineChart}
        case SET_USER_ROLE:
            users = users.map(user => {
                if(user.id === payload.id){
                    user.role = payload.role
                }

                return user
            })

            tableData = users.map(user => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            })

            return {...state, users, tableData}
        default:
            return state;
    }
}

export default adminReducer;