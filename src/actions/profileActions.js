
import {  SET_SELECTED_COMPONENT, SET_TABLE_HEADERS_AND_BODY } from "../actionTypes/profileActionTypes"
import {
    userTableHeaders,
    courseTableHeaders,
    
} from '../dummyData/table'
import {store} from '../config'

export const setSelectedComponent = (selected) => {
    return {type: SET_SELECTED_COMPONENT, payload: selected}
}

export const setTableHeadersAndData = (selected) => {
    let table = {
        headers: [],
        data: []
    }

    switch(selected){
        
        case "courses":
            table.headers = courseTableHeaders;
            table.data = store.getState().course.tableData;
            break 
            case "settings":
                table.headers = userTableHeaders;
                table.data = store.getState().admin.tableData;
                break 
        default:
            break
    }

    return {type: SET_TABLE_HEADERS_AND_BODY, payload: table}
}
