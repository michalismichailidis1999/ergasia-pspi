import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeCourse, fetchCurrentCourseInfo, removeCompletedCourse } from '../../actions/courseActions'
import CourseInfo from './CourseInfo'
import Sections from './Sections'
import "./style.css"

const Course = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)
    const {currentCourse, currentCourseInfo, completedCourses} = useSelector(state => state.course);

    useEffect(() => {
        if(currentCourse){
            dispatch(fetchCurrentCourseInfo(user.id, token, currentCourse.id))
        }
    }, [currentCourse])

    useEffect(() => {
        if(currentCourseInfo){
            let courseIsCompleted = completedCourses.find(completed => completed.course_id === currentCourse.id) ? true : false;

            let total = 0;
            let totalLessons = 0;

            for(let i = 0; i < currentCourseInfo.sections.length; i++){
                totalLessons += currentCourseInfo.sections[i].lessons.length;

                for(let j = 0; j < currentCourseInfo.sections[i].lessons.length; j++){
                    total += currentCourseInfo.sections[i].lessons[j].completed;
                }
            }

            if(totalLessons === 0){
                return;
            }

            if(total === totalLessons && !courseIsCompleted){
                // Complete course
                console.log("complete")
                dispatch(completeCourse(user.id, token, currentCourse.id))
            }else if(total !== totalLessons && courseIsCompleted){
                // Remove completed course
                console.log("remove")
                dispatch(removeCompletedCourse(user.id, token, currentCourse.id))
            }
        }
    }, [currentCourseInfo])

    return (
        <div className="layout course-page">
            <div className="container">
                {
                    currentCourse && currentCourseInfo &&
                    <>
                        <CourseInfo/>

                        <Sections/>
                    </>
                }

                {
                    (!currentCourse || !currentCourseInfo) &&
                    <div className="d-flex align-items-center">
                        <div className="spinner-border"></div>
                        <p className="mb-0 mx-2">Loading...</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Course
