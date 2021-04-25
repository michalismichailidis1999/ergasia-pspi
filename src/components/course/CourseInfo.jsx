import React from 'react'
import { useSelector } from 'react-redux'

const CourseInfo = () => {
    const {user} = useSelector(state => state.user);

    return (
        <div className="course course-info d-flex flex-column justify-content-center">
            <img src="/assets/images/linear-algebra.png" alt="Linear Algebra Course"/>

            <h2>Linear Algebra For Beginners</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus mollitia numquam modi consectetur sed dolore?</p>

            <div className="labeled-group">
                <label><i className="fas fa-user-tie"></i> Teacher</label>
                <span>John Doe</span>
            </div>

            <div className="labeled-group">
                <label><i className="fas fa-tags"></i> Sections</label>
                <span>12</span>
            </div>

            <div className="labeled-group">
                <label><i className="fas fa-user-graduate"></i> Enrolls</label>
                <span>10054</span>
            </div>

            <div className="labeled-group">
                <label><i className="fas fa-thumbs-up"></i> Rating</label>
                <span>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </span>
            </div>

            {user.role === "student" && <button>Enroll</button>}
        </div>
    )
}

export default CourseInfo
