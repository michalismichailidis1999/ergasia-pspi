import { toast } from "react-toastify"
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES, SET_CATEGORY_TO_EDIT } from "../actionTypes/categoryActionTypes"
import axios from 'axios'
import {getAxiosConfig} from '../helper'
import {API} from '../config'

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

export const fetchCategories = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token)

            const res = await axios.get(`${API}/categories/${userId}`, config)

            dispatch({type: FETCH_CATEGORIES, payload: {categories: res.data}})
        } catch (err) {
            toast.error("Categories coulnd't be fetched");
        }
    }
}