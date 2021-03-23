import React from 'react'
import { useSelector } from 'react-redux'
import Course from './Course'

const Courses = () => {
    const {courses} = useSelector(state => state.course);
    
    return (
        <div className="courses mb-5">
            {courses.map(course => (
                <Course key={course.id} course={course}/>
            ))}
        </div>
    )
}

export default Courses
