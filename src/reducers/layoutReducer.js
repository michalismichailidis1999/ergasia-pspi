import { SET_SELECTED_COMPONENT } from "../actionTypes/layoutActionTypes";

const initialState = {
    selectedComponent: ""
}

const layoutReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case SET_SELECTED_COMPONENT:
            return {selectedComponent: payload}
        default:
            return state;
    }
}

export default layoutReducer;