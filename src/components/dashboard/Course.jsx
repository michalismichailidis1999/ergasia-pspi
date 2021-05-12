import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {enrollToCourse, setCurrentCourse, unenrollFromCourse} from '../../actions/courseActions'

const Course = ({course}) => {
    const dispatch = useDispatch();
    const {enrolledCourses, completedCourses} = useSelector(state => state.course)
    const {user, token} = useSelector(state => state.user)

    const [isCompleted, setIsCompleted] = useState(false)

    const [isEnrolled, setIsEnrolled] = useState(enrolledCourses.find(c => c.id === course.id));

    useEffect(() => {
        setIsEnrolled(enrolledCourses.find(c => c.id === course.id) ? true : false)
    }, [enrolledCourses])

    useEffect(() => {
        setIsCompleted(completedCourses.find(completed => completed.course_id === course.id) ? true : false)
    }, [completedCourses])

    return (
        <div className={!isEnrolled ? "course" : "course enrolled"}>
            <Link to={`/course/${course.id}`} onClick={() => dispatch(setCurrentCourse(course))}>
                <img src={course.photoURL} alt="Linear Algebra"/>
            </Link>

            <div className="course-body">
                {isCompleted && <span className="badge rounded-pill bg-success mb-2">Completed</span>}

                <p>{course.description}</p>

                <button
                    onClick={() => {
                        if(user.role !== "student"){
                            toast.error("The courses are only for students. Please create a student profile and then try to enroll")
                            return;
                        }

                        if(isEnrolled){
                            dispatch(unenrollFromCourse(user.id, token, course.id))
                        }else{
                            dispatch(enrollToCourse(user.id, token, course))
                        }

                        setIsEnrolled(!isEnrolled);
                    }}
                >
                    {!isEnrolled ? "Enroll" : "Enrolled"}
                </button>
            </div>
        </div>
    )
}

export default Course
