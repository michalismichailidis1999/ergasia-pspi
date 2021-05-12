import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { changeLessonStatus, deleteLesson, setCurrentLesson } from '../../actions/courseActions'

const LessonLink = ({lesson}) => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user);
    const {canUpdateLessonStatus} = useSelector(state => state.course);

    const [isCompleted, setIsCompleted] = useState(lesson.completed === 1 ? true : false);

    const handleDelete = () => {
        let confirm = window.confirm("Are you sure that you want to delete this lesson?");

        if(confirm){
            dispatch(deleteLesson(user.id, token, lesson.section_id, lesson.id));
            toast.success("Section deleted successfully");
        }
    }

    return (
        <li>
            <Link to={`/lesson/${lesson.id}`} onClick={() => dispatch(setCurrentLesson(lesson))}>{lesson.title}</Link>

            {
                user.role === "student" && 
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={isCompleted}
                    onChange={e => {
                        if(!canUpdateLessonStatus){
                            return;
                        }

                        if(isCompleted){
                            dispatch(changeLessonStatus(user.id, token, lesson.id, 0))
                        }else{
                            dispatch(changeLessonStatus(user.id, token, lesson.id, 1))
                        }

                        setIsCompleted(e.target.checked)
                    }}
                />
            }

            {
                user.role === "teacher" &&
                <span onClick={() => handleDelete()}>
                    <i className="fas fa-trash"></i>
                </span>
            }
        </li>
    )
}

export default LessonLink
