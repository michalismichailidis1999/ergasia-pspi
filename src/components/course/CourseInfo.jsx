import React from 'react'
import { useSelector } from 'react-redux'

const CourseInfo = () => {
    const {user} = useSelector(state => state.user);
    const {currentCourse, currentCourseInfo} = useSelector(state => state.course);

    return (
        <div className="course course-info d-flex flex-column justify-content-center">
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

            <div className="labeled-group">
                <label><i className="fas fa-thumbs-up"></i> Rating</label>
                <span>
                    {[1, 2, 3, 4, 5].map(r => (
                        <i className="fas fa-star" key={r} style={currentCourse.rating >= r ? {color: "yellow"} : {}}></i>
                    ))}
                </span>
            </div>

            {user.role === "student" && <button>Enroll</button>}
        </div>
    )
}

export default CourseInfo
