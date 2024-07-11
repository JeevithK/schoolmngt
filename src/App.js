import './App.css';
import Home from './components/Home';
import Register from './components/Register'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Login from './components/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/displayUsers" element={<DisplayUsers/>}/>  
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
