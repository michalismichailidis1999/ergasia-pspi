import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentCourseInfo } from '../../actions/courseActions'
import CourseInfo from './CourseInfo'
import Sections from './Sections'
import "./style.css"

const Course = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)
    const {currentCourse, currentCourseInfo} = useSelector(state => state.course);

    useEffect(() => {
        if(currentCourse && !currentCourseInfo){
            dispatch(fetchCurrentCourseInfo(user.id, token, currentCourse.id))
        }
    }, [currentCourse])

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
