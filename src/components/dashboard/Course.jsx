import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {enrollToCourse, unenrollFromCourse} from '../../actions/courseActions'

const Course = ({course}) => {
    const dispatch = useDispatch();
    const {enrolledCourses} = useSelector(state => state.course)
    const [isEnrolled, setIsEnrolled] = useState(enrolledCourses.find(c => c.id === course.id));

    return (
        <div className={!isEnrolled ? "course" : "course enrolled"}>
            <img src={course.imgSrc} alt="Linear Algebra"/>

            <div className="course-body">
                <p>{course.description}</p>

                <button
                    onClick={() => {
                        if(isEnrolled){
                            dispatch(unenrollFromCourse(course.id))
                        }else{
                            dispatch(enrollToCourse(course))
                        }

                        setIsEnrolled(!isEnrolled);
                    }}
                >
                    {!isEnrolled ? "Enroll" : "Already Enrolled"}
                </button>
            </div>
        </div>
    )
}

export default Course
