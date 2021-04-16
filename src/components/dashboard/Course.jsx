import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import {enrollToCourse, unenrollFromCourse} from '../../actions/courseActions'

const Course = ({course}) => {
    const dispatch = useDispatch();
    const {enrolledCourses} = useSelector(state => state.course)
    const {user} = useSelector(state => state.user)

    const [isEnrolled, setIsEnrolled] = useState(enrolledCourses.find(c => c.id === course.id));

    return (
        <div className={!isEnrolled ? "course" : "course enrolled"}>
            <img src={course.imgSrc} alt="Linear Algebra"/>

            <div className="course-body">
                <p>{course.description}</p>

                <button
                    onClick={() => {
                        if(user.role !== "student"){
                            toast.error("The courses are only for students. Please create a student profile and then try to enroll")
                            return;
                        }

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
