import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentCourse } from '../../actions/courseActions';

const ProgressListItem = ({course}) => {
    const dispatch = useDispatch();

    const {completedCourses} = useSelector(state => state.course)

    const isCompleted = completedCourses.find(completed => completed.course_id === course.id);

    return (
        <li>
            <Link 
                to={`/course/${course.id}`} 
                className="course-link"
                onClick={() => dispatch(setCurrentCourse(course))}
            >
                {course.title}
            </Link>
            <p>Completed <i className={isCompleted ? "far fa-check-circle" : "far fa-times-circle"}></i></p>
        </li>
    )
}

export default ProgressListItem
