import React, { useEffect } from 'react';
import {ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import {useHistory} from 'react-router-dom'

// Components
import Navbar from './components/navbar/Navbar';
import Routes from './components/routes/Routes';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const {isAuthenticated} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(() => {
    if(isAuthenticated){
      history.push("/dashboard");
    }
  }, [isAuthenticated])

  return (
    <React.Fragment>
      <Navbar/>

      <Routes/>

      <footer>
        <p>ErgasiaPSPI &copy; 2021</p>
      </footer>
      
      <ToastContainer position="bottom-right"/>
    </React.Fragment>
  );
}

export default App;
