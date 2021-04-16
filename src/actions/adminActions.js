import { SET_IS_IN_ADMIN_AREA, SET_SELECTED_COMPONENT, SET_TABLE_HEADERS_AND_BODY, SET_USER_ROLE } from "../actionTypes/adminActionTypes"
import {
    userTableHeaders,
    courseTableHeaders,
    categoryTableHeaders,
} from '../dummyData/table'
import store from '../store'

export const setIsInAdminArea = (value) => {
    return {type: SET_IS_IN_ADMIN_AREA, payload: value}
}

export const setSelectedComponent = (selected) => {
    return {type: SET_SELECTED_COMPONENT, payload: selected}
}

export const setTableHeadersAndData = (selected) => {
    let table = {
        headers: [],
        data: []
    }

    switch(selected){
        case "users":
            table.headers = userTableHeaders;
            table.data = store.getState().admin.tableData;
            break
        case "courses":
            table.headers = courseTableHeaders;
            table.data = store.getState().course.tableData;
            break 
        case "categories":
            table.headers = categoryTableHeaders;
            table.data = store.getState().category.tableData;
            break 
        default:
            break
    }

    return {type: SET_TABLE_HEADERS_AND_BODY, payload: table}
}

export const changeUserRole = (id, role) => {
    return {type: SET_USER_ROLE, payload: {id, role}}
}