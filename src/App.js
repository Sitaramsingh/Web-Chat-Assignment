import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import SignUP from './Components/SignUp';
import Dashboard from './Components/Dashboard';

function App() {
  return (
      <Router>
      <div className="App">
        <div id='routing-container'>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={SignUP}></Route>
          <Route path='/dashboard' component={Dashboard}></Route>
        </div>
     </div>
    </Router>
  );
}

export default App;
