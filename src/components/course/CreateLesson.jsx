import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { createLesson } from '../../actions/courseActions';

const CreateLesson = ({setAddLesson, sectionId}) => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user);

    const [lessonTitle, setLessonTitle] = useState("");
    const [file, setFile] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData();

        formData.set("title", lessonTitle);
        formData.set("file", file);

        dispatch(createLesson(user.id, token, sectionId, formData));

        setAddLesson(false)
    }

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Create Lesson</h5>
                        <button type="button" className="btn-close" onClick={() => setAddLesson(false)}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Lesson Title</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={lessonTitle}
                                    required={true}
                                    onChange={e => setLessonTitle(e.target.value)} 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">PDF</label>
                                <input 
                                    type="file" 
                                    className="form-control"
                                    required={true}
                                    onChange={e => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setAddLesson(false)}>Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateLesson
