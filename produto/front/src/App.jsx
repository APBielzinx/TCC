import React, { useState, useEffect } from 'react';
import Logo from './img/logoLinkedParkSemFundo.png';
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="content">
        <div className="left-content">
          <h1 className="app-name-left"><strong>LINKED PARK</strong></h1>
          <h1 className='slogan'><strong> O SISTEMA</strong></h1>
          <h1 className='slogan2'><strong>VINCULADO À</strong></h1>
          <h1 className='slogan3'><strong>VOCÊ</strong></h1>
          <button onClick={() => setOpenLogin(true)} className="start-button">
            <h1 className="fonteBotao"><strong>FAZER LOGIN</strong></h1>
          </button>
          {openLogin && <Login isOpen={openLogin} setCloseLogin={() => setOpenLogin(false)} />}
        </div>
        <div className="right-content">
          <img src={Logo} alt="Logo da empresa" />
        </div>
      </div>
    </div>
  );
}

export default App;
