import courses from '../dummyData/courses'
import {
    CREATE_COURSE, 
    ENROLL_TO_COURSE, 
    SEARCH_COURSE, 
    UNENROLL_FROM_COURSE, 
    UPDATE_COURSE,
    GET_ENROLLED_COURSES,
    GET_COURSES,
    SET_CURRENT_COURSE,
    FETCH_CURRENT_COURSE_INFO,
    SET_CURRENT_LESSON
} from '../actionTypes/courseActionTypes'

const initialState = {
    courses: [],
    enrolledCourses: [],
    tableData: courses.map(course => {
        return {
            id: course.id,
            title: course.title,
            category: course.category,
            enrolls: course.enrolls,
            rating: course.rating
        }
    }),
    currentCourse: null,
    currentCourseInfo: null,
    currentLesson: null
}

const courseReducer = (state=initialState, action) => {
    const {type, payload} = action;

    const enrolledCourses = state.enrolledCourses
    let courses = state.courses;

    switch(type){
        case ENROLL_TO_COURSE:
            enrolledCourses.push(payload)
            return {...state, enrolledCourses}
        case UNENROLL_FROM_COURSE:
            return {...state, enrolledCourses: state.enrolledCourses.filter(course => course.id !== payload)};
        case SEARCH_COURSE:
            let course = state.courses.find(course => course.title === payload)
            return {...state, courses: course ? [course] : []}
        case CREATE_COURSE:
            courses.push({id: courses[courses.length - 1].id + 1,...payload})
            return {...state, courses}
        case UPDATE_COURSE:
            courses = courses.map(course => course.id === payload.id ? payload : course);
            return {...state, courses}
        case SET_CURRENT_COURSE:
            return {...state, currentCourse: payload}
        case GET_COURSES:
            return {...state, courses: payload.courses}
        case GET_ENROLLED_COURSES:
            return {...state, enrolledCourses: payload.enrolledCourses}
        case FETCH_CURRENT_COURSE_INFO:
            return {...state, currentCourseInfo: payload.currentCourseInfo}
        case SET_CURRENT_LESSON:
            return {...state, currentLesson: payload}
        default:
            return state;
    }
}

export default courseReducer;