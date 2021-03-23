import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCourse } from '../../actions/courseActions';

const SearchCourse = () => {
    const dispatch = useDispatch();

    const {allCourses} = useSelector(state => state.course);

    const [title, setTitle] = useState("")
    const [matches, setMatches] = useState([]);
    const [showMatches, setShowMatches] = useState(true);

    const handleChange = (e) => {
        setShowMatches(true);
        
        const currentSearch = e.target.value;
        setTitle(e.target.value);

        let currentMatches = [];
        if(currentSearch.length > 0){
            for(let i = 0; i < allCourses.length; i++){
                let regex = new RegExp("^"+currentSearch+".", "i");
                
                let match = allCourses[i].title.match(regex);

                if(match){
                    currentMatches.push(match)
                }
            } 
        }

        setMatches(currentMatches);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(searchCourse(title))
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Search Course..." 
                value={title} 
                onBlur={() => setShowMatches(false)}
                onChange={handleChange}
            />
            <button type="submit">Search</button>

            {matches.length > 0 && showMatches &&
                <ul className="matching">
                    {matches.map((match, i) => (
                        <li 
                            className="match" 
                            key={i}
                            onClick={
                                () => {
                                    setTitle(
                                        match[0].slice(match['index'], match[0].length - 1) + match['input'].slice(match[0].length - 1)
                                    )
                                    setShowMatches(false);
                                }
                            }
                        >
                            <span className="match">{match[0].slice(match['index'], match[0].length - 1)}</span>{match['input'].slice(match[0].length - 1)}
                        </li>
                    ))}
                </ul>
            }
        </form>
    )
}

export default SearchCourse
