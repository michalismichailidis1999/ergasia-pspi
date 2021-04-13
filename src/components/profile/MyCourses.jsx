import React from 'react'
import "./style.css"


const MyCourses = () => {
    return (
   <div>
             <div className="box">
                    <div className="icon">
                        <i className="fas fa-chalkboard"></i>
                    </div>

                    <span>My progress</span>
                </div>


                <ul className="infos">
                    <li>
                    Passed courses:  {3}
                    </li>
                    <li>
                    Active courses:  {5}
                    </li>
                    
                    

                  

                    <button className="learn-more">Learn More</button>
                </ul>

      </div>  
    )
}

export default MyCourses
