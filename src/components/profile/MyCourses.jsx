import React from 'react'
import { useSelector } from 'react-redux'
import Course from '../dashboard/Course';
import "./style.css"


const MyCourses = () => {
    const {enrolledCourses} = useSelector(state => state.course);

    return (
        <div className="courses">
            {enrolledCourses.map(course => (
                <Course key={course.id} course={course}/>
            ))}
        </div>  
    )
}

export default MyCourses
