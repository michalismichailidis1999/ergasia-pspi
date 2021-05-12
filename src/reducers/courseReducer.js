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
    SET_CURRENT_LESSON,
    CHANGE_LESSON_STATUS,
    COMPLETE_COUSRE, 
    REMOVE_COMPLETED_COUSRE,
    CREATE_LESSON,
    CREATE_SECTION,
    DELETE_LESSON,
    DELETE_SECTION,
    SET_CAN_UPDATE_LESSON_VALUES,
    GET_COMPLETED_COURSES,
    DELETE_COURSE,
    GET_MY_RATINGS,
    RATE_COURSE,
    UPDATE_MY_RATING,
    SET_CAN_RATE_COURSE
} from '../actionTypes/courseActionTypes'

const initialState = {
    courses: [],
    enrolledCourses: [],
    currentCourse: null,
    currentCourseInfo: null,
    currentLesson: null,
    canUpdateLessonStatus: true,
    completedCourses: [],
    myRatings: [],
    canRateCourse: true
}

const courseReducer = (state=initialState, action) => {
    const {type, payload} = action;

    const enrolledCourses = state.enrolledCourses
    let courses = state.courses;
    let currentCourseInfo = {...state.currentCourseInfo}
    let completedCourses = state.completedCourses;
    let myRatings = state.myRatings;
    let currentCourse = state.currentCourse ? {...state.currentCourse} : null

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
        case SET_CAN_UPDATE_LESSON_VALUES:
            return {...state, canUpdateLessonStatus: payload.canUpdateLessonStatus}
        case CHANGE_LESSON_STATUS:
            currentCourseInfo.sections = currentCourseInfo.sections.map(section => {
                section.lessons = section.lessons.map(lesson => {
                    if(lesson.id === payload.lessonId){
                        lesson.completed = payload.status
                    }

                    return lesson;
                })

                return section;
            })
            return {...state, currentCourseInfo}
        case GET_COMPLETED_COURSES:
            return {...state, completedCourses: payload.completedCourses}
        case COMPLETE_COUSRE:
            completedCourses.push({course_id: payload.courseId})
            return {...state, completedCourses}
        case REMOVE_COMPLETED_COUSRE:
            completedCourses = completedCourses.filter(completed => completed.course_id !== payload.courseId);
            return {...state, completedCourses}
        case CREATE_SECTION:
            currentCourseInfo.sections.push({...payload.section, lessons: []})
            return {...state}
        case CREATE_LESSON:
            currentCourseInfo.sections = currentCourseInfo.sections.map(section => {
                if(section.id === payload.sectionId){
                    section.lessons.push(payload.lesson);
                }

                return section;
            })

            return {...state, currentCourseInfo}
        case DELETE_SECTION:
            currentCourseInfo.sections = currentCourseInfo.sections.filter(section => section.id !== payload.sectionId)
            return {...state, currentCourseInfo}
        case DELETE_LESSON:
            currentCourseInfo.sections = currentCourseInfo.sections.map(section => {
                if(section.id === payload.sectionId){
                    section.lessons = section.lessons.filter(lesson => lesson.id !== payload.lessonId);
                }

                return section;
            })

            return  {...state, currentCourseInfo}
        case DELETE_COURSE:
            courses = courses.filter(course => course.id !== payload.courseId);
            
            return {...state, courses}
        case GET_MY_RATINGS:
            return {...state, myRatings: payload.myRatings}
        case RATE_COURSE:
            myRatings.push({course_id: payload.rating.course_id, rating: payload.rating.rating});

            if(currentCourse){
                currentCourse.rating = payload.rating.course_rating
            }

            return {...state, myRatings, currentCourse}
        case UPDATE_MY_RATING:
            myRatings = myRatings.map(rating => {
                if(rating.course_id === payload.courseId){
                    rating.rating = payload.rating;
                }

                return rating;
            })

            if(currentCourse){
                currentCourse.rating = payload.courseRating
            }

            return {...state, myRatings, currentCourse}
        case SET_CAN_RATE_COURSE:
            return {...state, setCanRateCourse: payload.setCanRateCourse}
        default:
            return state;
    }
}

export default courseReducer;