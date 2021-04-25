import React from 'react'
import CourseInfo from './CourseInfo'
import Sections from './Sections'
import "./style.css"

const Course = () => {
    return (
        <div className="layout course-page">
            <div className="container">
                <CourseInfo/>

                <Sections/>
            </div>
        </div>
    )
}

export default Course
