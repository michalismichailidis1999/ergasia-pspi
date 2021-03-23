import React from 'react'
import "./style.css"
import FilterCourses from './FilterCourses'
import SearchCourse from './SearchCourse'
import Courses from './Courses'

const Dashboard = () => {
    return (
        <div className="layout">
            <div className="container">
                <SearchCourse/>

                <FilterCourses/>

                <Courses/>
            </div>
        </div>
    )
}

export default Dashboard