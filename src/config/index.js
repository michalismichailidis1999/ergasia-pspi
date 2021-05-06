import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const API = process.env.REACT_APP_API_URL;