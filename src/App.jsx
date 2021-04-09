import React, { useEffect } from 'react';
import {ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';

// Components
import Navbar from './components/navbar/Navbar';
import Routes from './components/routes/Routes';

const App = () => {
  const dispatch = useDispatch()
  const {isInAdminArea} = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(loadUser())
  }, [])
  
  return (
    <React.Fragment>
      {!isInAdminArea && <Navbar/>}

      <Routes/>

      {!isInAdminArea && <footer>
        <p>ErgasiaPSPI &copy; 2021</p>
      </footer>}
      
      <ToastContainer position="bottom-right"/>
    </React.Fragment>
  );
}

export default App;
