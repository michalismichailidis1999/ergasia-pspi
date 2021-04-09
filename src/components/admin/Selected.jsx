import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTableHeadersAndData } from '../../actions/adminActions';
import { createCategory, deleteCategory, editCategory, setCategoryToEdit } from '../../actions/categoryActions';
import Table from './Table'

const Selected = ({title, icon}) => {
    const dispatch = useDispatch()
    const {categoryToEdit, categories} = useSelector(state => state.category);

    const [addCategory, setAddCategory] = useState(false);
    const [category, setCategory] = useState(!categoryToEdit ? "" : categoryToEdit.title);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!categoryToEdit){
            dispatch(createCategory({id: categories[categories.length - 1].id + 1, title: category}))
            setAddCategory(false);
        }else{
            dispatch(editCategory({id: categoryToEdit.id, title: category}))
            dispatch(setTableHeadersAndData("categories"))
            dispatch(setCategoryToEdit(null));
        }
    }

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
                                                dispatch(deleteCategory(categoryToEdit.id))
                                                dispatch(setTableHeadersAndData("categories"))
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
