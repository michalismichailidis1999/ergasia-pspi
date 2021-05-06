import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './config';
import 'react-toastify/dist/ReactToastify.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
