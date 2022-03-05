import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import ValidatedLoginForm from './components/test/ValidatedLoginForm';
import Dashboard from './components/dashboard/dashboard';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<ValidatedLoginForm/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
  );
}

export default App;
