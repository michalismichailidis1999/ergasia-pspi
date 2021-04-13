import React, { useState, useEffect } from 'react'
import "./style.css"
import { logOut } from '../../actions/userActions';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSelectedComponent } from '../../actions/profileActions'


const LeftComponent = () => {
   
    
    const dispatch = useDispatch()
    const [count, setState] = useState(false);
    
    function handlerTrue(){setState(true)};

    function handlerFalse(){setState(false)};
    useEffect( () => {
        console.log(count);
    }, [setSelectedComponent]);

    return (
       
            <div className="leftComponent">
                <div className="leftComponent-box">
                <ul className="selectors">
                  <li onClick={() => {handlerTrue();
                dispatch(setSelectedComponent("courses"))
                }}>
                                My progress 
                    </li>
                
                    <li  onClick={() => {handlerFalse();
                     dispatch(setSelectedComponent("settings"))}}>
                               Profile Settings 
                     
                    </li>
                    <li>
                        <Link to="/" style={{ textDecoration: 'none', color:'inherit' }} onClick={() => {
                             dispatch(logOut())
                         }}>
                                Logout 
                        </Link>
                     </li>
                    
                </ul>


                
                </div>
            </div>
       
    )
}

export default LeftComponent