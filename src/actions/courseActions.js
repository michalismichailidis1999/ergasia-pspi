import { ENROLL_TO_COURSE, FILTER_COURSES, SEARCH_COURSE, UNENROLL_FROM_COURSE } from "../actionTypes/courseActionTypes"

export const enrollToCourse = (course) => {
    return {type: ENROLL_TO_COURSE, payload: course}
}

export const unenrollFromCourse = (courseId) => {
    return {type: UNENROLL_FROM_COURSE, payload: courseId}
}

export const filterCourses = (courses, filterBy, category=null, enrolledCourses=null) => {
    let filteredCourses;
    if(filterBy === "category"){
        filteredCourses = courses.filter(course => course.category === category);
    }else{
        if(filterBy === "Most Enrolled"){
            filteredCourses = [...courses].sort((a, b) => b.enrolled - a.enrolled);
        }else if(filterBy === "Highest Rating"){
            filteredCourses = [...courses].sort((a, b) => b.rating - a.rating);
        }else{
            filteredCourses = [];
            for(let i = 0; i < enrolledCourses.length; i++){
                for(let j = 0; j < courses.length; j++){
                    if(courses[j].category === enrolledCourses[i].category && courses[j].id !== enrolledCourses[i].id){
                        filteredCourses.push(courses[j]);
                    }
                }
            }
        }
    }

    return {type: FILTER_COURSES, payload: filteredCourses}
}

export const searchCourse = (title) => {
    return {type: SEARCH_COURSE, payload: title};
} 