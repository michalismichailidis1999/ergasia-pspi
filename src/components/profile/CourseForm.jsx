import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/layoutActions';
import {createCourse, deleteCourse, setCurrentCourse, updateCourse} from '../../actions/courseActions'

const CourseForm = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user);
    const {categories} = useSelector(state => state.category);
    const {currentCourse} = useSelector(state => state.course);

    const [title, setTitle] = useState(currentCourse ? currentCourse.title : "")
    const [categoryId, setCategoryId] = 
        useState(currentCourse ? categories.find(category => category.id === currentCourse.category_id).id : categories[0].id)
    const [description, setDescription] = useState(currentCourse ? currentCourse.description : "")
    const [photoURL, setPhotoURL] = useState(currentCourse ? currentCourse.photoURL : "");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("title", title)
        formData.set("category_id", categoryId);
        formData.set("description", description);
        formData.set("file", file);

        if(currentCourse){
            if(!file){
                formData.delete("file");
            }

            dispatch(updateCourse(user.id, token, currentCourse.id, formData));
        }else{
            dispatch(createCourse(user.id, token, formData))
        }
    }

    const handleFileChange = (e) => {
        setPhotoURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        setTitle(currentCourse ? currentCourse.title : "");
        setDescription(currentCourse ? currentCourse.description : "")
        setCategoryId(currentCourse ? categories.find(category => category.id === currentCourse.category_id).id : categories[0].id)
        setPhotoURL(currentCourse ? currentCourse.photoURL : "")
    }, [currentCourse])

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
                    value={categoryId}
                    onChange={e => setCategoryId(parseInt(e.target.value))}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} >{category.title}</option>
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
                    onChange={handleFileChange}
                />
            </div>

            {
                photoURL !== "" &&
                <div className="img-preview">
                    <img src={photoURL} alt="Course" />
                </div>
            }

            <button type="submit" className="btn btn-primary">{currentCourse ? "Update Course" : "Create Course"}</button>

            {
                currentCourse &&
                <button 
                    type="button" 
                    className="btn btn-danger mx-3"
                    onClick={async () => {
                        let confirm = window.confirm("Are you sure that you want to delete this course?");

                        if(confirm){
                            await dispatch(deleteCourse(user.id, token, currentCourse.id))
                            dispatch(setSelectedComponent("courses"))
                            dispatch(setCurrentCourse(null))
                        }
                    }}
                >
                    Delete Course
                </button>
            }
        </form>
    )
}

export default CourseForm
