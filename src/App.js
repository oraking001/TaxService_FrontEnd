import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import { loadUser } from './actions/auth';
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";


function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  store.dispatch(loadUser());

  // log user out from all tabs if they log out in one tab
  window.addEventListener('storage', () => {
    if (!localStorage.token) store.dispatch({ type: 'LOGOUT' });
  });

  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route exact path="/" element={ <Dashboard /> } />
            <Route exact path="/fileupload" element={ <FileUpload /> } />
            <Route exact path="/login" element={ <Login /> } />
          </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;
