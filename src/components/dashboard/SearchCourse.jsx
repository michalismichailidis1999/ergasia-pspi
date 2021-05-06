import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCourse } from '../../actions/courseActions';

const SearchCourse = () => {
    const dispatch = useDispatch();

    const {courses} = useSelector(state => state.course);

    const [title, setTitle] = useState("")
    const [matches, setMatches] = useState([]);
    const [showMatches, setShowMatches] = useState(true);

    const handleChange = (e) => {
        setShowMatches(true);
        
        const currentSearch = e.target.value;
        setTitle(e.target.value);

        let currentMatches = [];
        if(currentSearch.length > 0){
            for(let i = 0; i < courses.length; i++){
                let regex = new RegExp("^"+currentSearch+".", "i");
                
                let match = courses[i].title.match(regex);

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

    const handleClick = e => {
        let matchingListClicked = e.target.closest(".matching");

            if(!matchingListClicked){
                setShowMatches(false)
                setMatches([])
            }
    }

    useEffect(() => {
        window.addEventListener("click", handleClick)

        return () => 
            window.removeEventListener("click", handleClick)
        
    }, [])

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Search Course..." 
                value={title} 
                onChange={handleChange}
            />
            
            <button type="submit" disabled={title === ""} className={title === "" ? "disabled" : ""}>Search</button>

            {matches.length > 0 && showMatches &&
                <ul className="matching">
                    {matches.map((match, i) => (
                        <li
                            key={i}
                            onClick={() => {
                                setTitle(
                                    match[0].slice(match['index'], match[0].length - 1) + match['input'].slice(match[0].length - 1)
                                )
                                
                                setShowMatches(false);
                            }}
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
