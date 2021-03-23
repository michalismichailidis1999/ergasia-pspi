import { LOAD_USER, LOGIN, LOG_OUT, REGISTER } from "../actionTypes/userActionTypes";
import {toast} from 'react-toastify'
import { loading, loadingCompleted } from "./formActions";
import {userCreated} from '../actions/dummyDataActions'

import store from '../store'

export const register = (firstName, lastName, email, password, confirmPassword) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                const user = users.find(user => user.email === email && user.password === password)
    
                if(user){
                    toast.error("Email is already taken!")
                }else{
                    if(password !== confirmPassword){
                        toast.error("Passwords do not match!")
                    }else{
                        const newUser = {
                            id: users[users.length - 1].id + 1,
                            firstName,
                            lastName,
                            email,
                            password,
                            photoURL: "/assets/images/user.png"
                        }
    
                        localStorage.setItem("user", JSON.stringify({
                            id: newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            photoURL: newUser.photoURL
                        }));
                        dispatch({type: REGISTER, payload: newUser})
                        dispatch(userCreated(newUser))
                    }
                }
            } catch (err) {
                toast.error("Something went wrong! Please try again.");  
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1500)
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                const user = users.find(user => user.email === email && user.password === password)
    
                if(user){
                    localStorage.setItem("user", JSON.stringify({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        photoURL: user.photoURL
                    }));
                    dispatch({type: LOGIN, payload: user})
                }else{
                    toast.error("Email or password is incorrect!")
                }
            } catch (err) {
                toast.error("Something went wrong! Please try again.");  
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1500)
    }
}

export const logOut = () => {
    localStorage.removeItem("user");

    return {type: LOG_OUT}
}

export const loadUser = () => {
    let user = localStorage.getItem("user");
    if(user){
        return {type: LOAD_USER, payload: JSON.parse(user)}
    }else{
        return {type: "CANNOT_LOAD_USER"}
    }
}