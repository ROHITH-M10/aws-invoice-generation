import './style.css';
import Home from './pages/Home';
import React,{useState,useEffect} from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Dept from './pages/Dept';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Dept" element={<Dept />} />
      </Routes>
    </Router>
  );
}

export default App;
