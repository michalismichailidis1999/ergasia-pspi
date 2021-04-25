import courses, {sections, lessons} from '../dummyData/courses'
import {
    CREATE_COURSE, 
    ENROLL_TO_COURSE, 
    FETCH_SECTIONS, 
    FILTER_COURSES, 
    SEARCH_COURSE, 
    SET_COURSE_TO_EDIT, 
    UNENROLL_FROM_COURSE, 
    UPDATE_COURSE
} from '../actionTypes/courseActionTypes'

const initialState = {
    courses,
    enrolledCourses: [],
    allCourses: courses,
    tableData: courses.map(course => {
        return {
            id: course.id,
            title: course.title,
            category: course.category,
            enrolls: course.enrolls,
            rating: course.rating
        }
    }),
    courseToEdit: null,
    allSections: sections,
    sections: [],
}

const courseReducer = (state=initialState, action) => {
    const {type, payload} = action;

    const enrolledCourses = state.enrolledCourses
    let allCourses = state.allCourses;
    let courses = state.courses;

    switch(type){
        case ENROLL_TO_COURSE:
            enrolledCourses.push(payload)
            return {...state, enrolledCourses}
        case UNENROLL_FROM_COURSE:
            return {...state, enrolledCourses: state.enrolledCourses.filter(course => course.id !== payload)};
        case FILTER_COURSES:
            return {...state, courses: payload}
        case SEARCH_COURSE:
            let course = state.allCourses.find(course => course.title === payload)
            return {...state, courses: course ? [course] : []}
        case CREATE_COURSE:
            allCourses.push({id: allCourses[courses.length - 1].id + 1,...payload})
            courses.push({id: courses[courses.length - 1].id + 1,...payload})
            return {...state, allCourses, courses}
        case UPDATE_COURSE:
            allCourses = allCourses.map(course => course.id === payload.id ? payload : course);
            courses = courses.map(course => course.id === payload.id ? payload : course);
            return {...state, courses}
        case SET_COURSE_TO_EDIT:
            return {...state, courseToEdit: payload}
        case FETCH_SECTIONS:
            return {...state, sections: payload}
        default:
            return state;
    }
}

export default courseReducer;