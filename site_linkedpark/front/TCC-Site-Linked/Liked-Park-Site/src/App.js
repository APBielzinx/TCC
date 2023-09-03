import FirstComponet from "./components/FistComponent";
import React from 'react';
import './App.css';
import './components/Events';



function App() {
  return (
    <div className="app-container">
      <div className="green-background">
      </div>
     
      <div className="content">
        <div className="tree-icon">
        </div>
        <FirstComponet />
        
      </div>
      <button className="start-button">ㅤㅤㅤㅤㅤㅤㅤㅤINÍCIOㅤㅤㅤㅤㅤㅤㅤㅤ</button>
    </div>
    
    
  );
}

export default App;


