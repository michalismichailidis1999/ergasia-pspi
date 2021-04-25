import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import CreateLesson from './CreateLesson';

const Section = () => {
    const {user} = useSelector(state => state.user);

    const [addLesson, setAddLesson] = useState(false);

    const handleDelete = () => {
        let confirm = window.confirm("Are you sure that you want to delete this lesson?");

        if(confirm){
            toast.success("Course deleted successfully");
        }
    }

    return (
        <div className="course-section">
            <h3>Section 1</h3>

            <ul>
                <li>
                    <Link to="/lesson/1">Introduction to Linear Algebra</Link>
                    {user.role === "student" && <input type="checkbox" className="form-check-input"/>}
                    {
                        user.role === "teacher" &&
                        <span onClick={() => handleDelete()}>
                            <i className="fas fa-trash"></i>
                        </span>
                    }
                </li>

                <li>
                    <Link to="/lesson/1">Introduction to Linear Algebra 2</Link>
                    {user.role === "student" && <input type="checkbox" className="form-check-input"/>}
                    {
                        user.role === "teacher" &&
                        <span onClick={() => handleDelete()}>
                            <i className="fas fa-trash"></i>
                        </span>
                    }
                </li>

                <li>
                    <Link to="/lesson/1">Introduction to Linear Algebra 3</Link>
                    {user.role === "student" && <input type="checkbox" className="form-check-input"/>}
                    {
                        user.role === "teacher" &&
                        <span onClick={() => handleDelete()}>
                            <i className="fas fa-trash"></i>
                        </span>
                    }
                </li>

                {
                    user.role === "teacher" &&
                    <React.Fragment>
                        {!addLesson && <li onClick={() => setAddLesson(true)}>Add Lesson +</li>}
                    </React.Fragment>
                }
            </ul>

            {addLesson && <CreateLesson setAddLesson={setAddLesson} />}
        </div>
    )
}

export default Section
