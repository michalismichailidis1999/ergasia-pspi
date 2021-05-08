import React, { useEffect } from 'react'
import "./style.css"
import FilterCourses from './FilterCourses'
import SearchCourse from './SearchCourse'
import Courses from './Courses'
import { useDispatch, useSelector } from 'react-redux'
import { setIsInAdminArea } from '../../actions/adminActions'
import { getCourses, getEnrolledCourses } from '../../actions/courseActions'
import { fetchCategories } from '../../actions/categoryActions'

const Dashboard = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user) 

    useEffect(() => {
        dispatch(setIsInAdminArea(false));
        dispatch(fetchCategories(user.id, token))
        dispatch(getEnrolledCourses(user.id, token))
        dispatch(getCourses(user.id, token, "None", "all"))
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