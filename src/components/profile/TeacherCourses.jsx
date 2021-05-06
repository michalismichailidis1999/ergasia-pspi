import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/adminActions';
import { setCurrentCourse } from '../../actions/courseActions';

const TeacherCourses = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {courses} = useSelector(state => state.course);

    const currentTeacherCourses = courses.filter(course => course.teacherId === user.id);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Edit</th>
                </tr>
            </thead>

            <tbody>
                {currentTeacherCourses.map(course => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td>
                            <i className="fas fa-edit" onClick={() => {
                                dispatch(setSelectedComponent("course-form"));
                                dispatch(setCurrentCourse(course))
                            }}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TeacherCourses
