import React from 'react'
import { toast } from 'react-toastify'

const CreateLesson = ({setAddLesson}) => {
    const handleSubmit = e => {
        e.preventDefault()

        toast.success("Lesson created successfully!")

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
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">PDF</label>
                                <input type="file" className="form-control"/>
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
