import React from 'react'
import Navbar from '../components/navbar'
import FistComponent from '../components/FistComponent';
import Login from './Login';

const Home = () => {
  return (
    <div>
        <Navbar />
        <div className="app-container">
      <div className="green-background">
      </div>
     
      <div className="content">
        <div className="tree-icon">
        </div>
        <FistComponent />
        <Login isOpen={openLogin} setCloseLogin={() => setOpenLogin(!openLogin)}/>
        
        <img src={Logo} alt="Logo da empresa" className="logo"/>
      </div>
      <button className="start-button" onClick={() => setOpenLogin(true)}>ㅤㅤㅤㅤㅤㅤㅤㅤㅤINÍCIOㅤㅤㅤㅤㅤㅤㅤㅤㅤ</button>
     
    </div>
    </div>
  )
}

export default Home