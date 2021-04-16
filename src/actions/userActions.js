import { 
    CHANGE_EMAIL, 
    CHANGE_FIRSTNAME, 
    CHANGE_LASTNAME, 
    CHANGE_PASSWORD, 
    LOAD_USER, 
    LOGIN, 
    LOG_OUT, 
    REGISTER
} from "../actionTypes/userActionTypes";
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
                            photoURL: "/assets/images/user.png",
                            role: "student"
                        }
    
                        localStorage.setItem("user", JSON.stringify({
                            id: newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            photoURL: newUser.photoURL,
                            role: "student"
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

export const login = (email, password, adminLogin=false) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                const user = users.find(user => user.email === email && user.password === password)
    
                if(user){
                    if(adminLogin){
                        if(user.role !== "admin"){
                            toast.error("Email or password is incorrect!")
                            dispatch(loadingCompleted());
                            return;
                        }
                    }

                    localStorage.setItem("user", JSON.stringify({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: user.role
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

export const changeFirstName = (userId, firstName) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                let user = users.find(user => user.id === userId);
    
                if(!user){
                    toast.error("First name could't be updated");
                }else{
                    toast.success("Your first name updated successfully!")
                    dispatch({type: CHANGE_FIRSTNAME, payload: {userId, firstName}})
                }
            } catch (err) {
                toast.error("First name could't be updated");
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1000)
    }
    
}

export const changeLastName = (userId, lastName) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                let user = users.find(user => user.id === userId);
    
                if(!user){
                    toast.error("Last name could't be updated");
                }else{
                    toast.success("Your last name updated successfully!")
                    dispatch({type: CHANGE_LASTNAME, payload: {userId, lastName}})
                }
            } catch (err) {
                toast.error("Last name could't be updated");
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1000)
    }
    
}

export const changeEmail = (userId, email) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                let user = users.find(user => user.id === userId);
    
                if(!user){
                    toast.error("Email name could't be updated");
                }else{
                    toast.success("Your email name updated successfully!")
                    dispatch({type: CHANGE_EMAIL, payload: {userId, email}})
                }
            } catch (err) {
                toast.error("Email name could't be updated");
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1000)
    }
}

export const changePassword = (userId, password, newPassword) => {
    return async (dispatch) => {
        const users = store.getState().dummyData.users

        dispatch(loading())

        await setTimeout(() => {
            try {
                let user = users.find(user => user.id === userId);
    
                if(!user){
                    toast.error("Password name could't be updated");
                }else{
                    if(user.password !== password){
                        toast.error("You didn't type correctly your password!");
                    }else{
                        toast.success("Your password name updated successfully!")
                        dispatch({type: CHANGE_PASSWORD, payload: {userId, password: newPassword}})
                    }
                }
            } catch (err) {
                toast.error("Password name could't be updated");
            }finally{
                dispatch(loadingCompleted())
            }
        }, 1000)
    }
}