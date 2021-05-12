import axios from "axios"
import { toast } from "react-toastify"
import { 
    SET_PIE_CHART,
    SET_LINE_CHART,
    GET_USERS,
    SET_IS_IN_ADMIN_AREA, 
    SET_TABLE_HEADERS_AND_BODY, 
    SET_USER_ROLE 
} from "../actionTypes/adminActionTypes"
import {getAxiosBody, getAxiosConfig} from '../helper'
import {API} from '../config'

export const setIsInAdminArea = (value) => {
    return {type: SET_IS_IN_ADMIN_AREA, payload: value}
}

export const setTableHeadersAndData = (table) => {
    return {type: SET_TABLE_HEADERS_AND_BODY, payload: {table}}
}

export const changeUserRole = (userId, token, userToUpdateId, role) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({role});

            await axios.put(`${API}/user/${userToUpdateId}/update_role/${userId}`, body, config);

            dispatch({type: SET_USER_ROLE, payload: {userId: userToUpdateId, role}})
        } catch (err) {
            toast.error("User role couldn't be updated")
        }
    }
}

export const getUsers = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            const res = await axios.get(`${API}/users/${userId}`, config);

            dispatch({type: GET_USERS, payload: {users: res.data}})
        } catch (err) {
            toast.error("Users couldn't be fetched");
        }
    }
}

export const setPieChart = (userId, token, pieChart, categories) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);
            const res = await axios.get(`${API}/courses/monthly_enrollments/${userId}`, config);

            console.log(res.data, res.data.map(chartData => chartData.total_enrollments))

            pieChart.data.labels = categories.map(category => category.title);
            pieChart.data.datasets[0].data = res.data.map(chartData => chartData.total_enrollments);
            pieChart.data.datasets[0].backgroundColor = []

            for(let i = 0; i < categories.length; i++){
                let r = parseInt(Math.random() * 255);
                let b = parseInt(Math.random() * 255);
                let g = parseInt(Math.random() * 255);
                pieChart.data.datasets[0].backgroundColor.push(`rgb(${r}, ${g}, ${b})`)
            }

            dispatch({type: SET_PIE_CHART, payload: {pieChart: JSON.stringify(pieChart)}});
        } catch (err) {
            toast.error("Pie chart couldn't be fetched");
        }
    }
}

export const setLineChart = (userId, token, lineChart) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);
            const res = await axios.get(`${API}/courses/category_enrollments/${userId}`, config);

            lineChart.data.datasets[0].data = res.data.map(chartData => chartData.total_enrollments);

            dispatch({type: SET_LINE_CHART, payload: {lineChart: JSON.stringify(lineChart)}});
        } catch (err) {
            toast.error("Pie chart couldn't be fetched");
        }
    }
}