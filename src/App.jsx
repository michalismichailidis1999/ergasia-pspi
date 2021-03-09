import Navbar from './components/Navbar';
import {Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  return (
    <div>
      <Navbar/>

      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </Switch>

      <footer>
        <p>ErgasiaPSPI &copy; 2021</p>
      </footer>
    </div>
  );
}

export default App;
