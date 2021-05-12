import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompletedCourses, getEnrolledCourses } from '../../actions/courseActions';
import ProgressListItem from './ProgressListItem';

const MyProgress = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)
    const {completedCourses, enrolledCourses} = useSelector(state => state.course)

    const [learnMore, setLearnMore] = useState(false);

    useEffect(() => {
        dispatch(getEnrolledCourses(user.id, token))
        dispatch(getCompletedCourses(user.id, token));
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="box">
                <div className="icon">
                    <i className="fas fa-chalkboard"></i>
                </div>

                <span>My Progress</span>
            </div>


            <ul className="infos">
                <li>Completed courses:  {completedCourses.length}</li>
                <li>Active courses:  {enrolledCourses.length}</li>
                
                <button
                    className={!learnMore ? "learn-more" : "learn-more bg-danger"}
                    onClick={() => setLearnMore(!learnMore)}
                >
                    {!learnMore ? "Learn More" : "Hide Them"}
                </button>
            </ul>

            {
                learnMore &&
                <ul className="progress-list">
                    {enrolledCourses.map(course => (
                        <ProgressListItem key={course.id} course={course} />
                    ))}
                </ul>
            }

        </div>  
    )
}

export default MyProgress
