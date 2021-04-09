import { EDIT_CATEGORY, CREATE_CATEGORY, DELETE_CATEGORY, SET_CATEGORY_TO_EDIT } from '../actionTypes/categoryActionTypes';
import categories from '../dummyData/categories'

const initialState = {
    categories,
    categoryToEdit: null,
    tableData: categories.map(category => {
        return {
            id: category.id,
            title: category.title,
            edit: "edit"
        }
    })
}

const categoryReducer = (state=initialState, {type, payload}) => {
    let categories = state.categories
    let tableData = state.tableData

    switch(type){
        case CREATE_CATEGORY:
            categories.push(payload);
            tableData.push({...payload, edit: "edit"})
            return {...state, categories, tableData}
        case EDIT_CATEGORY:
            categories = categories.map(category => category.id === payload.id ? payload : category)
            tableData = tableData.map(category => category.id === payload.id ? {...payload, edit: "edit"} : category)
            return {...state, categories, tableData}
        case DELETE_CATEGORY:
            categories = categories.filter(category => category.id !== payload)
            tableData = tableData.filter(category => category.id !== payload)
            return {...state, categories, tableData}
        case SET_CATEGORY_TO_EDIT:
            return {...state, categoryToEdit: payload}
        default:
            return state
    }
}

export default categoryReducer;