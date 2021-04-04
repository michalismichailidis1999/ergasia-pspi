import React, {useEffect, useState} from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import MyAccount from './MyAccount'
import MyCourses from './MyCourses'


const RightComponent = () => {
    const [componentToLoad, setComponentToLoad] = useState("MyAccount")
    useEffect(() => {
        let search = window.location.search
        if(search === "?view-account"){
            setComponentToLoad("MyAccount")
        }
        else {
            setComponentToLoad("MyCources")
        }
    }, [window.location.search])
    return (
       
        <div className="rightComponent">
            <div className="rightComponent-box">

                {
                    componentToLoad === "MyAccount" ? 
                    <MyAccount/> :
                    <MyCourses/>  

                }        


            </div>
        </div>
        
    )
}

export default RightComponent