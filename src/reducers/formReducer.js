import { LOADING, LOADING_COMPLETED } from "../actionTypes/formActionTypes";

const initialState = {
    loading: false
}

const formReducer = (state=initialState, action) => {
    const {type} = action;

    switch(type){
        case LOADING:
            return {loading: true};
        case LOADING_COMPLETED:
            return {loading: false};
        default:
            return state;
    }
}

export default formReducer;