import FirstComponet from "./components/FistComponent";
import React from 'react';
import './App.css';
import './components/Events';
import Button from 'react-bootstrap/Button';
import Login from './components/login';



function App() {
  const [openLogin, setOpenLogin] = useState(false)

  return (
    <div className="app-container">
      <div className="green-background">
      </div>
     
      <div className="content">
        <div className="tree-icon">
        </div>
        <FirstComponet />
        <Button className="start-button" onClick={() => setOpenLogin(true)}>login</Button>
        <Login isOpen={openLogin}/>
      </div>
      <button className="start-button">login</button>
    </div>
    
    
  );
}

export default App;


