import React, {useState, useEffect} from 'react'
import Navbar from './components/navbar';
import FistComponent from './components/FistComponent';
import Logo from './img/logoLinkedPark.png';
import Login from './routes/Login';

import './css/App.css'; // Importe seu arquivo de estilos aqui

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
        <h1 className="app-name-left"><strong> LINKED PARK</strong></h1>
      </div>
      <div className="content">
        <div className="left-content">
          <h1 className="slogan"> <strong> O Sistema</strong></h1>
          <h1 className="slogan2"><strong>que fizemos</strong></h1>
          <h1 className="slogan3"><strong>para você</strong></h1>
          <Login isOpen={openLogin} setCloseLogin={() => setOpenLogin(!openLogin)}/>
          <button onClick={() => setOpenLogin(true)} className="start-button"><h1 className="fonteBotao"><strong>FAZER LOGIN</strong></h1></button>
        </div>
        <div className="right-content">
            <img src={Logo} alt="Logo da empresa" className="logoimg"/>
        </div>
      </div>
    </div>
  );
}

export default App