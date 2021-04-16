import React from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import MyAccount from './MyAccount'
import MyCourses from './MyCourses'
import { setTableHeadersAndData} from '../../actions/adminActions'
import MyProgress from './MyProgress';
import CourseForm from './CourseForm';
import TeacherCourses from './TeacherCourses';

const RightComponent = () => {
    const {selectedComponent} = useSelector(state => state.admin); 
    const {user} = useSelector(state => state.user);
    
    return (
        <div className="rightComponent">
            <div className="rightComponent-box">
                {selectedComponent==="courses" && user.role === "student" && <MyCourses/>}
                {selectedComponent==="progress" && <MyProgress/>}
                {(selectedComponent==="settings" || selectedComponent==="") && <MyAccount/>}
                {selectedComponent === "course-form" && <CourseForm/>}
                {selectedComponent==="courses" && user.role === "teacher" && <TeacherCourses/>}
            </div>
        </div>
    )
}

export default RightComponent