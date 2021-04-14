import React, {useEffect} from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import MyAccount from './MyAccount'
import MyCourses from './MyCourses'
import { setTableHeadersAndData} from '../../actions/adminActions'





const RightComponent = () => {
    
    const dispatch = useDispatch()

    const {selectedComponent} = useSelector(state => state.admin); 
    

    

    useEffect(() => {
        dispatch(setTableHeadersAndData(selectedComponent));
    }, [selectedComponent])
    
    return (
       
        <div className="rightComponent">
            <div className="rightComponent-box">
        {(selectedComponent==="courses") && <MyCourses/>}
        {(selectedComponent==="settings"||selectedComponent==="") &&<MyAccount/>}
      
            </div>
        </div>
        
    )
}

export default RightComponent