import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './componentes/layout/navBar';
import React from 'react';
import Home from './componentes/layout/Home';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
    

    </div>
  );
}

export default App;
