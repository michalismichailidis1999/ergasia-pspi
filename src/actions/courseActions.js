import { 
    CREATE_COURSE, 
    ENROLL_TO_COURSE, 
    FETCH_SECTIONS, 
    FILTER_COURSES, 
    SEARCH_COURSE, 
    SET_COURSE_TO_EDIT, 
    UNENROLL_FROM_COURSE, 
    UPDATE_COURSE 
} from "../actionTypes/courseActionTypes"

import store from '../store'

export const enrollToCourse = (course) => {
    return {type: ENROLL_TO_COURSE, payload: course}
}

export const unenrollFromCourse = (courseId) => {
    return {type: UNENROLL_FROM_COURSE, payload: courseId}
}

export const filterCourses = (filteredCourses) => {
    return {type: FILTER_COURSES, payload: filteredCourses}
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

export const setCourseToEdit = (course) => {
    return {type: SET_COURSE_TO_EDIT, payload: course}
}

export const fetchSections = (courseId) => {
    const sections = store.getState().course.allSections;

    return {type: FETCH_SECTIONS, payload: sections.filter(section => section.courseId === courseId)}
}