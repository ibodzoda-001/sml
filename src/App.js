import React from 'react'
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import Login from './components/Login'
import Main from './components/Main'
import './App.less';
import Header from "./components/Header";

function App() {
  return (
      <div>
          <Header />
          <div className="container" style={{marginTop: '15px'}}>
              <Router>
                  <Switch>
                      <Route key={1} path="/login">
                          <Login />
                      </Route>
                      <Route key={1} path="/main">
                          <Main />
                      </Route>
                      <Redirect to='/login'/>
                  </Switch>
              </Router>
          </div>
      </div>
  );
}

export default App;
