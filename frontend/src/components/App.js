import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';

import Header from './Header/Header';
//import Home from '../routes/Home/Home';


function App() {

  // const dispatch = useDispatch();

  // // Load user cart on entry to app
  // useEffect(() => {
  //   async function isLoggedIn() {
  //     await dispatch(checkLoginStatus());
  //   }

  //   isLoggedIn();
  // }, [dispatch]);

  return (
    <div style={{flex: 1}}>
      <Router>
        <Header />
        <Routes>
        {/* <Route exact path='/' component={Home} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
