import axios from "axios"
import { toast } from "react-toastify"
import { 
    CREATE_COURSE, 
    ENROLL_TO_COURSE, 
    FETCH_CURRENT_COURSE_INFO, 
    GET_COURSES, 
    GET_ENROLLED_COURSES, 
    SEARCH_COURSE, 
    SET_CURRENT_COURSE, 
    SET_CURRENT_LESSON, 
    UNENROLL_FROM_COURSE, 
    UPDATE_COURSE 
} from "../actionTypes/courseActionTypes"
import {API} from '../config'
import {getAxiosBody, getAxiosConfig} from '../helper'

export const enrollToCourse = (userId, token, course) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.post(`${API}/courses/${course.id}/enroll/${userId}`, null, config);

            dispatch({type: ENROLL_TO_COURSE, payload: course})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const unenrollFromCourse = (userId, token, courseId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.delete(`${API}/courses/${courseId}/unenroll/${userId}`, null, config);

            dispatch({type: UNENROLL_FROM_COURSE, payload: courseId})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const getCourses = (userId, token, filterBy, category) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({filterBy, category});

            const res = await axios.post(`${API}/courses/${userId}`, body, config);

            dispatch({type: GET_COURSES, payload: {courses: res.data}})
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.error);
        }
    }
}

export const getEnrolledCourses = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false,token);

            const res = await axios.get(`${API}/courses/enrolled/${userId}`, config);

            dispatch({type: GET_ENROLLED_COURSES, payload: {enrolledCourses: res.data}});
        } catch (err) {
            toast.error("Couldn't fetch enrolled courses");
        }
    }
}

export const searchCourse = (title) => {
    return {type: SEARCH_COURSE, payload: title};
}

export const createCourse = (course) => {
    return {type: CREATE_COURSE, payload: {...course, rating: 0, enrolls: 0}};
}

export const updateCourse = (course) => {
    return {type: UPDATE_COURSE, payload: course};
}

export const setCurrentCourse = (course) => {
    return {type: SET_CURRENT_COURSE, payload: course}
}

export const fetchCurrentCourseInfo = (userId, token, courseId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            const res = await axios.get(`${API}/courses/${courseId}/info/${userId}`, config);

            dispatch({type: FETCH_CURRENT_COURSE_INFO, payload: {currentCourseInfo: res.data}})
        } catch (err) {
            toast.error("Course info couldn't be fetched!");
        }
    }
}

export const setCurrentLesson = (lesson) => {
    return {type: SET_CURRENT_LESSON, payload: lesson}
}