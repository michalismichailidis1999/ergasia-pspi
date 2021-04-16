import React from 'react'

const MyProgress = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="box">
                <div className="icon">
                    <i className="fas fa-chalkboard"></i>
                </div>

                <span>My Progress</span>
            </div>


            <ul className="infos">
                <li>Passed courses:  {3}</li>
                <li>Active courses:  {5}</li>
                
                <button className="learn-more">Learn More</button>
            </ul>

        </div>  
    )
}

export default MyProgress
