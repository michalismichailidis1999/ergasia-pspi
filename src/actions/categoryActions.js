import { toast } from "react-toastify"
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES, SET_CATEGORY_TO_EDIT } from "../actionTypes/categoryActionTypes"
import axios from 'axios'
import {getAxiosConfig, getAxiosBody} from '../helper'
import {API} from '../config'

export const createCategory = (userId, token, title) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({title});

            const res = await axios.post(`${API}/categories/create/${userId}`, body, config);

            dispatch({type: CREATE_CATEGORY, payload: {category: res.data}});
        } catch (err) {
            toast.error("Category couldn't be created");
        }
    }
} 

export const editCategory = (userId, token, categoryId, title) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({title});

            await axios.put(`${API}/categories/${categoryId}/${userId}`, body, config);

            dispatch({type: EDIT_CATEGORY, payload: {category: {id: categoryId, title}}});
        } catch (err) {
            toast.error("Category couldn't be updated");
        }
    }
}

export const deleteCategory = (userId, token, categoryId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.delete(`${API}/categories/${categoryId}/${userId}`, config);

            dispatch({type: DELETE_CATEGORY, payload: {categoryId}});
        } catch (err) {
            toast.error("Category couldn't be deleted");
        }
    }
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