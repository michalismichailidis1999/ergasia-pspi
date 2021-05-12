import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrollToCourse, rateCourse, unenrollFromCourse, updateMyRating } from '../../actions/courseActions';

const CourseInfo = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user);
    const {currentCourse, currentCourseInfo, enrolledCourses, myRatings, canRateCourse} = useSelector(state => state.course);

    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showRateCourse, setShowRateCourse] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setIsEnrolled(enrolledCourses.find(c => c.id === currentCourse.id) ? true : false)
    }, [enrolledCourses])

    useEffect(() => {
        if(myRatings.length > 0){
            setRating(myRatings.find(rating => rating.course_id === currentCourse.id).rating)
        }
    }, [myRatings])

    return (
        <div 
            className={
                !isEnrolled ? "course course-info d-flex flex-column justify-content-center" :
                "course enrolled course-info d-flex flex-column justify-content-center"
            }
        >
            <img src={currentCourse.photoURL} alt="Linear Algebra Course"/>

            <h2>{currentCourse.title}</h2>

            <p>{currentCourse.description}</p>

            <div className="labeled-group">
                <label><i className="fas fa-user-tie"></i> Teacher</label>
                <span>{currentCourseInfo.teacherName}</span>
            </div>

            <div className="labeled-group">
                <label><i className="fas fa-tags"></i> Sections</label>
                <span>{currentCourseInfo.sections.length}</span>
            </div>

            <div className="labeled-group">
                <label><i className="fas fa-user-graduate"></i> Enrolls</label>
                <span>{currentCourse.enrolls}</span>
            </div>

            {
                !showRateCourse &&
                <div className="labeled-group">
                    <label><i className="fas fa-thumbs-up"></i> Rating</label>
                    <span>
                        {[1, 2, 3, 4, 5].map(r => (
                            <i className="fas fa-star" key={r} style={currentCourse.rating >= r ? {color: "yellow"} : {}}></i>
                        ))}
                    </span>
                </div>
            }

            {
                !showRateCourse && user.role === "student" && 
                <div className="mb-3">
                    <button className="rate-course-btn mb-4" onClick={() => setShowRateCourse(true)}>Rate this course</button>
                </div>
            }

            {
                showRateCourse && user.role === "student" && 
                <div className="labeled-group your-rate">
                    <label>Your Rating</label>
                    <span>
                        {[1, 2, 3, 4, 5].map(r => (
                            <i 
                                className="fas fa-star" 
                                key={r} 
                                style={
                                    rating >= r ? 
                                    {color: "yellow", cursor: "pointer"} : 
                                    {color: "#ccc", cursor: "pointer"}
                                }
                                onClick={() => {
                                    if(!canRateCourse){
                                        return;
                                    }

                                    if(rating === 0){
                                        dispatch(rateCourse(user.id, token, currentCourse.id, r))
                                    }else{
                                        dispatch(updateMyRating(user.id, token, currentCourse.id, r))
                                    }

                                    setShowRateCourse(false);
                                }}
                            ></i>
                        ))}
                    </span>
                    <span className="btn btn-secondary" onClick={() => setShowRateCourse(false)}>Cancel</span>
                </div>
            }

            {
            user.role === "student" &&
                <button
                    onClick={() => {
                        if(isEnrolled){
                            dispatch(unenrollFromCourse(user.id, token, currentCourse.id))
                        }else{
                            dispatch(enrollToCourse(user.id, token, currentCourse))
                        }

                        setIsEnrolled(!isEnrolled);
                    }}
                >
                    {!isEnrolled ? "Enroll" : "Enrolled"}
                </button>
            }
        </div>
    )
}

export default CourseInfo
