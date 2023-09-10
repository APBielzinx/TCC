import FistComponent from './components/FistComponent';
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from "./routes/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './routes/Home';

function App() {

  return (

    <>
      <Home />
    </>
  )
}

export default App
