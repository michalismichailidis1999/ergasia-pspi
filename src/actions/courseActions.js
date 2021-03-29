import { ENROLL_TO_COURSE, FILTER_COURSES, SEARCH_COURSE, UNENROLL_FROM_COURSE } from "../actionTypes/courseActionTypes"

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