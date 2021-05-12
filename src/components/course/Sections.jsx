import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../actions/courseActions';
import Section from './Section'

const Sections = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user);
    const {currentCourseInfo, currentCourse} = useSelector(state => state.course);

    const [addSection, setAddSection] = useState(false);
    const [sectionTitle, setSectionTitle] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(createSection(user.id, token, currentCourse.id, sectionTitle));

        setAddSection(false);
    }

    return (
        <div className="course-sections">
            {
                currentCourseInfo.sections.map(section => (
                    <Section key={section.id} section={section} />
                ))
            }

            {
                user.role === "teacher" &&
                <React.Fragment>
                    {!addSection && <span onClick={() => setAddSection(true)}>Add Section +</span>}

                    {
                        addSection && 
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Section Title</label>
                                <input type="text" className="form-control" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)}/>
                            </div>

                            <button type="submit" className="btn btn-primary">Add</button>
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setAddSection(false)
                            }}>Cancel</button>
                        </form>
                    }
                </React.Fragment>
            }
        </div>
    )
}

export default Sections
