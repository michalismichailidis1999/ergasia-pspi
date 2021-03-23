import courses from '../dummyData/courses'
import {ENROLL_TO_COURSE, FILTER_COURSES, SEARCH_COURSE, UNENROLL_FROM_COURSE} from '../actionTypes/courseActionTypes'

const initialState = {
    courses,
    enrolledCourses: [],
    allCourses: courses
}

const courseReducer = (state=initialState, action) => {
    const {type, payload} = action;

    const enrolledCourses = state.enrolledCourses

    switch(type){
        case ENROLL_TO_COURSE:
            enrolledCourses.push(payload)
            return {...state, enrolledCourses}
        case UNENROLL_FROM_COURSE:
            return {...state, enrolledCourses: state.enrolledCourses.filter(course => course.id !== payload)};
        case FILTER_COURSES:
            return {...state, courses: payload}
        case SEARCH_COURSE:
            return {...state, courses: [state.allCourses.find(course => course.title === payload)]}
        default:
            return state;
    }
}

export default courseReducer;