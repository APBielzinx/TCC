import React, {useState, useEffect} from 'react'
import Navbar from '../components/navbar'
import FistComponent from '../components/FistComponent';
import Logo from '../assets/react.svg'
import Login from './Login';

const Home = () => {
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
        <FistComponent />
        <Login isOpen={openLogin} setCloseLogin={() => setOpenLogin(!openLogin)}/>
        
        <img src={Logo} alt="Logo da empresa" className="logo"/>
      </div>
      <button className="start-button" onClick={() => setOpenLogin(true)}>ㅤㅤㅤㅤㅤㅤㅤㅤㅤINÍCIOㅤㅤㅤㅤㅤㅤㅤㅤㅤ</button>
     
    </div>
  );
}

export default Home