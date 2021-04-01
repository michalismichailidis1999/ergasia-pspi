import React from 'react'
import "./style.css"
import { logOut } from '../../actions/userActions';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const LeftComponent = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.user);
    return (
       
            <div className="leftComponent">
                <div className="leftComponent-box">
                <ul className="selectors">
                    <li>
                    <Link to="/profile?view-courses" style={{ textDecoration: 'none', color:'inherit' }} onClick={() => {
                            
                         }}>
                                My courses 
                        </Link>
                    </li>
                    <li>
                    <Link to="/profile?view-account" style={{ textDecoration: 'none', color:'inherit' }} onClick={() => {
                            
                        }}>
                               Profile Settings 
                       </Link>
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