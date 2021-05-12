import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../actions/courseActions';

const FilterCourses = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)
    const {categories} = useSelector(state => state.category)

    const [filterBy, setFilterBy] = useState("None")
    const [category, setCategory] = useState("all");

    const handleCategoryChange = (e) => {
        let currentCategory = e.target.value;
        setCategory(currentCategory);

        dispatch(getCourses(user.id, token, filterBy, currentCategory));
    }

    const handleFilterChange = (e) => {
        let currentFilter = e.target.value;
        setFilterBy(currentFilter);

        dispatch(getCourses(user.id, token, currentFilter, category));
    }

    return (
        <div className="d-flex justify-content-start align-items-center filters">
            <div className="filter-box">
                <label>Filter By:</label>

                <select className="form-select" onChange={handleFilterChange}>
                    <option value="None">None</option>
                    <option value="Most Enrolled">Most Enrolled</option>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Recommendations">Recommendations</option>
                </select>
            </div>

            <div className="filter-box">
                <label>Category:</label>

                <select className="form-select" onChange={handleCategoryChange} value={category}>
                    <option value="all">All</option>
                    {categories.map((category, i) => (
                        <option key={category.id} value={category.id} >{category.title}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default FilterCourses
