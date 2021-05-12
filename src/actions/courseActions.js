import axios from "axios"
import { toast } from "react-toastify"
import { 
    ENROLL_TO_COURSE, 
    FETCH_CURRENT_COURSE_INFO, 
    GET_COURSES, 
    GET_ENROLLED_COURSES, 
    SEARCH_COURSE, 
    SET_CURRENT_COURSE, 
    SET_CURRENT_LESSON, 
    UNENROLL_FROM_COURSE, 
    CHANGE_LESSON_STATUS,
    COMPLETE_COUSRE, 
    REMOVE_COMPLETED_COUSRE,
    CREATE_LESSON,
    CREATE_SECTION,
    DELETE_LESSON,
    DELETE_SECTION,
    GET_COMPLETED_COURSES,
    SET_CAN_UPDATE_LESSON_VALUES,
    DELETE_COURSE,
    GET_MY_RATINGS,
    RATE_COURSE,
    UPDATE_MY_RATING,
    SET_CAN_RATE_COURSE,
} from "../actionTypes/courseActionTypes"
import {API} from '../config'
import {getAxiosBody, getAxiosConfig} from '../helper'
import {setSelectedComponent} from './layoutActions'

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

            await axios.delete(`${API}/courses/${courseId}/unenroll/${userId}`, config);

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

export const createCourse = (userId, token, formData) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.post(`${API}/courses/create_course/${userId}`, formData, config);
            
            dispatch(setSelectedComponent("courses"));
        } catch (err) {
            toast.error("Course couldn't be created");
        }
    }
}

export const updateCourse = (userId, token, courseId, formData) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.put(`${API}/courses/${courseId}/update_course/${userId}`, formData, config);
            
            dispatch(setSelectedComponent("courses"));
        } catch (err) {
            toast.error("Course couldn't be updated");
        }
    }
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

export const getTeacherCourses = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            const res = await axios.get(`${API}/courses/teacher/${userId}`, config);

            dispatch({type: GET_COURSES, payload: {courses: res.data}});
        } catch (err) {
            toast.error("Courses couldn't be fetched");
        }
    }
}

export const getCompletedCourses = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            const res = await axios.get(`${API}/courses/completed/${userId}`, config);

            dispatch({type: GET_COMPLETED_COURSES, payload: {completedCourses: res.data}})
        } catch (err) {
            toast.error("Completed courses couldn't be fetched!");
        }
    }
}

export const changeLessonStatus = (userId, token, lessonId, status) => {
    return async (dispatch) => {
        try {
            dispatch(setCanUpdateLessonStatus(false))

            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({status})

            await axios.put(`${API}/courses/update_lesson/${lessonId}/${userId}`, body, config);

            dispatch({type: CHANGE_LESSON_STATUS, payload: {lessonId, status}})
        } catch (err) {
            toast.error(err.response.data.error);
        }finally{
            dispatch(setCanUpdateLessonStatus(true))
        }
    }
}

export const completeCourse = (userId, token, courseId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);
    
            await axios.post(`${API}/courses/${courseId}/complete/${userId}`, null, config);

            dispatch({type: COMPLETE_COUSRE, payload: {courseId}})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const removeCompletedCourse = (userId, token, courseId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);
    
            await axios.delete(`${API}/courses/completed/${courseId}/remove/${userId}`, config);

            dispatch({type: REMOVE_COMPLETED_COUSRE, payload: {courseId}})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const setCanUpdateLessonStatus = (value) => {
    return {type: SET_CAN_UPDATE_LESSON_VALUES, payload: {canUpdateLessonStatus: value}}
}

export const deleteSection = (userId, token, sectionId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.delete(`${API}/courses/sections/${sectionId}/${userId}`, config);

            dispatch({type: DELETE_SECTION, payload: {sectionId}})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const deleteLesson = (userId, token, sectionId, lessonId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.delete(`${API}/courses/lessons/${lessonId}/${userId}`, config);

            dispatch({type: DELETE_LESSON, payload: {sectionId, lessonId}})
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
}

export const createSection = (userId, token, courseId, title) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({title});

            const res = await axios.post(`${API}/courses/${courseId}/create_section/${userId}`, body, config);

            dispatch({type: CREATE_SECTION, payload: {section: res.data}})
        } catch (err) {
            toast.error("Section couldn't be created");
        }
    }
}

export const createLesson = (userId, token, sectionId, formData) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            const res = await axios.post(`${API}/courses/sections/${sectionId}/create_lesson/${userId}`, formData, config);

            dispatch({type: CREATE_LESSON, payload: {lesson: res.data, sectionId}})
        } catch (err) {
            toast.error("Lesson couldn't be created");
        }
    }
}

export const deleteCourse = (userId, token, courseId) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            await axios.delete(`${API}/courses/${courseId}/${userId}`, config);

            dispatch({type: DELETE_COURSE, payload: {courseId}})
        } catch (err) {
            toast.error("Course couldn't be deleted!");
        }
    }
}

export const getMyRatings = (userId, token) => {
    return async (dispatch) => {
        try {
            const config = getAxiosConfig(false, token);

            const res = await axios.get(`${API}/courses/ratings/${userId}`, config);

            dispatch({type: GET_MY_RATINGS, payload: {myRatings: res.data}});
        } catch (err) {
            toast.error("My ratings couldn't be fetched!")
        }
    }
}

export const rateCourse = (userId, token, courseId, rating) => {
    return async (dispatch) => {
        try {
            dispatch(setCanRateCourse(false))

            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({rating});

            const res = await axios.post(`${API}/courses/${courseId}/rate/${userId}`, body, config);

            dispatch({type: RATE_COURSE, payload: {rating: res.data}});
        } catch (err) {
            toast.error("Course couldn't be rated")
        }finally{
            dispatch(setCanRateCourse(true))
        }
    }
}

export const updateMyRating = (userId, token, courseId, rating) => {
    return async (dispatch) => {
        try {
            dispatch(setCanRateCourse(false))
            
            const config = getAxiosConfig(true, token);
            const body = getAxiosBody({rating});

            const res = await axios.put(`${API}/courses/${courseId}/rate/${userId}`, body, config);

            dispatch({type: UPDATE_MY_RATING, payload: {courseId, rating, courseRating: res.data}});
        } catch (err) {
            toast.error("Course couldn't be rated")
        }finally{
            dispatch(setCanRateCourse(true))
        }
    }
}

export const setCanRateCourse = (value) => {
    return {type: SET_CAN_RATE_COURSE, payload: {setCanRateCourse: value}}
}