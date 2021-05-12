import { 
    EDIT_CATEGORY, 
    CREATE_CATEGORY, 
    DELETE_CATEGORY, 
    SET_CATEGORY_TO_EDIT, 
    FETCH_CATEGORIES 
} from '../actionTypes/categoryActionTypes';

const initialState = {
    categories: [],
    categoryToEdit: null,
}

const categoryReducer = (state=initialState, {type, payload}) => {
    let categories = state.categories

    switch(type){
        case CREATE_CATEGORY:
            categories = [...categories, payload.category]
            return {...state, categories}
        case EDIT_CATEGORY:
            categories = categories.map(category => category.id === payload.category.id ? payload.category : category)
            return {...state, categories}
        case DELETE_CATEGORY:
            categories = categories.filter(category => category.id !== payload.categoryId)
            return {...state, categories}
        case SET_CATEGORY_TO_EDIT:
            return {...state, categoryToEdit: payload}
        case FETCH_CATEGORIES:
            return {...state, categories: payload.categories}
        default:
            return state
    }
}

export default categoryReducer;