import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/adminActions';
import {createCourse, updateCourse} from '../../actions/courseActions'

const CourseForm = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    const {categories} = useSelector(state => state.category);
    const {currentCourse} = useSelector(state => state.course);

    const [title, setTitle] = useState(currentCourse ? currentCourse.title : "")
    const [category, setCategory] = useState(currentCourse ? currentCourse.title : categories[0].title)
    const [description, setDescription] = useState(currentCourse ? currentCourse.description : "")
    const [imgSrc, setImgSrc] = useState(currentCourse ? currentCourse.imgSrc : "");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentCourse){
            if(imgSrc !== ""){
                dispatch(updateCourse({...currentCourse, title, description, category}));
            }else{
                dispatch(updateCourse({...currentCourse, title, description, category, imgSrc}));
            }
        }else{
            dispatch(createCourse({title, category, description, imgSrc, teacherId: user.id}));
        }

        dispatch(setSelectedComponent("courses"))
    }

    return (
        <form className="course-form" onSubmit={handleSubmit}>
            <h4>{currentCourse ? "Edit" : "Create"} Course</h4>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Course title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required={true}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <select 
                    className="form-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {categories.map((category, i) => (
                        <option key={i + (Date.now() * Math.random() + "")} value={category.title} >{category.title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    placeholder="Course description..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required={true}
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Image</label>
                <input 
                    type="file" 
                    className="form-control" 
                    placeholder="Course image..."
                    onChange={e => setImgSrc("/assets/images/courseToCreate/" + e.target.files[0].name)}
                />
            </div>

            <button className="btn btn-primary">{currentCourse ? "Update Course" : "Create Course"}</button>
        </form>
    )
}

export default CourseForm
