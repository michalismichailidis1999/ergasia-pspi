import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCourses } from '../../actions/courseActions';

const FilterCourses = () => {
    const dispatch = useDispatch();
    const {enrolledCourses, allCourses} = useSelector(state => state.course);

    const [courses, setCourses] = useState(allCourses);
    const [category, setCategory] = useState("All");

    const handleCategoryChange = (e) => {
        let currentCategory = e.target.value
        setCategory(e.target.value);

        let filteredCourses = courses;
        console.log(filteredCourses)

        if(currentCategory !== "All"){
            filteredCourses = filteredCourses.filter(course => course.category === currentCategory);
        }

        dispatch(filterCourses(filteredCourses))
    }

    const filterByCategory = (filteredCourses) => {
        if(category === "All"){
            dispatch(filterCourses(filteredCourses))
        }else{
            filteredCourses = filteredCourses.filter(course => course.category === "Category")
            dispatch(filterCourses(filteredCourses))
        }
    }

    const handleFilterChange = (e=null) => {
        let filteredCourses = allCourses;
        
        switch(e.target.value){
            case "None":
                break;
            case "Most Enrolled":
                filteredCourses.sort((a, b) => b.enrolls - a.enrolls);
                break;
            case "Highest Rating":
                filteredCourses.sort((a, b) => b.rating - a.rating);
                break;
            case "Recommendations":
                filteredCourses = [];
                for(let i = 0; i < enrolledCourses.length; i++){
                    for(let j = 0; j < courses.length; j++){
                        if(courses[j].category === enrolledCourses[i].category && courses[j].id !== enrolledCourses[i].id){
                            filteredCourses.push(courses[j]);
                        }
                    }
                }
                break;
            default:
                break;
        }
        
        setCourses(filteredCourses)
        filterByCategory(filteredCourses)
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

                <select className="form-select" onChange={handleCategoryChange} defaultValue={category}>
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
