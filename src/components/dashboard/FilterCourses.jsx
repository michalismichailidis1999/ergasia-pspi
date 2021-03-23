import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCourses } from '../../actions/courseActions';

const FilterCourses = () => {
    const dispatch = useDispatch();
    const {enrolledCourses, allCourses} = useSelector(state => state.course);

    const handleChange = (e, filterBy=null) => {
        if(filterBy === "category"){
            dispatch(filterCourses(allCourses, filterBy, e.target.value))
        }else{
            dispatch(filterCourses(allCourses, e.target.value, null, enrolledCourses))
        }
    }

    return (
        <div className="d-flex justify-content-start align-items-center filters">
            <div className="filter-box">
                <label>Filter By:</label>

                <select className="form-select" onChange={e => handleChange(e)}>
                    <option value="None">None</option>
                    <option value="Most Enrolled">Most Enrolled</option>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Recommendations">Recommendations</option>
                </select>
            </div>

            <div className="filter-box">
                <label>Category:</label>

                <select className="form-select" onChange={e => handleChange(e, "category")}>
                    <option value="All">All</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Foreign Languages">Foreign Languages</option>
                    <option value="History">History</option>
                </select>
            </div>
        </div>
    )
}

export default FilterCourses
