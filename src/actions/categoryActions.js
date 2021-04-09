import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, SET_CATEGORY_TO_EDIT } from "../actionTypes/categoryActionTypes"

export const createCategory = (category) => {
    return {type: CREATE_CATEGORY, payload: category}
} 

export const editCategory = (category) => {
    return {type: EDIT_CATEGORY, payload: category}
}

export const deleteCategory = (id) => {
    return {type: DELETE_CATEGORY, payload: id}
}

export const setCategoryToEdit = (categoryToEdit) => {
    return {type: SET_CATEGORY_TO_EDIT, payload: categoryToEdit}
}