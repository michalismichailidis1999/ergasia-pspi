import { LOADING, LOADING_COMPLETED } from "../actionTypes/formActionTypes"

export const loading = () => {
    return {type: LOADING}
}

export const loadingCompleted = () => {
    return {type: LOADING_COMPLETED}
}