import React, { useEffect } from 'react'
import "./style.css"
import FilterCourses from './FilterCourses'
import SearchCourse from './SearchCourse'
import Courses from './Courses'
import { useDispatch } from 'react-redux'
import { setIsInAdminArea } from '../../actions/adminActions'

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsInAdminArea(false));
    }, [])

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