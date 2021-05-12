import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserRole } from '../../actions/adminActions'
import {setCategoryToEdit} from '../../actions/categoryActions'

const Table = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user);
    const {table} = useSelector(state => state.admin);

    const handleChange = (e, id) => {
        dispatch(changeUserRole(user.id, token, id, e.target.value))
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {table.headers.map((header, i) => <th key={i + (Date.now() * Math.random() + "")}>{header}</th>)}
                </tr>
            </thead>
            
            <tbody>
                {
                    table.data.map((row, i) => (
                        !row.role ? 
                        <tr key={i + (Date.now() * Math.random() + "")}>
                            {Object.values(row).map((value, i) => (
                                <td 
                                    key={i + (Date.now() * Math.random() + "")}
                                >{
                                    value !== "edit" ? value :
                                    <i 
                                        className="fas fa-edit" 
                                        onClick={() => dispatch(setCategoryToEdit({id: row.id, title: row.title}))}
                                    ></i>
                                }</td>
                            ))}
                        </tr>
                        : row.role !== "admin" && 
                        <tr key={i + (Date.now() * Math.random() + "")}>
                            {Object.values(row).map((value, i) => (
                                <td key={i + (Date.now() * Math.random() + "")}>{
                                    i !== Object.values(row).length - 1 ? value 
                                    : 
                                    <select className="form-select" value={value} onChange={e => handleChange(e, row.id)}>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                }</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table
