import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTableHeadersAndData } from '../../actions/adminActions';
import { createCategory, deleteCategory, editCategory, setCategoryToEdit } from '../../actions/categoryActions';
import Table from './Table'
import {userTableHeaders, categoryTableHeaders, courseTableHeaders} from './data/table'

const Selected = ({title, icon}) => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user);
    const {categoryToEdit, categories} = useSelector(state => state.category);
    const {users} = useSelector(state => state.admin);
    const {selectedComponent} = useSelector(state => state.layout)
    const {courses} = useSelector(state => state.course);

    const [addCategory, setAddCategory] = useState(false);
    const [category, setCategory] = useState(!categoryToEdit ? "" : categoryToEdit.title);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!categoryToEdit){
            dispatch(createCategory(user.id, token, category))
            setAddCategory(false);
        }else{
            dispatch(editCategory(user.id, token, categoryToEdit.id, category))
            dispatch(setCategoryToEdit(null));
        }
    }

    useEffect(() => {
        let table = {
            headers: [],
            data: []
        }

        if(selectedComponent === "users"){
            table.headers = userTableHeaders;
            table.data = users;
        }else if(selectedComponent === "categories"){
            table.headers = categoryTableHeaders;
            table.data = categories.map(category => {
                let c = {...category};

                c.edit = "edit";

                return c
            })
        }else if(selectedComponent === "courses"){
            table.headers = courseTableHeaders;
            let courseTableData = courses.map(course => {
                return {
                    id: course.id,
                    title: course.title,
                    category: categories.find(category => category.id === course.category_id).title,
                    enrolls: course.enrolls,
                    rating: course.rating
                }
            })
            table.data = courseTableData
        }

        dispatch(setTableHeadersAndData(JSON.stringify(table)))
    }, [categories])

    useEffect(() => {
        if(categoryToEdit){
            setCategory(categoryToEdit.title);
        }else{
            setCategory("")
        }
    }, [categoryToEdit])

    return (
        <>
            <h1>{title} <i className={icon}></i></h1>

            {(title !== "Categories" || (!categoryToEdit && !addCategory)) && <Table/>}

            {title === "Categories" &&

                <React.Fragment>
                    {(addCategory || categoryToEdit) && 
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                className="form-control mb-3" 
                                placeholder="Enter a category name"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />

                            <button 
                                className={addCategory ? "btn btn-primary" : "btn btn-success"} 
                                type="submit"
                            >
                                {addCategory ? "Create" : "Update"}
                            </button>

                            <button 
                                className="btn btn-secondary" 
                                type="button" 
                                onClick={() => {
                                    setAddCategory(false)
                                    dispatch(setCategoryToEdit(null))
                                }}
                            >
                                Cancel
                            </button>

                            {
                                categoryToEdit && 
                                <div className="delete-button-box">
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={() => {
                                            let confirm = window.confirm("Do you really want to delete this category?");

                                            if(confirm){
                                                dispatch(deleteCategory(user.id, token, categoryToEdit.id))
                                            }

                                            dispatch(setCategoryToEdit(null))
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            }
                        </form>
                    }

                    {
                        !addCategory && !categoryToEdit && 
                        <div className="create-icon" onClick={() => setAddCategory(true)}>
                            <i className="fas fa-plus"></i>
                        </div>
                    }
                </React.Fragment>
            }
        </>
    )
}

export default Selected
