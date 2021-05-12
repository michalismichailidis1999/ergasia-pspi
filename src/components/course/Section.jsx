import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteSection } from '../../actions/courseActions';
import CreateLesson from './CreateLesson';
import LessonLink from './LessonLink';

const Section = ({section}) => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user);

    const [addLesson, setAddLesson] = useState(false);
    const handleDelete = () => {
        let confirm = window.confirm("Are you sure do you want to delete the section " + section.title + "?")
        
        if(confirm){
            dispatch(deleteSection(user.id, token, section.id))
            toast.success("Section deleted successfully");
        }
    }

    return (
        <div className="course-section">
            <div className="section-title">
                <h3>{section.title}</h3>

                {
                    user.role === "teacher" && 
                    <i className="fas fa-trash" onClick={() => handleDelete()}></i>
                }
            </div>

            <ul>
                {
                    section.lessons.map(lesson => (
                        <LessonLink key={lesson.id} lesson={lesson} />
                    ))
                }
                
                {
                    user.role === "teacher" &&
                    <React.Fragment>
                        {!addLesson && <li onClick={() => setAddLesson(true)}>Add Lesson +</li>}
                    </React.Fragment>
                }
            </ul>

            {addLesson && <CreateLesson setAddLesson={setAddLesson} sectionId={section.id} />}
        </div>
    )
}

export default Section
