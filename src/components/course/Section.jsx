import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import CreateLesson from './CreateLesson';
import {setCurrentLesson} from '../../actions/courseActions'

const Section = ({section}) => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);

    const [addLesson, setAddLesson] = useState(false);

    const handleDelete = () => {
        let confirm = window.confirm("Are you sure that you want to delete this lesson?");

        if(confirm){
            toast.success("Section deleted successfully");
        }
    }

    return (
        <div className="course-section">
            <h3>{section.title}</h3>

            <ul>
                {
                    section.lessons.map(lesson => (
                        <li key={lesson.id}>
                            <Link to={`/lesson/${lesson.id}`} onClick={() => dispatch(setCurrentLesson(lesson))}>{lesson.title}</Link>
                            {user.role === "student" && <input type="checkbox" className="form-check-input"/>}
                            {
                                user.role === "teacher" &&
                                <span onClick={() => handleDelete()}>
                                    <i className="fas fa-trash"></i>
                                </span>
                            }
                        </li>
                    ))
                }
                
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
