import React, {useState, useEffect} from 'react'
import Navbar from './components/navbar';
import FistComponent from './components/FistComponent';
import Logo from './img/logoG.png';
import Login from './routes/Login';

import './App.css'; // Importe seu arquivo de estilos aqui

function App() {
  const [openLogin, setOpenLogin] = useState(false);


  useEffect(() => {
    const newTitle = 'Linked Park';
    const titleTag = document.querySelector("title");
    titleTag.innerText = newTitle;
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="app-name-left">Linked Park</h1>
      </div>
      <div className="content">
        <div className="left-content">
          <h1 className="slogan">O LAZER</h1>
          <h1 className="slogan">VINCULADO</h1>
          <h1 className="slogan">A VOCÊ</h1>
          <Login isOpen={openLogin} setCloseLogin={() => setOpenLogin(!openLogin)}/>
          <button onClick={() => setOpenLogin(true)} className="start-button">Início</button>
        </div>
        <div className="right-content">
            <img src={Logo} alt="Logo da empresa" className="logoimg"/>
        </div>
      </div>
    </div>
  );
}

export default App