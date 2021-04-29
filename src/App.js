import React from 'react'
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import Login from './components/Login'
import Main from './components/Main'
import './App.less';
import Header from "./components/Header";
import RouterGuard from "./helpers/RouterGuard";

function App() {
  return (
      <div>
          <Header />
          <div className="container" style={{marginTop: '15px'}}>
              <Router>
                  <RouterGuard />
              </Router>
          </div>
      </div>
  );
}

export default App;
