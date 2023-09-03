import FirstComponet from "./components/FistComponent";
import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Events';
import Button from 'react-bootstrap/Button';
import Login from './components/login';
import Logo from "./img/logoG.png";
import { Helmet } from 'react-helmet';

function App() {
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const newTitle = 'Linked Park';
    const titleTag = document.querySelector("title");
    titleTag.innerText = newTitle;
  }, []);

  return (
    <div className="app-container">
      <div className="green-background">
      </div>
     
      <div className="content">
        <div className="tree-icon">
        </div>
        <FirstComponet />
        <Login isOpen={openLogin}/>
        <img src={Logo} alt="Logo da empresa" className="logo"/>
      </div>
      <Button className="start-button" onClick={() => setOpenLogin(true)}>ㅤㅤㅤㅤㅤㅤㅤㅤㅤINÍCIOㅤㅤㅤㅤㅤㅤㅤㅤㅤ</Button>
     
    </div>
  );
}

export default App;
