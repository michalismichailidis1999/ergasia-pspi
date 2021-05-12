import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedComponent } from '../../actions/layoutActions';
import { getTeacherCourses, setCurrentCourse } from '../../actions/courseActions';

const TeacherCourses = () => {
    const dispatch = useDispatch();
    const {user, token} = useSelector(state => state.user);
    const {courses} = useSelector(state => state.course);

    useEffect(() => {
        dispatch(getTeacherCourses(user.id, token));
    }, [])

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
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>
                            <Link to={`/course/${course.id}`}>{course.title}</Link>
                        </td>
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
