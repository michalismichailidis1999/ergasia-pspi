import React, { useEffect } from 'react'
import "./style.css"
import FilterCourses from './FilterCourses'
import SearchCourse from './SearchCourse'
import Courses from './Courses'
import { useDispatch, useSelector } from 'react-redux'
import { setIsInAdminArea } from '../../actions/adminActions'
import { getCompletedCourses, getCourses, getEnrolledCourses, getMyRatings, setCurrentCourse } from '../../actions/courseActions'
import { fetchCategories } from '../../actions/categoryActions'

const Dashboard = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user) 

    useEffect(() => {
        dispatch(setIsInAdminArea(false));
        dispatch(setCurrentCourse(null))
        dispatch(fetchCategories(user.id, token))
        dispatch(getEnrolledCourses(user.id, token))
        dispatch(getCourses(user.id, token, "None", "all"))
        dispatch(getCompletedCourses(user.id, token))
        dispatch(getMyRatings(user.id, token));
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