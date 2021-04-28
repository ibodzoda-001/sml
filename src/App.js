import React from 'react'
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import Login from './components/Login'
import './App.less';

function App() {
  return (
      <Router>
          <Switch>
              <Route key={1} path="/login">
                  <Login />
              </Route>
              <Redirect to='/login'/>
          </Switch>
      </Router>
  );
}

export default App;
