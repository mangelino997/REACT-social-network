import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
//import  MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
// components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// jwt decode  --> https://www.npmjs.com/package/jwt-decode
import jwt_decode from "jwt-decode";
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';
import { getScreams } from './redux/actions/dataActions';

// get token
const token = localStorage.getItem("Token");
store.dispatch(getScreams());
if (token) {
  const decodeToken: any = jwt_decode(token);
  if (decodeToken.exp * 1000 < Date.now()) // verificamos si expiro el token
  {
    console.log("expiro");
    //window.location.href = '/login';
    store.dispatch(logoutUser());
    
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());

  }
}else{
  // window.location.href = '/login';
}

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} ></Route>
            <AuthRoute path="/login" component={login} />
            <AuthRoute path="/signup" component={signup} />

            {/* <Route path="/login" component={login} authenticated={authenticated}></Route>
            <Route path="/signup" component={signup} authenticated={authenticated}></Route> */}
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
