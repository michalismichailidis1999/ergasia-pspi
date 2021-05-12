import { SET_SELECTED_COMPONENT } from "../actionTypes/layoutActionTypes"

export const setSelectedComponent = (selected) => {
    return {type: SET_SELECTED_COMPONENT, payload: selected}
}