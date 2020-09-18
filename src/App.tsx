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


// get token
const token = localStorage.getItem("Token");
let authenticated: boolean;
if (token) {
  const decodeToken: any = jwt_decode(token);
  if (decodeToken?.exp * 1000 < Date.now()) // verificamos si expiro el token
  {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} ></Route>
            <AuthRoute path="/login" component={login} authenticated={authenticated} />
            <AuthRoute path="/signup" component={signup} authenticated={authenticated} />

            {/* <Route path="/login" component={login} authenticated={authenticated}></Route>
            <Route path="/signup" component={signup} authenticated={authenticated}></Route> */}
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
